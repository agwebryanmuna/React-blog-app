import { type ReactNode } from "react";
import Navbar from "./ui/Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* NAVBAR */}
      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
