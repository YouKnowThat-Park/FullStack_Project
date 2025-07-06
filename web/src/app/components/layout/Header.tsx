"use client";
import { useModalStore } from "@/store/modal-store";
import HamburgerIcon from "@/ui/icon/HamburgerIcon";
import Link from "next/link";
import MenuModal from "./_components/MenuModal";

export default function Header() {
  const { isOpen, open } = useModalStore();

  return (
    <header className="w-full h-16 bg-[#efefef] rounded-lg mt-10">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">Study Project</Link>

        <div>
          <input type="text" className=" border" />
        </div>

        <button onClick={open}>
          <HamburgerIcon />
        </button>
      </div>
      {isOpen && <MenuModal />}
    </header>
  );
}
