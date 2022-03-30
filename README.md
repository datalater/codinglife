# Coding Life

## 자주 사용하는 명령어

### 서브모듈 추가하기

> [git-scm](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)

```bash
# add
git submodule add <URL>

# rename

git mv search-lang 20220313-search-lang
```

### 불필요한 파일 삭제하기

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

### 특정 폴더만 제외하고 복사하기

```bash
rsync -av --progress <source/> <dest> --exclude .git --exclude node_modules --exclude practice

# source/ 처럼 뒤에 /를 붙이면 source 폴더 내부에 있는 파일들을 복사하고
# source 처럼 뒤에 /를 붙이지 않으면 디렉토리를 통째로 복사한다
# -a: recursively
# -v: verbose
```

### 저장소 필터링하기

```bash
# 설치
brew install git-filter-repo

# 디렉토리 삭제
git-filter-repo --invert-paths --path <삭제할-디렉토리> --force
```
