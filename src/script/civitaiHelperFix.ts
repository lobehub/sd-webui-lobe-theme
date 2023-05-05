const TAB_PREFIX_LIST = ['txt2img', 'img2img']
const MODEL_TYPE_LIST: ['textual_inversion', 'hypernetworks', 'checkpoints', 'lora'] = [
  'textual_inversion',
  'hypernetworks',
  'checkpoints',
  'lora',
]
const MODEL_TYPE = {
  textual_inversion: 'ti',
  hypernetworks: 'hyper',
  checkpoints: 'ckp',
  lora: 'lora',
}
const CARDID_SUFFIX = 'cards'

// CSS
const BTN_MARGIN = '0'
const BTN_FONT_SIZE = '15px'
const BTN_THUMB_FONT_SIZE = '100%'
const BTN_THUMB_DISPLAY = 'inline'
const BTN_THUMB_POS = 'static'
const BTN_THUMB_BACKGROUND_IMAGE = 'none'
const BTN_THUMB_BACKGROUND = 'rgba(0, 0, 0, 0.8)'
const CH_BTN_TXTS = ['🌐', '💡', '🏷️']

const styleBtn = (node: HTMLElement, isThumbMode: boolean) => {
  if (!isThumbMode) {
    node.style.fontSize = BTN_FONT_SIZE
    node.style.margin = BTN_MARGIN
  } else {
    node.style.display = BTN_THUMB_DISPLAY
    node.style.fontSize = BTN_THUMB_FONT_SIZE
    node.style.position = BTN_THUMB_POS
    node.style.backgroundImage = BTN_THUMB_BACKGROUND_IMAGE
  }
}

const updateCardForCivitai = () => {
  if (!gradioApp().querySelector('#tab_civitai_helper')) return

  const replacePreviewText = getTranslation('replace preview') || 'replace preview'

  // Get component
  const chAlwaysDisplayCkb = gradioApp().querySelector('#ch_always_display_ckb input') as HTMLInputElement
  const chShowBtnOnThumbCkb = gradioApp().querySelector('#ch_show_btn_on_thumb_ckb input') as HTMLInputElement
  const chAlwaysDisplay = chAlwaysDisplayCkb?.checked || false
  const chShowBtnOnThumb = chShowBtnOnThumbCkb?.checked || false

  // Change all "replace preview" into an icon
  let extraNetworkId = ''
  let extraNetworkNode: any = null
  let metadataButton: any = null
  let additionalNode: any = null
  let replacePreviewBtn: any = null
  let ulNode: any = null
  let searchTermNode: any = null
  let searchTerm = ''
  let modelType = ''
  let cards = null
  let needToAddButtons = false
  let isThumbMode = false

  // Get current tab
  TAB_PREFIX_LIST.forEach((activeTabType) => {
    MODEL_TYPE_LIST.forEach((jsModelType) => {
      modelType = MODEL_TYPE[jsModelType]
      // Get model_type for python side

      extraNetworkId = `${activeTabType}_${jsModelType}_${CARDID_SUFFIX}`
      extraNetworkNode = gradioApp().getElementById(extraNetworkId)
      // Check if extr network is under thumbnail mode
      isThumbMode = false
      if (extraNetworkNode?.className === 'extra-network-thumbs') isThumbMode = true

      // Get all card nodes
      cards = extraNetworkNode.querySelectorAll('.card')
      for (const card of cards) {
        if (card.querySelectorAll('.actions .additional a').length > 2) return
        // Metadata_buttoncard
        metadataButton = card.querySelector('.metadata-button')
        // Additional node
        additionalNode = card.querySelector('.actions .additional')
        // Get ul node, which is the parent of all buttons
        ulNode = card.querySelector('.actions .additional ul')
        // Replace preview text button
        replacePreviewBtn = card.querySelector('.actions .additional a')

        // Check thumb mode
        if (isThumbMode && additionalNode) {
          additionalNode.style.display = null

          if (chShowBtnOnThumb) {
            ulNode.style.background = BTN_THUMB_BACKGROUND
          } else {
            // Reset
            ulNode.style.background = null
            // Remove existed buttons
            if (ulNode) {
              // Find all .a child nodes
              const atags = ulNode.querySelectorAll('a')

              for (const atag of atags) {
                // Reset display
                atag.style.display = null
                // Remove extension's button
                if (CH_BTN_TXTS.indexOf(atag.innerHTML) >= 0) {
                  // Need to remove
                  ulNode.removeChild(atag)
                } else {
                  // Do not remove, just reset
                  atag.innerHTML = replacePreviewText
                  atag.style.display = null
                  atag.style.fontSize = null
                  atag.style.position = null
                  atag.style.backgroundImage = null
                }
              }

              // Also remove br tag in ul
              const brtag = ulNode.querySelector('br')
              if (brtag) ulNode.removeChild(brtag)
            }
            // Just reset and remove nodes, do nothing else
            return
          }
        } else {
          // Full preview mode
          additionalNode.style.display = chAlwaysDisplay ? 'block' : null

          // Remove br tag
          const brtag = ulNode.querySelector('br')
          if (brtag) ulNode.removeChild(brtag)
        }

        // Change replace preview text button into icon
        if (replacePreviewBtn?.innerHTML !== '🖼️') {
          needToAddButtons = true
          replacePreviewBtn.innerHTML = '🖼️'
          styleBtn(replacePreviewBtn, isThumbMode)
        }

        if (!needToAddButtons) return
        // Search_term node
        // Search_term = subfolder path + model name + ext
        searchTermNode = card.querySelector('.actions .additional .search_term')
        if (!searchTermNode) return
        // Get search_term
        searchTerm = searchTermNode.innerHTML
        if (!searchTerm) return

        // Then we need to add 3 buttons to each ul node:
        const openUrlNode = document.createElement('a')
        openUrlNode.href = '#'
        openUrlNode.innerHTML = '🌐'
        styleBtn(openUrlNode, isThumbMode)
        openUrlNode.title = "Open this model's civitai url"
        openUrlNode.setAttribute('onclick', `open_model_url(event, '${modelType}', '${searchTerm}')`)

        const addTriggerWordsNode = document.createElement('a')
        addTriggerWordsNode.href = '#'
        addTriggerWordsNode.innerHTML = '💡'
        styleBtn(addTriggerWordsNode, isThumbMode)
        addTriggerWordsNode.title = 'Add trigger words to prompt'
        addTriggerWordsNode.setAttribute('onclick', `add_trigger_words(event, '${modelType}', '${searchTerm}')`)

        const usePreviewPromptNode = document.createElement('a')
        usePreviewPromptNode.href = '#'
        usePreviewPromptNode.innerHTML = '🏷️'
        styleBtn(usePreviewPromptNode, isThumbMode)
        usePreviewPromptNode.title = 'Use prompt from preview image'
        usePreviewPromptNode.setAttribute('onclick', `use_preview_prompt(event, '${modelType}', '${searchTerm}')`)

        // Add to card
        ulNode.appendChild(openUrlNode)
        // Add br if metadata_button exists
        if (isThumbMode && metadataButton) ulNode.appendChild(document.createElement('br'))
        ulNode.appendChild(addTriggerWordsNode)
        ulNode.appendChild(usePreviewPromptNode)
      }
    })
  })
}

export default updateCardForCivitai
