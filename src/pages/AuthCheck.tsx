import { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");

    // ถ้าไม่มีการล็อกอิน ให้เปลี่ยนเส้นทางกลับไปหน้า login
    if (!isAuth || isAuth !== "true") {
      router.push("/login");
    }
  }, [router]);

  // ถ้าล็อกอินแล้ว ให้แสดง children (เนื้อหาภายใน)
  return <>{children}</>;
};

export default AuthCheck;
