// servers/nextjs/app/(presentation-generator)/upload/components/wizard/steps/Step3_Topic.tsx
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface StepTopicProps {
  topic: string;
  onTopicChange: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const Step3_Topic = ({ topic, onTopicChange, nextStep, prevStep }: StepTopicProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex items-baseline justify-center gap-4">
            <span className="text-8xl font-bold text-blue-600">3.</span>
            <h2 className="text-4xl font-bold">Выберите тему презентации:</h2>
        </div>
      <Textarea
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        placeholder="Например: 'Основные законы Ньютона и их применение в реальной жизни, включая примеры с движением планет и автомобилей.'"
        className="mt-8 py-4 px-5 border-2 font-medium text-base min-h-[200px] border-[#5146E5] focus-visible:ring-offset-0 focus-visible:ring-[#5146E5]"
        rows={8}
      />
      <p className="text-sm text-gray-500 mt-2 w-full">Чем детальнее будет описание, тем лучше получится результат.</p>
      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={prevStep} className="text-lg p-6">Назад</Button>
        <Button onClick={nextStep} disabled={topic.trim().length < 15} className="text-lg p-6">Далее</Button>
      </div>
    </div>
  );
};