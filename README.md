# Nihongo Kawaii

Web học tiếng Nhật với giao diện pastel anime, roadmap rõ ràng, tổng hợp ngữ pháp theo JLPT, và mini mock test có chấm điểm.

## Cấu trúc

```text
vocab-lab/
  client/
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      data.js
      styles.css
      state/
        useVocabState.js
      components/
        Layout.jsx
        Navigation.jsx
      pages/
        HomePage.jsx
        RoadmapPage.jsx
        GrammarPage.jsx
        JlptPage.jsx
        ProgressPage.jsx
  server/
    index.js
    routes/
      api.js
  package.json
  README.md
```

## Tính năng chính

- Trang chủ giới thiệu flow học
- Roadmap từ N5 đến N1
- Ngữ pháp theo level, có ví dụ và ghi chú
- JLPT mini mock test theo level
- Chấm điểm tự động, lưu lịch sử làm bài
- Giao diện sáng, đơn giản, dễ thương

## Chạy dự án

```bash
npm install
npm run dev
```c

- Client: `http://localhost:5173`
- Server: `http://localhost:3001`

## API

- `GET /api/study-hub`
- `GET /api/jlpt/:level`

