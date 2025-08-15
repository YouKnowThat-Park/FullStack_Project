"use client";
import { useModalStore } from "@/store/modal-store";
import { ModalLink } from "./LinkWrapper";
import { handleLogout } from "@/utils/Logout.ts";

export const MenuModal = () => {
  const { close } = useModalStore();

  return (
    <div className="fixed inset-0 z-50  bg-black/50 flex items-center justify-center">
      <div className="bg-white h-[550px] w-[700px] p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📋 메뉴판</h1>
          <button onClick={close} className="text-gray-500 hover:text-gray-800">
            닫기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-3 border-b pb-1">
              회원 정보
            </h2>
            <div className="flex flex-col gap-2">
              <ModalLink href="/sign-up" className="hover:text-blue-600">
                회원 가입
              </ModalLink>
              <ModalLink href="/sign-in" className="hover:text-blue-600">
                로그인
              </ModalLink>
              <ModalLink href="/mypage" className="hover:text-blue-600">
                마이페이지
              </ModalLink>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 font-medium text-left"
              >
                로그 아웃
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-3 border-b pb-1">
              관리자 페이지
            </h2>
            <div className="flex flex-col gap-2">
              <ModalLink href="/admin" className="hover:text-blue-600">
                관리자
              </ModalLink>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-3 border-b pb-1">
              사용자 전용
            </h2>
            <div className="flex flex-col gap-2">
              <ModalLink href="/products" className="hover:text-blue-600">
                상점
              </ModalLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 bg-green-500 mt-10">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">/</div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">/</div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">/</div>
        </div>
      </div>
    </div>
  );
};
