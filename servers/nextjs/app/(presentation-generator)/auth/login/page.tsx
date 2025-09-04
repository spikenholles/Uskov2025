"use client";
import { LogIn, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from '../../home/HomeHeader';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика авторизации
    console.log("Login:", { email, password });
    // Пока что редирект на главную презентаций
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Добро пожаловать</h1>
            <p className="text-muted-foreground">
              Войдите в свой аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="teacher@school.ru"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Войти
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Нет аккаунта? </span>
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}