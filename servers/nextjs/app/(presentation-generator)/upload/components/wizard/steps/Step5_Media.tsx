// servers/nextjs/app/(presentation-generator)/upload/components/wizard/steps/Step5_Media.tsx
import { Button } from "@/components/ui/button";
import SupportingDoc from "../../SupportingDoc"; // Путь может понадобиться скорректировать
import { ChevronRight } from "lucide-react";

interface StepMediaProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  generatePresentation: () => void;
  prevStep: () => void;
}

export const Step5_Media = ({ files, onFilesChange, generatePresentation, prevStep }: StepMediaProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">5. Дополнительные материалы</h2>
      <p className="text-gray-500 mb-8">Приложите файлы (PDF, DOCX, TXT), если хотите создать презентацию на их основе.</p>
      <SupportingDoc files={files} onFilesChange={onFilesChange} />
      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={prevStep} className="text-lg p-6">Назад</Button>
        <Button
          onClick={generatePresentation}
          className="rounded-full flex items-center justify-center py-6 px-8 bg-[#5141e5] text-white font-semibold text-xl hover:bg-[#5141e5]/80"
        >
          <span>Создать презентацию</span>
          <ChevronRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
  );
};