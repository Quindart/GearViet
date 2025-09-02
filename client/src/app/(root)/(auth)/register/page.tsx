"use client";

import { registerUser } from "@/services/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

// Validation schema with Vietnamese requirements
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .max(50, "Họ không được quá 50 ký tự")
    .required("Vui lòng nhập họ"),

  lastName: Yup.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự")
    .required("Vui lòng nhập tên"),

  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  phone: Yup.string()
    .matches(
      /^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-6889]|9[0-46-9])[0-9]{7}$/,
      "Số điện thoại không hợp lệ"
    )
    .required("Vui lòng nhập số điện thoại"),

  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await registerUser(values);

      if (response.success) {
        setSubmitSuccess(true);

        // Show success message and redirect after delay
        setTimeout(() => {
          router.push("/?message=registration-success");
        }, 2000);
      } else {
        setSubmitError(
          response.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại."
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
          {/* Registration Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Tạo tài khoản
              </h1>
              <p className="text-gray-600 text-sm">
                Tạo tài khoản mới để trải nghiệm dịch vụ của chúng tôi
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
                  {/* Success Message */}
                  {submitSuccess && (
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
                            Đăng ký thành công! Đang chuyển hướng đến trang
                            chủ...
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
                  {/* First Name */}
                  <div>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="Họ"
                      value={values.firstName || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.firstName && touched.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Tên"
                      value={values.lastName || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.lastName && touched.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
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

                  {/* Phone */}
                  <div>
                    <Field
                      name="phone"
                      type="tel"
                      placeholder="Số điện thoại"
                      value={values.phone || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.phone && touched.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="phone"
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

                  {/* Confirm Password */}
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu"
                      value={values.confirmPassword || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.confirmPassword && touched.confirmPassword
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
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
                      isSubmitting || submitSuccess
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {submitSuccess
                      ? "Đăng ký thành công!"
                      : isSubmitting
                      ? "Đang xử lý..."
                      : "Đăng ký"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
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

export default Register;
