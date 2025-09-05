// servers/nextjs/app/(presentation-generator)/upload/page.tsx
import React from "react";
import PresentationWizard from "./components/PresentationWizard"; // Импортируем наш новый главный компонент
import Header from "@/app/(presentation-generator)/dashboard/components/Header";
import { Metadata } from "next";

// Метаданные можно оставить без изменений
export const metadata: Metadata = { /* ... */ };

const Page = () => {
  return (
    <div className="relative bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <h1 className="text-4xl font-bold font-instrument_sans text-gray-800">
          Создать презентацию
        </h1>
        <p className='text-lg text-gray-500 mt-2'>Пройдите 5 простых шагов для идеального результата</p>
      </div>
      
      {/* Здесь мы вызываем наш новый конструктор */}
      <PresentationWizard />
    </div>
  );
};

export default Page;