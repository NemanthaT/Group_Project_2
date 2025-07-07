import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const NavigationBarSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    { label: "Home", width: "w-36" },
    { label: "Volunteer", width: "w-[153px]" },
    { label: "Contact Us", width: "w-[153px]" },
    { label: "About", width: "w-[133px]" },
  ];

  return (
    <header className="w-full h-[173px] relative">
      <div className="w-full h-[173px] relative">
        <div className="h-[110px] mt-[31px] bg-[#ffffffb2] w-full">
          {/* Logo */}
          <img
            className="w-[173px] h-[173px] absolute top-0 left-0 object-cover"
            alt="Logo"
            src="/6-6.png"
          />

          {/* Back button */}
          <div className="absolute w-[141px] h-[35px] top-[70px] left-[137px] [font-family:'Inter',Helvetica] font-normal text-black text-xl text-center tracking-[0] leading-[normal]">
            <span className="font-semibold">← </span>
            <span className="[font-family:'Outfit',Helvetica] font-semibold">
              Back
            </span>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="absolute top-[70px] left-[638px]">
            <NavigationMenuList className="flex space-x-4">
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index} className={`${item.width}`}>
                  <NavigationMenuLink className="[font-family:'Inter',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-[normal]">
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Logout button */}
          <div className="absolute top-[68px] left-[1687px]">
            <Button
              variant="outline"
              className="w-[91px] h-[37px] rounded-[30px] border border-solid border-[#ffffff33] bg-transparent"
            >
              <span className="[font-family:'Outfit',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-[normal]">
                Logout
              </span>
            </Button>
          </div>

          {/* User Avatar */}
          <Avatar className="absolute w-[66px] h-[66px] top-[53px] left-[1808px]">
            <AvatarImage
              src="/image.png"
              alt="User profile"
              className="object-cover"
            />
          </Avatar>
        </div>
      </div>
    </header>
  );
};
