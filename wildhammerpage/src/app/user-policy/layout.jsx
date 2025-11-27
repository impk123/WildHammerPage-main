// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'ข้อตกลงการใช้งาน (User Policy) | WildHammer',
  description: 'ข้อตกลงการใช้งานสำหรับ WildHammer โดย HunterDev',
  robots: 'index,follow',
};

export default function UserPolicyLayout({ children }) {
  return children;
}
