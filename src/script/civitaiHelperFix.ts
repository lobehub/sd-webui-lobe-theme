const TAB_PREFIX_LIST = ['txt2img', 'img2img'];
const MODEL_TYPE_LIST: ['textual_inversion', 'hypernetworks', 'checkpoints', 'lora', 'lycoris'] = [
  'textual_inversion',
  'hypernetworks',
  'checkpoints',
  'lora',
  'lycoris',
];
const MODEL_TYPE = {
  checkpoints: 'ckp',
  hypernetworks: 'hyper',
  lora: 'lora',
  lycoris: 'lycoris',
  textual_inversion: 'ti',
};
const CARDID_SUFFIX = 'cards';

// CSS
const BTN_MARGIN = '0';
const BTN_FONT_SIZE = '15px';
const BTN_THUMB_FONT_SIZE = '100%';
const BTN_THUMB_DISPLAY = 'inline';
const BTN_THUMB_POS = 'static';
const BTN_THUMB_BACKGROUND_IMAGE = 'none';
const BTN_THUMB_BACKGROUND = 'rgba(0, 0, 0, 0.8)';
const CH_BTN_TXTS = new Set(['🌐', '💡', '🏷️']);

const styleButton = (node: HTMLElement, isThumbMode: boolean) => {
  if (isThumbMode) {
    node.style.display = BTN_THUMB_DISPLAY;
    node.style.fontSize = BTN_THUMB_FONT_SIZE;
    node.style.position = BTN_THUMB_POS;
    node.style.backgroundImage = BTN_THUMB_BACKGROUND_IMAGE;
  } else {
    node.style.fontSize = BTN_FONT_SIZE;
    node.style.margin = BTN_MARGIN;
  }
};

const updateCardForCivitai = () => {
  if (!document.querySelector('#tab_civitai_helper')) return;

  const replacePreviewText = getTranslation('replace preview') || 'replace preview';

  // Get component
  const chAlwaysDisplayCkb = document.querySelector(
    '#ch_always_display_ckb input',
  ) as HTMLInputElement;
  const chShowButtonOnThumbCkb = document.querySelector(
    '#ch_show_btn_on_thumb_ckb input',
  ) as HTMLInputElement;
  const chAlwaysDisplay = chAlwaysDisplayCkb?.checked || false;
  const chShowButtonOnThumb = chShowButtonOnThumbCkb?.checked || false;

  // Change all "replace preview" into an icon
  let extraNetworkId = '';
  let extraNetworkNode: any;
  let metadataButton: any;
  let additionalNode: any;
  let replacePreviewButton: any;
  let ulNode: any;
  let searchTermNode: any;
  let searchTerm = '';
  let modelType = '';
  let cards;
  let needToAddButtons = false;
  let isThumbMode = false;

  // Get current tab
  for (const activeTabType of TAB_PREFIX_LIST) {
    for (const jsModelType of MODEL_TYPE_LIST) {
      modelType = MODEL_TYPE[jsModelType];
      // Get model_type for python side

      extraNetworkId = `${activeTabType}_${jsModelType}_${CARDID_SUFFIX}`;
      extraNetworkNode = document.querySelector(`#${extraNetworkId}`);

      // Check if extra network node exists
      if (extraNetworkNode === undefined) continue;

      // Check if extr network is under thumbnail mode
      isThumbMode = false;
      if (extraNetworkNode?.className === 'extra-network-thumbs') isThumbMode = true;

      // Get all card nodes
      cards = extraNetworkNode?.querySelectorAll('.card');
      if (!cards) continue;
      for (const card of cards) {
        if (card.querySelectorAll('.actions .additional a').length > 2) continue;
        // Metadata_buttoncard
        metadataButton = card.querySelector('.metadata-button');
        // Additional node
        additionalNode = card.querySelector('.actions .additional');
        
        // Get ul node, which is the parent of all buttons
        ulNode = card.querySelector('.actions .additional ul');
        if (ulNode == null) { 
          ulNode = document.createElement("ul"); 
          additionalNode.appendChild(ulNode); 
        }

        // Replace preview text button
        replacePreviewButton = card.querySelector('.actions .additional a');
        if (replacePreviewButton == null) { 
          replacePreviewButton = document.createElement("a"); 
          additionalNode.appendChild(replacePreviewButton); 
        }

        // Check thumb mode
        if (isThumbMode && additionalNode) {
          additionalNode.style.display = undefined;

          if (chShowButtonOnThumb) {
            ulNode.style.background = BTN_THUMB_BACKGROUND;
          } else {
            // Reset
            ulNode.style.background = undefined;
            // Remove existed buttons
            if (ulNode) {
              // Find all .a child nodes
              const atags = ulNode?.querySelectorAll('a');
              if (!atags) continue;
              for (const atag of atags) {
                // Reset display
                atag.style.display = undefined;
                // Remove extension's button
                if (CH_BTN_TXTS.has(atag.innerHTML)) {
                  // Need to remove
                  atag.remove();
                } else {
                  // Do not remove, just reset
                  atag.innerHTML = replacePreviewText;
                  atag.style.display = undefined;
                  atag.style.fontSize = undefined;
                  atag.style.position = undefined;
                  atag.style.backgroundImage = undefined;
                }
              }

              // Also remove br tag in ul
              const brtag = ulNode.querySelector('br');
              if (brtag) brtag.remove();
            }
            // Just reset and remove nodes, do nothing else
            continue;
          }
        } else {
          // Full preview mode
          additionalNode.style.display = chAlwaysDisplay ? 'block' : undefined;

          // Remove br tag
          const brtag = ulNode.querySelector('br');
          if (brtag) brtag.remove();
        }

        // Change replace preview text button into icon
        if (replacePreviewButton?.innerHTML !== '🖼️') {
          needToAddButtons = true;
          replacePreviewButton.innerHTML = '🖼️';
          styleButton(replacePreviewButton, isThumbMode);
        }

        if (!needToAddButtons) continue;
        // Search_term node
        // Search_term = subfolder path + model name + ext
        searchTermNode = card.querySelector('.actions .additional .search_term');
        if (!searchTermNode) return;
        // Get search_term
        searchTerm = searchTermNode.innerHTML;
        if (!searchTerm) continue;

        // Then we need to add 3 buttons to each ul node:
        const openUrlNode = document.createElement('a');
        openUrlNode.href = '#';
        openUrlNode.innerHTML = '🌐';
        styleButton(openUrlNode, isThumbMode);
        openUrlNode.title = "Open this model's civitai url";
        openUrlNode.setAttribute(
          'onclick',
          `open_model_url(event, '${modelType}', '${searchTerm}')`,
        );

        const addTriggerWordsNode = document.createElement('a');
        addTriggerWordsNode.href = '#';
        addTriggerWordsNode.innerHTML = '💡';
        styleButton(addTriggerWordsNode, isThumbMode);
        addTriggerWordsNode.title = 'Add trigger words to prompt';
        addTriggerWordsNode.setAttribute(
          'onclick',
          `add_trigger_words(event, '${modelType}', '${searchTerm}')`,
        );

        const usePreviewPromptNode = document.createElement('a');
        usePreviewPromptNode.href = '#';
        usePreviewPromptNode.innerHTML = '🏷️';
        styleButton(usePreviewPromptNode, isThumbMode);
        usePreviewPromptNode.title = 'Use prompt from preview image';
        usePreviewPromptNode.setAttribute(
          'onclick',
          `use_preview_prompt(event, '${modelType}', '${searchTerm}')`,
        );

        // Add to card
        ulNode.append(openUrlNode);
        // Add br if metadata_button exists
        if (isThumbMode && metadataButton) ulNode.append(document.createElement('br'));
        ulNode.append(addTriggerWordsNode);
        ulNode.append(usePreviewPromptNode);
      }
    }
  }
};

export default () => {
  let retryTimes = 0;
  const fixInterval = setInterval(() => {
    console.debug('🤯 [civitai helper] update card for civitai');
    const checkDom = document.querySelector('#txt2img_lora_cards');
    if (checkDom || retryTimes > 10) {
      updateCardForCivitai();
      clearInterval(fixInterval);
    }
    retryTimes++;
  }, 1000);
};
