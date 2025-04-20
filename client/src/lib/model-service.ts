import { get, post } from './api-client';

export interface GenerationParams {
  prompt: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
}

export interface GenerationResult {
  images: string[];
  seed: number;
}

export interface ModelInfo {
  name: string;
  description: string;
  parameters: {
    name: string;
    description: string;
    type: string;
    default?: any;
    min?: number;
    max?: number;
  }[];
}

export async function generateImage(prompt: string): Promise<GenerationResult> {
  return post<GenerationResult>('/generate-image', { prompt });
}

export async function getModelInfo(): Promise<ModelInfo> {
  return get<ModelInfo>('/model-info');
} 