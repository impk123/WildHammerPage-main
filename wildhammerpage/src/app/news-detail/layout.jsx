// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'ข่าวสารเกม - WildHammer',
  description: 'ติดตามข่าวสารล่าสุด อัปเดต และวิดีโอของเกม WildHammer',
};

export default function NewsDetailLayout({ children }) {
  return children;
}
