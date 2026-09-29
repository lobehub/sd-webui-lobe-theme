import{a as e,Z as t,G as l,B as s}from"./main-DXPH3X3C.js";const r=s(({css:e,token:t})=>({bar:e`
    position: relative;

    overflow: hidden;

    height: 18px;

    background: ${t.colorFillTertiary};
    border-radius: ${t.borderRadiusSM}px;
  `,card:e`
    display: flex;
    flex-direction: column;
    gap: 6px;

    padding: 10px 12px;

    font-size: 12px;
    font-variant-numeric: tabular-nums;

    background: ${t.colorFillQuaternary};
    border: 1px solid ${t.colorBorderSecondary};
    border-radius: ${t.borderRadiusLG}px;
  `,fill:e`
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    transition: width 600ms ${t.motionEaseOut}, background 600ms;
  `,head:e`
    display: flex;
    gap: 8px;
    align-items: baseline;
    justify-content: space-between;

    margin-block-end: 2px;

    color: ${t.colorTextSecondary};
  `,label:e`
    width: 38px;
    color: ${t.colorTextSecondary};
  `,name:e`
    overflow: hidden;
    color: ${t.colorTextTertiary};
    text-overflow: ellipsis;
    white-space: nowrap;
  `,row:e`
    display: grid;
    grid-template-columns: 38px 1fr;
    gap: 8px;
    align-items: center;
  `,spark:e`
    display: block;
    width: 100%;
    height: 34px;
  `,text:e`
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    padding-inline: 6px;

    color: ${t.colorText};
    text-shadow: 0 0 3px ${t.colorBgContainer};
  `,title:e`
    font-weight: 600;
    color: ${t.colorText};
  `})),o=e=>(e/1024**3).toFixed(e>=100*1024**3?0:1),a=e.memo(({label:e,percent:t,text:s})=>{const{styles:o,theme:a}=r(),i=Math.max(0,Math.min(100,t??0)),n=i>=90?a.colorError:i>=70?a.colorWarning:a.colorPrimary;return l.jsxs("div",{className:o.row,children:[l.jsx("span",{className:o.label,children:e}),l.jsxs("div",{className:o.bar,title:`${e}: ${s}`,children:[l.jsx("div",{className:o.fill,style:{background:n,opacity:.55,width:`${i}%`}}),l.jsx("span",{className:o.text,children:s})]})]})}),i=e.memo(({series:e})=>{const{styles:t}=r();return l.jsx("svg",{className:t.spark,preserveAspectRatio:"none",viewBox:"0 0 100 30",children:e.map(({color:e,values:t},s)=>{if(t.length<2)return null;const r=100/47,o=(48-t.length)*r,a=t.map((e,t)=>`${(o+t*r).toFixed(2)},${(30-e/100*28-1).toFixed(2)}`);return l.jsxs("g",{children:[l.jsx("polyline",{fill:e,fillOpacity:.12,points:`${a[0].split(",")[0]},30 ${a.join(" ")} 100,30`,stroke:"none"}),l.jsx("polyline",{fill:"none",points:a.join(" "),stroke:e,strokeWidth:1.2,vectorEffect:"non-scaling-stroke"})]},s)})})}),n=e.memo(()=>{const{styles:s,theme:n}=r(),{t:c}=t(),[u,p]=e.useState(null),[d,m]=e.useState(!1),x=e.useRef({cpu:[],gpu:[],ram:[],vram:[]});if(e.useEffect(()=>{let e,t=!1;const l=(e,t)=>{null!=t&&(e.push(t),e.length>48&&e.shift())},s=async()=>{if("visible"===document.visibilityState)try{const e=await fetch("/lobe/system");if(!e.ok)throw new Error(String(e.status));const s=await e.json();if(t)return;const r=s.gpus[0];l(x.current.cpu,s.cpu),l(x.current.ram,s.ram?s.ram.used/s.ram.total*100:null),l(x.current.gpu,r?.util),l(x.current.vram,r?r.vram_used/r.vram_total*100:null),p(s),m(!1)}catch{t||m(!0)}t||(e=window.setTimeout(s,1500))};return s(),()=>{t=!0,window.clearTimeout(e)}},[]),d&&!u)return null;if(!u)return null;const h=x.current;return l.jsxs("div",{className:s.card,children:[l.jsxs("div",{className:s.head,children:[l.jsx("span",{className:s.title,children:c("sidebar.system.title")}),u.gpus[0]&&l.jsx("span",{className:s.name,children:u.gpus[0].name.replace(/^nvidia\s+/i,"")})]}),l.jsx(i,{series:u.gpus.length>0?[{color:n.colorTextTertiary,values:h.cpu},{color:n.colorSuccess,values:h.vram},{color:n.colorPrimary,values:h.gpu}]:[{color:n.colorSuccess,values:h.ram},{color:n.colorPrimary,values:h.cpu}]}),null!==u.cpu&&l.jsx(a,{label:"CPU",percent:u.cpu,text:`${Math.round(u.cpu)}%`}),u.ram&&l.jsx(a,{label:"RAM",percent:u.ram.used/u.ram.total*100,text:`${o(u.ram.used)} / ${o(u.ram.total)} GB`}),u.gpus.map((e,t)=>l.jsxs("div",{style:{display:"contents"},children:[null!==e.util&&l.jsx(a,{label:u.gpus.length>1?`GPU${t}`:"GPU",percent:e.util,text:`${e.util}%`}),l.jsx(a,{label:"VRAM",percent:e.vram_used/e.vram_total*100,text:`${o(e.vram_used)} / ${o(e.vram_total)} GB`}),(null!==e.temp||null!==e.power)&&l.jsx(a,{label:null!==e.temp?c("sidebar.system.temp"):"PWR",percent:null!==e.temp?e.temp:e.power_limit?(e.power||0)/e.power_limit*100:null,text:[null!==e.temp?`${e.temp}°C`:"",null!==e.power?`${Math.round(e.power)} W`:""].filter(Boolean).join(" · ")})]},t)),u.disk&&l.jsx(a,{label:c("sidebar.system.disk"),percent:u.disk.used/u.disk.total*100,text:`${o(u.disk.used)} / ${o(u.disk.total)} GB`}),!u.nvml&&u.gpus.length>0&&l.jsx("span",{className:s.name,title:c("sidebar.system.noNvmlHint"),children:c("sidebar.system.noNvml")})]})});export{n as default};
