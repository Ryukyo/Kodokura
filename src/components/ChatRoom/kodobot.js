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
    // hello
    Action(
      [
        "hi kodobot", 
        "hello kodobot"
      ],
      [
        "Hi humans", "Hello humans", 
        "Kodobot here!"
      ]
    ),
    // riddle1
    Action(
      [
        "why did the chicken cross the road"
      ],
      [
        "Good question! Let me guess...",
        "Human...figure out by yourself!",
        "Because he has 2 legs and he can!!.... I cannot because I'm a simply bot",
      ]
    ),
    //how are you kodobot
    Action(
      [
        "how are you kodobot",
        "how are you doing kodobot",
        "are you okay kodobot",
        "how're you doing kodobot",
      ],
      [
        "Fine thank you",
        "I'm programmed to be always fine",
        "I'm doing great, thank you!",
        "I'm fine, thank you! Hope you too!",
      ]
    ),
    //who are you
    Action(
      [
        "who are you kodobot",
        "what are you kodobot"
      ],
      [
        "I'm Kodokura's official chatbot",
        "I'm a bot",
        "I'm your friendly neighbour Kodobot",
      ]
    ),
    Action(
      [

      ],
      [

      ]
    ),
    Action(
      [

      ],
      [

      ]
    ),
    Action(
      [

      ],
      [

      ]
    ),
    Action(
      [

      ],
      [

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
