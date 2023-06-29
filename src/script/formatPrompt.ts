/**
 * 转换器工具类
 */
export const Converter = {
  /**
   * 添加转换按钮
   * @param type - 组件类型
   */
  addPromptButton(type: string): void {
    console.debug('🤯 [formatPrompt] inject', type);
    const generateButton: HTMLElement | null = gradioApp().querySelector(`#${type}_generate`);
    const actionsColumn: HTMLElement | null = gradioApp().querySelector(`#${type}_style_create`);
    const nai2local: HTMLElement | null = gradioApp().querySelector(`#${type}_formatconvert`);
    if (!generateButton || !actionsColumn || nai2local) return;
    const convertButton: HTMLElement = Converter.createButton(`${type}_formatconvert`, '🪄', () =>
      Converter.onClickConvert(type));
    actionsColumn.parentNode?.append(convertButton);
  },

  /**
   * 将输入的字符串转换成特定格式的字符串
   * @param input 输入的字符串
   * @returns 转换后的字符串
   */
  convert(input: string): string {
    const re_attention = /\{|\[|\}|\]|[^{}[\]]+/gmu;

    let text = Converter.convertStr(input);
    const textArray = Converter.convertStr2Array(text);
    text = Converter.convertArray2Str(textArray);

    let res: [string, number][] = [];

    const curly_bracket_multiplier = 1.05;
    const square_bracket_multiplier = 1 / 1.05;

    const brackets: Record<string, { multiplier: number; stack: number[] }> = {
      '[': { multiplier: square_bracket_multiplier, stack: [] },
      '{': { multiplier: curly_bracket_multiplier, stack: [] },
    };

    /**
     * 将指定范围内的数字乘以指定倍数
     * @param start_position 起始位置
     * @param multiplier 倍数
     */
    function multiply_range(start_position: number, multiplier: number) {
      for (let pos = start_position; pos < res.length; pos++) {
        res[pos][1] = Converter.round(res[pos][1] * multiplier);
      }
    }

    for (const match of text.matchAll(re_attention)) {
      let word = match[0];

      if (word in brackets) {
        brackets[word].stack.push(res.length);
      } else if (word === '}' || word === ']') {
        const bracket = brackets[word === '}' ? '{' : '['];
        if (bracket.stack.length > 0) {
          multiply_range(bracket.stack.pop()!, bracket.multiplier);
        }
      } else {
        res.push([word, 1]);
      }
    }

    for (const bracketType of Object.keys(brackets)) {
      for (const pos of brackets[bracketType].stack) {
        multiply_range(pos, brackets[bracketType].multiplier);
      }
    }

    if (res.length === 0) {
      res = [['', 1]];
    }

    let index = 0;
    while (index + 1 < res.length) {
      if (res[index][1] === res[index + 1][1]) {
        res[index][0] += res[index + 1][0];
        res.splice(index + 1, 1);
      } else {
        index += 1;
      }
    }

    let result = '';
    for (const [word, value] of res) {
      result += value === 1 ? word : `(${word}:${value.toString()})`;
    }
    return result;
  },

  /**
   * 将数组转换成字符串
   * @param array 数组
   * @returns 转换后的字符串
   */
  convertArray2Str(array: string[]): string {
    const newArray = array.map((item) => {
      if (item.includes('<')) return item;
      const newItem = item
        .replaceAll(/\s+/g, ' ')
        .replaceAll(/，|\.\|。/g, ',')
        .replaceAll(/“|‘|”|"|\/'/g, '')
        .replaceAll(', ', ',')
        .replaceAll(',,', ',')
        .replaceAll(',', ', ');
      return Converter.convertStr2Array(newItem).join(', ');
    });
    return newArray.join(', ');
  },

  /**
   * 将字符串中的中文冒号和括号转换成英文冒号和括号
   * @param srt 字符串
   * @returns 转换后的字符串
   */
  convertStr(srt: string): string {
    return srt.replaceAll('：', ':').replaceAll('（', '(').replaceAll('）', ')');
  },

  /**
   * 将字符串按照括号分割成数组
   * @param str 字符串
   * @returns 分割后的数组
   */
  convertStr2Array(string_: string): string[] {
    // 匹配各种括号中的内容，包括括号本身
    const bracketRegex = /([()<>[\]])/g;

    /**
     * 将字符串按照各种括号分割成数组
     * @param str 字符串
     * @returns 分割后的数组
     */
    const splitByBracket = (string__: string): string[] => {
      const array: string[] = [];
      let start = 0;
      let depth = 0;
      let match;
      while ((match = bracketRegex.exec(string__)) !== null) {
        if (depth === 0 && match.index > start) {
          array.push(string__.slice(start, match.index));
          start = match.index;
        }
        if (match[0] === '(' || match[0] === '<' || match[0] === '[') {
          depth++;
        } else if (match[0] === ')' || match[0] === '>' || match[0] === ']') {
          depth--;
        }
        if (depth === 0) {
          array.push(string__.slice(start, match.index + 1));
          start = match.index + 1;
        }
      }
      if (start < string__.length) {
        array.push(string__.slice(Math.max(0, start)));
      }
      return array;
    };

    /**
     * 将字符串按照逗号和各种括号分割成数组
     * @param str 字符串
     * @returns 分割后的数组
     */
    const splitByComma = (string__: string): string[] => {
      const array: string[] = [];
      let start = 0;
      let inBracket = false;
      for (let index = 0; index < string__.length; index++) {
        if (string__[index] === ',' && !inBracket) {
          array.push(string__.slice(start, index).trim());
          start = index + 1;
        } else if (bracketRegex.test(string__[index])) {
          inBracket = !inBracket;
        }
      }
      array.push(string__.slice(Math.max(0, start)).trim());
      return array;
    };

    /**
     * 清洗字符串并输出数组
     * @param str 字符串
     * @returns 清洗后的数组
     */
    const cleanString = (string__: string): string[] => {
      let array = splitByBracket(string__);
      array = array.flatMap((s) => splitByComma(s));
      return array.filter((s) => s !== '');
    };

    return cleanString(string_)
      .filter((item) => {
        const pattern = /^[\s,，]+$/;
        return !pattern.test(item);
      })
      .filter(Boolean)
      .sort((a, b) => {
        return a.includes('<') && !b.includes('<') ?
          1 :
          b.includes('<') && !a.includes('<') ?
          -1 :
          0;
      });
  },

  /**
   * 创建转换按钮
   * @param id 按钮 id
   * @param innerHTML 按钮文本
   * @param onClick 点击事件处理函数
   * @returns 新建的按钮元素
   */
  createButton(id: string, innerHTML: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.innerHTML = innerHTML;
    button.title = 'Format prompt~🪄';
    button.className = 'lg secondary gradio-button tool svelte-1ipelgc';
    button.addEventListener('click', onClick);
    return button;
  },

  /**
   * 触发 input 事件
   * @param target 目标元素
   */
  dispatchInputEvent(target: EventTarget) {
    let inputEvent = new Event('input');
    Object.defineProperty(inputEvent, 'target', { value: target });
    target.dispatchEvent(inputEvent);
  },

  /**
   * 点击转换按钮的事件处理函数
   * @param type 类型
   */
  onClickConvert(type: string) {
    const default_prompt = '';
    const default_negative = '';

    const prompt = gradioApp().querySelector(
      `#${type}_prompt > label > textarea`,
    ) as HTMLTextAreaElement;
    const result = Converter.convert(prompt.value);
    prompt.value =
      result.match(/^masterpiece, best quality,/) === null ? default_prompt + result : result;
    Converter.dispatchInputEvent(prompt);
    const negprompt = gradioApp().querySelector(
      `#${type}_neg_prompt > label > textarea`,
    ) as HTMLTextAreaElement;
    const negResult = Converter.convert(negprompt.value);
    negprompt.value =
      negResult.match(/^lowres,/) === null ?
        negResult.length === 0 ?
          default_negative :
          default_negative + negResult :
        negResult;
    Converter.dispatchInputEvent(negprompt);
  },

  /**
   * 将数字四舍五入到小数点后四位
   * @param value 数字
   * @returns 四舍五入后的数字
   */
  round(value: number): number {
    return Math.round(value * 10_000) / 10_000;
  },
};

export default () => {
  console.time('🤯 [formatPrompt] inject');
  Converter.addPromptButton('txt2img');
  Converter.addPromptButton('img2img');
  console.timeEnd('🤯 [formatPrompt] inject');
};
