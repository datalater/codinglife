# Test
## Jest context plugin 

```bash
npm i -D jest-context-plugin @types/jest-context-plugin
```

## 테스트 코드 작성하기: 1부

```tsx
App.test.tsx

UI
Todo라는 타이틀이 나온다
renders title
- queryByText(/Todo/).not.toBeNull()
- container.toHaveTextContent(/Todo/)
  
RED
describe('App', () => {
  it('renders title', () => {
    const { container } = render((
      <App />
    ))

    expect(container).toHaveTextContent(/Todo/)
  })
})

GREEN
function App() {
  return (
    <div>
      <h1>Todo</h1>
    </div>
  )
}

UI
할일 목록이 나온다
renders tasks
- queryByText(/자바스크립트 학습/).not.toBeNull()
- container.toHaveTextContent(/자바스크립트 학습/)

RED
it('renders tasks', () => {
  const { container } = render((
    <App />
  ))

  expect(container).toHaveTextContent(/자바스크립트 학습/)
})

GREEN
function App() {
  return (
    <div>
      <h1>Todo</h1>
      <ul>
        <li>자바스크립트 학습</li>
      </ul>
    </div>
  )
}

REFACTOR 
// 현재 App 컴포넌트 테스트가 전부 통과한 상태에서 다음 작업으로 이동한다
관심사분리(): 리스트에 대한 관심사는 리스트 컴포넌트로 분리한다.
```

```tsx
List.test.tsx

...RED
// App.test.tsx에 있던 코드를 그대로 복사한다.
it('renders tasks', () => {
  const { container } = render((
    <List />
  ))

  expect(container).toHaveTextContent(/자바스크립트 학습/)
})

...GREEN
// App.tsx에 있던 코드를 그대로 복사한다.
export default function List() {
  return (
    <ul>
      <li>자바스크립트 학습</li>
    </ul>
  );
}

RED
it('renders tasks', () => {
  const tasks = [
    { id: '1', title: '자바스크립트 학습' },
  ];

  const { container } = render((
    <List 
      tasks={tasks}
    />
  ))

  expect(container).toHaveTextContent(/자바스크립트 학습/)
})

GREEN
interface Task {
  id: string;
  title: string;
}

export interface Props {
  tasks: Task[];
}

export default function List({ tasks }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>자바스크립트 학습</li>
      ))}
    </ul>
  );
}

RED...GREEN
// 리스트가 복수의 태스크를 잘 렌더링하는지 알기 위해 한 개 더 추가한다.
it('renders tasks', () => {
  const tasks = [
    { id: '1', title: '자바스크립트 학습' },
    { id: '2', title: '타입스크립트 학습' },
  ];

  const { container } = render((
    <List 
      tasks={tasks}
    />
  ))

  expect(container).toHaveTextContent(/자바스크립트 학습/)
  expect(container).toHaveTextContent(/타입스크립트 학습/)
})

REFACTOR...RED
// List가 완성되었으니 App에서도 List를 사용하도록 만든다.
export default function App() {
  return (
    <AppContainer>
      <h1>Todo</h1>
      <List />
    </AppContainer>
  );
}

// List가 tasks를 받지 않으므로 테스트가 깨진다. 따라서 테스트 코드에서 만들었던 tasks를 복사한다.
export default function App() {
  const tasks = [
    { id: '1', title: '자바스크립트 학습' },
    { id: '2', title: '타입스크립트 학습' },
  ];

  return (
    <AppContainer>
      <h1>Todo</h1>
      <List tasks={tasks} />
    </AppContainer>
  );
}
```

## 테스트 코드 작성하기: 2부

리액트의 관심사:

- 리액트의 관심사는 상태의 반영(state reflection)이다. 
- 리액트는 상태 관리(state management)에 관심이 없다. 
- 상태 관리는 리덕스가 할 수 있다.

```tsx
REFACTOR
// 리스트의 상태는 App의 관심사가 아니다. 리스트의 상태는 ListContainer가 관리하도록 하자.
export default function App() {
  const tasks = [
    { id: '1', title: '자바스크립트 학습' },
    { id: '2', title: '타입스크립트 학습' },
  ];

  return (
    <AppContainer>
      <h1>Todo</h1>
      <List tasks={tasks} />
    </AppContainer>
  );
}

RED
describe('ListContainer', () => {
  it('renders tasks', () => {
    const { container } = render((
      <ListContainer />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});

GREEN
export default function ListContainer() {
  const tasks = [
    { id: '1', title: '자바스크립트 학습' },
    { id: '2', title: '타입스크립트 학습' },
  ];

  return (
    <List tasks={tasks} />
  );
}

REFACTOR
// 우리가 원하는 건 tasks를 리덕스에서 가져오는 것이다.
```

```bash
npm i -D redux react-redux @types/react-redux
```

```tsx
REAFCTOR...RED
// redux의 useSelector 훅으로 tasks를 가져온다
export default function ListContainer() {
  const { tasks } = useSelector((state: any) => ({
    tasks: state.tasks
  }));

  return (
    <List tasks={tasks} />
  );
}

RED...GREEN
// 실제 useSelector를 가져오기 때문에 테스트가 깨진다.
// 함수를 조작하려면 함수를 가짜로 만들어야 한다. => __mocks__/react-redux.ts
describe('ListContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    tasks: [
      { id: '1', title: '자바스크립트 학습' },
      { id: '2', title: '타입스크립트 학습' },
    ],
  }));

  it('renders tasks', () => {
    const { container } = render((
      <ListContainer />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});

// __mocks__/react-redux.ts를 만든다
export const useDispatch = jest.fn();
export const useSelector = jest.fn();

// jest.mock('react-redux')
// useSelctor as jest.Mock<typeof useSelector>
jest.mock('react-redux');

describe('ListContainer', () => {
  (useSelector as jest.Mock<typeof useSelector>).mockImplementation((selector: any) => selector({
    tasks: [
      { id: '1', title: '자바스크립트 학습' },
      { id: '2', title: '타입스크립트 학습' },
    ],
  }));

  it('renders tasks', () => {
    const { container } = render((
      <ListContainer />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});
```

fixtures 사용하기

```tsx
REFACTOR
// 테스트에서 사용하는 tasks가 자주 반복되므로 fixtures/tasks.ts로 분리한다
export default [
  { id: '1', title: '자바스크립트 학습' },
  { id: '2', title: '타입스크립트 학습' },
];

// ListContainer.test.tsx
import tasks from '../../fixtures/tasks';

jest.mock('react-redux');

describe('ListContainer', () => {
  (useSelector as jest.Mock<typeof useSelector>)
    .mockImplementation((selector: any) => selector({
      tasks,
    }));

  it('renders tasks', () => {
    const { container } = render((
      <ListContainer />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});

// List.test.tsx
import tasks from '../../fixtures/tasks';

describe('List', () => {
  it('renders tasks', () => {
    const { container } = render((
      <List
        tasks={tasks}
      />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
    expect(container).toHaveTextContent(/타입스크립트 학습/);
  });
});
```

```tsx
REFACTOR...RED
// App에서 List가 아니라 ListContainer를 사용하도록 바꿔준다
const AppContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  border: 1px solid;
`;

export default function App() {
  return (
    <AppContainer>
      <h1>Todo</h1>
      <ListContainer />
    </AppContainer>
  );
}

GREEN
// App 안에서 ListContainer가 불릴 때 ListContainer 안에서 사용되는 useSelector가 모킹해줘야 테스트가 터지지 않는다.
import { useSelector } from 'react-redux';

import App from './App';

import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
  (useSelector as jest.Mock<typeof useSelector>)
    .mockImplementation((selector: any) => selector({
      tasks,
    }));

  it('renders title', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/Todo/);
  });

  it('renders tasks', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});
```

실제로 상태를 가져올 수 있도록 스토어 구현하기

```tsx
초기에 스토어에 있는 상태 자체를 App 컴포넌트가 그려줄 때 가져오도록 해야 한다

// 어떻게 가져올 것인지 코드를 사용하는 쪽에서 스펙을 먼저 확정해준다.
export default function App() {
  useEffect(() => {
    dispatch(setTasks(tasks));
  }, []);

  return (
    <AppContainer>
      <h1>Todo</h1>
      <ListContainer />
    </AppContainer>
  );
}

// 고정물, 디스패치에 전달할 액션 크리에이터 함수 등 필요한 것을 넣어준다.
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  setTasks,
} from './actions';

import ListContainer from './components/ListContainer';

import tasks from '../fixtures/tasks';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, []);

  return (
    <AppContainer>
      <h1>Todo</h1>
      <ListContainer />
    </AppContainer>
  );
}

RED
// actions가 구현되지 않아 테스트가 터진 것을 통과시켜준다.
// actions는 비동기 액션이 아닌 경우에는 너무 명확해서 테스트를 짜지 않고 바로 만들어준다.
// actions.js
export function setTasks(tasks) {
  return {
    type: 'setTasks',
    payload: {
      tasks,
    }
  }
}

export default {};

RED
// App에서 쓰느 dispatch가 실제로 동작하지 않아 테스트가 터진다.
// 이걸 통과시키기 위해서 일단 리듀서를 먼저 구현한다. => 리듀서 테스트 작성.
import reducer from './reducer';

import {
  setTasks,
} from './actions';

import tasks from '../fixtures/tasks';

describe('reducer', () => {
  describe('setTasks', () => {
    it('changes tasks array', () => {
      const state = reducer({
        tasks: [],
      }, setTasks(tasks));

      expect(state.tasks).not.toHaveLength(0);
    });
  });
});

GREEN
// reducer 테스트를 통과시키기 위해 reducer를 만들어준다
const initialState = {
  tasks: [],
};

export default function reducer(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: any,
): any {
  if (action.type === 'setTasks') {
    const { tasks } = action.payload;

    return {
      ...state,
      tasks,
    };
  }

  return state;
}


GREEN
// dispatch를 가짜 구현해서 App 테스트 통과시킨다
import { useSelector, useDispatch } from 'react-redux';

import App from './App';

import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockImplementation(() => dispatch);

  (useSelector as jest.Mock)
    .mockImplementation((selector: any) => selector({
      tasks,
    }));

  it('renders title', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/Todo/);
  });

  it('renders tasks', () => {
    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent(/자바스크립트 학습/);
  });
});
```

브라우저에서 확인하기 전에:

```tsx
// index.ts
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';

import store from './store';

const container = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , container,
);

// store.ts
import { createStore } from 'redux';

import reducer from './reducer';

const store = createStore(reducer);

export default store;
```

## @RESUME 테스트 코드 작성하기: 3부

BDD를 고려하여 List 컴포넌트 고도화하기: https://youtu.be/L1dtkLeIz-M?t=1468

---

Previously...
# React + TypeScript + Parcel

> [원문](https://github.com/ahastudio/CodingLife/tree/main/20211008/react)
## 실행만 해보기

```bash
npm ci

npm test

npm start
```

웹 브라우저로 확인: <http://localhost:8080/>

## 처음부터 따라하기

아래 내용은 이 프로젝트를 참고하되, 빈 폴더에서 진행하셔야 합니다.

기본적인 설정은
“[JavaScript 프로젝트 시작하기](https://j.mp/3FCU7C7)”
문서를 참고하세요.

### NPM 프로젝트 생성

```bash
npm init -y
```

### TypeScript 세팅

```bash
npm install --save-dev typescript

npx tsc --init
```

`package.json` 파일에 포함된 의존성:

```json
{
  "devDependencies": {
    "typescript": "^4.4.3"
  }
}
```

`tsconfig.json` 파일의 옵션 하나 수정:

```json
{
  "compilerOptions": {
    // ...(전략)...
    "jsx": "react-jsx",
    // ...(후략)...
  }
}
```

`pacakge.json` 파일에 `check` 명령 추가:

```json
{
  "scripts": {
    "check": "tsc --noEmit"
  }
}
```

TypeScript 컴파일 검사:

```bash
npm run check
```

### ESLint 세팅

```bash
npm install --save-dev eslint

npx eslint --init
```

```txt
? How would you like to use ESLint? …
❯ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
❯ JavaScript modules (import/export)

? Which framework does your project use? …
❯ React

? Does your project use TypeScript?
› Yes

? Where does your code run? …
✔ Browser

? How would you like to define a style for your project? …
❯ Use a popular style guide

? Which style guide do you want to follow? …
❯ Airbnb: https://github.com/airbnb/javascript

? What format do you want your config file to be in? …
❯ JavaScript

? Would you like to install them now with npm?
› Yes
```

`package.json` 파일에 포함된 의존성:

```json
{
  "devDependencies": {
    // ...(전략)...
    "@typescript-eslint/eslint-plugin": "^4.33.0",
    "@typescript-eslint/parser": "^4.33.0",
    "eslint": "^7.32.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.24.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.26.1",
    "eslint-plugin-react-hooks": "^4.2.0",
    // ...(후략)...
  }
}
```

`.eslintrc.js` 파일에 설정 추가:

```javascript
module.exports = {
  // ...(전략)...
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  // ...(중략)...
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    indent: ['error', 2],
    'no-trailing-spaces': 'error',
    curly: 'error',
    'brace-style': 'error',
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'no-whitespace-before-property': 'error',
    'func-call-spacing': 'error',
    'space-before-blocks': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-in-parens': ['error', 'never'],
    'block-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { mode: 'strict' }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }],
    'react/function-component-definition': ['error', {
      namedComponents: 'function-declaration',
      unnamedComponents: 'arrow-function',
    }],
  },
};
```

`pacakge.json` 파일에 `lint` 명령 추가:

```json
{
  "scripts": {
    // ...(전략)...
    "lint": "eslint --fix --ext .js,.jsx,.ts,.tsx src"
  }
}
```

Lint and fix all:

```bash
npm run lint
```

### React 설치

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

### React 기본 코드 작성

```bash
mkdir src
touch src/index.tsx
touch src/App.tsx
```

`src/App.tsx` 파일:

```tsx
export default function App() {
  return (
    <p>Hello, world!</p>
  );
}
```

`src/index.tsx` 파일:

```tsx
import * as ReactDOM from "react-dom";

import App from './App';

const container = document.getElementById('app');
ReactDOM.render(<App />, container);
```

## Jest 세팅

```bash
npm install --save-dev jest ts-jest @types/jest \
    @testing-library/react @testing-library/jest-dom
```

`jest.config.js` 파일 작성:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
};
```

`.eslintrc.js` 파일에 설정 추가:

```javascript
module.exports = {
  env: {
    // ...(전략)...
    jest: true,
  },
  // ...(후략)...
};
```

`src/App.test.tsx` 파일 작성:

```tsx
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders greeting message', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('Hello, world!');
  });
});
```

`pacakge.json` 파일에 `test` 명령 추가:

```json
{
  "scripts": {
    // ...(전략)...
    "test": "jest"
  }
}
```

Run tests:

```bash
npm test
```

### Parcel 설치

```bash
npm install --save-dev parcel
```

`pacakge.json` 파일에 `start` 명령 추가:

```json
{
  "scripts": {
    "start": "parcel index.html --port 8080",
    // ...(후략)...
  }
}
```

`.gitignore` 내용 추가:

```txt
/.parcel-cache/
/dist/
```

`index.html` 파일 작성:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Sample</title>
</head>
<body>
  <div id="app">
    Loading...
  </div>
  <script type="module" src="./src/index.tsx"></script>
</body>
</html>
```

Run web server for development:

```bash
npm start
```

웹 브라우저로 확인: <http://localhost:8080/>

### Visual Studio Code 세팅

`.vscode/settings.json` 파일에 설정 추가.

```bash
mkdir .vscode
touch .vscode/settings.json
```

```json
{
  "editor.rulers": [
    80
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
  },
  "[typescript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
  },
  "[typescriptreact]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
  },
}
```

