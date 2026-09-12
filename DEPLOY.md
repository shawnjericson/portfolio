# Hướng dẫn Deploy lên Nginx

## Bước 1: Build project

```bash
npm run build
```

Sau khi build thành công, tất cả các file static sẽ được tạo trong thư mục `out/`.

## Bước 2: Upload files lên server

Upload toàn bộ nội dung trong thư mục `out/` lên thư mục web root của nginx (thường là `/var/www/html` hoặc `/usr/share/nginx/html`).

Bạn có thể sử dụng:
- **SCP**: `scp -r out/* user@server:/var/www/html/`
- **SFTP**: Upload qua FileZilla hoặc WinSCP
- **rsync**: `rsync -avz out/ user@server:/var/www/html/`

## Bước 3: Cấu hình Nginx

Tạo hoặc chỉnh sửa file cấu hình nginx (thường ở `/etc/nginx/sites-available/default` hoặc `/etc/nginx/conf.d/default.conf`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Handle Next.js static files (CRITICAL for CSS/JS)
    location /_next/static/ {
        alias /var/www/html/_next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Ensure CSS files are served with correct MIME type
    location ~* \.css$ {
        add_header Content-Type text/css;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Handle static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Handle all routes - SPA fallback
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    # Handle 404
    error_page 404 /404.html;
}
```

## Bước 4: Kiểm tra và reload nginx

```bash
# Kiểm tra cấu hình
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Bước 5: Cấu hình SSL (Tùy chọn - Khuyến nghị)

Nếu bạn muốn sử dụng HTTPS, cài đặt Let's Encrypt:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Lưu ý quan trọng

1. **Quyền truy cập**: Đảm bảo nginx có quyền đọc files:
   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

2. **Firewall**: Mở port 80 và 443 (nếu dùng SSL):
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. **Kiểm tra logs**: Nếu có lỗi, kiểm tra logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

## Cấu trúc thư mục sau khi deploy

```
/var/www/html/
├── index.html          # Trang chủ
├── 404.html            # Trang 404
├── _next/              # Next.js static files
├── projects/           # Các trang project
│   ├── huyen-hoc-van-an/
│   ├── global-heritage/
│   └── ...
└── [các file ảnh và assets]
```

## Troubleshooting

- **404 errors**: Kiểm tra `try_files` directive trong nginx config
- **CSS/JS không load**: Kiểm tra đường dẫn `/_next/static/` và quyền truy cập
- **Images không hiển thị**: Kiểm tra đường dẫn trong thư mục `public/` đã được copy chưa


