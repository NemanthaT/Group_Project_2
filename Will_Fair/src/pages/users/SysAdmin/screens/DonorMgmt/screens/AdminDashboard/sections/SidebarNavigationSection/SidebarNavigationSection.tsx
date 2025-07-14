import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

export const SidebarNavigationSection = (): JSX.Element => {
  // Navigation items data
  const navItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "donees", label: "Donees", isActive: false },
    { id: "donors", label: "Donors", isActive: true },
    { id: "regional-managers", label: "Regional Managers", isActive: false },
    { id: "auth-managers", label: "Auth Managers", isActive: false },
  ];

  return (
    <nav className="w-[317px] h-full bg-gradient-to-b from-blue-800 to-purple-800 flex flex-col items-center py-2">
      <div className="mt-2 mb-8">
        <Avatar className="w-[141px] h-[141px] relative">
          <div className="absolute w-[87px] h-[87px] top-7 left-[27px] bg-white rounded-[43.52px]" />
          <AvatarImage src="/6-6.png" alt="Logo" className="object-cover" />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
      </div>

      <div className="w-[274px] space-y-5">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={item.isActive ? "outline" : "default"}
            className={`w-full h-14 justify-center rounded-[5px] font-outfit ${
              item.isActive
                ? "bg-transparent border border-[#ffffff80] shadow-[0px_2px_2px_#ffffff40] text-[#e8e8e8] font-semibold"
                : "bg-white text-black font-light shadow-m3-elevation-light-1"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};
