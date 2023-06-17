interface ErrorString {
  error: string;
  regex: string;
}

class BracketChecker {
    private textArea: HTMLTextAreaElement;
    private counterElt: HTMLElement;
    private errorStrings: ErrorString[];

    constructor(textArea: HTMLTextAreaElement, counterElt: HTMLElement) {
        this.textArea = textArea;
        this.counterElt = counterElt;
        this.errorStrings = [
            {
                error: '(...) - Different number of opening and closing parentheses detected.\n',
                regex: '\\(',
            },
            {
                error: '[...] - Different number of opening and closing square brackets detected.\n',
                regex: '\\[',
            },
            {
                error: '{...} - Different number of opening and closing curly brackets detected.\n',
                regex: '\\{',
            },
        ];
    }

    /**
   * 检查文本框中的括号是否匹配，并更新计数器元素的标题和样式
   */
    public check = (): void => {
        let title = '';
        for (const {regex, error} of this.errorStrings) {
            const openMatches = (this.textArea.value.match(new RegExp(regex, 'g')) || []).length;
            const closeMatches = (
                this.textArea.value.match(
                    new RegExp(regex.replaceAll('(', ')').replaceAll('[', ']').replaceAll('{', '}'), 'g'),
                ) || []
            ).length;
            if (openMatches === closeMatches) {
                title = this.counterElt.title.replace(error, '');
            } else {
                if (!this.counterElt.title.includes(error)) {
                    title += error;
                }
            }
        }
        this.counterElt.title = title;
        this.counterElt.classList.toggle('error', !!title);
    };
}

/**
 * 初始化括号匹配检查器
 * @param id_prompt 包含文本框的元素的 ID
 * @param id_counter 显示计数器的元素的 ID
 */
const setupBracketChecking = (idPrompt: string, idCounter: string): void => {
    const textarea = gradioApp().querySelector(
        `#${idPrompt} > label > textarea`,
    ) as HTMLTextAreaElement;
    const counter = gradioApp().querySelector(`#${idCounter}`) as HTMLElement;
    const bracketChecker = new BracketChecker(textarea, counter);
    textarea.addEventListener('input', bracketChecker.check);
};

export default () => {
    const elements = ['txt2img', 'txt2img_neg', 'img2img', 'img2img_neg'];
    for (const prompt of elements) {
        setupBracketChecking(`${prompt}_prompt`, `${prompt}_token_counter`);
        setupBracketChecking(`${prompt}_prompt`, `${prompt}_negative_token_counter`);
    }
};
