import { NextResponse } from 'next/server';
import nodemailerService from '../../../services/nodemailerService';

// POST - Test email sending
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, testType = 'verification' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกอีเมลที่ถูกต้อง' },
        { status: 400 }
      );
    }

    // Test Nodemailer connection first
    const connectionTest = await nodemailerService.testConnection();
    if (!connectionTest.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nodemailer connection failed',
          details: connectionTest.error,
          config: nodemailerService.getConfig()
        },
        { status: 500 }
      );
    }

    if (testType === 'connection') {
      return NextResponse.json({
        success: true,
        message: 'Nodemailer connection successful',
        config: nodemailerService.getConfig()
      });
    }

    // Generate test verification data
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3500'}/verify?token=test_${Date.now()}`;
    const token = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send verification email
    const result = await nodemailerService.sendVerificationEmail(email, verificationUrl, token);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        data: {
          email: email,
          messageId: result.messageId,
          verificationUrl: verificationUrl,
          token: token,
          config: nodemailerService.getConfig()
        }
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: result.error,
          config: nodemailerService.getConfig()
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการทดสอบอีเมล',
        details: error.message,
        config: sendGridService.getConfig()
      },
      { status: 500 }
    );
  }
}

// GET - Get email configuration info
export async function GET() {
  try {
    const config = nodemailerService.getConfig();
    
    return NextResponse.json({
      success: true,
      message: 'Email configuration retrieved',
      data: {
        config: config,
        hasConfig: !!(config.host && config.from && config.hasAuth),
        instructions: {
          setup: 'Nodemailer with Gmail SMTP configured',
          nodemailer: 'Uses existing Gmail credentials',
          freeLimit: '500 emails per day for free',
          steps: 'Ready to use with existing Gmail App Password'
        }
      }
    });
  } catch (error) {
    console.error('Error getting email config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get email configuration' },
      { status: 500 }
    );
  }
}
