# Inbox

불필요한 파일 삭제하기:

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

특정 폴더만 제외하고 복사하기:

```bash
rsync -av --progress <source/> <dest> --exclude .git --exclude node_modules --exclude practice

# source/ 처럼 뒤에 trailling slash가 붙어야 동일한 내용으로 디렉토리 이름만 바꿔서 복사한다.
# -a: recursively
# -v: verbose
```
