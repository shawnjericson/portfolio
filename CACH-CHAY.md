# Portfolio — bản Next.js

Giải nén **ngay tại thư mục `portfolio-creation`**, chọn ghi đè khi Windows hỏi.

## File mới
- `lib/portfolio.ts` — toàn bộ nội dung song ngữ và danh mục ảnh
- `app/portfolio.css` — bộ giao diện, CSS thuần, không đụng tới Tailwind
- `components/portfolio/lang.tsx` — bộ đổi ngôn ngữ, **mặc định tiếng Anh**
- `components/portfolio/ui.tsx` — nền B+tree, thanh menu, bảng lọc, khung phóng ảnh
- `public/shots/**` — 186 tệp ảnh (93 màn hình, mỗi cái hai cỡ)

## File bị ghi đè
`app/layout.tsx`, `app/page.tsx`, `app/projects/[slug]/page.tsx`, `lib/projects.ts`

Bản cũ nằm nguyên trong `backup-truoc-khi-sua/`. Muốn quay lại thì chép ngược ra.

## Chạy thử
```
npm run dev
```
Mở http://localhost:3000

## Dựng bản tĩnh để deploy
```
npm run build
```
Ra thư mục `out/`, đẩy lên VPS là xong.

## Vài chỗ nên biết
- Trang mở mặc định **tiếng Anh**. Ai bấm sang tiếng Việt thì trình duyệt nhớ, lần sau vào vẫn tiếng Việt.
- Ảnh có hai cỡ: bản 800px cho lưới, bản 2400px cho lúc phóng to. Trình duyệt tự chọn qua `srcset`, nên lưới nhẹ mà phóng ra vẫn nét trên màn retina.
- Nút **Tải CV** chưa gắn file. Bỏ file PDF vào `public/` rồi sửa thành thẻ `<a href="/ten-file.pdf" download>` trong `components/portfolio/ui.tsx`, hàm `Contact`.
- Cây B+tree ở nền là thật, không phải ảnh động. Nó chèn khoá, tách nút, cao thêm tầng. Rê chuột xuống chân trang thì nó sáng lên.
