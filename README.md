# Inbox

불필요한 파일 삭제하기:

```bash
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```
