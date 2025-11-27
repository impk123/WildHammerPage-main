'use client';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import {
  Shield,
  Users,
  CheckCircle,
  UserCheck,
  Gamepad2,
  XCircle,
  Coins,
  CreditCard,
  FileText,
  Copyright,
  RefreshCw,
  ExternalLink,
  Eye,
  AlertTriangle,
  Ban,
  Scale,
  Mail,
  Printer,
  Calendar,
  ChevronRight,
  Building,
  UserPlus,
  Zap,
  DollarSign,
  Image,
  Lock,
  Settings,
  Link,
  ShieldCheck,
  AlertCircle,
  Phone,
  MapPin
} from 'lucide-react';
import CustomCursor from '../../components/CustomCursor';
export default function UserPolicy() {
  useEffect(() => {
    // เติมปีปัจจุบันในฟุตเตอร์
    const yearElement = document.getElementById('y');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <div className="relative">
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-size: 12pt !important;
            line-height: 1.4 !important;
            color: #000 !important;
            background: #fff !important;
          }
          
          header {
            display: none !important;
          }
          
          nav.toc {
            display: none !important;
          }
          
          .print-hidden {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          main {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          article {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          section {
            page-break-inside: avoid;
            margin-bottom: 2rem !important;
            padding-bottom: 1rem !important;
            border-bottom: 1px solid #ddd !important;
          }
          
          h1 {
            font-size: 24pt !important;
            font-weight: bold !important;
            margin: 0 0 1rem 0 !important;
            page-break-after: avoid;
            color: #000 !important;
          }
          
          h2 {
            font-size: 18pt !important;
            font-weight: bold !important;
            margin: 2rem 0 1rem 0 !important;
            page-break-after: avoid;
            page-break-inside: avoid;
            color: #000 !important;
            border-bottom: 2px solid #000 !important;
            padding-bottom: 0.5rem !important;
          }
          
          h3 {
            font-size: 14pt !important;
            font-weight: bold !important;
            margin: 1.5rem 0 0.5rem 0 !important;
            page-break-after: avoid;
            color: #000 !important;
          }
          
          p, li {
            font-size: 12pt !important;
            line-height: 1.4 !important;
            margin: 0.5rem 0 !important;
            color: #000 !important;
            orphans: 3;
            widows: 3;
          }
          
          ul, ol {
            margin: 0.5rem 0 !important;
            padding-left: 1.5rem !important;
          }
          
          table {
            page-break-inside: avoid;
            margin: 1rem 0 !important;
            border-collapse: collapse !important;
            width: 100% !important;
          }
          
          th, td {
            border: 1px solid #000 !important;
            padding: 0.5rem !important;
            font-size: 11pt !important;
            vertical-align: top !important;
          }
          
          th {
            background: #f0f0f0 !important;
            font-weight: bold !important;
          }
          
          .card {
            border: 1px solid #000 !important;
            background: #fff !important;
            margin: 1rem 0 !important;
            padding: 1rem !important;
            page-break-inside: avoid;
          }
          
          details {
            border: 1px solid #000 !important;
            background: #fff !important;
            margin: 1rem 0 !important;
            padding: 1rem !important;
            page-break-inside: avoid;
          }
          
          details summary {
            font-weight: bold !important;
            color: #000 !important;
          }
          
          a {
            color: #000 !important;
            text-decoration: underline !important;
          }
          
          a[href]::after {
            content: " (" attr(href) ")";
            font-size: 10pt;
            color: #666;
          }
          
          .footer {
            margin-top: 3rem !important;
            padding-top: 1rem !important;
            border-top: 1px solid #000 !important;
            font-size: 10pt !important;
            color: #666 !important;
          }
          
          /* Page breaks for major sections */
          section[id="accounts"],
          section[id="permitted-use"],
          section[id="prohibited"],
          section[id="virtual-items"],
          section[id="payments"],
          section[id="ugc"],
          section[id="intellectual"],
          section[id="updates"],
          section[id="third-parties"],
          section[id="privacy"],
          section[id="disclaimer"],
          section[id="termination"],
          section[id="governing-law"],
          section[id="contact"] {
            page-break-before: always;
          }
          
          /* Avoid breaking these elements */
          .no-break {
            page-break-inside: avoid;
          }
          
          /* Print margins */
          @page {
            margin: 2cm;
            size: A4;
          }
        }
        
        /* Hide print-only elements on screen */
        .print-only {
          display: none;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Use",
            "isPartOf": { "@type": "WebSite", "name": "WildHammer" },
            "about": { "@type": "Organization", "name": "HunterDev" },
            "dateModified": "2025-10-03",
            "inLanguage": "th-TH"
          })
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-[10000]">
        <CustomCursor />
      </div>
      <header className="sticky top-[65px] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between py-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-2">
              ข้อตกลงการใช้งาน
            </h1>
            <div className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
              สำหรับ WildHammer · <span className="inline-flex items-center gap-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                <Calendar className="w-3 h-3" />
                มีผลตั้งแต่ 3 ตุลาคม 2568
              </span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 print-hidden"
            onClick={() => window.print()}
            aria-label="พิมพ์เอกสาร"
          >
            <Printer className="w-4 h-4" />
            พิมพ์
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
        <nav className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            สารบัญ
          </h2>
          <a href="#who-we-are" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Building className="w-4 h-4" />
            ผู้ให้บริการ
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#acceptance" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <CheckCircle className="w-4 h-4" />
            การยอมรับเงื่อนไข
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#accounts" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <UserCheck className="w-4 h-4" />
            บัญชีผู้ใช้และความปลอดภัย
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#permitted-use" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Zap className="w-4 h-4" />
            การใช้งานที่อนุญาต
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#prohibited" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <XCircle className="w-4 h-4" />
            การใช้งานที่ต้องห้าม
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#virtual-items" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Coins className="w-4 h-4" />
            ไอเทม/สกุลเงินเสมือน
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#payments" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <CreditCard className="w-4 h-4" />
            การชำระเงินและการคืนเงิน
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#ugc" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Image className="w-4 h-4" />
            เนื้อหาที่ผู้ใช้สร้างขึ้น
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#intellectual" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Copyright className="w-4 h-4" />
            ทรัพย์สินทางปัญญา
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#updates" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <RefreshCw className="w-4 h-4" />
            การอัปเดต/การเปลี่ยนแปลงบริการ
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#third-parties" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <ExternalLink className="w-4 h-4" />
            บริการ/ลิงก์ของบุคคลที่สาม
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#privacy" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Eye className="w-4 h-4" />
            ความเป็นส่วนตัวและข้อมูลส่วนบุคคล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#disclaimer" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <AlertTriangle className="w-4 h-4" />
            ข้อจำกัดความรับผิด
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#termination" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Ban className="w-4 h-4" />
            การระงับ/ยุติการให้บริการ
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#governing-law" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Scale className="w-4 h-4" />
            กฎหมายที่ใช้บังคับและเขตอำนาจศาล
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
          <a href="#contact" className="flex items-center gap-2 py-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <Mail className="w-4 h-4" />
            ติดต่อเรา
            <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
          </a>
        </nav>

        <article className="space-y-16">
          {/* Print-only title */}
          <div className="print-only">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-2">
              ข้อตกลงการใช้งาน
            </h1>
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-8">
              สำหรับ WildHammer · มีผลตั้งแต่ 3 ตุลาคม 2568
            </div>
          </div>

          <section id="who-we-are">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ผู้ให้บริการ
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">บริการ <strong>WildHammer</strong> ให้บริการโดย <strong>HunterDev</strong> (รูปแบบนิติบุคคล: <strong>Team HunterDev</strong>) ที่อยู่ตามทะเบียน: <strong>14/61</strong> ประเทศ: <strong>สิงค์โปร</strong>. ช่องทางติดต่อ: อีเมล <a href="mailto:enemybehindbehind@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">enemybehindbehind@gmail.com</a>, โทร <strong>0644293692</strong>. ผู้รับผิดชอบด้านการคุ้มครองข้อมูล: <strong>0644293692</strong>.</p>
          </section>

          <section id="acceptance">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การยอมรับเงื่อนไข
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">โดยการดาวน์โหลด ติดตั้ง เข้าถึง หรือใช้งานแอป/เกมบน <strong>iOS/Android</strong> คุณยอมรับและตกลงผูกพันตามข้อตกลงนี้ รวมถึงนโยบายอื่น ๆ ที่อ้างถึง (เช่น นโยบายความเป็นส่วนตัว) หากคุณไม่ยอมรับ โปรดหยุดใช้งานทันที</p>
          </section>

          <section id="accounts">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              บัญชีผู้ใช้และความปลอดภัย
            </h2>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
              <li>คุณต้องให้ข้อมูลจริง ถูกต้อง และเป็นปัจจุบัน และรับผิดชอบต่อการรักษาความลับของข้อมูลเข้าสู่ระบบ</li>
              <li>คุณรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ และตกลงจะแจ้งให้เราทราบทันทีเมื่อพบการใช้งานโดยไม่ได้รับอนุญาต</li>
              <li>เราสงวนสิทธิ์ระงับ/ยุติบัญชีที่ฝ่าฝืนข้อตกลงหรือกฎหมาย</li>
            </ul>
          </section>

          <section id="permitted-use">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การใช้งานที่อนุญาต
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">คุณสามารถใช้งานแอปเพื่อวัตถุประสงค์ส่วนบุคคลที่ไม่ใช่เชิงพาณิชย์ ตามฟีเจอร์ที่เราจัดให้ และภายใต้ขอบเขตที่กฎหมายอนุญาต</p>
          </section>

          <section id="prohibited">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การใช้งานที่ต้องห้าม
            </h2>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
              <li>การโกงเกม แฮ็ก เจลเบรก/รูทที่ส่งผลต่อความปลอดภัย หรือการดัดแปลงไฟล์ไคลเอนต์/เซิร์ฟเวอร์</li>
              <li>การใช้บอท/สคริปต์, การทำวิศวกรรมย้อนกลับ, การสกัดข้อมูลโดยไม่ได้รับอนุญาต</li>
              <li>การเผยแพร่เนื้อหาที่ผิดกฎหมาย ผิดลิขสิทธิ์ ลามกอนาจาร หรือสร้างความเกลียดชัง/คุกคาม</li>
              <li>การขาย/โอน/ให้เช่าบัญชีหรือไอเทม โดยไม่ได้รับอนุญาตจากเรา</li>
            </ul>
          </section>

          <section id="virtual-items">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Coins className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ไอเทมและสกุลเงินเสมือน
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ไอเทมในเกมและสกุลเงินเสมือนเป็นสิทธิ์ในการใช้งานแบบจำกัด ภายใต้ดุลยพินิจของเรา ไม่สามารถแลกคืนเป็นเงินสด โอน หรือขายนอกแพลตฟอร์ม เว้นแต่เราจะระบุไว้เป็นลายลักษณ์อักษร</p>
          </section>

          <section id="payments">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การชำระเงินและการคืนเงิน
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">การซื้อภายในแอปดำเนินการผ่านผู้ให้บริการชำระเงินของแพลตฟอร์ม (เช่น App Store/Google Play) เงื่อนไขการคืนเงินอยู่ภายใต้นโยบายของแพลตฟอร์ม เว้นแต่เราจะกำหนดไว้ต่างหาก</p>
          </section>

          <section id="ugc">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Image className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              เนื้อหาที่ผู้ใช้สร้างขึ้น (UGC)
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เมื่อส่งหรือสร้างเนื้อหาในบริการ คุณให้สิทธิ์เราแบบไม่เฉพาะเจาะจง ทั่วโลก โอนต่อได้ ไม่มีค่าลิขสิทธิ์ เพื่อใช้ ทำซ้ำ ปรับแก้ เผยแพร่ และแสดงเนื้อหาดังกล่าวเพื่อการให้บริการและโปรโมต คุณรับรองว่าเนื้อหานั้นเป็นของคุณหรือมีสิทธิ์ตามกฎหมาย</p>
          </section>

          <section id="intellectual">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Copyright className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ทรัพย์สินทางปัญญา
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ตัวเกม โค้ด กราฟิก ดนตรี โลโก้ และองค์ประกอบทั้งหมดของ WildHammer เป็นทรัพย์สินของ HunterDev หรือผู้อนุญาต และได้รับความคุ้มครองตามกฎหมายห้ามคัดลอก ดัดแปลง แจกจ่าย โดยไม่ได้รับอนุญาต</p>
          </section>

          <section id="updates">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การอัปเดต/การเปลี่ยนแปลงบริการ
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เราสงวนสิทธิ์ในการอัปเดต แก้ไข ระงับ หรือหยุดให้บริการบางส่วน/ทั้งหมดเป็นครั้งคราว รวมถึงการปรับสมดุลเกมหรือรายการไอเทม โดยอาจมีหรือไม่มีการแจ้งเตือนล่วงหน้า</p>
          </section>

          <section id="third-parties">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <ExternalLink className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              บริการ/ลิงก์ของบุคคลที่สาม
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">บริการอาจมีลิงก์หรือฟังก์ชันที่เชื่อมกับบุคคลที่สาม เราไม่รับผิดชอบต่อเนื้อหา หรือนโยบายของบุคคลที่สาม โปรดอ่านข้อกำหนดและนโยบายของบริการเหล่านั้นก่อนใช้งาน</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 no-break">
              <strong className="text-lg font-semibold text-gray-900 dark:text-gray-100">ผู้ประมวลผล/ผู้ให้บริการภายนอกที่ใช้งาน</strong>
              <ul className="mt-4 space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                <li>-</li>
              </ul>
            </div>
          </section>

          <section id="privacy">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ความเป็นส่วนตัวและข้อมูลส่วนบุคคล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">การเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณอยู่ภายใต้นโยบายความเป็นส่วนตัวของเรา โปรดดูรายละเอียดใน <a href="/privacy-policy" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-400 hover:underline">นโยบายความเป็นส่วนตัว</a>.</p>
          </section>

          <section id="disclaimer">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ข้อจำกัดความรับผิด
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">บริการจัดให้บนพื้นฐาน &ldquo;ตามสภาพที่เป็น&rdquo; และ &ldquo;ตามที่มีอยู่&rdquo; เราไม่รับประกันความถูกต้อง ความพร้อมใช้งาน หรือการปราศจากข้อบกพร่องทั้งหมด ภายในขอบเขตสูงสุดที่กฎหมายอนุญาต เราไม่รับผิดต่อความเสียหายทางอ้อม พิเศษ โดยบังเอิญ หรือสืบเนื่อง</p>
          </section>

          <section id="termination">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Ban className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              การระงับ/ยุติการให้บริการ
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">เราสามารถระงับหรือยุติการเข้าถึงของคุณได้ทันที หากมีเหตุอันควรเชื่อว่ามีการละเมิดข้อตกลงนี้ กฎหมายที่เกี่ยวข้อง หรือเพื่อปกป้องผู้ใช้/ระบบ</p>
          </section>

          <section id="governing-law">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              กฎหมายที่ใช้บังคับและเขตอำนาจศาล
            </h2>
            <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">ข้อตกลงนี้อยู่ภายใต้กฎหมายของสิงค์โปร และข้อพิพาทใด ๆ จะอยู่ภายใต้เขตอำนาจศาลของศาลที่มีอำนาจในสิงค์โปร เว้นแต่กฎหมายบังคับใช้ในท้องถิ่นของคุณจะกำหนดไว้เป็นอย่างอื่น</p>
          </section>

          <section id="contact">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ติดต่อเรา
            </h2>
            <ul className="space-y-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100 mb-4">
              <li>ผู้ให้บริการ: HunterDev (Team HunterDev)</li>
              <li>ที่อยู่: 14/61, สิงค์โปร</li>
              <li>อีเมลติดต่อ/ร้องเรียน: <a href="mailto:enemybehindbehind@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">enemybehindbehind@gmail.com</a></li>
              <li>โทร: 0644293692</li>
              <li>ผู้รับผิดชอบคุ้มครองข้อมูล: 0644293692</li>
            </ul>
            <p className="text-gray-500 dark:text-gray-400 text-lg">ปรับปรุงล่าสุด: <time dateTime="2025-10-03">3 ตุลาคม 2568</time></p>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-16 pt-8 text-gray-500 dark:text-gray-400 text-lg">
            © <span id="y"></span> HunterDev · เอกสารนี้เป็นข้อตกลงการใช้งานทั่วไป โปรดปรับให้เหมาะสมกับตัวเกม/บริการและรับคำปรึกษาทางกฎหมายตามความเหมาะสม
          </div>
        </article>
      </main>
    </div>
  );
}
