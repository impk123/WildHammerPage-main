// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'นโยบายความเป็นส่วนตัว | WildHammer',
  description: 'นโยบายความเป็นส่วนตัวของ HunterDev สำหรับ WildHammer',
  robots: 'noindex,follow',
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
