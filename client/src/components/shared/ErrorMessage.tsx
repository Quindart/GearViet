import { FaExclamationCircle } from "react-icons/fa";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  title = "Đã xảy ra lỗi",
  message,
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <FaExclamationCircle className="text-red-600 text-2xl" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Thử lại
        </button>
      )}
    </div>
  );
}

