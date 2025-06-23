"use client";

import { authService } from "@/services/authService";
import { LoginFormData } from "@/types/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

// Validation schema with Vietnamese requirements
const validationSchema = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên đăng nhập hoặc email"),

  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for registration success message
    const message = searchParams.get("message");
    if (message === "registration-success") {
      setRegistrationSuccess(true);
      // Clear the message after showing it
      setTimeout(() => setRegistrationSuccess(false), 5000);
    }
  }, [searchParams]);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
    remember: false,
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const loginData: LoginFormData = {
        username: values.username,
        password: values.password,
        remember: values.remember,
      };

      const response = await authService.login(loginData);

      if (response.success) {
        // Redirect to dashboard or home page
        router.push("/");
      } else {
        setSubmitError(
          response.message || "Đăng nhập thất bại. Vui lòng thử lại."
        );
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại."
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
          {/* Login Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Đăng nhập
              </h1>
              <p className="text-gray-600 text-sm">
                Đăng nhập vào tài khoản của bạn
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ errors, touched, values, handleChange, handleBlur }) => (
                <Form className="space-y-4">
                  {/* Registration Success Message */}
                  {registrationSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Đăng ký thành công! Bạn có thể đăng nhập ngay bây
                            giờ.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">
                            {submitError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Username */}
                  <div>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Tên đăng nhập hoặc Email"
                      value={values.username || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
                      value={values.password || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        name="remember"
                        type="checkbox"
                        checked={values.remember || false}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Ghi nhớ đăng nhập
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
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
                    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Registration Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            {/* Back to Home Link */}
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <FaArrowLeft className="text-sm" />
                Quay về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
