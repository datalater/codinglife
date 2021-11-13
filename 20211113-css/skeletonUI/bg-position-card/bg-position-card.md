# Skeleton UI: Multi Background Position

## 큰 그림

1. 형태를 먼저 잡는다.
2. 배치를 한다.
3. 애니메이션을 한다.

형태: 

1. 전체:
   1. 300px 250px로 이루어진 카드가 있다.
2. 상단:
   1. 이미지는 300px 200px을 차지한다.
3. 하단:
   1. 나머지 하단 50px은 원 아바타와 타이틀이 사용할 공간이다.
   2. 원 아바타는 지름이 38px이다. 공간이 50px이므로 나머지 남는 12px은 각각 마진 6px로 사용한다.
   3. 타이틀은 아바타보다 높이를 살짝 작게 해서 230px 34px을 차지한다. 원 아바타로부터 5px 오른쪽 마진을 준다. 이미지로부터 8px 위족 마진을 준다.

사이즈와 위치 정리(가운데 정렬):

1. 카드
   1. 사이즈: 300px 250px
2. 이미지
   1. 사이즈: 300px 200px
3. 원 아바타
   1. 사이즈: 38px at 19px 19px
   2. 위치: 
      1. (6px, 206px)
      2. (왼쪽 마진, 이미지 높이 200px로부터 6px 위쪽 마진)
4. 타이틀
   1. 사이즈: 230px 34px
   2. 위치: 
      1. (55px, 208px)
      2. (마진 포함 원 너비 50px로부터 왼쪽 마진 5px, 이미지 높이 200px로부터 8px 위쪽 마진)

## 작은 그림

**01 형태와 위치 잡은 것으로 배경 만들기**

배경의 레이어는 다음과 같다:

1. 첫번째 레이어: 컨테이너 전체를 왼쪽에서 오른쪽으로 반짝거리는 배경
2. 두번째 레이어: 이미지 직사각형 배경
3. 세번째 레이어: 아바타 원 배경
4. 네번째 레이어: 타이틀 직사각형 배경

```scss
.card {
  width: 300px;
  height: 250px;
  cursor: progress;
  /*
  1. 반짝이 (컨테이너 전체)
  2. 이미지 (직사각형)
  3. 아바타 (원)
  4. 타이틀 (직사각형)
  */
  background:
    linear-gradient(to right, transparent, #fff, transparent),
    linear-gradient(#eee, #eee),
    radial-gradient(38px circle at 19px 19px, #eee 50%, transparent 51%),
    linear-gradient(#eee, #eee);
  background-repeat: no-repeat;
  background-size: 
    300px 250px, 
    300px 200px, 
    50px 50px, 
    230px 34px;
  background-position: 
    -300px 0, 
    0 0, 
    6px 206px, 
    55px 208px;
}
```

**02 반짝거리는 효과를 주기 위해 애니메이션을 적용한다**

1. `오른쪽으로 반짝거리는 효과`를 주기 위해 두번째 베이스 레이어는 가만히 두고, 첫번째 레이어의 배경의 위치를 왼쪽에서 오른쪽으로 이동시킨다. 이는 `@keyframes` 애니메이션으로 구현한다.
2. `background-position`을 반짝이는 레이어 배경만 이동시키고 나머지 배경은 고정시킨다.

```scss
@keyframes loading {
  to {
    background-position: 
      300px 0, 
      0 0, 
      6px 206px, 
      55px 208px;
  }
}

.card {
  width: 300px;
  height: 250px;
  cursor: progress;
  /*
  1. 반짝이 (컨테이너 전체)
  2. 이미지 (직사각형)
  3. 아바타 (원)
  4. 타이틀 (직사각형)
  */
  background:
    linear-gradient(to right, transparent, #fff, transparent),
    linear-gradient(#eee, #eee),
    radial-gradient(38px circle at 19px 19px, #eee 50%, transparent 51%),
    linear-gradient(#eee, #eee);
  background-repeat: no-repeat;
  background-size: 
    300px 250px, 
    300px 200px, 
    50px 50px, 
    230px 34px;
  background-position: 
    -300px 0, 
    0 0, 
    6px 206px, 
    55px 208px;
  animation: loading 1.5s infinite;
}
```



## See also

- [CSS skeleton loading screen animation](https://dev.to/michaelburrows/css-skeleton-loading-screen-animation-gj3)
