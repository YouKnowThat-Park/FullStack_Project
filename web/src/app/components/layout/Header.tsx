"use client";
import { useModalStore } from "@/store/modal-store";
import Link from "next/link";
import { HamburgerIcon } from "@/ui/icon/HamburgerIcon";
import { MenuModal } from "./_components/MenuModal";

export const Header = () => {
  const { modalType, open } = useModalStore();

  return (
    <header className="w-full h-16 bg-[#efefef] rounded-lg mt-10 mb-5">
      <div className="flex flex-row items-center gap-4">
        <Link href="/" className="font-black ml-4 text-2xl">
          Study Project
        </Link>

        <div className="ml-auto flex items-center gap-2 p-4">
          <input type="text" className="border w-[500px] h-8" />

          <button onClick={() => open("headerModal")} className="">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      {modalType === "headerModal" && <MenuModal />}
    </header>
  );
};
