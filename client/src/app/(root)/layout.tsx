"use client"
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PreFooter from "@/components/layout/PreFooter";
import NotificationProvider from "@/components/providers/NotificationProvider";
import MyChatBot from "@/components/shared/MyChatBot";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <div>
        <Header />
        {children}
        <PreFooter />
        <Footer />
      </div>
      <MyChatBot />
    </NotificationProvider>
  );
};

export default Layout;
