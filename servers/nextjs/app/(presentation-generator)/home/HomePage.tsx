"use client";
import Header from './HomeHeader';
import { ArrowRight, PlayCircle, Download, Sparkles, FileText, Video, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Конструктор презентаций
            <span className="block text-primary">для учителей</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Создавайте учебные презентации с видео, генерируйте слайды с помощью ИИ 
            и экспортируйте в PDF/PPTX за считанные минуты
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Начать бесплатно
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <PlayCircle className="w-5 h-5" />
              Посмотреть демо
            </button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            20 презентаций бесплатно • Не требует карты
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Создание презентаций отнимает 
              <span className="text-primary"> 2-3 часа</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-background rounded-lg border">
                <div className="text-2xl mb-2">😤</div>
                <h3 className="font-semibold mb-2">Долго оформлять</h3>
                <p className="text-sm text-muted-foreground">
                  Выбор шрифтов, цветов, размещение текста и картинок
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <div className="text-2xl mb-2">🎬</div>
                <h3 className="font-semibold mb-2">Сложно с видео</h3>
                <p className="text-sm text-muted-foreground">
                  Встроить видео так, чтобы оно работало везде
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border">
                <div className="text-2xl mb-2">💭</div>
                <h3 className="font-semibold mb-2">Придумывать контент</h3>
                <p className="text-sm text-muted-foreground">
                  Генерация идей для слайдов и подбор материала
                </p>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="text-lg font-medium">
                "Трачу по 40-60 минут на каждую презентацию. 
                Больше времени уходит на оформление, чем на сам урок!"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — Учитель физики, Москва
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Решение: презентации за 
              <span className="text-primary"> 5 минут</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              ИИ создает слайды, вы добавляете видео и экспортируете
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ИИ-генерация</h3>
              <p className="text-muted-foreground leading-relaxed">
                Напишите тему — получите готовые слайды с текстом, заголовками и структурой для любого предмета
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Видео и медиа</h3>
              <p className="text-muted-foreground leading-relaxed">
                Встраивайте видео с YouTube, загружайте файлы — всё сохранится в оригинальном качестве
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Универсальный экспорт</h3>
              <p className="text-muted-foreground leading-relaxed">
                Сохраняйте в PDF или PPTX — работает на любом устройстве и в любой программе
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Всё что нужно учителю
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Предметные шаблоны
              </h3>
              <p className="text-muted-foreground mb-4">
                Готовые шаблоны для математики, истории, физики, химии и других предметов
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Математические формулы и графики</li>
                <li>• Исторические временные линии</li>
                <li>• Схемы для физики и химии</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                По классам и возрасту
              </h3>
              <p className="text-muted-foreground mb-4">
                ИИ адаптирует сложность и стиль под возраст учеников
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• "Фотосинтез для 6 класса"</li>
                <li>• "Великая отечественная война для 9 класса"</li>
                <li>• "Производная для 11 класса"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Попробуйте прямо сейчас
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            20 презентаций бесплатно, без карты и регистрации
          </p>
          
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Создать первую презентацию
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-sm text-muted-foreground mt-6">
            Уже есть аккаунт? <Link href="/auth/login" className="text-primary hover:underline">Войдите</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 ООО "Стартапчик". Сделано для учителей с любовью в рамках Город IT: HACK</p>
        </div>
      </footer>
    </div>
  );
}