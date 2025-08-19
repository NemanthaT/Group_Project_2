import { ChevronDownIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { DonorTableSection } from "./sections/DonorTableSection";
import { FilterSection } from "./sections/FilterSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavbarSection } from "./sections/NavbarSection/NavbarSection";
import { SearchSection } from "./sections/SearchSection/SearchSection";
import { SidebarNavigationSection } from "./sections/SidebarNavigationSection";

export const AdminDashboard = (): JSX.Element => {
  return (
    <div className="bg-[#faf2ff] flex flex-row justify-center w-full">
      <div className="bg-[#faf2ff] w-full relative flex flex-col">
        {/* Sidebar Navigation */}
        <div className="fixed w-[317px] h-screen left-0 top-0 z-10">
          <div className="w-[272px] h-14 mt-[388px] mx-5 rounded-[10px] shadow-m3-elevation-light-1 bg-[linear-gradient(90deg,rgba(213,123,255,1)_0%,rgba(213,121,255,1)_48%,rgba(197,71,255,1)_100%)]" />
          <SidebarNavigationSection />
        </div>

        {/* Main Content Area */}
        <div className="ml-[317px] flex flex-col w-[calc(100%-317px)]">
          {/* Top Navigation Bar */}
          <div className="h-[100px] w-full flex justify-end items-center pr-4">
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
              Donor Management
            </h1>
            <div className="font-['Outfit',Helvetica] font-normal text-[#b5b5b5] text-[15px] mt-[35px]">
              Dashboard &gt; Donors
            </div>
          </div>

          {/* SearchIcon and Filter */}
          <div className="flex justify-end items-center px-[53px] mt-[10px]">
            <div className="relative w-[441px] mr-[13px]">
              <Input
                className="h-[55px] bg-[#fefdff] rounded-[20px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000040] pl-[30px] font-['Outfit',Helvetica] font-medium text-[#00000080] text-[23.5px]"
                placeholder="SearchIcon..."
              />
              <SearchIcon className="absolute w-[34px] h-[31px] top-3 right-4 text-black" />
            </div>
            <Button
              variant="outline"
              className="h-[55px] w-[165px] bg-[#ffffffcc] rounded-[15px] border-[0.5px] border-solid border-[#0000001a] shadow-[0px_1px_1px_#00000033] font-['Outfit',Helvetica] font-semibold text-black text-[23.3px]"
            >
              Filter
              <ChevronDownIcon className="ml-2 w-[21px] h-[21px]" />
            </Button>
          </div>

          {/* Main Content Sections */}
          <div className="flex flex-col w-full mt-4">
            <NavbarSection />
            <DonorTableSection />
            <SearchSection />
            <HeaderSection />
            <FilterSection />
            <MainContentSection />
          </div>
        </div>
      </div>
    </div>
  );
};
