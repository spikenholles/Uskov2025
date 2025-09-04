"use client";

import Wrapper from "@/components/Wrapper";
import React from "react";
import Link from "next/link";
import BackBtn from "@/components/BackBtn";
import { usePathname } from "next/navigation";
import HeaderNav from "@/app/(presentation-generator)/components/HeaderNab";
import { Layout, FilePlus2, BookOpen } from "lucide-react";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(pathname !== "/upload" && pathname !== "/dashboard") && <BackBtn />}
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/dashboard" })}
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold font-inter">ООО "Стартапчик"</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {/* <Link
            href="/custom-template"
            prefetch={false}
            onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/custom-template" })}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors outline-none"
            role="menuitem"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Создать шаблон</span>
          </Link> */}
          <Link
            href="/template-preview"
            prefetch={false}
            onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/template-preview" })}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors outline-none"
            role="menuitem"
          >
            <Layout className="w-4 h-4" />
            <span>Шаблоны</span>
          </Link>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
};

export default Header;