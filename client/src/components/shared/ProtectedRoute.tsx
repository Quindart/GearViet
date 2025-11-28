"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store";
import LoadingSpinner from "./LoadingSpinner";

// Helper to show error message
const showError = (message: string) => {
  // Using console for now since we can't use hooks here
  console.error(message);
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
  requiredRole?: string[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredAuth = true,
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (requiredAuth && !isAuthenticated && !isLoading) {
        // Store the intended destination
        const returnUrl = pathname ? encodeURIComponent(pathname) : "/";
        router.push(`${redirectTo}?returnUrl=${returnUrl}`);
        return;
      }

      if (requiredRole && user && !requiredRole.includes(user.role)) {
        // User doesn't have required role
        showError("Bạn không có quyền truy cập trang này");
        router.push("/");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, isLoading, user, requiredRole, requiredAuth, pathname, router, redirectTo]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Only render children if authentication checks pass
  if (requiredAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

