# L’Aura Studio — Premium Build

## Files
- index.html: trang chính
- style.css: toàn bộ giao diện responsive
- script.js: account, blog, comments, booking, admin và Portfolio CMS
- service-*.html: 6 trang dịch vụ

## Admin demo
- Email: admin@studio.com
- Password: 123456

## Portfolio CMS
Admin > Portfolio cho phép thêm, sửa, xóa ảnh, chọn danh mục, bố cục và trang hiển thị. Dữ liệu được lưu bằng localStorage.

## Quan trọng khi deploy production
Bản này phù hợp website tĩnh/GitHub Pages nhưng account/admin/booking dùng localStorage hoặc sessionStorage. Đây không phải cơ chế xác thực bảo mật cho production và dữ liệu không đồng bộ giữa các thiết bị. Muốn vận hành thật, hãy chuyển Auth + Database + Storage sang backend (ví dụ Supabase/Firebase hoặc API riêng), không đặt secret/API key đặc quyền trong JavaScript frontend.

## Deploy GitHub Pages
Upload toàn bộ file trong thư mục này vào repository, giữ index.html ở root rồi bật Pages.


## Bình luận
- Người dùng đăng nhập có thể xóa bình luận của chính mình.
- Admin có tab Bình luận và có thể xóa mọi bình luận.
- Dữ liệu hiện lưu bằng localStorage; production nên chuyển sang backend với kiểm tra quyền phía server.
