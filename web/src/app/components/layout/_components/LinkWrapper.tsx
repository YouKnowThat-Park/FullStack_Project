// components/ModalLink.tsx
"use client";
import Link from "next/link";
import { useModalStore } from "@/store/modal-store";
import { ComponentProps } from "react";

type ModalLinkProps = ComponentProps<typeof Link>;

export const ModalLink = ({ href, children, ...props }: ModalLinkProps) => {
  const { close } = useModalStore();

  return (
    <Link href={href} onClick={close} {...props}>
      {children}
    </Link>
  );
};
