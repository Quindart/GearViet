import { FaCheck } from "react-icons/fa";

interface PolicyCardProps {
  title: string;
  items: string[];
  bgColor?: "green" | "gray";
}

export const PolicyCard: React.FC<PolicyCardProps> = ({
  title,
  items,
  bgColor = "green",
}) => {
  const headerBgClass = bgColor === "green" ? "bg-green-600" : "bg-gray-800";

  return (
    <div className="rounded-md border border-green-200 overflow-hidden">
      <h3 className={`font-semibold ${headerBgClass} text-white p-2`}>
        {title}
      </h3>
      <div className="text-sm p-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <FaCheck className="text-green-600 w-3 h-3 mt-1 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
