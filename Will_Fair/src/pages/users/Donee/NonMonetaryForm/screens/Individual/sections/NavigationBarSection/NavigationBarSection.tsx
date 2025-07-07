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
  const navItems = [
    { label: "Home", width: "w-36" },
    { label: "Volunteer", width: "w-[153px]" },
    { label: "Contact Us", width: "w-[153px]" },
    { label: "About", width: "w-[133px]" },
  ];

  return (
    <header className="w-full h-[173px] relative">
      <div className="relative w-full h-full">
        <div className="w-full h-[110px] top-[31px] bg-[#ffffffb2] absolute left-0" />

        <NavigationMenu className="absolute top-[70px] left-1/2 -translate-x-1/2">
          <NavigationMenuList className="flex gap-4">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index} className={item.width}>
                <NavigationMenuLink className="font-medium text-black text-2xl text-center tracking-[0] leading-normal font-['Inter',Helvetica]">
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <img
          className="w-[173px] h-[173px] top-0 absolute left-0 object-cover"
          alt="Logo"
          src="/6-6.png"
        />

        <Button
          variant="ghost"
          className="absolute w-[141px] h-[35px] top-[70px] left-[137px] font-normal text-black text-xl text-center tracking-[0] leading-normal p-0"
        >
          <span className="font-semibold">← </span>
          <span className="font-['Outfit',Helvetica] font-semibold">Back</span>
        </Button>

        <div className="absolute flex items-center gap-4 top-[53px] right-[46px]">
          <Button
            variant="outline"
            className="h-[37px] rounded-[30px] border border-solid border-[#ffffff33] bg-transparent"
          >
            <span className="font-['Outfit',Helvetica] font-medium text-white text-base">
              Logout
            </span>
          </Button>

          <Avatar className="w-[66px] h-[66px]">
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
