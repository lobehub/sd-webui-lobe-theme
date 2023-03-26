class BracketChecker {
  constructor(textArea, counterElt) {
    this.textArea = textArea;
    this.counterElt = counterElt;
    this.errorStrings = [
      {
        regex: /\(/g,
        error:
          '(...) - Different number of opening and closing parentheses detected.\n',
      },
      {
        regex: /\[/g,
        error:
          '[...] - Different number of opening and closing square brackets detected.\n',
      },
      {
        regex: /\{/g,
        error:
          '{...} - Different number of opening and closing curly brackets detected.\n',
      },
    ];
  }

  check() {
    var title = '';
    this.errorStrings.forEach(({ regex, error }) => {
      var openMatches = (this.textArea.value.match(regex) || []).length;
      var closeMatches = (
        this.textArea.value.match(
          regex.replace(/\(/g, ')').replace(/\[/g, ']').replace(/\{/g, '}'),
        ) || []
      ).length;
      if (openMatches != closeMatches) {
        if (!this.counterElt.title.includes(error)) {
          title += error;
        }
      } else {
        title = this.counterElt.title.replace(error, '');
      }
    });
    this.counterElt.title = title;
    this.counterElt.classList.toggle('error', !!title);
  }
}

function setupBracketChecking(id_prompt, id_counter) {
  var textarea = gradioApp().querySelector(`#${id_prompt} > label > textarea`);
  var counter = gradioApp().getElementById(id_counter);
  var bracketChecker = new BracketChecker(textarea, counter);
  textarea.addEventListener('input', () => bracketChecker.check());
}

const shadowRootLoaded = setInterval(() => {
  var shadowRoot = document.querySelector('gradio-app').shadowRoot;
  if (!shadowRoot) return;
  var shadowTextArea = shadowRoot.querySelector(
    `#txt2img_prompt > label > textarea`,
  );
  if (!shadowTextArea) return;
  clearInterval(shadowRootLoaded);
  ['txt2img', 'txt2img_neg', 'img2img', 'img2img_neg'].forEach((prompt) => {
    setupBracketChecking(`${prompt}_prompt`, `${prompt}_token_counter`);
    setupBracketChecking(
      `${prompt}_prompt`,
      `${prompt}_negative_token_counter`,
    );
  });
}, 1000);
