"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { useResponsive, DESKTOP_BREAKPOINT } from "@/app/hooks/useResponsive";
import Image from "next/image";
import { Menu } from "lucide-react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useResponsive({ breakpoint: DESKTOP_BREAKPOINT });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isDesktop ? (
        <div
          className="bg-white absolute top-0 left-0 w-full h-20"
          style={{ borderBottomRightRadius: "40px" }}
        >
          <Avatar />
        </div>
      ) : (
        <div
          className="bg-white shadow-sm absolute top-0 left-0 w-full h-20 flex items-center px-4 "
          style={{
            borderTop: "none",        
            borderLeft: "none",        
            borderBottomRightRadius: 50
          }}
        >
          <div className="justify-start">
          <Menu className="w-6 h-6 text-[#022A9A]" />
          </div>
          <div className="justify-center mx-auto">
          <Image
            src="/uala-tipo.svg"
            alt="Logo"
            width={82}
            height={82}
            className="h-auto w-auto"
          /></div>
        </div>
      )}

      <div className="w-full h-screen overflow-y-hidden bg-[#FAFAFA]">
        {children}
      </div>
    </>
  );
};
