"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import HomeIcon from "./icons/HomeIcon";
import MetricsIcon from "./icons/MetricsIcon";
import { DESKTOP_BREAKPOINT, useResponsive } from "../hooks/useResponsive";

export default function Sidebar() {
  const pathname = usePathname();

  const metricPath = pathname === "/metrics" 
  const dashboardPath = pathname === "/dashboard" 

  const isDesktop = useResponsive({ breakpoint: DESKTOP_BREAKPOINT });

  return (
    <>
      {isDesktop && (
        <div className="w-64 h-screen overflow-y-hidden border-r bg-sidebar text-primary flex flex-col">
          <div className="mt-6 mx-auto text-center">
            <div className="w-32">
              <Image src="/uala.svg" alt="Logo" width={82} height={82} />
            </div>
          </div>
          <nav className="p-4 space-y-8 mt-6">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 text-primary rounded-md transition-colors duration-200 font-normal"
            >
              <HomeIcon isCurrentRoute={dashboardPath} />
              <span
                className={`${
                  dashboardPath
                    ? "text-[#022A9A] font-bold text-md"
                    : "hover:bg-gray-100"
                }`}
              >
                Inicio
              </span>
            </Link>
            <Link
              href="/metrics"
              className="flex items-center space-x-2 px-4 py-2 text-primary rounded-md transition-colors duration-200 font-normal"
            >
              <MetricsIcon isCurrentRoute={metricPath} />
              <span
                className={`${
                  metricPath
                    ? "text-[#022A9A] font-bold text-md"
                    : "hover:bg-gray-100"
                }`}
              >
                Métricas
              </span>
            </Link>
          </nav>

          <div className="mt-auto p-4 bg-sidebar flex flex-col items-center justify-center">
            <p className="text-gray-700 mb-4 text-center">
              Descargá la app desde
            </p>
            <div className="space-y-3 text-center w-[140px] h-[140px] flex flex-col items-center justify-center">
              <a
                href="#"
                className="flex items-center justify-center bg-gray-200 p-2 rounded"
              >
                <Image
                  src="/Apple.svg"
                  alt="App Store"
                  width={32}
                  height={32}
                />
                <div className="ml-2 text-[#3A3A3A]">
                  <span className="text-[10px]">Download on the </span>
                  <p className="text-sm">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-200 p-2 rounded"
              >
                <Image
                  src="/Google.svg"
                  alt="Google Play"
                  width={32}
                  height={32}
                />
                <div className="ml-2 text-[#3A3A3A]">
                  <p className="text-[10px] pb-1">Download on </p>
                  <p className="text-sm">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
