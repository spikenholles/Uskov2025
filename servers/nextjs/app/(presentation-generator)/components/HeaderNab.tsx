"use client";
import { LayoutDashboard, Settings, Upload, LogOut } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const HeaderNav = () => {
  const canChangeKeys = useSelector((state: RootState) => state.userConfig.can_change_keys);
  const pathname = usePathname();

  const handleLogout = () => {
    // Логика выхода
    localStorage.removeItem('auth-token');
    window.location.href = '/home';
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        prefetch={false}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors outline-none"
        role="menuitem"
        onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/dashboard" })}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Дашборд</span>
      </Link>
      
      {canChangeKeys && (
        <Link
          href="/settings"
          prefetch={false}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors outline-none"
          role="menuitem"
          onClick={() => trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/settings" })}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors outline-none"
        title="Выйти"
      >
        <LogOut className="w-4 h-4" />
        <span>Выйти</span>
      </button>
    </div>
  );
};

export default HeaderNav;