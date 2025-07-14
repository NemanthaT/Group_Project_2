import { SearchIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import { ActionsSection } from "./sections/ActionsSection/ActionsSection";
import { DonorListSection } from "./sections/DonorListSection";
import { FilterSection } from "./sections/FilterSection/FilterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { NavbarSection } from "./sections/NavbarSection";
// Import all sections
import { SearchSection } from "./sections/SearchSection/SearchSection";
import { SidebarSection } from "./sections/SidebarSection";

export const AdminDashboard = (): JSX.Element => {
  return (
    <div className="bg-[#faf2ff] flex flex-row justify-center w-full">
      <div className="bg-[#faf2ff] w-full relative flex">
        {/* Sidebar */}
        <div className="w-[17%] h-screen">
          <SidebarSection />
        </div>

        {/* Main Content */}
        <div className="w-[83%] flex flex-col">
          {/* Top Navigation Bar */}
          <div className="h-[100px] flex justify-end items-center pr-4">
            <Button
              variant="outline"
              className="h-[37px] w-[103px] rounded-[30px] border border-solid border-[#ffffff33] mr-4"
            >
              <span className="font-medium text-white text-base">Logout</span>
            </Button>
            <img
              className="w-[58px] h-[58px]"
              alt="Profile icon"
              src="/profile-icon-7.png"
            />
          </div>

          {/* Page Header */}
          <div className="px-[53px] pt-[46px]">
            <h1 className="font-['Outfit',Helvetica] font-semibold text-black text-5xl">
              Donee Management
            </h1>

            <div className="flex justify-between items-center mt-6">
              <Breadcrumb className="font-['Outfit',Helvetica] font-normal text-[#b5b5b5] text-[15px]">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Donees</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-4">
                <Card className="relative w-[441px] h-[55px] bg-[#fefdff] rounded-[20px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000040] flex items-center px-6">
                  <Input
                    className="border-none shadow-none h-[30px] font-['Outfit',Helvetica] font-medium text-[#00000080] text-[23.5px] focus-visible:ring-0 pl-0"
                    placeholder="Search..."
                  />
                  <SearchIcon className="w-[34px] h-[31px] text-black" />
                </Card>

                <Button
                  variant="outline"
                  className="h-[55px] w-[165px] bg-[#ffffffcc] rounded-[15px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000033] font-['Outfit',Helvetica] font-semibold text-black text-[23.3px]"
                >
                  Filter
                  <img
                    className="w-[21px] h-[21px] ml-1"
                    alt="Dropdown arrow"
                    src="/dropdown-arrow-svgrepo-com-1.svg"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="flex-1 px-[53px] mt-6 flex flex-col gap-4">
            <NavbarSection />
            <DonorListSection />
            <FilterSection />
            <HeaderSection />
            <ActionsSection />
            <SearchSection />
          </div>
        </div>
      </div>
    </div>
  );
};
