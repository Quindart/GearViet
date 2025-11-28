"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaUser } from "react-icons/fa";
import { getUserDetail } from "@/services/userApi";
import { useAuthStore } from "@/store";
import { User } from "@/types/user";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import ProfileForm from "./components/ProfileForm";
import PasswordChange from "./components/PasswordChange";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

function ProfilePageContent() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user: authUser, refreshUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUserDetail();
        if (userData) {
          setUser(userData);
        } else {
          setError("Không thể tải thông tin tài khoản");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Có lỗi xảy ra khi tải thông tin tài khoản");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Thông tin tài khoản", icon: <FaUser className="w-4 h-4" /> },
  ];

  const handleProfileUpdate = async (updatedUser: User) => {
    setUser(updatedUser);
    await refreshUser();
    enqueueSnackbar("Cập nhật thông tin thành công!", { variant: "success" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
          <ErrorMessage
            title="Lỗi"
            message={error}
            onRetry={() => router.push("/")}
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-green-600 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "password"
                      ? "bg-green-600 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Đổi mật khẩu
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === "profile" && (
                <ProfileForm user={user} onUpdate={handleProfileUpdate} />
              )}
              {activeTab === "password" && <PasswordChange />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}

