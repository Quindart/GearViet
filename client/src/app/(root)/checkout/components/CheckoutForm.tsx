"use client";

import { useState, useEffect } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPhone, FaEdit } from "react-icons/fa";
import { useAuthStore } from "@/store";
import { getProvinces, getProvinceWithWards, Province, Ward } from "@/services/provincesApi";
import CouponInput from "./CouponInput";

interface CheckoutFormProps {
  onSubmit: (
    customerInfo: {
      fullname: string;
      phone: string;
      email?: string;
      address: string;
    },
    couponCode?: string,
    paymentType?: string
  ) => void;
  loading: boolean;
}

export default function CheckoutForm({ onSubmit, loading }: CheckoutFormProps) {
  const { user } = useAuthStore();
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");
  const [couponCode, setCouponCode] = useState("");
  const [validatedCoupon, setValidatedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  useEffect(() => {
    if (user) {
      const userFullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      setFullname(userFullName || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedProvince) {
        setLoadingWards(true);
        setSelectedWard(null);
        setWards([]);
        try {
          const provinceData = await getProvinceWithWards(selectedProvince);
          if (provinceData && provinceData.wards) {
            setWards(provinceData.wards);
          }
        } catch (error) {
          console.error("Error fetching wards:", error);
        } finally {
          setLoadingWards(false);
        }
      } else {
        setWards([]);
        setSelectedWard(null);
      }
    };

    fetchWards();
  }, [selectedProvince]);

  const handleCouponValidated = (code: string, discount: number) => {
    setCouponCode(code);
    setValidatedCoupon({ code, discount });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname.trim()) {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (!addressDetail.trim()) {
      alert("Vui lòng nhập địa chỉ cụ thể");
      return;
    }

    if (!selectedProvince) {
      alert("Vui lòng chọn tỉnh/thành phố");
      return;
    }

    if (!selectedWard) {
      alert("Vui lòng chọn phường/xã");
      return;
    }

    const selectedProvinceData = provinces.find(
      (p) => p.code === selectedProvince
    );
    const selectedWardData = wards.find((w) => w.code === selectedWard);

    const fullAddress = [
      addressDetail.trim(),
      selectedWardData ? selectedWardData.name : "",
      selectedProvinceData ? selectedProvinceData.name : "",
    ]
      .filter(Boolean)
      .join(", ");

    onSubmit(
      {
        fullname: fullname.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        address: fullAddress,
      },
      validatedCoupon?.code || couponCode || undefined,
      paymentType
    );
  };

  const handleEditInfo = () => {
    setIsEditingInfo(true);
  };

  const handleCancelEdit = () => {
    if (user) {
      const userFullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      setFullname(userFullName || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
    setIsEditingInfo(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Thông tin giao hàng
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Thông tin khách hàng
            </h3>
            {!isEditingInfo && (
              <button
                type="button"
                onClick={handleEditInfo}
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <FaEdit className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={!isEditingInfo}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                !isEditingInfo ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <FaPhone className="text-gray-400" />
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditingInfo}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                !isEditingInfo ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email (tùy chọn)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditingInfo}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                !isEditingInfo ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Nhập email"
            />
          </div>

          {isEditingInfo && (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => setIsEditingInfo(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Địa chỉ giao hàng
          </h3>

          {/* Province Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Tỉnh/Thành phố <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProvince || ""}
              onChange={(e) => setSelectedProvince(Number(e.target.value) || null)}
              disabled={loadingProvinces}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              required
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
            {loadingProvinces && (
              <p className="text-xs text-gray-500 mt-1">Đang tải...</p>
            )}
          </div>

          {/* Ward Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phường/Xã <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedWard || ""}
              onChange={(e) => setSelectedWard(Number(e.target.value) || null)}
              disabled={!selectedProvince || loadingWards}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white ${
                !selectedProvince ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              required
            >
              <option value="">
                {!selectedProvince
                  ? "Vui lòng chọn tỉnh/thành phố trước"
                  : loadingWards
                  ? "Đang tải..."
                  : "Chọn phường/xã"}
              </option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          {/* Address Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Địa chỉ cụ thể <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Số nhà, tên đường, khu vực..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ví dụ: 123 Đường ABC, Khu dân cư XYZ
            </p>
          </div>
        </div>

        {/* Coupon Code */}
        <CouponInput
          onCouponValidated={handleCouponValidated}
        />

        {/* Payment Method */}
        <div>
          <div className="text-sm font-medium text-gray-900 mb-3">
            Phương thức thanh toán <span className="text-red-500">*</span>
          </div>
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentType === "cash"}
                onChange={() => setPaymentType("cash")}
                className="mr-3"
              />
              <FaMoneyBillWave className="text-green-600 mr-3" />
              <span className="font-medium">Thanh toán khi nhận hàng</span>
            </label>

            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentType === "online"}
                onChange={() => setPaymentType("online")}
                className="mr-3"
              />
              <FaCreditCard className="text-blue-600 mr-3" />
              <span className="font-medium">Thanh toán online</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Đang xử lý..." : "ĐẶT HÀNG"}
        </button>
      </form>
    </div>
  );
}

