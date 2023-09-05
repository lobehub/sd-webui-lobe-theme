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

type IStrictNullable<T> = T | null;
type INullable<T> = T | null | undefined;

function is_nullable<T>(v: INullable<T>): v is null | undefined {
  return v === undefined || v === null
}

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
  let extraNetworkNode: IStrictNullable<HTMLElement>;
  let metadataButton: IStrictNullable<HTMLElement>;
  let additionalNode: HTMLElement;
  let replacePreviewButton: IStrictNullable<HTMLElement>;
  let ulNode: IStrictNullable<HTMLElement>;
  let searchTermNode: IStrictNullable<HTMLElement>;
  let searchTerm = '';
  let modelType = '';
  let cards: INullable<NodeListOf<HTMLElement>>;
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
      if (is_nullable(extraNetworkNode)) continue;

      // Check if extr network is under thumbnail mode
      isThumbMode = extraNetworkNode.className === 'extra-network-thumbs';

      // Get all card nodes
      cards = extraNetworkNode.querySelectorAll('.card');
      if (!cards?.length) continue;
      for (const card of cards) {
        if (card.querySelectorAll('.actions .additional a').length > 2) continue;
        // Metadata_buttoncard
        metadataButton = card.querySelector('.metadata-button');
        // Additional node
        additionalNode = card.querySelector('.actions .additional')!;

        // Get ul node, which is the parent of all buttons
        ulNode = card.querySelector('.actions .additional ul');
        if (is_nullable(ulNode)) {
          ulNode = document.createElement('ul');
          additionalNode.append(ulNode);
        }

        // Replace preview text button
        replacePreviewButton = card.querySelector('.actions .additional a');
        if (is_nullable(replacePreviewButton)) {
          replacePreviewButton = document.createElement('a');
          additionalNode.append(replacePreviewButton);
        }

        // Remove br tag
        ulNode.querySelector('br')?.remove();

        // Check thumb mode
        if (isThumbMode && additionalNode) {
          additionalNode.style.display = undefined as any as string;

          if (chShowButtonOnThumb) {
            ulNode.style.background = BTN_THUMB_BACKGROUND;
          } else {
            // Reset
            ulNode.style.background = undefined as any as string;
            // Remove existed buttons

            // Find all .a child nodes
            const atags = ulNode.querySelectorAll('a');
            if (!atags?.length) continue;
            for (const atag of atags) {
              // Reset display
              atag.style.display = undefined as any;
              // Remove extension's button
              if (CH_BTN_TXTS.has(atag.innerHTML)) {
                // Need to remove
                atag.remove();
              } else {
                // Do not remove, just reset
                atag.innerHTML = replacePreviewText;
                atag.style.display = undefined as any;
                atag.style.fontSize = undefined as any;
                atag.style.position = undefined as any;
                atag.style.backgroundImage = undefined as any;
              }
            }

            // Just reset and remove nodes, do nothing else
            continue;
          }
        } else {
          // Full preview mode
          additionalNode.style.display = chAlwaysDisplay ? 'block' : undefined as any as string;
        }

        // Change replace preview text button into icon
        if (replacePreviewButton.innerHTML !== '🖼️') {
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
