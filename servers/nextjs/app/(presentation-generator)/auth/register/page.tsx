"use client";
import { UserPlus, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from '../../home/HomeHeader';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    subject: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", formData);
    // Здесь будет логика регистрации
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Header />

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Создать аккаунт</h1>
            <p className="text-muted-foreground">
              Начните создавать презентации бесплатно
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
            <label className="block text-sm font-medium mb-2">
                Имя
            </label>
            <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Анна"
                required
            />
            </div>



            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="teacher@school.ru"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Школа (необязательно)
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={handleChange("school")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Школа №123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Минимум 6 символов"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Создать аккаунт
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Уже есть аккаунт? </span>
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Войти
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            Регистрируясь, вы получаете 20 презентаций бесплатно
          </p>
        </div>
      </div>
    </div>
  );
}