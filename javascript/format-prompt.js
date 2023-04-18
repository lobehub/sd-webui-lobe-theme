"use strict";
/**
 * 转换器工具类
 */
class Converter {
    /**
     * 将数字四舍五入到小数点后四位
     * @param value 数字
     * @returns 四舍五入后的数字
     */
    static round(value) {
        return Math.round(value * 10000) / 10000;
    }
    /**
     * 将字符串中的中文冒号和括号转换成英文冒号和括号
     * @param srt 字符串
     * @returns 转换后的字符串
     */
    static convertStr(srt) {
        return srt.replace(/：/g, ':').replace(/（/g, '(').replace(/）/g, ')');
    }
    /**
     * 将字符串按照括号分割成数组
     * @param str 字符串
     * @returns 分割后的数组
     */
    static convertStr2Array(str) {
        // 匹配各种括号中的内容，包括括号本身
        const bracketRegex = /([()<>[\]])/g;
        /**
         * 将字符串按照各种括号分割成数组
         * @param str 字符串
         * @returns 分割后的数组
         */
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
                }
                else if (match[0] === ')' || match[0] === '>' || match[0] === ']') {
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
        /**
         * 将字符串按照逗号和各种括号分割成数组
         * @param str 字符串
         * @returns 分割后的数组
         */
        const splitByComma = (str) => {
            const arr = [];
            let start = 0;
            let inBracket = false;
            for (let i = 0; i < str.length; i++) {
                if (str[i] === ',' && !inBracket) {
                    arr.push(str.substring(start, i).trim());
                    start = i + 1;
                }
                else if (str[i].match(bracketRegex)) {
                    inBracket = !inBracket;
                }
            }
            arr.push(str.substring(start).trim());
            return arr;
        };
        /**
         * 清洗字符串并输出数组
         * @param str 字符串
         * @returns 清洗后的数组
         */
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
            return a.includes('<') && !b.includes('<') ? 1 : b.includes('<') && !a.includes('<') ? -1 : 0;
        });
    }
    /**
     * 将数组转换成字符串
     * @param array 数组
     * @returns 转换后的字符串
     */
    static convertArray2Str(array) {
        const newArray = array.map((item) => {
            if (item.includes('<'))
                return item;
            const newItem = item
                .replace(/\s+/g, ' ')
                .replace(/，|\.\|。/g, ',')
                .replace(/“|‘|”|"|\/'/g, '')
                .replace(/, /g, ',')
                .replace(/,,/g, ',')
                .replace(/,/g, ', ');
            return Converter.convertStr2Array(newItem).join(', ');
        });
        return newArray.join(', ');
    }
    /**
     * 将输入的字符串转换成特定格式的字符串
     * @param input 输入的字符串
     * @returns 转换后的字符串
     */
    static convert(input) {
        const re_attention = /\{|\[|\}|\]|[^{}[\]]+/gmu;
        let text = Converter.convertStr(input);
        const textArray = Converter.convertStr2Array(text);
        text = Converter.convertArray2Str(textArray);
        let res = [];
        const curly_bracket_multiplier = 1.05;
        const square_bracket_multiplier = 1 / 1.05;
        const brackets = {
            '{': { stack: [], multiplier: curly_bracket_multiplier },
            '[': { stack: [], multiplier: square_bracket_multiplier },
        };
        /**
         * 将指定范围内的数字乘以指定倍数
         * @param start_position 起始位置
         * @param multiplier 倍数
         */
        function multiply_range(start_position, multiplier) {
            for (let pos = start_position; pos < res.length; pos++) {
                res[pos][1] = Converter.round(res[pos][1] * multiplier);
            }
        }
        for (const match of text.matchAll(re_attention)) {
            let word = match[0];
            if (word in brackets) {
                brackets[word].stack.push(res.length);
            }
            else if (word === '}' || word === ']') {
                const bracket = brackets[word === '}' ? '{' : '['];
                if (bracket.stack.length > 0) {
                    multiply_range(bracket.stack.pop(), bracket.multiplier);
                }
            }
            else {
                res.push([word, 1.0]);
            }
        }
        Object.keys(brackets).forEach((bracketType) => {
            brackets[bracketType].stack.forEach((pos) => {
                multiply_range(pos, brackets[bracketType].multiplier);
            });
        });
        if (res.length === 0) {
            res = [['', 1.0]];
        }
        let i = 0;
        while (i + 1 < res.length) {
            if (res[i][1] === res[i + 1][1]) {
                res[i][0] += res[i + 1][0];
                res.splice(i + 1, 1);
            }
            else {
                i += 1;
            }
        }
        let result = '';
        for (const [word, value] of res) {
            result += value === 1.0 ? word : `(${word}:${value.toString()})`;
        }
        return result;
    }
    /**
     * 触发 input 事件
     * @param target 目标元素
     */
    static dispatchInputEvent(target) {
        let inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', { value: target });
        target.dispatchEvent(inputEvent);
    }
    /**
     * 点击转换按钮的事件处理函数
     * @param type 类型
     */
    static onClickConvert(type) {
        const default_prompt = '';
        const default_negative = '';
        const prompt = gradioApp().querySelector(`#${type}_prompt > label > textarea`);
        const result = Converter.convert(prompt.value);
        prompt.value = result.match(/^masterpiece, best quality,/) === null ? default_prompt + result : result;
        Converter.dispatchInputEvent(prompt);
        const negprompt = gradioApp().querySelector(`#${type}_neg_prompt > label > textarea`);
        const negResult = Converter.convert(negprompt.value);
        negprompt.value =
            negResult.match(/^lowres,/) === null
                ? negResult.length === 0
                    ? default_negative
                    : default_negative + negResult
                : negResult;
        Converter.dispatchInputEvent(negprompt);
    }
    /**
     * 创建转换按钮
     * @param id 按钮 id
     * @param innerHTML 按钮文本
     * @param onClick 点击事件处理函数
     * @returns 新建的按钮元素
     */
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
    /**
     * 添加转换按钮
     * @param type - 组件类型
     */
    static addPromptButton(type) {
        const generateBtn = gradioApp().querySelector(`#${type}_generate`);
        const actionsColumn = gradioApp().querySelector(`#${type}_style_create`);
        const nai2local = gradioApp().querySelector(`#${type}_formatconvert`);
        if (!generateBtn || !actionsColumn || nai2local)
            return;
        const convertBtn = Converter.createButton(`${type}_formatconvert`, '🪄', () => Converter.onClickConvert(type));
        actionsColumn.parentNode?.append(convertBtn);
    }
}
/**
 * 注册UI更新回调函数
 * 在UI更新时添加提示按钮
 */
onUiUpdate(() => {
    Converter.addPromptButton('txt2img');
    Converter.addPromptButton('img2img');
});