import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import Link from "next/link";

import { LayoutGridIcon, Image, StickerIcon, Users } from "lucide-react";
import { Header } from "../ui/header";

interface IRootTemplateProps {
  children: React.ReactNode;
  type: NavigationType;
}

export enum NavigationType {
  Home = "home",
  Logos = "logos",
  TemplateWebsites = "template-websites",
  Users = "users"
}

export function RootTemplate({ children, type }: IRootTemplateProps) {
  return (
    <>
      <div className="flex min-h-screen w-full bg-white">
        <aside className="hidden w-16 fixed h-screen mt-10 flex-col border-r border-gray-200 bg-gray-100 p-4 sm:flex">
          <nav className="flex flex-col items-center gap-4">
            <TooltipProvider>
              <Link
                href="/home"
                className={`group flex h-10 w-10 items-center justify-center rounded-lg ${
                  type === NavigationType.Home
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-200 hover:text-black"
                } transition-colors`}
                prefetch={false}
              >
                <LayoutGridIcon className="h-5 w-5" />
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/home/logos"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      type === NavigationType.Logos
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-black"
                    } transition-colors`}
                    prefetch={false}
                  >
                    <Image className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Templates de logos</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/home/websites"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      type === NavigationType.TemplateWebsites
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-black"
                    } transition-colors`}
                    prefetch={false}
                  >
                    <StickerIcon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Templates de sites
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/home/users"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      type === NavigationType.Users
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-black"
                    } transition-colors`}
                    prefetch={false}
                  >
                    <Users className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Usuários
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
