import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearPresentationData } from "@/store/slices/presentationGeneration";
import { PresentationGenerationApi } from "../../services/api/presentation-generation";
import { LayoutGroup, LoadingState, TABS } from "../types/index";
import { MixpanelEvent, trackEvent } from "@/utils/mixpanel";

const DEFAULT_LOADING_STATE: LoadingState = {
  message: "",
  isLoading: false,
  showProgress: false,
  duration: 0,
};

export const usePresentationGeneration = (
  presentationId: string | null,
  outlines: { content: string }[] | null,
  selectedLayoutGroup: LayoutGroup | null,
  setActiveTab: (tab: string) => void
) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<LoadingState>(DEFAULT_LOADING_STATE);

  const validateInputs = useCallback(() => {
    if (!outlines || outlines.length === 0) {
      toast.error("No Outlines", {
        description: "Please wait for outlines to load before generating presentation",
      });
      return false;
    }

    if (!selectedLayoutGroup) {
      toast.error("Select Layout Group", {
        description: "Please select a layout group before generating presentation",
      });
      return false;
    }
    if (!selectedLayoutGroup.slides.length) {
      toast.error("No Slide Schema found", {
        description: "Please select a Group before generating presentation",
      });
      return false;
    }

    return true;
  }, [outlines, selectedLayoutGroup]);

  const prepareLayoutData = useCallback(() => {
    if (!selectedLayoutGroup) return null;
    return {
      name: selectedLayoutGroup.name,
      ordered: selectedLayoutGroup.ordered,
      slides: selectedLayoutGroup.slides
    };
  }, [selectedLayoutGroup]);

  const handleSubmit = useCallback(async () => {
    if (!selectedLayoutGroup) {
      setActiveTab(TABS.LAYOUTS);
      return;
    }
    if (!validateInputs()) return;



    setLoadingState({
      message: "Generating presentation data...",
      isLoading: true,
      showProgress: true,
      duration: 30,
    });

    try {
      const layoutData = prepareLayoutData();

      if (!layoutData) return;
      trackEvent(MixpanelEvent.Presentation_Prepare_API_Call);
      const response = await PresentationGenerationApi.presentationPrepare({
        presentation_id: presentationId,
        outlines: outlines,
        layout: layoutData,
      });

      if (response) {
        dispatch(clearPresentationData());
        router.replace(`/presentation?id=${presentationId}&stream=true`);
      }
    } catch (error: any) {
      console.error('Error In Presentation Generation(prepare).', error);
      toast.error("Generation Error", {
        description: error.message || "Error In Presentation Generation(prepare).",
      });
    } finally {
      setLoadingState(DEFAULT_LOADING_STATE);
    }
  }, [validateInputs, prepareLayoutData, presentationId, outlines, dispatch, router]);

  return { loadingState, handleSubmit };
}; 