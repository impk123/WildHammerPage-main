'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';
import { preRegisterService } from '../../services';
import CustomCursor from '../../components/CustomCursor';

export default function VerifyPage() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      handleVerify(urlToken);
    }
  }, []);

  const handleVerify = async (verifyToken = token) => {
    if (!verifyToken) {
      setError('กรุณากรอก Token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await preRegisterService.verifyEmail(verifyToken);

      if (data.success) {
        setResult({
          success: true,
          email: data.data.email,
          message: data.message
        });
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการยืนยัน');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">ยืนยันอีเมล</h1>
            <p className="text-gray-400">กรุณายืนยันอีเมลของคุณเพื่อเปิดใช้งานบัญชี</p>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-xl mb-6 ${
                result.success 
                  ? 'bg-green-800/50 border border-green-700' 
                  : 'bg-red-800/50 border border-red-700'
              }`}
            >
              {result.success ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    ยืนยันสำเร็จ!
                  </h3>
                  <p className="text-gray-300 text-center mb-3">
                    อีเมล <span className="text-green-400 font-semibold">{result.email}</span> ได้รับการยืนยันแล้ว
                  </p>
                  <p className="text-gray-400 text-sm text-center">
                    ขอบคุณที่ลงทะเบียน! เราจะแจ้งเตือนคุณเมื่อเกมเปิดตัว
                  </p>
                </>
              ) : (
                <>
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    ยืนยันไม่สำเร็จ
                  </h3>
                  <p className="text-gray-300 text-center">
                    {result.message}
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* Manual Token Input Form */}
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Token
                </label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="กรอก Token ที่ได้รับจากอีเมล"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm bg-red-900/20 p-3 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    กำลังยืนยัน...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    ยืนยันอีเมล
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              ← กลับสู่หน้าหลัก
            </a>
          </div>
        </div>
      </motion.div>
      </div>
    </>
  );
}
