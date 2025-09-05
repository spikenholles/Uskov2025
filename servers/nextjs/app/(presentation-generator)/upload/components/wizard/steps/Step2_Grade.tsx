// servers/nextjs/app/(presentation-generator)/upload/components/wizard/steps/Step2_Grade.tsx
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface StepGradeProps {
  grade: string;
  onGradeChange: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const grades = ["5-7 классы", "8-9 классы", "10-11 классы", "Студент", "Общая аудитория"];

export const Step2_Grade = ({ grade, onGradeChange, nextStep, prevStep }: StepGradeProps) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">2. Укажите уровень аудитории</h2>
      <p className="text-gray-500 mb-8">Мы адаптируем сложность материала.</p>
      <RadioGroup value={grade} onValueChange={onGradeChange} className="w-full space-y-4">
        {grades.map(g => (
          <div key={g}>
            <RadioGroupItem value={g} id={g} className="sr-only" />
            <Label htmlFor={g} className={`block w-full text-center text-lg p-4 border-2 rounded-lg cursor-pointer ${grade === g ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              {g}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={prevStep} className="text-lg p-6">Назад</Button>
        <Button onClick={nextStep} disabled={!grade} className="text-lg p-6">Далее</Button>
      </div>
    </div>
  );
};