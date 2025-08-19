import React from "react";
import { Button } from "../../../../components/ui/button";

export const SidebarSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "donees", label: "Donees", isActive: true },
    { id: "donors", label: "Donors", isActive: false },
    { id: "regional-managers", label: "Regional Managers", isActive: false },
    { id: "auth-managers", label: "Auth Managers", isActive: false },
  ];

  return (
    <aside className="w-[317px] h-full bg-gradient-to-b from-blue-800 to-purple-800 flex flex-col items-center py-2">
      {/* Logo */}
      <div className="w-[141px] h-[141px] relative mb-10">
        <div className="absolute w-[87px] h-[87px] top-7 left-[27px] bg-white rounded-[43.52px]" />
        <img
          className="absolute w-[141px] h-[141px] top-0 left-0 object-cover"
          alt="Logo"
          src="/6-6.png"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="w-full px-5 space-y-5">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={item.isActive ? "outline" : "default"}
            className={`w-full h-14 justify-center ${
              item.isActive
                ? "bg-transparent border border-[#ffffff80] shadow-[0px_2px_2px_#ffffff40] text-[#e8e8e8] font-semibold"
                : "bg-white text-black font-light shadow-m3-elevation-light-1"
            } rounded-[5px]`}
          >
            <span className="[font-family:'Outfit',Helvetica] text-base">
              {item.label}
            </span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};
