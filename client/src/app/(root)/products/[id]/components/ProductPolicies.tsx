import { FaCheck, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";

export default function ProductPolicies() {
  return (
    <div className="space-y-4">
      {/* Cam kết bán hàng */}
      <div className="rounded-md border border-green-200 overflow-hidden">
        <h3 className="font-semibold bg-green-600 text-white p-2">
          Cam kết bán hàng
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm p-4">
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-600 w-4 h-4" />
            <span>Hàng chính hãng. Nguồn gốc rõ ràng</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTruck className="text-green-600 w-4 h-4" />
            <span>Hỗ trợ giao hàng toàn quốc</span>
          </div>
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-green-600 w-4 h-4" />
            <span>Bảo hành chính hãng toàn quốc</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUndo className="text-green-600 w-4 h-4" />
            <span>Hỗ trợ đổi mới trong vòng 30 ngày</span>
          </div>
        </div>
      </div>

      {/* Chính Sách Bán Hàng */}
      <div className="rounded-md border border-green-200 overflow-hidden">
        <h3 className="font-semibold bg-green-600 text-white p-2">
          Chính Sách Bán Hàng
        </h3>
        <div className="text-sm p-4 space-y-2">
          <div className="flex items-start gap-2">
            <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
            <span>Hỗ trợ đổi mới trong vòng 7 ngày.</span>
          </div>
          <div className="flex items-start gap-2">
            <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
            <span>Bảo hành chính hãng 24 tháng toàn quốc.</span>
          </div>
          <div className="flex items-start gap-2">
            <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
            <span>Hỗ trợ trả góp lãi suất 0% qua MPOS.</span>
          </div>
          <div className="flex items-start gap-2">
            <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
            <span>Hỗ trợ giao hàng toàn quốc.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
