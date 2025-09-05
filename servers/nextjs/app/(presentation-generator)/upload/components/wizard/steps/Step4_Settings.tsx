// servers/nextjs/app/(presentation-generator)/upload/components/wizard/steps/Step4_Settings.tsx
import { Button } from "@/components/ui/button";
import { ConfigurationSelects } from "../../ConfigurationSelects"; // Путь может понадобиться скорректировать
import { PresentationConfig } from "../../../type"; // Путь может понадобиться скорректировать

interface StepSettingsProps {
  config: PresentationConfig;
  onConfigChange: (key: keyof PresentationConfig, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const Step4_Settings = ({ config, onConfigChange, nextStep, prevStep }: StepSettingsProps) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">4. Настройки презентации</h2>
      <p className="text-gray-500 mb-8">Выберите количество слайдов и язык.</p>
      <div className="w-full flex justify-center">
        <ConfigurationSelects config={config} onConfigChange={onConfigChange} />
      </div>
      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={prevStep} className="text-lg p-6">Назад</Button>
        <Button onClick={nextStep} className="text-lg p-6">Далее</Button>
      </div>
    </div>
  );
};