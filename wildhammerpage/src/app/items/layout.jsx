import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'คลังไอเท็ม - Wild Hammer',
  description: 'ดูไอเท็มและอุปกรณ์ทั้งหมดในเกม Wild Hammer',
};

export default function ItemsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="">
        {children}
      </main>

    </div>
  );
}
