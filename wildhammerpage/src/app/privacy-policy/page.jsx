'use client';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Database, 
  Scale, 
  Share2, 
  Cookie, 
  Archive, 
  Lock, 
  Globe, 
  UserCheck, 
  Baby, 
  FileText, 
  Mail, 
  MapPin,
  Printer,
  Calendar,
  ChevronRight
} from 'lucide-react';
import CustomCursor from '../../components/CustomCursor';

export default function PrivacyPolicy() {
  useEffect(() => {
    // เติมปีปัจจุบันในฟุตเตอร์
    const yearElement = document.getElementById('y');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none z-[10000]">
        <CustomCursor />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "isPartOf": {"@type": "WebSite", "name": "WildHammer"},
            "about": {"@type": "Organization", "name": "HunterDev"},
            "dateModified": "2025-10-03",
            "inLanguage": "th-TH"
          })
        }}
      />

      <header className="sticky top-[65px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-40">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between py-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-2">
              นโยบายความเป็นส่วนตัว
            </h1>
            <div className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
              สำหรับ WildHammer · <span className="inline-flex items-center gap-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Calendar className="w-3 h-3" />
                มีผลตั้งแต่ 3 ตุลาคม 2568
              </span>
            </div>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 print:hidden" 
            onClick={() => window.print()} 
            aria-label="พิมพ์เอกสาร"
          >
            <Printer className="w-4 h-4" />
            พิมพ์
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
        <nav className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            สารบัญ
          </h2>
          <a href="#scope" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Shield className="w-4 h-4" />
            ขอบเขตการใช้งาน
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#who-we-are" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Users className="w-4 h-4" />
            เราเป็นใคร
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#data-we-collect" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Database className="w-4 h-4" />
            ข้อมูลที่เราเก็บ
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#purposes-legal-bases" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Scale className="w-4 h-4" />
            วัตถุประสงค์และฐานทางกฎหมาย
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#sharing" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Share2 className="w-4 h-4" />
            การเปิดเผย/โอนข้อมูล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#tracking-cookies" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Cookie className="w-4 h-4" />
            คุกกี้และเทคโนโลยีติดตาม
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#retention" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Archive className="w-4 h-4" />
            การเก็บรักษาข้อมูล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#security" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Lock className="w-4 h-4" />
            ความมั่นคงปลอดภัยของข้อมูล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#international" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Globe className="w-4 h-4" />
            การโอนข้อมูลข้ามพรมแดน
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#your-rights" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <UserCheck className="w-4 h-4" />
            สิทธิของเจ้าของข้อมูล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#children" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Baby className="w-4 h-4" />
            ข้อมูลของผู้เยาว์
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#changes" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <FileText className="w-4 h-4" />
            การเปลี่ยนแปลงนโยบาย
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#contact" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Mail className="w-4 h-4" />
            ติดต่อเรา
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#regional" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <MapPin className="w-4 h-4" />
            ภาคผนวกตามกฎหมายแต่ละประเทศ
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
        </nav>

        <article id="policy" className="space-y-16">
          <section id="scope">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ขอบเขตการใช้งาน
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">นโยบายนี้อธิบายวิธีที่ HunterDev (&ldquo;เรา&rdquo;) เก็บ ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลเมื่อคุณใช้ WildHammer บน iOS/Android รวมถึงเว็บไซต์ บริการออนไลน์ และฟีเจอร์ที่เกี่ยวข้องทั้งหมด นโยบายนี้ครอบคลุมทั้งผู้ใช้ที่ลงทะเบียนและไม่ลงทะเบียน</p>
          </section>

          <section id="who-we-are">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              เราเป็นใคร
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">HunterDev เป็นTeam HunterDev จดทะเบียนที่ 14/61 ประเทศ สิงค์โปร ผู้ควบคุมข้อมูล (Data Controller) สำหรับบริการนี้คือ HunterDev หากคุณอยู่ใน EEA/UK เราอาจแต่งตั้งตัวแทนตามกฎหมายข้อมูลส่วนบุคคล (หากมี) รายละเอียดอยู่ในส่วน <a href="#regional" className="text-blue-600 dark:text-blue-400 hover:underline">ภาคผนวก</a> ด้านล่าง</p>
          </section>

          <section id="data-we-collect">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ข้อมูลที่เราเก็บ
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 my-6">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">สรุปข้อมูลและวัตถุประสงค์โดยย่อ</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-gray-100">หมวดหมู่ข้อมูล</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-gray-100">ตัวอย่าง</th>
                      <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-gray-100">วัตถุประสงค์</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ข้อมูลบัญชีและการติดต่อ</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ชื่อ, อีเมล, เบอร์โทร, ที่อยู่ (ถ้ามี)</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">สมัคร/เข้าสู่ระบบ, ติดต่อสื่อสาร, สนับสนุนลูกค้า</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ข้อมูลเทคนิคและการใช้งาน</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ที่อยู่ IP, รุ่นอุปกรณ์, ระบบปฏิบัติการ, ตัวระบุโฆษณา/อุปกรณ์, บันทึกการใช้งาน</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">รักษาความปลอดภัย, ปรับปรุงประสิทธิภาพ, วิเคราะห์การใช้งาน</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ข้อมูลตำแหน่ง</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ตำแหน่งโดยประมาณ (จาก IP) หรือแบบแม่นยำ (GPS/บลูทูธ/ไวไฟ) เมื่อคุณอนุญาต</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ฟังก์ชันที่อาศัยตำแหน่ง, ข้อเสนอในพื้นที่, ความปลอดภัย</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">เนื้อหาที่ผู้ใช้สร้างขึ้น</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ข้อความ, รูปภาพ, ไฟล์เสียง/วิดีโอ, ความคิดเห็น</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ให้บริการฟีเจอร์หลักของแอป/ไซต์</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">การชำระเงิน/ธุรกรรม</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">รายละเอียดการสั่งซื้อ, โทเคนการชำระเงิน (ประมวลผลผ่านผู้ให้บริการชำระเงิน)</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">ชำระเงิน, อนุมัติ/คืนเงิน, บันทึกทางบัญชี</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">การสื่อสารและคำขอสนับสนุน</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">เนื้อหาในแบบฟอร์มติดต่อ, ตั๋วซัพพอร์ต, บันทึกการแชท/อีเมล</td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100">บริการลูกค้า, แก้ไขปัญหา, ปรับปรุงบริการ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">ข้อมูลที่คุณให้เราโดยตรง</h3>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
              <li>เมื่อสร้างบัญชีหรือแก้ไขโปรไฟล์</li>
              <li>เมื่อทำธุรกรรมหรือสมัครบริการแบบชำระเงิน</li>
              <li>เมื่อส่งฟีดแบ็ก ติดต่อ หรือเข้าร่วมกิจกรรม</li>
            </ul>

            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">ข้อมูลที่เก็บโดยอัตโนมัติ</h3>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เมื่อคุณใช้บริการ เราอาจเก็บข้อมูลเกี่ยวกับอุปกรณ์และการใช้งานโดยอัตโนมัติ เช่น ที่อยู่ IP ตัวระบุอุปกรณ์ (เช่น IDFA/GAID), ประเภทเบราว์เซอร์, หน้าที่เข้าชม, วัน-เวลา, แหล่งที่มา และการโต้ตอบกับองค์ประกอบต่าง ๆ ของบริการ</p>

            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">การเข้าถึงสิทธิ์ใช้งานของอุปกรณ์</h3>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">บางฟีเจอร์อาจขอสิทธิ์เข้าถึง <strong>กล้อง</strong>, <strong>ไมโครโฟน</strong>, <strong>รูปภาพ/ไฟล์</strong>, <strong>รายชื่อผู้ติดต่อ</strong>, หรือ <strong>ตำแหน่งที่ตั้ง</strong> เราจะร้องขอเฉพาะเมื่อจำเป็นและคุณสามารถเพิกถอนสิทธิ์ได้จากการตั้งค่าอุปกรณ์ของคุณ</p>

            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4">คุกกี้และเทคโนโลยีที่คล้ายกัน</h3>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ดูรายละเอียดในหัวข้อ <a href="#tracking-cookies" className="text-blue-600 dark:text-blue-400 hover:underline">คุกกี้และเทคโนโลยีติดตาม</a> ด้านล่าง</p>
          </section>

          <section id="purposes-legal-bases">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              วัตถุประสงค์และฐานทางกฎหมายในการประมวลผล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">เราประมวลผลข้อมูลส่วนบุคคลบนฐานต่อไปนี้ (ตาม PDPA และกฎหมายสากลเช่น GDPR):</p>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">
              <li><strong>ความยินยอม</strong> (Consent) — เช่น การส่งการตลาดแบบเลือกรับ, การใช้ตำแหน่งแบบแม่นยำ</li>
              <li><strong>สัญญา</strong> (Contract) — เพื่อให้บริการที่คุณขอหรือทำตามสัญญา</li>
              <li><strong>หน้าที่ตามกฎหมาย</strong> (Legal Obligation) — เช่น บันทึกทางภาษี/บัญชี</li>
              <li><strong>ประโยชน์โดยชอบธรรม</strong> (Legitimate Interests) — เช่น ความปลอดภัยของบริการ ปรับปรุงผลิตภัณฑ์ การตรวจจับการฉ้อโกง</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ตัวอย่างวัตถุประสงค์รวมถึง: ให้และดูแลรักษาบริการ, ยืนยันตัวตน, ประมวลผลการชำระเงิน, การสื่อสารกับคุณ, ปรับปรุงและวิจัย, การรักษาความปลอดภัย, และการปฏิบัติตามกฎหมาย</p>
          </section>

          <section id="sharing">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Share2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การเปิดเผย/โอนข้อมูล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">เราอาจเปิดเผยข้อมูลกับบุคคลที่สามเฉพาะเท่าที่จำเป็นตามวัตถุประสงค์ที่กล่าวไว้ข้างต้น เช่น:</p>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">
              <li><strong>ผู้ประมวลผลข้อมูล</strong> (Processors) เช่น โฮสติ้ง คลาวด์ CDN ระบบอีเมล/วิเคราะห์/บันทึกเหตุขัดข้อง</li>
              <li><strong>ผู้ให้บริการชำระเงิน</strong> (เช่น Stripe, PayPal, App Store/Google Play Billing) — เราไม่จัดเก็บข้อมูลบัตรเต็มรูปแบบ</li>
              <li><strong>พันธมิตรทางธุรกิจ</strong> หรือผู้ให้บริการที่คุณเลือกเชื่อมต่อ</li>
              <li><strong>การโอนตามกฎหมาย</strong> เช่น ตามคำสั่งศาลหรือเพื่อคุ้มครองสิทธิ์และความปลอดภัย</li>
            </ul>
            <details className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer text-lg">ตัวอย่างผู้ให้บริการภายนอก/SDK (แก้ไขให้ตรงกับการใช้งานจริง)</summary>
              <ul className="mt-4 space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                <li>Firebase (Analytics/Crashlytics/Messaging) – นโยบาย: https://policies.google.com/privacy</li>
                <li>Google Analytics 4 – นโยบาย: https://policies.google.com/privacy</li>
                <li>Meta/Facebook SDK – นโยบาย: https://www.facebook.com/privacy/policy</li>
                <li>Sentry – นโยบาย: https://sentry.io/privacy/</li>
              </ul>
              <p className="mt-4 text-lg leading-relaxed text-gray-900 dark:text-gray-100">รายการจริงของคุณ: -</p>
            </details>
          </section>

          <section id="tracking-cookies">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              คุกกี้และเทคโนโลยีติดตาม
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">เราใช้คุกกี้ พิกเซล โทเคน และตัวระบุที่คล้ายกันเพื่อจดจำการตั้งค่าของคุณ วิเคราะห์การใช้งาน ปรับแต่งเนื้อหา/โฆษณา และปกป้องบัญชี คุณสามารถจัดการคุกกี้ที่ไม่จำเป็นได้ผ่านแบนเนอร์คุกกี้ (หากมี) หรือการตั้งค่าเบราว์เซอร์/อุปกรณ์ของคุณ</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <strong className="text-lg font-semibold text-gray-900 dark:text-gray-100">ทางเลือกของคุณ</strong>
              <ul className="mt-4 space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                <li>บนเบราว์เซอร์: ปิด/ลบคุกกี้ หรือใช้โหมดไม่ระบุตัวตน</li>
                <li>บนอุปกรณ์เคลื่อนที่: ตั้งค่าโฆษณาแบบปรับให้เหมาะกับแต่ละบุคคล (Android/Google Ads) หรือการขออนุญาตติดตาม (iOS)</li>
                <li>ยกเลิกอีเมลการตลาดได้ทุกเมื่อผ่านลิงก์ &ldquo;ยกเลิกสมาชิก&rdquo;</li>
              </ul>
            </div>
          </section>

          <section id="retention">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Archive className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การเก็บรักษาข้อมูล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เราจะเก็บข้อมูลส่วนบุคคลไว้เท่าที่จำเป็นเพื่อบรรลุวัตถุประสงค์ที่รวบรวมไว้ รวมถึงเพื่อปฏิบัติตามข้อกำหนดทางกฎหมาย การบัญชี หรือการรายงาน หลังจากหมดความจำเป็น เราจะลบ ทำให้เป็นนิรนาม หรือแยกเก็บข้อมูลอย่างปลอดภัย</p>
          </section>

          <section id="security">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ความมั่นคงปลอดภัยของข้อมูล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เราดำเนินมาตรการทางเทคนิคและองค์กรที่เหมาะสม เช่น การเข้ารหัสระหว่างทาง (HTTPS/TLS), การควบคุมการเข้าถึง, การบันทึกเหตุการณ์ และการทดสอบความปลอดภัยตามความเหมาะสม อย่างไรก็ดี ไม่มีระบบใดปลอดภัย 100% คุณสามารถช่วยได้โดยใช้รหัสผ่านที่รัดกุมและรักษาความปลอดภัยบัญชีของคุณ</p>
          </section>

          <section id="international">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การโอนข้อมูลข้ามพรมแดน
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ข้อมูลของคุณอาจถูกโอนไป จัดเก็บ หรือประมวลผลในประเทศที่ไม่ใช่ประเทศที่คุณพำนัก ซึ่งอาจมีกฎหมายคุ้มครองข้อมูลแตกต่างกัน เราจะทำให้มั่นใจว่ามีการป้องกันที่เหมาะสม เช่น ข้อตกลงมาตรฐานของสหภาพยุโรป (SCCs) หรือกลไกที่กฎหมายยอมรับ</p>
          </section>

          <section id="your-rights">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              สิทธิของเจ้าของข้อมูล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">ขึ้นอยู่กับกฎหมายที่บังคับใช้ (เช่น PDPA/GDPR/CPRA) คุณอาจมีสิทธิ:</p>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">
              <li>ขอเข้าถึง สำเนา หรือพกพาข้อมูลของคุณ</li>
              <li>ขอให้แก้ไขหรืออัปเดตข้อมูลที่ไม่ถูกต้อง</li>
              <li>ขอให้ลบหรือจำกัดการประมวลผลในบางกรณี</li>
              <li>คัดค้านการประมวลผลที่อาศัยประโยชน์โดยชอบธรรม การตลาดทางตรง หรือการทำโปรไฟล์</li>
              <li>ถอนความยินยอมได้ทุกเมื่อโดยไม่กระทบต่อการประมวลผลก่อนหน้า</li>
              <li>ร้องเรียนต่อหน่วยงานกำกับดูแลที่เกี่ยวข้อง</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เพื่อใช้สิทธิ โปรดติดต่อเราได้ที่ <a href="mailto:enemybehindbehind@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">enemybehindbehind@gmail.com</a> เราอาจต้องยืนยันตัวตนก่อนดำเนินการ</p>
          </section>

          <section id="children">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Baby className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ข้อมูลของผู้เยาว์
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">บริการของเราไม่ได้มีวัตถุประสงค์สำหรับผู้ที่มีอายุต่ำกว่า 13 ปี (หรืออายุขั้นต่ำตามกฎหมายของประเทศคุณ) เราไม่จงใจเก็บข้อมูลจากผู้เยาว์ หากคุณเชื่อว่าเด็กได้ให้ข้อมูลแก่เรา โปรดติดต่อเพื่อให้เราดำเนินการที่เหมาะสม</p>
          </section>

          <section id="changes">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การเปลี่ยนแปลงนโยบาย
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว เมื่อมีการแก้ไข เราจะอัปเดตวันที่ &ldquo;ปรับปรุงล่าสุด&rdquo; และในกรณีที่มีการเปลี่ยนแปลงที่มีนัยสำคัญ เราจะแจ้งให้คุณทราบผ่านช่องทางที่เหมาะสม</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">ปรับปรุงล่าสุด: <time dateTime="2025-10-03">3 ตุลาคม 2568</time></p>
          </section>

          <section id="contact">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ติดต่อเรา
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">หากมีคำถาม ข้อเสนอแนะ หรือคำขอเกี่ยวกับข้อมูลส่วนบุคคล โปรดติดต่อ:</p>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
              <li>HunterDev (Team HunterDev)</li>
              <li>ที่อยู่: 14/61</li>
              <li>อีเมล: <a href="mailto:enemybehindbehind@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">enemybehindbehind@gmail.com</a></li>
              <li>โทร: 0644293692</li>
              <li>ผู้รับผิดชอบด้านการคุ้มครองข้อมูล (ถ้ามี): 0644293692</li>
            </ul>
          </section>

          <section id="regional">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ภาคผนวกตามกฎหมายแต่ละประเทศ/ภูมิภาค
            </h2>
            <details className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-4" open>
              <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer text-lg">EEA/สหราชอาณาจักร (GDPR/UK GDPR)</summary>
              <ul className="mt-4 space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                <li>ผู้ควบคุมข้อมูล: HunterDev — จุดประสงค์และฐานทางกฎหมายอยู่ในหัวข้อ <a href="#purposes-legal-bases" className="text-blue-600 dark:text-blue-400 hover:underline">ข้างต้น</a></li>
                <li>สิทธิเพิ่มเติม: การพกพาข้อมูล, การจำกัด, การคัดค้าน, การร้องเรียนต่อ DPA ในประเทศของคุณ</li>
                <li>การโอนข้อมูล: ใช้ SCCs หรือกลไกที่ถูกต้องตามกฎหมาย</li>
              </ul>
            </details>
            <details className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <summary className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer text-lg">แคลิฟอร์เนีย สหรัฐอเมริกา (CCPA/CPRA)</summary>
              <p className="mt-4 text-lg leading-relaxed text-gray-900 dark:text-gray-100">คุณอาจมีสิทธิขอทราบ (Right to Know), ขอให้ลบ, แก้ไขข้อมูลที่ไม่ถูกต้อง, คัดค้านการ &ldquo;ขาย&rdquo; หรือ &ldquo;การแบ่งปันเพื่อโฆษณาตามพฤติกรรมข้ามบริบท&rdquo;, และไม่ถูกเลือกปฏิบัติเนื่องจากใช้สิทธิ</p>
              <p className="mt-4 text-lg leading-relaxed text-gray-900 dark:text-gray-100">เราจะไม่ &ldquo;ขาย&rdquo; ข้อมูลส่วนบุคคลตามความหมายของ CCPA เว้นแต่จะระบุไว้ชัดเจนและได้รับการยินยอม คุณสามารถตั้งค่าสถานะ &ldquo;Do Not Sell or Share&rdquo; ได้โดยติดต่อ <a href="mailto:enemybehindbehind@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">enemybehindbehind@gmail.com</a></p>
            </details>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-16 pt-8 text-gray-500 dark:text-gray-400 text-lg">
            © <span id="y"></span> HunterDev · เอกสารถูกจัดทำเพื่อวัตถุประสงค์ทั่วไป โปรดปรับให้เหมาะสมกับการใช้งานจริงและขอคำปรึกษาทางกฎหมายตามความเหมาะสม
          </div>
        </article>
      </main>
    </div>
  );
}
