"use client";
import { LogIn, Settings, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeHeader = () => {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold font-inter">ООО "Стартапчик"</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/features" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Возможности
          </Link>
          <Link 
            href="/templates" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Шаблоны
          </Link>
          <Link 
            href="/pricing" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Тарифы
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Войти
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Попробовать бесплатно
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;