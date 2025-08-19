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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { ActionSection } from "./sections/ActionSection";
import { DashboardBreadcrumbSection } from "./sections/DashboardBreadcrumbSection";
import { FilterSection } from "./sections/FilterSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { NavbarSection } from "./sections/NavbarSection/NavbarSection";
import { SidebarSection } from "./sections/SidebarSection";
import { TableSection } from "./sections/TableSection";

export const AdminDashboard = (): JSX.Element => {
  return (
    <div className="bg-[#faf2ff] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#faf2ff] w-full max-w-[1920px] relative flex flex-col">
        {/* Sidebar */}
        <div className="fixed w-[317px] h-screen left-0 top-0 z-10">
          <div className="w-[272px] h-14 mt-[388px] ml-5 rounded-[10px] shadow-m3-elevation-light-1 bg-[linear-gradient(90deg,rgba(213,123,255,1)_0%,rgba(213,121,255,1)_48%,rgba(197,71,255,1)_100%)]" />
          <SidebarSection />
        </div>

        {/* Main Content Container */}
        <div className="ml-[317px] flex flex-col w-[calc(100%-317px)]">
          {/* Top Navigation Bar */}
          <div className="h-[100px] w-full flex justify-end items-center pr-6">
            <Button
              variant="outline"
              className="mr-4 h-[37px] w-[105px] rounded-[30px] border border-solid border-[#ffffff33] bg-transparent"
            >
              <span className="[font-family:'Outfit',Helvetica] font-medium text-white text-base">
                Logout
              </span>
            </Button>
            <img
              className="w-[58px] h-[58px]"
              alt="Profile icon"
              src="/profile-icon-7.png"
            />
          </div>

          {/* Main Dashboard Content */}
          <div className="px-[53px] pb-8 flex flex-col w-full">
            {/* Title Section */}
            <h1 className="mt-[46px] [font-family:'Outfit',Helvetica] font-semibold text-black text-5xl">
              Regional Managers
            </h1>

            {/* Breadcrumb Section */}
            <div className="mt-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      className="[font-family:'Outfit',Helvetica] font-normal text-[#b5b5b5] text-[15px]"
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      className="[font-family:'Outfit',Helvetica] font-normal text-[#b5b5b5] text-[15px]"
                    >
                      Regional Managers
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* SearchIcon and Filter Section */}
            <div className="flex justify-end mt-4 mb-6 gap-3">
              <div className="relative w-[443px]">
                <Input
                  className="h-[55px] bg-[#fefdff] rounded-[20px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000040] pl-[30px] [font-family:'Outfit',Helvetica] font-medium text-[#00000080] text-[23.5px]"
                  placeholder="SearchIcon..."
                />
                <SearchIcon className="absolute w-[34px] h-[31px] top-3 right-4 text-black" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-[55px] w-[167px] bg-[#ffffffcc] rounded-[15px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000033] [font-family:'Outfit',Helvetica] font-semibold text-black text-[23.3px]"
                  >
                    Filter
                    <img
                      className="ml-2 w-[21px] h-[21px]"
                      alt="Dropdown arrow"
                      src="/dropdown-arrow-svgrepo-com-1.svg"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Filter content will be rendered here */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Dashboard Sections */}
            <NavbarSection />
            <FilterSection />
            <MainContentSection />
            <DashboardBreadcrumbSection />
            <ActionSection />
            <TableSection />
          </div>
        </div>
      </div>
    </div>
  );
};
