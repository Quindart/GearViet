import { FaInbox } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {icon || <FaInbox className="text-gray-400 text-3xl" />}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      
      {message && (
        <p className="text-gray-600 mb-4 max-w-md">{message}</p>
      )}
      
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

