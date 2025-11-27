# 📧 Email Setup Guide for WildHammer

## 🔧 Environment Variables Setup

สร้างไฟล์ `.env.local` ใน root directory และเพิ่มการตั้งค่าดังนี้:

```bash
# Database Configuration
DB_HOST=54.169.126.235
DB_PORT=3306
DB_USER=appuser
DB_PASSWORD=nickyshox
DB_NAME=backoffice

# Database URL for connection pooling
DATABASE_URL=mysql://appuser:nickyshox@54.169.126.235:3306/backoffice

# API Configuration
BASE_URL=https://boapi.wildhammer.online
TOKEN=bigohm

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Settings
EMAIL_FROM=noreply@wildhammer.online
EMAIL_FROM_NAME=WildHammer Team
EMAIL_REPLY_TO=support@wildhammer.online

# Frontend URL for verification links
NEXT_PUBLIC_BASE_URL=http://localhost:3500
```

## 📮 SMTP Provider Options

### 1. Gmail SMTP (แนะนำ)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # ใช้ App Password ไม่ใช่รหัสผ่านปกติ
```

**วิธีสร้าง App Password สำหรับ Gmail:**
1. ไปที่ Google Account Settings
2. Security → 2-Step Verification (เปิดใช้งานก่อน)
3. App passwords → Generate app password
4. เลือก "Mail" และ "Other"
5. คัดลอก App Password มาใส่ใน `SMTP_PASS`

### 2. Outlook/Hotmail SMTP
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### 3. Custom SMTP (Hosting Provider)
```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
```

## 🧪 Testing Email Configuration

### 1. Test SMTP Connection
```bash
curl -X GET http://localhost:3500/api/test-email
```

### 2. Test Email Sending
```bash
curl -X POST http://localhost:3500/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "testType": "connection"}'
```

### 3. Send Test Verification Email
```bash
curl -X POST http://localhost:3500/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "testType": "verification"}'
```

## 🔍 Troubleshooting

### ❌ Common Issues:

1. **Authentication Failed**
   - ตรวจสอบ username/password
   - สำหรับ Gmail ใช้ App Password
   - ตรวจสอบ 2FA settings

2. **Connection Timeout**
   - ตรวจสอบ SMTP_HOST และ SMTP_PORT
   - ตรวจสอบ firewall settings
   - ลองเปลี่ยน SMTP_PORT เป็น 465 และ SMTP_SECURE=true

3. **TLS/SSL Issues**
   - ตรวจสอบ SMTP_SECURE setting
   - Port 587 = false, Port 465 = true

### ✅ Success Indicators:
- Console แสดง "📧 EMAIL SENT SUCCESSFULLY"
- ได้รับ email verification ใน inbox
- API response มี `email_sent: true`

## 📋 Email Templates

ระบบจะส่ง HTML email ที่มี:
- 🎨 Beautiful design with WildHammer branding
- 🔗 Verification button
- 📱 Mobile responsive
- 🌐 Thai language support
- 🔒 Security information

## 🚀 Production Setup

สำหรับ production:
1. เปลี่ยน `NEXT_PUBLIC_BASE_URL` เป็น domain จริง
2. ใช้ dedicated email service (SendGrid, Mailgun, etc.)
3. ตั้งค่า DKIM/SPF records
4. Monitor email delivery rates

## 📞 Support

หากมีปัญหาการตั้งค่า email:
- ตรวจสอบ console logs
- ทดสอบ SMTP connection ก่อน
- ใช้ test-email API เพื่อ debug
- ตรวจสอบ spam folder
