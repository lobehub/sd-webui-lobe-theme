class Converter {
  static round(value) {
    return Math.round(value * 10000) / 10000;
  }

  static convertStr(srt) {
    return srt.replace(/：/g, ':').replace(/（/g, '(').replace(/）/g, ')');
  }

  static convertStr2Array(str) {
    // 匹配各种括号中的内容，包括括号本身
    const bracketRegex = /(\(|\)|<|>|\[|\])/g;

    // 将字符串按照各种括号分割成数组
    const splitByBracket = (str) => {
      const arr = [];
      let start = 0;
      let depth = 0;
      let match;
      while ((match = bracketRegex.exec(str)) !== null) {
        if (depth === 0 && match.index > start) {
          arr.push(str.substring(start, match.index));
          start = match.index;
        }
        if (match[0] === '(' || match[0] === '<' || match[0] === '[') {
          depth++;
        } else if (match[0] === ')' || match[0] === '>' || match[0] === ']') {
          depth--;
        }
        if (depth === 0) {
          arr.push(str.substring(start, match.index + 1));
          start = match.index + 1;
        }
      }
      if (start < str.length) {
        arr.push(str.substring(start));
      }
      return arr;
    };

    // 将字符串按照逗号和各种括号分割成数组
    const splitByComma = (str) => {
      const arr = [];
      let start = 0;
      let inBracket = false;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === ',' && !inBracket) {
          arr.push(str.substring(start, i).trim());
          start = i + 1;
        } else if (str[i].match(bracketRegex)) {
          inBracket = !inBracket;
        }
      }
      arr.push(str.substring(start).trim());
      return arr;
    };

    // 清洗字符串并输出数组
    const cleanStr = (str) => {
      let arr = splitByBracket(str);
      arr = arr.flatMap((s) => splitByComma(s));
      return arr.filter((s) => s !== '');
    };

    return cleanStr(str)
      .filter((item) => {
        const pattern = /^[,\s，　]+$/;
        return !pattern.test(item);
      })
      .filter(Boolean)
      .sort((a, b) => {
        return a.includes('<') && !b.includes('<')
          ? 1
          : b.includes('<') && !a.includes('<')
          ? -1
          : 0;
      });
  }

  static convertArray2Str(array) {
    const newArray = array.map((item) => {
      if (item.includes('<')) return item;
      const newItem = item
        .replace(/\s+/g, ' ')
        .replace([/\，|\.|\。/g, ','])
        .replace([/\“|\‘|\”|\"|\\|\//g, ''])
        .replace(/\, /g, ',')
        .replace(/\,\,/g, ',')
        .replace(/\,/g, ', ');
      return Converter.convertStr2Array(newItem).join(', ');
    });
    return newArray.join(', ');
  }

  static convert(input) {
    const re_attention = /\{|\[|\}|\]|[^\{\}\[\]]+/gmu;

    let text = Converter.convertStr(input);
    text = Converter.convertStr2Array(text);
    text = Converter.convertArray2Str(text);

    let res = [];

    const curly_bracket_multiplier = 1.05;
    const square_bracket_multiplier = 1 / 1.05;

    const brackets = {
      '{': { stack: [], multiplier: curly_bracket_multiplier },
      '[': { stack: [], multiplier: square_bracket_multiplier },
    };

    function multiply_range(start_position, multiplier) {
      for (let pos = start_position; pos < res.length; pos++) {
        res[pos][1] = Converter.round(res[pos][1] * multiplier);
      }
    }

    for (const match of text.matchAll(re_attention)) {
      let word = match[0];

      if (word in brackets) {
        brackets[word].stack.push(res.length);
      } else if (word == '}' || word == ']') {
        const bracket = brackets[word === '}' ? '{' : '['];
        if (bracket.stack.length > 0) {
          multiply_range(bracket.stack.pop(), bracket.multiplier);
        }
      } else {
        res.push([word, 1.0]);
      }
    }

    for (const bracketType in brackets) {
      for (const pos of brackets[bracketType].stack) {
        multiply_range(pos, brackets[bracketType].multiplier);
      }
    }

    if (res.length == 0) {
      res = [['', 1.0]];
    }

    let i = 0;
    while (i + 1 < res.length) {
      if (res[i][1] == res[i + 1][1]) {
        res[i][0] += res[i + 1][0];
        res.splice(i + 1, 1);
      } else {
        i += 1;
      }
    }

    let result = '';
    for (const [word, value] of res) {
      result += value === 1.0 ? word : `(${word}:${value.toString()})`;
    }
    return result;
  }

  static dispatchInputEvent(target) {
    let inputEvent = new Event('input');
    Object.defineProperty(inputEvent, 'target', { value: target });
    target.dispatchEvent(inputEvent);
  }

  static onClickConvert(type) {
    const default_prompt = '';
    const default_negative = '';

    const prompt = gradioApp().querySelector(
      `#${type}_prompt > label > textarea`,
    );
    const result = Converter.convert(prompt.value);
    prompt.value =
      result.match(/^masterpiece, best quality,/) === null
        ? default_prompt + result
        : result;
    Converter.dispatchInputEvent(prompt);
    const negprompt = gradioApp().querySelector(
      `#${type}_neg_prompt > label > textarea`,
    );
    const negResult = Converter.convert(negprompt.value);
    negprompt.value =
      negResult.match(/^lowres,/) === null
        ? negResult.length === 0
          ? default_negative
          : default_negative + negResult
        : negResult;
    Converter.dispatchInputEvent(negprompt);
  }

  static createButton(id, innerHTML, onClick) {
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.innerHTML = innerHTML;
    button.title = 'Format prompt~🪄';
    button.className = 'lg secondary gradio-button tool svelte-1ipelgc';
    button.addEventListener('click', onClick);
    return button;
  }

  static addPromptButton(type) {
    const generateBtn = gradioApp().querySelector(`#${type}_generate`);
    const actionsColumn = gradioApp().querySelector(`#${type}_style_create`);
    const nai2local = gradioApp().querySelector(`#${type}_formatconvert`);
    if (!generateBtn || !actionsColumn || nai2local) return;
    const convertBtn = Converter.createButton(
      `${type}_formatconvert`,
      '🪄',
      () => Converter.onClickConvert(type),
    );
    actionsColumn.parentNode.append(convertBtn);
  }
}

onUiUpdate(() => {
  Converter.addPromptButton('txt2img');
  Converter.addPromptButton('img2img');
});
