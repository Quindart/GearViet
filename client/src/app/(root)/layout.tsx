import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PreFooter from "@/components/layout/PreFooter";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Layout;
