import { ICONS, IconName } from "@/constants/icons";
import Image from "next/image";
import React from "react";

interface SharedIconProps {
  type: "ICON" | "IMAGE";
  iconName: IconName | string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const SharedIcon: React.FC<SharedIconProps> = ({
  type = "ICON",
  iconName,
  width = 24,
  height = 24,
  className = "",
  alt = "icon",
}) => {
  return (
    <Image
      src={`/assets/${type === "ICON" ? "icons" : "images"}/${
        iconName in ICONS ? ICONS[iconName as IconName] : iconName
      }`}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};

export default SharedIcon;
