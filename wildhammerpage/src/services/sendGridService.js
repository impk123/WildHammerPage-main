/**
 * SendGrid Email Service for WildHammer
 * Free: 100 emails per day
 */

const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Email settings
const emailSettings = {
  from: process.env.EMAIL_FROM || 'noreply@wildhammer.online',
  fromName: process.env.EMAIL_FROM_NAME || 'WildHammer Team',
  replyTo: process.env.EMAIL_REPLY_TO || 'support@wildhammer.online',
};

// Email templates
const emailTemplates = {
  verification: {
    subject: '🎮 ยืนยันอีเมลของคุณ - WildHammer',
    html: (email, verificationUrl, token) => `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ยืนยันอีเมล - WildHammer</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #f59e0b;
            margin-bottom: 10px;
          }
          .title {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .button:hover {
            background: linear-gradient(135deg, #2563eb, #7c3aed);
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
          }
          .token-info {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            word-break: break-all;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">⚔️ WildHammer</div>
            <h1 class="title">ยืนยันอีเมลของคุณ</h1>
          </div>
          
          <div class="content">
            <p>สวัสดี!</p>
            <p>ขอบคุณที่สนใจเกม <strong>WildHammer</strong> และลงทะเบียนรับข้อมูลข่าวสารจากเรา</p>
            
            <p>เพื่อยืนยันการลงทะเบียน กรุณาคลิกปุ่มด้านล่าง:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">
                🎮 ยืนยันอีเมล
              </a>
            </div>
            
            <p>หรือคัดลอกลิงก์นี้ไปวางในเบราว์เซอร์:</p>
            <p style="word-break: break-all; color: #3b82f6;">
              <a href="${verificationUrl}">${verificationUrl}</a>
            </p>
            
            <div class="token-info">
              <strong>Token สำหรับการยืนยัน:</strong><br>
              ${token}
            </div>
            
            <p><strong>หมายเหตุ:</strong></p>
            <ul>
              <li>ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง</li>
              <li>หากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่ออีเมลนี้</li>
              <li>หากมีปัญหาการยืนยัน กรุณาติดต่อทีมสนับสนุน</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2025 HunterDev. สงวนลิขสิทธิ์.</p>
            <p>WildHammer - เกม RPG การผจญภัยที่เต็มไปด้วยความสนุก</p>
            <p>📧 <a href="mailto:${emailSettings.replyTo}">${emailSettings.replyTo}</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: (email, verificationUrl, token) => `
      ยืนยันอีเมลของคุณ - WildHammer
      
      สวัสดี!
      
      ขอบคุณที่สนใจเกม WildHammer และลงทะเบียนรับข้อมูลข่าวสารจากเรา
      
      เพื่อยืนยันการลงทะเบียน กรุณาคลิกลิงก์นี้:
      ${verificationUrl}
      
      Token สำหรับการยืนยัน: ${token}
      
      หมายเหตุ:
      - ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง
      - หากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่ออีเมลนี้
      - หากมีปัญหาการยืนยัน กรุณาติดต่อทีมสนับสนุน
      
      © 2025 HunterDev. สงวนลิขสิทธิ์.
      WildHammer - เกม RPG การผจญภัยที่เต็มไปด้วยความสนุก
    `
  }
};

// Main SendGrid service
const sendGridService = {
  /**
   * Send verification email using SendGrid
   * @param {string} to - Recipient email address
   * @param {string} verificationUrl - Verification URL
   * @param {string} token - Verification token
   * @returns {Promise<Object>} - Result object
   */
  async sendVerificationEmail(to, verificationUrl, token) {
    try {
      if (!SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY is not configured');
      }

      const msg = {
        to: to,
        from: {
          email: emailSettings.from,
          name: emailSettings.fromName
        },
        replyTo: emailSettings.replyTo,
        subject: emailTemplates.verification.subject,
        text: emailTemplates.verification.text(to, verificationUrl, token),
        html: emailTemplates.verification.html(to, verificationUrl, token),
      };

      const result = await sgMail.send(msg);
      
      console.log('📧 SendGrid email sent successfully:', {
        messageId: result[0].headers['x-message-id'],
        to: to,
        subject: msg.subject,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        messageId: result[0].headers['x-message-id'],
        message: 'SendGrid email sent successfully'
      };

    } catch (error) {
      console.error('❌ SendGrid email sending failed:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send SendGrid email'
      };
    }
  },

  /**
   * Test SendGrid configuration
   * @returns {Promise<Object>} - Test result
   */
  async testConnection() {
    try {
      if (!SENDGRID_API_KEY) {
        return {
          success: false,
          error: 'SENDGRID_API_KEY is not configured',
          message: 'SendGrid API key is missing'
        };
      }

      // Test with a simple API call
      const testMsg = {
        to: 'test@example.com',
        from: emailSettings.from,
        subject: 'Test',
        text: 'Test',
        html: '<p>Test</p>',
      };

      // Don't actually send, just validate
      sgMail.validate(testMsg);
      
      console.log('✅ SendGrid configuration verified successfully');
      return {
        success: true,
        message: 'SendGrid configuration verified'
      };
    } catch (error) {
      console.error('❌ SendGrid configuration failed:', error);
      return {
        success: false,
        error: error.message,
        message: 'SendGrid configuration failed'
      };
    }
  },

  /**
   * Get SendGrid configuration info
   * @returns {Object} - Configuration info
   */
  getConfig() {
    return {
      provider: 'SendGrid',
      hasApiKey: !!SENDGRID_API_KEY,
      from: emailSettings.from,
      fromName: emailSettings.fromName,
      replyTo: emailSettings.replyTo,
      freeLimit: '100 emails per day',
      setup: 'Get free API key from https://sendgrid.com'
    };
  }
};

module.exports = sendGridService;
