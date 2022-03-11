# 고양이 사진첩

## 과제 요구 사항

- [x] 지금 구현된 코드에서는 state에 대한 정합성 체크를 전혀 하지 않는데, 이 부분을 보충해주세요.
  - [x] 컴포넌트별로 올바르지 않은 state를 넣으면 오류가 발생하도록 해주세요.
- [x] 각 컴포넌트의 setState를 최적화하여 이전 상태와 비교해서 변경사항이 있을 때만 render 함수를 호출하도록 최적화를 해봅니다.
- [x] 루트 탐색 중이 아닌 경우, 백스페이스 키를 눌렀을 때 이전 경로로
      이동하도록 만들어봅니다.

## 작업 준비

### 컴포넌트 설계

```
App     Breadcrumb
        Nodes
        ImageView
        Loading
```

- `App`: 모든 컴포넌트를 조율한다
- `Breadcrumb`: 현재 경로를 나타낸다
- `Nodes`
  - 디렉토리나 파일, 뒤로가기 버튼이 개별 node이다
  - Nodes는 전달받은 node 데이터에 따라 그린다
  - 루트 경로냐 아니냐에 따라 UI가 달라진다
- `ImageView`: 이미지를 볼 수 있다
- `Loading`: 로딩 중임을 알린다

## API 데이터 스키마

```ts
interface Node {
  id: string;
  name: string;
  type: "DIRECTORY" | "FILE";
  filePath: string | null;
  parent: null;
}
```

## 구현

### App 컴포넌트 안에 Nodes 컴포넌트를 렌더링하기

<details>
<summary><strong>App 컴포넌트 시나리오</strong></summary>

```js
App()
  PROPS
    $target

  STATE
    this.state
      isRoot: boolean // 루트 경로인지 아닌지에 대한 boolean 값
      nodes: []       // url에 대한 API 응답 데이터

  STATE-TO-RENDER
    this.setState = nextState =>
      this.state = nextState

      nodes.setState({
        isRoot: this.state.isRoot,
        nodes: this.state.nodes
      })

  SERVER-STATE
    // 하위 디렉토리에 대한 모든 파일 목록을 불러온다
    fetchNodes = async (id) => {
      nodes = await request(id ? `/${id}` : '/');

      ths.setState({
        ...this.state,
        nodes,
        isRoot: id ? false : true
      })
    }

  CALL
    fetchNodes()

  UI
    nodes = new Nodes({ $target, initialState, onClick })

=>
```

</details>

<details>
<summary><strong>App.js</strong></summary>

```js
export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: () => {},
  });

  const fetchNodes = async (id) => {
    const nodes = request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
    });
  };

  fetchNodes();
}
```

</details>

<details>
<summary><strong>Nodes 컴포넌트 시나리오</strong></summary>

```ts
Nodes()
  PROPS
    $target
    initialState
      isRoot: boolean
      nodes: []
    onClick: () => {}

  STATE
    this.state
      isRoot: boolean
      nodes: []

  STATE-TO-RENDER
    this.setState = nextState =>
      this.state = nextState
      this.render();

  CALL
    this.render()
    $target.appendChild(container)

  UI
    this.render = () =>
      { isRoot, nodes } = this.state

      isRoot ? <BackButton /> : ""
      nodes.map(<Node />)

  EVENT-TO-STATE
    container.addEventListener('click', (e) => {
      const $node = e.target.closest('.Node');

      const { id } = $node.dataset;

      isPrevClicked ? onPrevClick() : onNodeClick(id)
    })
=>
```

</details>

<details>
<summary><strong>Nodes.js</strong></summary>

```js
import { createElement } from "../utils/dom.js";
import {
  DATA_TYPE_ARRAY,
  DATA_TYPE_BOOLEAN,
  NODE_TYPE_DIRECTORY,
} from "../constants.js";

export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
  const $nodes = createElement("div", { class: "Nodes" });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;

    $nodes.innerHTML = `
      ${
        isRoot
          ? ""
          : `
        <div class="Node Prev">
          <img 
            src="https://cdn.roto.codes/images/prev.png" 
            alt="previous button"
          />
        </div>
      `
      }
      ${nodes
        .map(
          ({ id, type, name }) => `
        <div class="Node" data-id="${id}">
          ${
            type === NODE_TYPE_DIRECTORY
              ? '<img src="https://cdn.roto.codes/images/directory.png" alt="directory" />'
              : '<img src="https://cdn.roto.codes/images/file.png" alt="file" />'
          }
          <div>${name}</div>
        </div>        
      `
        )
        .join("")}
    `;
  };

  this.render();

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");

    if (!$node) {
      return;
    }

    if (Array.from($node.classList).includes("Prev")) {
      onPrevClick();
      return;
    }

    const { id } = $node.dataset;

    const clickedNode = this.state.nodes.find((node) => node.id === id);

    if (!clickedNode) {
      return;
    }

    onClick(clickedNode);
  });

  $target.appendChild($nodes);
}
```

</details>

<details>
<summary><strong>App.js: handleNodeClick</strong></summary>

```js
export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        await fetchNodes(node.id);
      }
    },
  });

  const fetchNodes = async (id) => {
    const nodes = request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
    });
  };

  fetchNodes();
}
```

</details>

### 이미지뷰어

<details>
<summary><strong>ImageViewer 컴포넌트 시나리오</strong></summary>

```ts
ImageViewer()
  PROPS
    $target
    initialState
    onClose

  STATE
    this.state
      imageUrl: string | null

  STATE-TO-RENDER
    this.setState = nextState =>
      this.state = nextState
      this.render();

  CALL
    this.render()
    $target.appendChild(container)

  UI
    this.render = () =>
      { imageUrl } = this.state

      container.style.display = imageUrl
        ? "block"
        : "none"

      <img src=${imageUrl} />

  EVENT-TO-STATE
    window.addEventListener('keyup', (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    })

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains("Modal")) {
        onClose()
      }
    })

=>
```

</details>

<details>
<summary><strong>ImageViewer.js</strong></summary>

```js
import { createElement } from "../utils/dom.js";

export default function ImageViewer({ $target, initialState, onClose }) {
  const $imageViewer = createElement("div", { class: "ImageViewer Modal" });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedImageUrl } = this.state;

    $imageViewer.style.display = selectedImageUrl ? "block" : "none";

    $imageViewer.innerHTML = `
      <div class="content">
        <img 
          src="${selectedImageUrl}" 
          alt="cat"
        />
      </div>
    `;
  };

  this.render();

  $target.appendChild($imageViewer);
}
```

</details>

<details>
<summary><strong>App.js: ImageViewer 추가</strong></summary>

```js
export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
    selectedImageUrl: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    imageViewer.setState({
      imageUrl: this.state.selectedImageUrl,
    });
  };

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        await fetchNodes(node.id);
      }

      if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedImageUrl: `htrtps://cat-api.roto.codes/static${node.filePath}`,
        });
      }
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    initialState: {
      imageUrl: this.state.selectedImageUrl,
    },
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  const fetchNodes = async (id) => {
    const nodes = request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
    });
  };

  fetchNodes();
}
```

</details>

### 뒤로가기 구현하기

```md
뒤로가기 구현하기

- 이전으로 가려면 지금 내가 누른 경로를 전부 알고 있어야 한다.
  - 상태를 추가한다: `state : { ...state, paths: [] }`
- 경로를 추가해야 하는 때는 노드에서 디렉토리 타입을 클릭할 때다.
  - handleNodeClick:`onClick: (node) => { if (type === directory) this.setState({ ...this.state, paths: [...this.state.paths, node] }) }`
- 뒤로 가려면 paths에서 마지막 요소(현재 경로)를 제거하고 그 전 경로를
  - handlePrevClick: `() => { paths.pop(); if (paths.length === 0) { fetchNodes() }; else { fetchNodes(paths[paths.length - 1].id) } }`
```

### 로딩 처리하기

<details>
<summary><strong>Loading 컴포넌트 시나리오</strong></summary>

```js
Loading()
  PROPS
    $target

  STATE
    this.state

  STATE-TO-RENDER
    this.setState = nextState =>
      this.state = nextState


  CALL

  UI

=>
```

</details>

## 작업 순서

> 아래 [준비물]을 보고 진행한다

1. Nodes 만들기
   1. `index.html`
      1. link:css
   2. `./src/main.js`
      1. new App
   3. ./src/App.js
      1. DUMMY_DATA from `https://cat-api.roto.codes`
      2. new Nodes
         1. initialState
            1. isRoot: true
            2. nodes: DUMMY_DATA
         2. onClick
   4. `./src/Nodes.js`
      1. $nodes
         1. = createElement('div')
         2. .classList.add('Nodes')
      2. this.render = () =>
         1. 루트이냐 아니냐
            1. 루트면 빈 문자열 렌더링
            2. 루트가 아니면 뒤로가기 버튼 렌더링 - [markup 참조]
         2. 노드가 디렉토리(`DIRECTORY`) 타입이냐 파일(`FILE`) 타입이냐
            1. 분기를 어디서 할지 think
            2. 각각 [markup 참조]
            3. 하위 div에 들어가는 텍스트는 node.name
   5. .src/App.js 더미 데이터 변경 후 테스트
      1. DUMMY_DATA_2 from `https://cat-api.roto.codes/1`
      2. initialState
         1. isRoot: false
         2. nodes: DUMMY_DATA_2
2. API 붙여서 노드 목록 불러오기
   1. `./src/api.js`
      1. API_END_POINT = 'https://cat-api.roto.codes'
      2. request
         1. async/await
         2. try-catch
         3. throw new Error('API Call Fail')
   2. `./src/App.js`
      1. 더미데이터 삭제
      2. this.state =
         1. isRoot: true
         2. nodes: []
      3. new Nodes
         1. initialState
            1. isRoot: this.state.isRoot
            2. nodes: this.state.nodes
      4. this.setState = (nextState) =>
         1. this.state = nextState
         2. nodes.setState
            1. isRoot: this.state.isRoot
            2. nodes: this.state.nodes
      5. fetchNodes = async (id) =>
         1. id가 있으면 해당 id 문서를 불러오고 없으면, 루트 문서를 불러온다
         2. this.setState
            1. ...this.state
            2. nodes
            3. isRoot:
      6. fetchNodes()
3. 노드를 클릭하면 탐색하는 처리해주기
   1. `/src/Nodes.js`
      1. 이벤트 추가: 클릭
         1. 클릭 지점의 가장 가까운 노드를 가져온다
         2. 뒤로가기에 대한 처리
         3. 클릭된 노드에 대한 onClick 처리
            1. 클릭된 노드가 디렉토리 타입이면
               1. fetchNode(node.id)
4. 이미지 뷰어 추가
   1. `/src/ImageViewer.js`
      1. 이미지 url이 있으면 모달이 튀어나오게 하고 없으면 사라지게 한다
      2. 모달 클래스 추가: Modal
         1. 모달로 오버레이하기 위해 추가한다
      3. initialState
         1. selectedImageUrl
      4. 렌더
         1. 마크업 참조
5. 이미지 뷰어 App에서 그리기
   1. . `/src/App.js`
      1. new imageViewer
      2. initialState
         1. ...this.state,
         2. selectedImageUrl
6. 이미지 뷰어 닫히는 기능 만들기
   1. `/src/App.js`
      1. onClose: () =>
         1. 닫는 기능을 만들 때 `$imageViewer.style.display = none`으로 하는 게 아니라 상태를 이용해서 한다.
         2. this.setState
            1. ...this.state
            2. selectedImageUrl: null
   2. `/src/ImageViewer.js`
      1. 이벤트: keyup
         1. window에 Escape 눌리면 onClose()
      2. 이벤트: click
         1. imageViewer에서 클릭된 곳이 Modal 클래스를 가진 곳이라면 onClose()
7. 뒤로가기 구현하기
   1. `/src/App.js`
      1. 상태 추가
         1. this.state =
            1. ...this.state
            2. paths: []
         2. new Nodes
            1. ...
            2. onClick: () =>
               1. 디렉토리 타입일 경우 node를 path에 추가
            3. onPrevClick: () =>
               1. paths.pop()
               2. paths의 길이가 0이면 루트 디렉토리로 이동
               3. paths의 길이가 0이 아니면 이전 디렉토리 id로 이동(fetchNodes(id))
8. 로딩 중 UI 보여주기
   1. `/src/Loading.js`
      1. 요소 생성
         1. div.Loading+Modal
      2. 상태 추가
         1. this.state =
            1. isLoading: false
   2. `/src/App.js`
      1. new Loading
      2. fetchNodes
         1. this.setState
            1. ...
            2. isLoading: true
         2. this.setState
            1. ...
            2. isLoading: false
9. 브레드크럼 만들기
   1. `/src/Breadcrumb.js`
      1. 요소 생성
         1. nav.Breadcrumb
      2. 상태
         1. this.state
            1. paths
      3. 렌더
         1. 마크업 참조
         2. Root는 기본으로 박아두기
10. 브레드크럼 클릭하면 바로 이동하기
    1. `/src/App.js`
       1. onClick: (id) =>
          1. fetchNodes(id)

## 최종 정리

1. 요구사항을 잘 보고 어떤 컴포넌트를 만들고 조합할지 한번 정리하고 코드 작성하기
   1. 화면에서 컴포넌트끼리 어떻게 유기적으로 동작을 할지를 고민해보고 코드 작성하기
   2. 컴포넌트끼리 최대한 의존성이 없는 구조로 만들기
   3. App.js 같은 곳에서 전체 상태를 갖고 있고 다른 컴포넌트들은 상태를 내려받아서 상태 변화에 따라서 컴포넌트가 변화되도록 그런 흐름 만들기
   4. 흐름에 대한 이해가 중요하다. 이렇게 데이터가 흘러가면서 흘러간 데이터가 컴포넌트의 상태를 묘사하고, 이 묘사한 상태에 따라서 컴포넌트가 어떻게 바뀐다, 라는 거를 머릿속에 항상 그리고 있어야 한다. 그러면 컴포넌트 베이스 라이브러리나 프레임워크는 정말 금방 익힌다.

## 준비물

**컴포넌트 구조**

```
App     Breadcrumb
        Nodes
        ImageView
        Loading
```

- `App`: 모든 컴포넌트를 조율한다
- `Breadcrumb`: Breadcrumb을 그린다
- `Nodes`
  - 디렉토리나 파일이 개별 node이다
  - Nodes는 전달받은 node 데이터에 따라 그린다
- `ImageView`: 이미지를 볼 수 있다
- `Loading`: 로딩 중임을 알린다

**CSS CDN**

```
https://cdn.roto.codes/css/cat-photos.css
```

**markup**:

```html
<!-- 브레드크럼 -->
<nav class="Breadcrumb">
  <div>root</div>
  <div>노란 고양이</div>
</nav>

<!-- 디렉토리 -->
<div class="Node">
  <img src="https://cdn.roto.codes/images/directory.png" />
  <div>2021/04</div>
</div>

<!-- 파일 -->
<div class="Node">
  <img src="https://cdn.roto.codes/images/file.png" />
  <div>하품하는 사진</div>
</div>

<!-- 이미지뷰어 -->
<div class="ImageViewer Modal">
  <div class="content">
    <img src="https://cat-api.roto.codes/static/..." />
  </div>
</div>

<!-- 뒤로 가기 -->
<div class="Node">
  <img src="https://cdn.roto.codes/images/prev.png" />
</div>

<!-- 로딩 -->
<div class="Loading Modal">
  <div class="content">
    <img
      width="100%"
      src="https://cdn.roto.codes/images/nyan-cat.gif"
      alt="Loading..."
    />
  </div>
</div>
```
