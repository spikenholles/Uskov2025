// servers/nextjs/app/(presentation-generator)/upload/components/PresentationWizard.tsx
"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearOutlines, setPresentationId } from "@/store/slices/presentationGeneration";
import { LanguageType, PresentationConfig } from "../type";
import { toast } from "sonner";
import { PresentationGenerationApi } from "../../services/api/presentation-generation";
import { OverlayLoader } from "@/components/ui/overlay-loader";
import Wrapper from "@/components/Wrapper";
import { setPptGenUploadState } from "@/store/slices/presentationGenUpload";
import { trackEvent, MixpanelEvent } from "@/utils/mixpanel";

// Компоненты конструктора
import { WizardSidebar } from "./wizard/WizardSidebar";
import { Step1_Subject } from "./wizard/steps/Step1_Subject";
import { Step2_Grade } from "./wizard/steps/Step2_Grade";
import { Step3_Topic } from "./wizard/steps/Step3_Topic";
import { Step4_Settings } from "./wizard/steps/Step4_Settings";
import { Step5_Media } from "./wizard/steps/Step5_Media";


interface LoadingState {
  isLoading: boolean;
  message: string;
  duration?: number;
  showProgress?: boolean;
  extra_info?: string;
}

// Тип для данных, собираемых конструктором
interface WizardData {
  subject: string;
  grade: string;
  topic: string;
}

const PresentationWizard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Состояние для управления шагами и данными конструктора
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    subject: "",
    grade: "",
    topic: "",
  });

  // Существующие состояния
  const [files, setFiles] = useState<File[]>([]);
  const [config, setConfig] = useState<PresentationConfig>({
    slides: "10",
    language: LanguageType.Russian,
    prompt: "", // Это поле будет сгенерировано в конце
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false, message: "", duration: 4, showProgress: false, extra_info: ""
  });

  // Навигация по шагам
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);

  // Обновление данных конструктора
  const updateWizardData = (field: keyof WizardData, value: string) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleConfigChange = (key: keyof PresentationConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Функция сборки финального промпта из данных конструктора
   */
  const assemblePrompt = (data: WizardData): string => {
    return `Создай презентацию по предмету "${data.subject}" для аудитории уровня "${data.grade}". Тема презентации: "${data.topic}". Сделай акцент на ключевых понятиях, приведи понятные примеры и структурируй информацию логично.`;
  };

  const handleGeneratePresentation = async () => {
    const finalPrompt = assemblePrompt(wizardData);
    const finalConfig = { ...config, prompt: finalPrompt };

    if (!finalPrompt.trim() && files.length === 0) {
      toast.error("Опишите тему на шаге 3 или приложите вспомогательный документ.");
      return;
    }

    try {
      if (files.length > 0) {
        await handleDocumentProcessing(finalConfig);
      } else {
        await handleDirectPresentationGeneration(finalConfig);
      }
    } catch (error: any) {
        console.error("Error in presentation generation", error);
        setLoadingState({ isLoading: false, message: "", duration: 0, showProgress: false });
        toast.error("Ошибка генерации", { description: error.message || "Произошла неизвестная ошибка." });
    }
  };

  const handleDocumentProcessing = async (currentConfig: PresentationConfig) => {
    // Эта функция остается почти без изменений
    setLoadingState({ isLoading: true, message: "Обрабатываем документы...", showProgress: true, duration: 90 });
    // ...
    // dispatch(setPptGenUploadState({ config: currentConfig, ... }));
    router.push("/documents-preview");
  };

  const handleDirectPresentationGeneration = async (currentConfig: PresentationConfig) => {
    setLoadingState({ isLoading: true, message: "Генерируем план...", showProgress: true, duration: 30 });
    trackEvent(MixpanelEvent.Upload_Create_Presentation_API_Call);
    const createResponse = await PresentationGenerationApi.createPresentation({
      content: currentConfig.prompt, // Используем наш собранный промпт
      n_slides: currentConfig.slides ? parseInt(currentConfig.slides) : null,
      file_paths: [],
      language: currentConfig.language,
    });
    dispatch(setPresentationId(createResponse.id));
    dispatch(clearOutlines());
    trackEvent(MixpanelEvent.Navigation, { from: pathname, to: "/outline" });
    router.push("/outline");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Subject subject={wizardData.subject} onSubjectChange={(v) => updateWizardData('subject', v)} nextStep={nextStep} />;
      case 2:
        return <Step2_Grade grade={wizardData.grade} onGradeChange={(v) => updateWizardData('grade', v)} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3_Topic topic={wizardData.topic} onTopicChange={(v) => updateWizardData('topic', v)} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4_Settings config={config} onConfigChange={handleConfigChange} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5_Media files={files} onFilesChange={setFiles} generatePresentation={handleGeneratePresentation} prevStep={prevStep} />;
      default:
        return <div>Неверный шаг</div>;
    }
  };

  return (
    <Wrapper>
      <OverlayLoader {...loadingState} />
      <div className="flex flex-row gap-8 justify-center p-4 sm:p-8">
        <aside className="hidden lg:block">
            <WizardSidebar currentStep={currentStep} />
        </aside>
        <main className="flex-1 bg-gray-50 p-8 rounded-lg min-h-[600px] flex items-center justify-center">
            {renderCurrentStep()}
        </main>
      </div>
    </Wrapper>
  );
};

export default PresentationWizard;