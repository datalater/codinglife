# Skeleton UI: Background Position 

## 큰 그림

1. 직사각형 div의 배경색을 `베이스 회색`과 `반짝거리는 효과를 줄 선형 그레디언트 색상` 두 가지 레이어로 쌓는다.
2. `반짝 거리는 효과를 줄 선형 그레디언트`에 `background-position`으로 애니메이션을 준다

## 작은 그림

**01 직사각형 div의 배경색을 두 가지 레이어로 쌓는다**

아래에 깔리는 베이스 레이어는 회색이다. 위에 애니메이션으로 움직일 레이어는 오른쪽으로 (투명, 흰색, 투명)으로 이어지는 선형 그레디언트 색상이다.

```scss
.poster {
  width: 300px;
  height: 200px;
  cursor: progress;
  background: 
    linear-gradient(to right, transparent, #fff, transparent),
    linear-gradient(#eee, #eee);
}
```

**02 반짝거리는 효과를 주기 위해 애니메이션을 적용한다**

1. `오른쪽으로 반짝거리는 효과`를 주기 위해 두번째 베이스 레이어는 가만히 두고, 첫번째 레이어의 배경의 위치를 왼쪽에서 오른쪽으로 이동시킨다. 이는 `@keyframes` 애니메이션으로 구현한다.
2. 그런데 여기서 첫번째 그레디언트 레이어가 이동할 때 베이스 레이어도 같이 움직이는 느낌이 나서 어색하다. 이는 배경색이 반복되어 나타나는 부작용이다. 따라서 `background-repeat: no-repeat`을 적용하여 그레디언트가 전체로 stretch 하도록 만든다.
3. 그리고 현재 반짝이 레이어(첫번째 레이어)는 빛이 나는 부분(`#fff`)이 가운데에 있으므로 가장 왼쪽으로 당겨준다. `background-position: -300px 0, 0 0;`을 적용하여 첫번째 레이어는 너비만큼 왼쪽으로 이동시키고 두번째 베이스 레이어는 그대로 위치를 유지한다.
4. 배경의 크기도 전체 너비와 높이를 채우도록 명시적으로 적어준다.

```scss
@keyframes loading {
  to {
    background-position: 300px 0, 0 0; // 1
  }
}

.poster {
  width: 300px;
  height: 200px;
  cursor: progress;
  background: 
    linear-gradient(to right, transparent, #fff, transparent),
    linear-gradient(#eee, #eee);
  background-repeat: no-repeat; // 2
  background-size: 300px 200px, 300px 200px; // 4
  background-position: -300px 0, 0 0; // 3
  animation: loading 1.5s infinite;
}
```



## See also

- [CSS skeleton loading screen animation](https://dev.to/michaelburrows/css-skeleton-loading-screen-animation-gj3)
