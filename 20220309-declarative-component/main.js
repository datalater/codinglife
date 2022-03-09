function ButtonGroup({ $target, buttons }) {
  const $group = document.createElement("div");
  let isInit = false;

  this.render = () => {
    if (!isInit) {
      buttons.forEach(({ type, ...props }) => {
        if (type === "toggle") {
          new ToggleButton({ $target: $group, ...props });
        } else if (type === "timer") {
          new TimerButton({ $target: $group, ...props });
        }
      });

      $target.appendChild($group);
      isInit = true;
    }
  };

  this.render();
}

function TimerButton({ $target, text, timer = 3000 }) {
  const button = new ToggleButton({
    $target,
    text,
    onClick: () => {
      setTimeout(() => {
        button.setState({
          ...button.state,
          toggled: !button.state.toggled,
        });
      }, timer);
    },
  });
}

function ToggleButton({ $target, text, onClick }) {
  const $button = document.createElement("button");

  let isInit = false;

  this.state = {
    clickCount: 0,
    toggled: false,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $button.textContent = `${text} (${this.state.clickCount})`;

    $button.style.textDecoration = this.state.toggled ? "line-through" : "none";

    if (!isInit) {
      $target.appendChild($button);

      isInit = true;
    }
  };

  $button.addEventListener("click", () => {
    this.setState({
      clickCount: this.state.clickCount + 1,
      toggled: !this.state.toggled,
    });

    onClick && onClick(this.state.clickCount);
  });

  this.render();
}

const $app = document.querySelector("#app");

new ToggleButton({
  $target: $app,
  text: "버튼1",
  onClick: (clickCount) => {
    if (clickCount % 2 === 0) {
      alert("2번째 클릭!");
    }
  },
});

new ToggleButton({
  $target: $app,
  text: "버튼2",
  onClick: (clickCount) => {
    if (clickCount % 3 === 0) {
      alert("3번째 클릭!");
    }
  },
});

new ToggleButton({
  $target: $app,
  text: "버튼3",
});

new TimerButton({
  $target: $app,
  text: "3초 타이머",
});

new TimerButton({
  $target: $app,
  text: "10초 타이머",
  timer: 10 * 1000,
});

new ButtonGroup({
  $target: $app,
  buttons: [
    {
      type: "toggle",
      text: "토글 버튼",
    },
    {
      type: "timer",
      text: "타이머 버튼",
      timer: 1000,
    },
  ],
});
