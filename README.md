# Inbox

불필요한 파일 삭제하기:

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

특정 폴더만 제외하고 복사하기:

```bash
rsync -av --progress <source> <dest> --exclude .git --exclude node_modules --exclude practice
```
