"use client";
import SharedIcon from "@/components/shared/icons";
import { footerData } from "./mockFooterData";

const Footer = () => {
  return (
    <footer className="bg-black text-primary pt-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <SharedIcon
                type="IMAGE"
                iconName="FOOTER_LOGO"
                width={123}
                height={104}
                className="w-[123px] h-[104px] object-contain"
              />
            </div>

            <h3 className="text-primary font-bold text-base mb-4">
              {footerData.company.name}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-400">📍</span>
                <span className="text-primary">
                  {footerData.company.address}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-green-400">📞</span>
                <span className="text-primary">
                  {footerData.company.phones.join(" / ")}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-green-400">✉️</span>
                <span className="text-primary">{footerData.company.email}</span>
              </div>
            </div>

            <div className="text-sm text-primary mt-4">
              <p>
                MST: {footerData.company.businessInfo.mst} Ngày cấp:{" "}
                {footerData.company.businessInfo.date}
              </p>
              <p>Nơi Cấp: {footerData.company.businessInfo.location}</p>
              <p className="mt-2">
                {footerData.company.businessInfo.description}
              </p>
            </div>

            {/* Certification Badge */}
            <div className="mt-4">
              <SharedIcon
                width={120}
                height={45}
                type="IMAGE"
                iconName="FOOTER_DA_THONG_BAO"
              />
            </div>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="text-primary font-bold text-base mb-4">
              {footerData.customerPolicies.title}
            </h3>
            <ul className="space-y-2">
              {footerData.customerPolicies.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-primary hover:text-green-400 transition-colors duration-200 flex items-center"
                  >
                    <span className="text-green-400 mr-2">•</span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-primary font-bold text-base mb-4">
              {footerData.info.title}
            </h3>
            <ul className="space-y-2">
              {footerData.info.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-primary hover:text-green-400 transition-colors duration-200 flex items-center"
                  >
                    <span className="text-green-400 mr-2">•</span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-primary font-bold text-base mb-4">
              {footerData.support.title}
            </h3>
            <div className="space-y-3">
              {footerData.support.contact.map((contact, index) => (
                <div key={index} className="text-sm text-primary">
                  <span className="text-green-400 mr-2">•</span>
                  <span>{contact.type}: </span>
                  <span className="text-blue-400 font-semibold">
                    {contact.value}
                  </span>
                  <span className="text-primary"> {contact.time}</span>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-primary font-bold text-base mb-2">
                {footerData.paymentMethods.title}
              </h3>
              <SharedIcon
                width={246}
                height={24}
                className="w-full h-auto"
                type="IMAGE"
                iconName="FOOTER_TRUST"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 py-4 text-center bg-[#111111]">
        <p className="text-sm text-primary">{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
