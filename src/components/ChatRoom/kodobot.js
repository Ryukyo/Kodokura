class Action {
  Action(triggers, answers) {
    this.triggers = triggers;
    this.answers = answers;
  }

  matches(text) {
    const lowercaseText = text.toLowerCase();
    for (const trigger of this.triggers) {
      if (lowercaseText.includes(trigger)) {
        return true;
      }
    }
    return false;
  }

  _answerRandomizer(array) {
    let multiplier = array.length;
    if (multiplier === 0) {
      multiplier += 1;
    }
    let randomNum = Math.floor(Math.random() * multiplier);
    return randomNum;
  }

  answer() {
    return this._answerRandomizer(this.answers);
  }
}

class Actions {
  // add all key sentence and answers here
  _botActions = [
    Action(
      ["hi kodobot", "hello kodobot"],
      ["Hi humans", "Hello humans", "Kodobot here!"]
    ),
    Action(
      [
        "what's the weather like kodobot",
        "what's the weather like today kodobot",
      ],
      [
        "Open the window an take a look. Hope is a nice weather",
        "Inside the chatroom there is always a nice weather",
        "Sorry my creators didn't feed me yet with an weather API. But hope is sunny outside ",
      ]
    ),
  ];

  answer(text) {
    for (const action of this._botActions) {
      if (action.matches(text)) {
        return action.answer();
      }
    }
    // if not match, return empty string
    return "";
  }
}

export const modules = {
  Actions,
};
