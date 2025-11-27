import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailerService from '../../../services/nodemailerService';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '54.169.126.235',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'nickyshox',
  database: process.env.DB_NAME || 'backoffice',
  connectTimeout: 10000
};

// Generate verification token
function generateVerificationToken() {
  return 'verify_' + Date.now() + '_' + crypto.randomBytes(16).toString('hex');
}

// GET - Get pre-registration statistics
export async function GET() {
  try {
    const mysql = require('mysql2/promise');
    
    const connection = await mysql.createConnection({
      host: '54.169.126.235',
      port: 3306,
      user: 'appuser',
      password: 'nickyshox',
      database: 'backoffice',
      connectTimeout: 10000
    });
    
    // Get statistics
    const [totalCount] = await connection.execute('SELECT COUNT(*) as total FROM preRegis');
    const [verifiedCount] = await connection.execute('SELECT COUNT(*) as verified FROM preRegis WHERE is_verified = TRUE');
    
    await connection.end();
    
    return NextResponse.json({
      success: true,
      data: {
        total: totalCount[0].total,
        verified: verifiedCount[0].verified,
        pending: totalCount[0].total - verifiedCount[0].verified
      }
    });
    
  } catch (error) {
    console.error('Error fetching pre-registration stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

// POST - Register email for pre-registration
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, ip_address, user_agent, referral_source } = body;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกอีเมลที่ถูกต้อง' },
        { status: 400 }
      );
    }
    
    const mysql = require('mysql2/promise');
    
    const connection = await mysql.createConnection({
      host: '54.169.126.235',
      port: 3306,
      user: 'appuser',
      password: 'nickyshox',
      database: 'backoffice',
      connectTimeout: 10000
    });
    
    // Check if email already exists
    const [existing] = await connection.execute(
      'SELECT id, is_verified FROM preRegis WHERE email = ?',
      [email.toLowerCase()]
    );
    
    if (existing.length > 0) {
      await connection.end();
      if (existing[0].is_verified) {
        return NextResponse.json({
          success: false,
          error: 'อีเมลนี้ลงทะเบียนและยืนยันแล้ว',
          data: {
            email: email,
            is_verified: true,
            already_registered: true
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'อีเมลนี้ลงทะเบียนแล้ว แต่ยังไม่ได้รับการยืนยัน',
          data: {
            email: email,
            is_verified: false,
            already_registered: true
          }
        });
      }
    }
    
    // Generate verification token
    const verification_token = generateVerificationToken();
    
    // Insert new pre-registration
    await connection.execute(
      `INSERT INTO preRegis (email, verification_token, ip_address, user_agent, referral_source) 
       VALUES (?, ?, ?, ?, ?)`,
      [email.toLowerCase(), verification_token, ip_address || null, user_agent || null, referral_source || null]
    );
    
    // Get updated statistics
    const [totalCount] = await connection.execute('SELECT COUNT(*) as total FROM preRegis');
    
    await connection.end();
    
    // Generate verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3500'}/verify?token=${verification_token}`;
    
    // Send verification email
    let emailResult = { success: false, message: 'Email not sent' };
    
    try {
      // Try to send real email using Nodemailer
      emailResult = await nodemailerService.sendVerificationEmail(email, verificationUrl, verification_token);
      
      if (emailResult.success) {
        console.log('📧 EMAIL SENT SUCCESSFULLY');
        console.log('=====================================');
        console.log(`To: ${email}`);
        console.log(`Message ID: ${emailResult.messageId}`);
        console.log(`Verification URL: ${verificationUrl}`);
        console.log('=====================================');
      } else {
        console.log('📧 EMAIL SENDING FAILED - FALLBACK TO SIMULATION');
        console.log('=====================================');
        console.log(`To: ${email}`);
        console.log(`Error: ${emailResult.error}`);
        console.log(`Verification URL: ${verificationUrl}`);
        console.log(`Token: ${verification_token}`);
        console.log('=====================================');
      }
    } catch (emailError) {
      console.log('📧 EMAIL SERVICE ERROR - FALLBACK TO SIMULATION');
      console.log('=====================================');
      console.log(`To: ${email}`);
      console.log(`Error: ${emailError.message}`);
      console.log(`Verification URL: ${verificationUrl}`);
      console.log(`Token: ${verification_token}`);
      console.log('=====================================');
      emailResult = { success: false, error: emailError.message };
    }
    
    return NextResponse.json({
      success: true,
      message: 'ลงทะเบียนสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยัน',
      data: {
        email: email,
        verification_token: verification_token,
        verification_url: verificationUrl,
        total_registrations: totalCount[0].total,
        email_sent: emailResult.success,
        email_message_id: emailResult.messageId || null,
        email_error: emailResult.error || null
      }
    });
    
  } catch (error) {
    console.error('Error in pre-registration:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการลงทะเบียน' },
      { status: 500 }
    );
  }
}
