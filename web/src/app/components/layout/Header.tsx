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
        <Link href="/">Study Project</Link>

        <div>
          <input type="text" className=" border" />
        </div>

        <button onClick={() => open("headerModal")}>
          <HamburgerIcon />
        </button>
      </div>
      {modalType === "headerModal" && <MenuModal />}
    </header>
  );
};
