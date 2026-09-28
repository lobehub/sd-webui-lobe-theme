/**
 * Progress while a job runs: the label of the progress bar ("Step 12/30" on
 * the left, "38% · ETA 00:08" on the right, used by the Aurora bar) and an
 * animated frame around the result gallery (Glow edge, Pulse, Ambient, Scan,
 * Orbit).
 *
 * Everything follows the theme's progress hook (bus events from the
 * WebUI's own progress polling) plus /lobe/state for the sampling step. The
 * frame is one canvas over the gallery, pointer-events off, drawn only while
 * a job runs and for the short finish ripple; nothing runs when idle.
 */
import { bus } from './bus';

export type FrameStyle = 'off' | 'glow' | 'pulse' | 'ambient' | 'scan' | 'orbit';

interface Options {
  bar: 'classic' | 'aurora';
  frame: FrameStyle;
}

type RGB = [number, number, number];

// ------------------------------------------------------------------ colours

const parseColor = (value: string): RGB => {
  const c = document.createElement('canvas').getContext('2d');
  if (!c) return [22, 119, 255];
  c.fillStyle = '#1677ff';
  c.fillStyle = value || '#1677ff';
  const hex = String(c.fillStyle);
  if (hex.startsWith('#')) {
    const n = Number.parseInt(hex.slice(1, 7), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = hex.match(/\d+(\.\d+)?/g) || ['22', '119', '255'];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
};

/**
 * The theme's primary colour, or a violet when the primary is a grey (the
 * default Lobe primary is near-white, which would make every effect grey).
 */
const primaryColor = (): RGB => {
  const c = parseColor(getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim());
  return Math.max(...c) - Math.min(...c) < 48 ? [139, 92, 246] : c;
};

/** Hue rotation in YIQ space: close enough for gradients, and cheap. */
const hueShift = ([r, g, b]: RGB, deg: number): RGB => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const m = [
    [0.299 + 0.701 * c + 0.168 * s, 0.587 - 0.587 * c + 0.33 * s, 0.114 - 0.114 * c - 0.497 * s],
    [0.299 - 0.299 * c - 0.328 * s, 0.587 + 0.413 * c + 0.035 * s, 0.114 - 0.114 * c + 0.292 * s],
    [0.299 - 0.3 * c + 1.25 * s, 0.587 - 0.588 * c - 1.05 * s, 0.114 + 0.886 * c - 0.203 * s],
  ];
  return m.map((row) => Math.max(0, Math.min(255, Math.round(row[0] * r + row[1] * g + row[2] * b)))) as RGB;
};

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const fmt = (s?: number) => {
  if (s === undefined || !Number.isFinite(s) || s < 0) return '--:--';
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

// ------------------------------------------------------------------ job state

interface Job {
  done: boolean;
  doneAt: number;
  eta?: number;
  gallery: HTMLElement | null;
  jobCount: number;
  jobNo: number;
  progress: number;
  shown: number;
  step: number;
  steps: number;
  tab: string;
}

const jobs = new Map<string, Job>();

const fetchState = async(job: Job) => {
  try {
    const res = await fetch('/lobe/state');
    if (!res.ok) return;
    const s = await res.json();
    if (s.steps > 0) {
      job.step = Math.min(s.steps, s.step + 1);
      job.steps = s.steps;
      job.jobNo = s.job_no;
      job.jobCount = s.job_count;
    }
  } catch {
    // no step count: the label shows percent and ETA only
  }
};

// ------------------------------------------------------------------ bar label

const LABEL = 'lobe-progress-label';

const updateLabel = (job: Job) => {
  const root: Document | HTMLElement = (window as any).gradioApp?.() || document;
  const scope = root.querySelector(`#tab_${job.tab}`) || root;
  for (const div of scope.querySelectorAll<HTMLElement>('.progressDiv')) {
    let label = div.querySelector<HTMLElement>(`:scope > .${LABEL}`);
    if (!label) {
      label = document.createElement('div');
      label.className = LABEL;
      label.innerHTML = '<span></span><span></span>';
      div.append(label);
    }
    const [left, right] = label.children as unknown as HTMLElement[];
    const batch = job.jobCount > 1 ? ` · ${job.jobNo + 1}/${job.jobCount}` : '';
    left.textContent = job.steps ? `Step ${job.step}/${job.steps}${batch}` : '';
    right.textContent = `${Math.round(job.progress * 100)}% · ETA ${fmt(job.progress > 0 ? job.eta : undefined)}`;
  }
};

// ------------------------------------------------------------------ frame

const MARGIN = 100;

interface Geo {
  d: number;
  h: number;
  n: number;
  pts: [number, number, number, number][];
  r: number;
  total: number;
  w: number;
  x: number;
  y: number;
}

/** Points of a rounded rectangle, clockwise from the top centre, with outward normals. */
const outline = (x: number, y: number, w: number, h: number, r: number, d: number): Geo => {
  const segs: { at: (t: number) => [number, number, number, number]; len: number }[] = [];
  const line = (x0: number, y0: number, x1: number, y1: number, nx: number, ny: number) =>
    segs.push({ at: (t) => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, nx, ny], len: Math.hypot(x1 - x0, y1 - y0) });
  const arc = (cx: number, cy: number, a0: number) =>
    segs.push({
      at: (t) => {
        const a = a0 + (t * Math.PI) / 2;
        return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, Math.cos(a), Math.sin(a)];
      },
      len: (Math.PI / 2) * r,
    });
  line(x + w / 2, y, x + w - r, y, 0, -1);
  arc(x + w - r, y + r, -Math.PI / 2);
  line(x + w, y + r, x + w, y + h - r, 1, 0);
  arc(x + w - r, y + h - r, 0);
  line(x + w - r, y + h, x + r, y + h, 0, 1);
  arc(x + r, y + h - r, Math.PI / 2);
  line(x, y + h - r, x, y + r, -1, 0);
  arc(x + r, y + r, Math.PI);
  line(x + r, y, x + w / 2, y, 0, -1);
  const total = segs.reduce((a, s) => a + s.len, 0);
  const n = 1200;
  const pts: Geo['pts'] = [];
  for (let i = 0; i < n; i++) {
    let left = (i / n) * total;
    for (const s of segs) {
      if (left <= s.len || s === segs.at(-1)) {
        pts.push(s.at(s.len ? Math.min(1, left / s.len) : 0));
        break;
      }
      left -= s.len;
    }
  }
  return { d, h, n, pts, r, total, w, x, y };
};

class Frame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  geo: Geo | null = null;
  key = '';
  raf = 0;
  style: FrameStyle;
  color: RGB = [22, 119, 255];
  job: Job | null = null;
  rings: { t: number }[] = [];
  lastStep = -1;
  sample = document.createElement('canvas');
  /** The preview's edge colours, 10×10: the 8×8 sample with its border pushed out. */
  halo = document.createElement('canvas');
  haloSrc = '';
  /** The finished glow, redrawn only when the preview or the size changes. */
  glow = document.createElement('canvas');
  glowKey = '';
  haloAt = 0;
  last = 0;
  still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  constructor(style: FrameStyle) {
    this.style = style;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'lobe-frame-fx';
    Object.assign(this.canvas.style, { pointerEvents: 'none', position: 'fixed', zIndex: '40' });
    this.ctx = this.canvas.getContext('2d')!;
    this.sample.width = 8;
    this.sample.height = 8;
    this.halo.width = 10;
    this.halo.height = 10;
  }

  start(job: Job) {
    this.job = job;
    this.color = primaryColor();
    this.rings = [];
    this.lastStep = -1;
    if (!this.canvas.isConnected) document.body.append(this.canvas);
    if (!this.raf) this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.canvas.remove();
    this.job = null;
  }

  /** Follow the gallery on screen; rebuild the outline when its size changes. */
  place(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 20 || rect.height < 20) return false;
    const d = window.devicePixelRatio || 1;
    Object.assign(this.canvas.style, {
      height: `${rect.height + MARGIN * 2}px`,
      left: `${rect.left - MARGIN}px`,
      top: `${rect.top - MARGIN}px`,
      width: `${rect.width + MARGIN * 2}px`,
    });
    const radius = Number.parseFloat(getComputedStyle(el).borderTopLeftRadius) || 8;
    const key = `${Math.round(rect.width)}x${Math.round(rect.height)}@${d}r${radius}`;
    if (key !== this.key) {
      this.key = key;
      this.canvas.width = Math.round((rect.width + MARGIN * 2) * d);
      this.canvas.height = Math.round((rect.height + MARGIN * 2) * d);
      this.geo = outline(MARGIN * d, MARGIN * d, rect.width * d, rect.height * d, Math.min(radius, 24) * d, d);
    }
    return true;
  }

  at(u: number) {
    const g = this.geo!;
    return g.pts[Math.floor((((u % 1) + 1) % 1) * g.n)];
  }

  path(off: number) {
    const { x, y, w, h, r } = this.geo!;
    this.ctx.beginPath();
    this.ctx.roundRect(x - off, y - off, w + off * 2, h + off * 2, r + off);
  }

  frame = (now: number) => {
    this.raf = 0;
    const job = this.job;
    if (!job) return;
    if (job.done && now - job.doneAt > 1900) {
      this.stop();
      return;
    }
    // 30 frames a second is plenty for a glow, and leaves the CPU to the WebUI
    if (now - this.last < 32) {
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    this.last = now;
    const target = job.gallery?.isConnected ? job.gallery : null;
    if (target && this.place(target) && this.geo) {
      job.shown += ((job.done ? 1 : job.progress) - job.shown) * 0.08;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.globalAlpha = job.done ? Math.max(0, 1 - (now - job.doneAt) / 1400) : 1;
      const t = this.still ? 0 : now;
      switch (this.style) {
      case 'glow': {
      this.drawGlow(job, t);
      break;
      }
      case 'pulse': {
      this.drawPulse(job, t);
      break;
      }
      case 'ambient': {
      this.drawAmbient(job, target, now);
      break;
      }
      case 'scan': {
      this.drawScan(job);
      break;
      }
      case 'orbit': { {
      this.drawOrbit(job, t);
      // No default
      }
      break;
      }
      }
      ctx.globalAlpha = 1;
      if (job.done && !this.still) this.drawFinish(now - job.doneAt);
    }
    this.raf = requestAnimationFrame(this.frame);
  };

  progressArc(job: Job) {
    if (job.done) return;
    const { d } = this.geo!;
    const ctx = this.ctx;
    const K = 240;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.5 * d;
    for (let k = 0; k < K * job.shown; k++) {
      const [ax, ay] = this.at(k / K);
      const [bx, by] = this.at((k + 1.1) / K);
      ctx.strokeStyle = rgba(hueShift(this.color, (k / K - 0.5) * 60), 0.95);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
    const [hx, hy] = this.at(job.shown);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = rgba(this.color, 1);
    ctx.shadowBlur = 14 * d;
    ctx.beginPath();
    ctx.arc(hx, hy, 3.2 * d, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /** Multi-coloured edge that turns slowly; the done arc bright, the rest faint. */
  drawGlow(job: Job, now: number) {
    const { d } = this.geo!;
    const ctx = this.ctx;
    const spin = now / 1400;
    const K = 160;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (const [width, alpha] of [
      [18 * d, 0.1],
      [8 * d, 0.22],
      [2.5 * d, 0.9],
    ]) {
      ctx.lineWidth = width;
      for (let k = 0; k < K; k++) {
        const u0 = k / K;
        const done = u0 <= job.shown || job.done;
        const col = hueShift(this.color, Math.sin((u0 + spin) * Math.PI * 2) * 80);
        const breathe = 0.75 + 0.25 * Math.sin(now / 500 + u0 * 12);
        ctx.strokeStyle = rgba(col, alpha * (done ? breathe : 0.18));
        const [ax, ay] = this.at(u0);
        const [bx, by] = this.at((k + 1.2) / K);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /** A ring leaves the frame at every finished step; a soft double beat in between. */
  drawPulse(job: Job, now: number) {
    const { d } = this.geo!;
    const ctx = this.ctx;
    const step = job.steps ? job.step : Math.floor(job.progress * 33);
    if (step !== this.lastStep) {
      if (this.lastStep >= 0 && step > this.lastStep) this.rings.push({ t: now });
      this.lastStep = step;
    }
    const ph = (now % 1100) / 1100;
    const beat = Math.exp(-(((ph - 0.08) / 0.05) ** 2)) + 0.6 * Math.exp(-(((ph - 0.28) / 0.05) ** 2));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const k = (now - this.rings[i].t) / 1300;
      if (k > 1 || k < 0) {
        this.rings.splice(i, 1);
        continue;
      }
      const e = 1 - (1 - k) ** 3;
      ctx.strokeStyle = rgba(this.color, (1 - k) * 0.7);
      ctx.lineWidth = (3 - 2 * k) * d;
      this.path(4 * d + e * 42 * d);
      ctx.stroke();
    }
    ctx.shadowColor = rgba(this.color, 0.9);
    ctx.shadowBlur = (10 + beat * 22) * d;
    ctx.strokeStyle = rgba(this.color, 0.35 + beat * 0.5);
    ctx.lineWidth = 2 * d;
    this.path(2 * d);
    ctx.stroke();
    ctx.restore();
    this.progressArc(job);
  }

  /**
   * The preview's own colours glow behind it, like a TV's Ambilight. The
   * preview is sampled to 8×8 when it changes (not every frame); the glow is
   * that tiny picture scaled up, which blurs it for free, with the image area
   * cut out.
   */
  drawAmbient(job: Job, gallery: HTMLElement, now: number) {
    const { d, x, y, w, h, r } = this.geo!;
    const ctx = this.ctx;
    const img = Array.from(gallery.querySelectorAll<HTMLImageElement>('img')).pop();
    if (img?.complete && img.naturalWidth && (img.src !== this.haloSrc || now - this.haloAt > 1000)) {
      this.haloSrc = img.src;
      this.haloAt = now;
      try {
        const sctx = this.sample.getContext('2d', { willReadFrequently: true })!;
        sctx.clearRect(0, 0, 8, 8);
        sctx.drawImage(img, 0, 0, 8, 8);
        const hctx = this.halo.getContext('2d')!;
        hctx.clearRect(0, 0, 10, 10);
        // the border ring of the halo repeats the sample's edge pixels
        hctx.drawImage(this.sample, 0, 0, 8, 8, 1, 1, 8, 8);
        hctx.drawImage(this.sample, 0, 0, 8, 1, 1, 0, 8, 1);
        hctx.drawImage(this.sample, 0, 7, 8, 1, 1, 9, 8, 1);
        hctx.drawImage(this.halo, 1, 0, 1, 10, 0, 0, 1, 10);
        hctx.drawImage(this.halo, 8, 0, 1, 10, 9, 0, 1, 10);
      } catch {
        // a cross-origin image cannot be read: no ambient light, the arc still shows
        this.haloSrc = '';
      }
    }
    if (this.haloSrc) {
      const key = `${this.key}|${this.haloAt}`;
      if (key !== this.glowKey) {
        this.glowKey = key;
        this.glow.width = this.canvas.width;
        this.glow.height = this.canvas.height;
        const g = this.glow.getContext('2d')!;
        const reach = 30 * d;
        const cw = (w + reach * 2) / 10;
        const ch = (h + reach * 2) / 10;
        g.filter = `blur(${18 * d}px)`;
        g.imageSmoothingEnabled = true;
        g.imageSmoothingQuality = 'high';
        g.drawImage(this.halo, x - reach - cw * 0.5, y - reach - ch * 0.5, w + reach * 2 + cw, h + reach * 2 + ch);
        g.filter = 'none';
        g.globalCompositeOperation = 'destination-out';
        g.beginPath();
        g.roundRect(x, y, w, h, r);
        g.fill();
      }
      ctx.save();
      ctx.globalAlpha *= 0.35 + 0.6 * job.shown;
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(this.glow, 0, 0);
      ctx.restore();
    }
    this.progressArc(job);
  }

  /** A bright line sweeping down with the progress. */
  drawScan(job: Job) {
    const { d, x, y, w, h } = this.geo!;
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = rgba(this.color, 0.5);
    ctx.lineWidth = 1.5 * d;
    this.path(1 * d);
    ctx.stroke();
    ctx.restore();
    if (job.done) return;
    const ly = y + job.shown * h;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, this.geo!.r);
    ctx.clip();
    ctx.fillStyle = 'rgba(8,8,12,0.4)';
    ctx.fillRect(x, ly, w, y + h - ly);
    const g = ctx.createLinearGradient(0, ly - 40 * d, 0, ly);
    g.addColorStop(0, rgba(this.color, 0));
    g.addColorStop(1, rgba(this.color, 0.35));
    ctx.fillStyle = g;
    ctx.fillRect(x, ly - 40 * d, w, 40 * d);
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = rgba(this.color, 1);
    ctx.shadowBlur = 16 * d;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(x, ly - d, w, 2 * d);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = rgba(this.color, Math.random());
      ctx.fillRect(x + Math.random() * w, ly - 1.5 * d, 12 * d * Math.random(), 3 * d);
    }
    ctx.restore();
  }

  /** Glowing motes circling the frame; one more for every eighth of the job. */
  drawOrbit(job: Job, now: number) {
    const { d } = this.geo!;
    const ctx = this.ctx;
    const n = 1 + Math.floor(job.shown * 8);
    const trail = 26;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let m = 0; m < n; m++) {
      const base = now / 5200 + m / n;
      const col = hueShift(this.color, (m / 8 - 0.5) * 90);
      for (let k = 0; k < trail; k++) {
        const [px, py, nx, ny] = this.at(base - k * 0.0022);
        const a = 1 - k / trail;
        ctx.fillStyle = rgba(k === 0 ? [255, 255, 255] : col, a * 0.9);
        ctx.beginPath();
        ctx.arc(px + nx * 3 * d, py + ny * 3 * d, (k === 0 ? 3.2 : 2.4 * a + 0.4) * d, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    this.progressArc(job);
  }

  /** Done: a ripple of light runs once round the frame. */
  drawFinish(ms: number) {
    const t = ms / 1400;
    if (t > 1) return;
    const { d } = this.geo!;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 90; k++) {
      const [px, py, nx, ny] = this.at(t + k / 900);
      const a = (1 - t) * (1 - k / 90);
      ctx.fillStyle = `rgba(255,255,255,${a * 0.8})`;
      ctx.beginPath();
      ctx.arc(px + nx * 6 * d, py + ny * 6 * d, 3 * d * (1 - k / 90) + d, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// ------------------------------------------------------------------ wiring

export const startProgressFx = ({ bar, frame: frameStyle }: Options) => {
  document.body.classList.toggle('lobe-bar-aurora', bar === 'aurora');
  if (bar === 'aurora') {
    // the Aurora gradient runs from the primary colour to its neighbours
    const c = primaryColor();
    const hex = (x: RGB) => '#' + x.map((v) => v.toString(16).padStart(2, '0')).join('');
    document.documentElement.style.setProperty('--lobe-aurora-0', hex(c));
    document.documentElement.style.setProperty('--lobe-aurora-1', hex(hueShift(c, -40)));
    document.documentElement.style.setProperty('--lobe-aurora-2', hex(hueShift(c, 45)));
  }
  const frame = frameStyle === 'off' ? null : new Frame(frameStyle);
  let polling = 0;

  const offStart = bus.on('gen:start', ({ id, tab, gallery }) => {
    const job: Job = { done: false, doneAt: 0, gallery: gallery || null, jobCount: 0, jobNo: 0, progress: 0, shown: 0, step: 0, steps: 0, tab: String(tab) };
    jobs.set(id, job);
    if (frame && job.gallery) frame.start(job);
  });

  const offProgress = bus.on('gen:progress', ({ id, info }) => {
    const job = jobs.get(id);
    if (!job) return;
    job.progress = Math.max(0, Math.min(1, info.progress));
    job.eta = info.eta;
    if (!polling) {
      polling = 1;
      fetchState(job).finally(() => {
        polling = 0;
        if (bar === 'aurora') updateLabel(job);
      });
    }
    if (bar === 'aurora') updateLabel(job);
  });

  const offEnd = bus.on('gen:end', ({ id }) => {
    const job = jobs.get(id);
    if (!job) return;
    job.done = true;
    job.doneAt = performance.now();
    jobs.delete(id);
  });

  return () => {
    offStart();
    offProgress();
    offEnd();
    frame?.stop();
    document.body.classList.remove('lobe-bar-aurora');
  };
};
