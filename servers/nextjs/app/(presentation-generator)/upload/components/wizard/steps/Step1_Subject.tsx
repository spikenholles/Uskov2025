// servers/nextjs/app/(presentation-generator)/upload/components/wizard/steps/Step1_Subject.tsx
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepSubjectProps {
  subject: string;
  onSubjectChange: (value: string) => void;
  nextStep: () => void;
}

const subjects = ['Математика', 'Физика', 'История', 'Биология', 'Химия', 'Литература', 'География'];

export const Step1_Subject = ({ subject, onSubjectChange, nextStep }: StepSubjectProps) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">1. Выберите предмет</h2>
      <p className="text-gray-500 mb-8">Это поможет нам подобрать правильный стиль и контент.</p>
      <Select onValueChange={onSubjectChange} defaultValue={subject}>
        <SelectTrigger className="w-full text-lg p-6">
          <SelectValue placeholder="Выберите предмет из списка..." />
        </SelectTrigger>
        <SelectContent>
          {subjects.map(s => <SelectItem key={s} value={s} className="text-lg">{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button onClick={nextStep} disabled={!subject} className="mt-8 w-1/2 text-lg p-6">
        Далее
      </Button>
    </div>
  );
};