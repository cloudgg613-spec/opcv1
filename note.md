# OPC Store — Ghi chú dự án (đọc file này trước khi code)

> File này là "bộ nhớ" của dự án. Mỗi khi bắt đầu phiên làm việc mới, đọc file này trước để nắm ngữ cảnh, tránh hỏi lại hoặc code sai quy ước đã chốt. Mỗi khi có quyết định mới / đổi hướng, PHẢI cập nhật lại file này ngay.

---

## 1. Tổng quan dự án

- **Tên shop**: OPC Store
- **Loại web**: Website cá nhân trưng bày sản phẩm (KHÔNG có giỏ hàng, KHÔNG có thanh toán online) — web tĩnh giới thiệu sản phẩm, khách xem rồi liên hệ ngoài web để mua.
- **Ngành hàng**: Card game — chỉ xoay quanh 2 dòng sản phẩm: **One Piece** và **Pokémon**.
- **Mục tiêu deploy**: Next.js, hosting trên Vercel free tier.

---

## 2. Tech stack (CỐ ĐỊNH — không tự ý đổi thư viện khác)

| Thành phần | Công nghệ |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Theme | Dark mode mặc định (không cần toggle light/dark) |
| CMS sản phẩm | Sanity.io (free tier) |
| Ảnh sản phẩm | Lưu trong Sanity (upload qua Sanity Studio admin) |
| Ảnh tĩnh (logo, banner, ảnh giới thiệu) | Lưu trong `/public` của repo Next.js |
| Form liên hệ | Resend hoặc Formspree (free tier) — gửi email tự động |
| Chatbot | Dify tự host — nhúng qua iframe/script embed (floating widget) |
| Hosting | Vercel free tier |

---

## 3. Cấu trúc trang (Sitemap)

### Trang chủ `/`
Thứ tự từ trên xuống:
1. **Header**: logo (trái) + menu ngang (Trang chủ / One Piece / Pokémon) — theo đúng ảnh mẫu gốc.
2. **Section giới thiệu shop**: tên shop + đoạn mô tả ngắn, phía sau là nền chạy slideshow tự động 3-4 ảnh (ảnh này là ảnh tĩnh, nằm trong `/public`).
3. **Section sản phẩm nổi bật**: hiển thị vài sản phẩm **random thật** — random lại mỗi lần khách load trang (không phải random 1 lần lúc build). Lấy ngẫu nhiên từ cả 2 collection One Piece + Pokémon. → Cần fetch dữ liệu **client-side** hoặc set no-cache, KHÔNG dùng static generation/ISR cache cho phần này.
4. **Section liên hệ**: kết hợp CẢ HAI — (a) thông tin tĩnh (SĐT, Zalo, Facebook, địa chỉ...) và (b) form liên hệ có gửi email tự động qua Resend/Formspree.
5. **Chatbox Dify**: floating widget hiển thị xuyên suốt mọi trang (không chỉ trang chủ).

### Trang `/one-piece` và `/pokemon`
- Dùng chung 1 component layout, chỉ khác `category` filter khi query Sanity.
- **Filter có sẵn**:
  - Loại sản phẩm: Thẻ bài / Box / Phụ kiện
  - Tình trạng: Còn hàng / Hết hàng
- Hiển thị dạng lưới (grid) card sản phẩm.
- **Click vào 1 sản phẩm → mở modal/popup** hiển thị đầy đủ thông tin (tên, giá, mô tả, tình trạng, rarity, gallery nhiều ảnh). **KHÔNG chuyển sang trang chi tiết riêng** — đây là quyết định đã chốt, đừng tự ý đổi thành route riêng `/product/[slug]`.

---

## 4. Sanity Schema — Product (đã chốt, không tự thêm/bớt field)

```
Product {
  name: string
  slug: slug
  category: 'one-piece' | 'pokemon'
  type: 'card' | 'box' | 'accessory'
  price: number
  description: text
  inStock: boolean
  rarity: string (optional — chủ yếu áp dụng cho type = 'card')
  images: array of images (gallery — ảnh đầu tiên trong mảng = ảnh đại diện/thumbnail)
}
```

---

## 5. Các quyết định quan trọng đã chốt (tránh làm sai lại)

- ❌ KHÔNG có giỏ hàng, KHÔNG có checkout/thanh toán.
- ✅ Ảnh sản phẩm → Sanity. Ảnh tĩnh (logo/banner) → repo `/public`. KHÔNG lẫn lộn hai loại này.
- ✅ Random sản phẩm nổi bật ở trang chủ là random **mỗi lần load trang thật sự** (client-side), không phải cố định theo build.
- ✅ Click sản phẩm mở **modal popup**, không phải trang riêng.
- ✅ Form liên hệ phải **tự động gửi email** thật (qua Resend/Formspree), không chỉ là mailto: link.
- ✅ Menu chính chỉ có 3 mục: Trang chủ / One Piece / Pokémon — đúng như ảnh mẫu gốc, không tự thêm mục khác trừ khi được yêu cầu.
- ✅ Dark mode là theme duy nhất, không cần light mode toggle.

---

## 6. Việc cần chuẩn bị (do người dùng, không phải AI)

- [ ] Tạo tài khoản Sanity.io + project
- [ ] Tạo tài khoản Vercel
- [ ] Đăng ký Resend hoặc Formspree, lấy API key
- [ ] Chuẩn bị: logo, 3-4 ảnh nền cho slideshow giới thiệu
- [ ] Thông tin liên hệ thật: SĐT / Zalo / Facebook / địa chỉ
- [ ] Đoạn code embed Dify chatbot (script/iframe) từ server Dify đã tự host

---

## 7. Thứ tự triển khai

1. Setup Next.js + Tailwind + dark mode base UI theo ảnh mẫu
2. Setup Sanity Studio + schema Product + kết nối vào Next.js
3. Build trang chủ: header, giới thiệu + slideshow, random products, contact section
4. Build trang One Piece / Pokémon: filter + grid + modal chi tiết sản phẩm
5. Tích hợp form liên hệ (Resend/Formspree) + nhúng Dify chatbox
6. Deploy Vercel, gắn domain nếu có

---

## 8. Lệnh hay dùng

```bash
npm run dev        # chạy dev server local
npm run build       # build production
npm run lint         # kiểm tra lint
```

(Cập nhật thêm lệnh Sanity Studio khi setup xong, ví dụ `npx sanity dev`, `npx sanity deploy`.)

---

## 9. Trạng thái hiện tại

> Cập nhật mục này sau mỗi phiên làm việc — ghi rõ đã làm tới đâu, đang dở phần nào, việc tiếp theo là gì.

- [x] **Bước 1**: Setup Next.js 14 (App Router) + TypeScript + Tailwind CSS, cấu hình dark mode mặc định (Đã hoàn thành).
- [x] **Bước 2**: Setup Sanity Studio + schema Product + kết nối vào Next.js (Đã hoàn thành).
- [x] **Bước 3**: Build trang chủ: header, giới thiệu + slideshow, random products, contact section (Đã hoàn thành).
- [x] **Bước 4**: Build trang One Piece / Pokémon: filter + grid + modal chi tiết sản phẩm (Đã hoàn thành).
- [x] **Bước 5**: Tích hợp form liên hệ (Resend/Formspree) + nhúng Dify chatbox (Đã hoàn thành).
- [x] **Bước 6**: Deploy Vercel, gắn domain (Đã hoàn thiện cấu hình `vercel.json` & `.env.example`, sẵn sàng deploy Vercel 100%).
