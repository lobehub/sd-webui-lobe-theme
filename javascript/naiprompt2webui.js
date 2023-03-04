// Maximum number of histories will be kept
const MaxHistory = 10;
// History of positive prompt
let historyBox = (function () {
  let _historyBox = [];

  return {
    push: function (prompt) {
      if (prompt == _historyBox[_historyBox.length - 1]) return;
      _historyBox.push(prompt);
      if (MaxHistory < _historyBox.length) {
        _historyBox.shift();
      }
    },
    pop: function () {
      let prePrompt = _historyBox.pop();
      return prePrompt;
    },
  };
})();
// History of negative prompt
let nhistoryBox = (function () {
  let _historyBox = [];

  return {
    push: function (prompt) {
      if (prompt == _historyBox[_historyBox.length - 1]) return;
      _historyBox.push(prompt);
      if (MaxHistory < _historyBox.length) {
        _historyBox.shift();
      }
    },
    pop: function () {
      let prePrompt = _historyBox.pop();
      return prePrompt;
    },
  };
})();
// Round function
function round(value) {
  return Math.round(value * 10000) / 10000;
}
function convert(input) {
  [111, 2233];
  const re_attention = /\{|\[|\}|\]|[^\{\}\[\]]+/gmu;
  let text = input
    .replace("：", ":")
    .replace("（", "(")
    .replace("）", ")")
    .replace(/\s+/gi, " ")
    .replace("，", ",")
    .replace("<", ", <")
    .replace(", ,", ",")
    .replace(",,", ",")
    .replace("> <", ">, <");

  let res = [];

  let curly_brackets = [];
  let square_brackets = [];

  const curly_bracket_multiplier = 1.05;
  const square_bracket_multiplier = 1 / 1.05;

  function multiply_range(start_position, multiplier) {
    for (let pos = start_position; pos < res.length; pos++) {
      res[pos][1] = round(res[pos][1] * multiplier);
    }
  }

  for (const match of text.matchAll(re_attention)) {
    let word = match[0];

    if (word == "{") {
      curly_brackets.push(res.length);
    } else if (word == "[") {
      square_brackets.push(res.length);
    } else if (word == "}" && curly_brackets.length > 0) {
      multiply_range(curly_brackets.pop(), curly_bracket_multiplier);
    } else if (word == "]" && square_brackets.length > 0) {
      multiply_range(square_brackets.pop(), square_bracket_multiplier);
    } else {
      res.push([word, 1.0]);
    }
  }

  for (const pos of curly_brackets) {
    multiply_range(pos, curly_bracket_multiplier);
  }

  for (const pos of square_brackets) {
    multiply_range(pos, square_bracket_multiplier);
  }

  if (res.length == 0) {
    res = [["", 1.0]];
  }

  // console.log(res);
  // merge runs of identical weights
  let i = 0;
  while (i + 1 < res.length) {
    // console.log("test:" + res[i] + " : " + res[i+1])
    if (res[i][1] == res[i + 1][1]) {
      res[i][0] = res[i][0] + res[i + 1][0];
      // console.log("splicing:" + res[i+1]);
      res.splice(i + 1, 1);
    } else {
      i += 1;
    }
  }
  // console.log(res);

  let result = "";
  for (let i = 0; i < res.length; i++) {
    if (res[i][1] == 1.0) {
      result += res[i][0];
    } else {
      result += "(" + res[i][0] + ":" + res[i][1].toString() + ")";
    }
  }
  return result;
}

function dispatchInputEvent(target) {
  let inputEvent = new Event("input");
  Object.defineProperty(inputEvent, "target", { value: target });
  target.dispatchEvent(inputEvent);
}

function onClickConvert(type) {
  const default_prompt = "";
  const default_negative = "";

  let result = "";
  let prompt = gradioApp().querySelector(`#${type}_prompt > label > textarea`);
  historyBox.push(prompt.value);
  result = convert(prompt.value);
  if (result.length != 0) {
    if (result.match(/^masterpiece, best quality,/) == null) {
      result = default_prompt + result;
    }
  }
  prompt.value = result;
  dispatchInputEvent(prompt);

  result = "";
  let negprompt = gradioApp().querySelector(
    `#${type}_neg_prompt > label > textarea`
  );
  nhistoryBox.push(negprompt.value);
  result = convert(negprompt.value);
  if (result.length != 0) {
    if (result.match(/^lowres,/) == null) {
      result = default_negative + result;
    }
  } else {
    result = default_negative;
  }
  negprompt.value = result;
  dispatchInputEvent(negprompt);
}

function onClickGenerate(type) {
  let prompt = gradioApp().querySelector(`#${type}g_prompt > label > textarea`);
  historyBox.push(prompt.value);
  let negprompt = gradioApp().querySelector(
    `#${type}_neg_prompt > label > textarea`
  );
  nhistoryBox.push(negprompt.value);
}

function onClickUndo(type) {
  let prompt = gradioApp().querySelector(`#${type}_prompt > label > textarea`);
  let prePrompt = historyBox.pop();

  if (!prePrompt) {
    prompt.value = "";
  } else {
    prompt.value = prePrompt;
  }
  dispatchInputEvent(prompt);

  let negprompt = gradioApp().querySelector(
    `#${type}_neg_prompt > label > textarea`
  );
  let prenegprompt = nhistoryBox.pop();

  if (!prenegprompt) {
    negprompt.value = "";
  } else {
    negprompt.value = prenegprompt;
  }
  dispatchInputEvent(negprompt);
}

function createButton(id, innerHTML, onClick) {
  const button = document.createElement("button");
  button.id = id;
  button.type = "button";
  button.innerHTML = innerHTML;
  button.className = "gr-button gr-button-lg gr-button-secondary";
  button.style = `padding-left: 0.1em; padding-right: 0em; margin: 0.1em 0;max-height: 2em; max-width: 6em`;
  button.addEventListener("click", onClick);
  return button;
}

function addPromptButton(type) {
  const generateBtn = gradioApp().querySelector(`#${type}_generate`);
  const actionsColumn = gradioApp().querySelector(`#${type}_actions_column`);
  const nai2local = gradioApp().querySelector(`#${type}_nai2local`);

  if (!generateBtn || !actionsColumn || nai2local) return;

  generateBtn.addEventListener("click", () => onClickGenerate(type));

  const nai2LocalArea = document.createElement("div");
  nai2LocalArea.id = `${type}_nai2local`;
  nai2LocalArea.className = "overflow-hidden flex col gap-4";
  nai2LocalArea.style =
    "padding: 0.4em 0em; display: flex; justify-content: center;";

  const convertBtn = createButton("nai2localconvert", "🪄", () =>
    onClickConvert(type)
  );
  const undoBtn = createButton("nai2localUndo", "History", () =>
    onClickUndo(type)
  );

  nai2LocalArea.appendChild(convertBtn);
  nai2LocalArea.appendChild(undoBtn);

  actionsColumn.append(nai2LocalArea);
}

onUiUpdate(() => {
  addPromptButton("txt2img");
  addPromptButton("img2img");
});
