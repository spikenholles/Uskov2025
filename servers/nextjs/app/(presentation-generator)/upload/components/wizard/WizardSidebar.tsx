// servers/nextjs/app/(presentation-generator)/upload/components/wizard/WizardSidebar.tsx
'use client';

import { cn } from "@/lib/utils";

interface WizardSidebarProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Предмет" },
  { id: 2, name: "Класс" },
  { id: 3, name: "Тема" },
  { id: 4, name: "Шаблон" },
  { id: 5, name: "Медиа" },
];

export const WizardSidebar = ({ currentStep }: WizardSidebarProps) => {
  return (
    <div className="w-64 p-8 bg-blue-700 text-white rounded-lg">
      <nav>
        <ul className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <li key={step.id} className="relative flex items-center">
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[12px] top-8 h-full w-0.5",
                      isCompleted ? "bg-white" : "bg-blue-500"
                    )}
                  />
                )}
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-colors duration-300",
                      isActive ? "bg-white" : "bg-transparent",
                      isCompleted ? "bg-white" : "bg-transparent"
                    )}
                  >
                    {isCompleted && <div className="w-2 h-2 bg-blue-700 rounded-full" />}
                    {isActive && <div className="w-3 h-3 bg-blue-700 rounded-full" />}
                  </div>
                  <span className={cn(
                    "font-medium text-lg",
                    isActive ? "font-bold" : "text-blue-200"
                  )}>
                    {step.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-blue-300 mt-12">
            Генерация для продвинутых пользователей
        </p>
      </nav>
    </div>
  );
};