export interface ImageSearch {
  presentation_id: string;
  query: string;
  page: number;
  limit: number;
}

export interface ImageGenerate {
  

  prompt: string;
}
export interface IconSearch {
 

  query: string;

  limit: number;
}

export interface PreviousGeneratedImagesResponse {

    extras: {
      prompt: string;
      theme_prompt: string | null;
    },
    created_at: string;
    id: string;
    path: string;
}