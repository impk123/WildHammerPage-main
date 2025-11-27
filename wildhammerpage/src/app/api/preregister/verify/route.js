import { NextResponse } from 'next/server';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '54.169.126.235',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'nickyshox',
  database: process.env.DB_NAME || 'backoffice',
  connectTimeout: 10000
};

// POST - Verify email with token
export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
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
    
    // Check if token exists and get email info
    const [user] = await connection.execute(
      'SELECT id, email, is_verified FROM preRegis WHERE verification_token = ?',
      [token]
    );
    
    if (user.length === 0) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'Token ไม่ถูกต้องหรือหมดอายุ' },
        { status: 404 }
      );
    }
    
    const userData = user[0];
    
    // Check if already verified
    if (userData.is_verified) {
      await connection.end();
      return NextResponse.json({
        success: true,
        message: 'อีเมลนี้ได้รับการยืนยันแล้ว',
        data: {
          email: userData.email,
          is_verified: true,
          already_verified: true
        }
      });
    }
    
    // Update verification status
    await connection.execute(
      'UPDATE preRegis SET is_verified = TRUE, verified_at = CURRENT_TIMESTAMP WHERE verification_token = ?',
      [token]
    );
    
    // Get updated statistics
    const [totalCount] = await connection.execute('SELECT COUNT(*) as total FROM preRegis');
    const [verifiedCount] = await connection.execute('SELECT COUNT(*) as verified FROM preRegis WHERE is_verified = TRUE');
    
    await connection.end();
    
    console.log(`Email verification successful for ${userData.email}`);
    
    return NextResponse.json({
      success: true,
      message: 'ยืนยันอีเมลสำเร็จ!',
      data: {
        email: userData.email,
        is_verified: true,
        total_registrations: totalCount[0].total,
        verified_registrations: verifiedCount[0].verified
      }
    });
    
  } catch (error) {
    console.error('Error in email verification:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการยืนยันอีเมล' },
      { status: 500 }
    );
  }
}
