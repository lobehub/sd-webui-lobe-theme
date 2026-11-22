/**
 * Lobehub Theme - LoRA Trigger Words Copy Integration
 * Compact, lightweight copy button for LoRA activation tags in sidebar cards.
 */

(function () {
    'use strict';

    let loraTagsCache = {};
    let isFetching = false;
    let toastTimeout = null;

    function getRoot() {
        return typeof gradioApp === 'function' ? gradioApp() : document;
    }

    function copyText(text) {
        if (!text) return Promise.resolve(false);
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
        }
        return Promise.resolve(fallbackCopy(text));
    }

    function fallbackCopy(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const success = document.execCommand('copy');
            document.body.removeChild(ta);
            return success;
        } catch (e) {
            console.error('[Lobe Theme] Copy failed:', e);
            return false;
        }
    }

    function showToast(message, isSuccess = true) {
        let toast = document.getElementById('lobe-lora-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'lobe-lora-toast';
            document.body.appendChild(toast);
        }

        toast.className = isSuccess ? 'lobe-lora-toast success' : 'lobe-lora-toast warning';
        toast.innerHTML = message;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 1800);
    }

    function insertIntoPrompt(tag) {
        const root = getRoot();
        const isImg2Img = (document.querySelector('#tab_img2img') &&
            getComputedStyle(document.querySelector('#tab_img2img')).display !== 'none');
        const tab = isImg2Img ? 'img2img' : 'txt2img';

        const textarea = root.querySelector(`#${tab}_prompt label textarea`) ||
                         root.querySelector(`#${tab}_prompt textarea`);
        if (!textarea) return;

        let val = textarea.value;
        if (val.length > 0 && !val.trim().endsWith(',')) {
            val = val.trimEnd() + ', ';
        } else if (val.length > 0) {
            val = val.trimEnd() + ' ';
        }
        textarea.value = val + tag;

        if (typeof updateInput === 'function') {
            updateInput(textarea);
        } else {
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            textarea.dispatchEvent(new Event('change', { bubbles: true }));
        }
        showToast(`✨ Added to prompt: <b>${escapeHtml(tag)}</b>`);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    async function loadLoraTags(force = false) {
        if (isFetching) return;
        isFetching = true;
        try {
            const url = force ? '/lobe/lora-tags?force=true' : '/lobe/lora-tags';
            const res = await fetch(url);
            if (res.ok) {
                loraTagsCache = await res.json();
            }
        } catch (err) {
            console.warn('[Lobe Theme] Could not fetch /lobe/lora-tags:', err);
        } finally {
            isFetching = false;
            enhanceAllCards();
        }
    }

    function getTagsForName(rawName) {
        if (!rawName) return [];
        const clean = rawName.trim().replace(/\\/g, '/');
        const base = clean.split('/').pop();

        if (loraTagsCache[clean]?.tags?.length) return loraTagsCache[clean].tags;
        if (loraTagsCache[clean.toLowerCase()]?.tags?.length) return loraTagsCache[clean.toLowerCase()].tags;
        if (loraTagsCache[base]?.tags?.length) return loraTagsCache[base].tags;
        if (loraTagsCache[base.toLowerCase()]?.tags?.length) return loraTagsCache[base.toLowerCase()].tags;

        return [];
    }

    function enhanceCard(card) {
        // Remove any previous tag badges container to keep card completely clean
        const existingTagsContainer = card.querySelector('.lobe-lora-tags-container');
        if (existingTagsContainer) {
            existingTagsContainer.remove();
        }

        if (card.dataset.lobeTriggerEnhanced) return;

        const name = card.getAttribute('data-name') || card.dataset.name;
        if (!name) return;

        const tags = getTagsForName(name);
        const buttonRow = card.querySelector('.button-row');

        // Add Copy Tag button to .button-row
        if (buttonRow && !buttonRow.querySelector('.lobe-lora-copy-btn')) {
            const copyBtn = document.createElement('div');
            copyBtn.className = 'card-button lobe-lora-copy-btn';
            
            if (tags.length > 0) {
                const tagStr = tags.join(', ');
                copyBtn.title = tagStr;
                copyBtn.innerHTML = '🏷️';

                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (e.shiftKey || e.altKey) {
                        insertIntoPrompt(tagStr);
                    } else {
                        copyText(tagStr).then(() => {
                            showToast(`🏷️ Copied: <b>${escapeHtml(tagStr)}</b>`);
                            const orig = copyBtn.innerHTML;
                            copyBtn.innerHTML = '✅';
                            setTimeout(() => { copyBtn.innerHTML = orig; }, 1000);
                        });
                    }
                });
            } else {
                copyBtn.title = 'No trigger tag available';
                copyBtn.innerHTML = '🏷️';
                copyBtn.style.opacity = '0.45';

                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    copyText(name).then(() => {
                        showToast(`📋 Copied name: <b>${escapeHtml(name)}</b>`);
                    });
                });
            }

            const copyPathBtn = buttonRow.querySelector('.copy-path-button');
            if (copyPathBtn && copyPathBtn.nextSibling) {
                buttonRow.insertBefore(copyBtn, copyPathBtn.nextSibling);
            } else {
                buttonRow.appendChild(copyBtn);
            }
        }

        card.dataset.lobeTriggerEnhanced = '1';
    }

    function enhanceAllCards() {
        const root = getRoot();
        const selector = [
            '#txt2img_lora_cards .card',
            '#img2img_lora_cards .card',
            '#txt2img_lycoris_cards .card',
            '#img2img_lycoris_cards .card',
            'div[id*="_extra_tabs"] div[id*="_lora_cards"] .card',
            'div[id*="_extra_tabs"] div[id*="_lycoris_cards"] .card'
        ].join(', ');

        const cards = root.querySelectorAll(selector);
        for (let i = 0; i < cards.length; i++) {
            enhanceCard(cards[i]);
        }
    }

    function init() {
        injectStyles();
        loadLoraTags();

        const observer = new MutationObserver(() => {
            enhanceAllCards();
        });

        const root = getRoot();
        observer.observe(root, { childList: true, subtree: true });

        const refreshBtns = root.querySelectorAll('#txt2img_extra_refresh, #img2img_extra_refresh, button[id$="_extra_refresh"]');
        refreshBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                setTimeout(() => loadLoraTags(true), 600);
            });
        });
    }

    function injectStyles() {
        if (document.getElementById('lobe-lora-trigger-styles')) return;

        const style = document.createElement('style');
        style.id = 'lobe-lora-trigger-styles';
        style.textContent = `
            .button-row .lobe-lora-copy-btn {
                cursor: pointer;
                transition: transform 0.15s ease, opacity 0.15s ease;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                user-select: none;
            }
            .button-row .lobe-lora-copy-btn:hover {
                transform: scale(1.18);
                opacity: 1 !important;
            }
            .button-row .lobe-lora-copy-btn:active {
                transform: scale(0.9);
            }

            #lobe-lora-toast {
                position: fixed;
                bottom: 24px;
                right: 24px;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 13px;
                color: #ffffff;
                background: rgba(20, 20, 20, 0.92);
                border: 1px solid rgba(255, 255, 255, 0.15);
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
                backdrop-filter: blur(12px);
                z-index: 999999;
                opacity: 0;
                transform: translateY(10px) scale(0.96);
                pointer-events: none;
                transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #lobe-lora-toast.show {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            #lobe-lora-toast.success {
                border-left: 3px solid #1677ff;
            }
            #lobe-lora-toast.warning {
                border-left: 3px solid #faad14;
            }
        `;
        document.head.appendChild(style);
    }

    if (typeof onUiLoaded === 'function') {
        onUiLoaded(init);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(init, 500);
    }
})();
