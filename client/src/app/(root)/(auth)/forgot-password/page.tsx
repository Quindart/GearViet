"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { resetPassword } from "@/services/authService";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues: ForgotPasswordFormValues = {
    email: "",
  };

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await resetPassword(values.email);

      if (response.success) {
        setIsSuccess(true);
        enqueueSnackbar(
          response.message || "Vui lòng kiểm tra email để đặt lại mật khẩu",
          { variant: "success" }
        );
      } else {
        enqueueSnackbar(
          response.message || "Không thể gửi email đặt lại mật khẩu",
          { variant: "error" }
        );
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      enqueueSnackbar(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi gửi email đặt lại mật khẩu",
        { variant: "error" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden">
      {/* Cloud Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-20 bg-white opacity-60 rounded-full transform rotate-12"></div>
        <div className="absolute top-20 left-32 w-24 h-16 bg-white opacity-40 rounded-full"></div>
        <div className="absolute top-32 left-20 w-28 h-18 bg-white opacity-50 rounded-full transform -rotate-6"></div>

        <div className="absolute bottom-20 right-20 w-40 h-24 bg-white opacity-50 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-32 right-40 w-32 h-20 bg-white opacity-40 rounded-full"></div>
        <div className="absolute bottom-10 right-32 w-36 h-22 bg-white opacity-30 rounded-full transform -rotate-12"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Forgot Password Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <FaEnvelope className="text-green-600 text-2xl" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Quên mật khẩu
              </h1>
              <p className="text-gray-600 text-sm">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
              </p>
            </div>

            {isSuccess ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-green-600 text-4xl" />
                  </div>
                  <h2 className="text-lg font-semibold text-green-900 mb-2">
                    Email đã được gửi!
                  </h2>
                  <p className="text-sm text-green-800">
                    Vui lòng kiểm tra hộp thư email của bạn để đặt lại mật khẩu.
                    Nếu không thấy email, hãy kiểm tra thư mục spam.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Quay về trang đăng nhập
                  </button>
                  <Link
                    href="/"
                    className="block w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                  >
                    Về trang chủ
                  </Link>
                </div>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, handleChange, handleBlur }) => (
                  <Form className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={values.email || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <FaArrowLeft className="text-sm" />
                Quay về trang đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

