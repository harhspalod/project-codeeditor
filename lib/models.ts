import { createGoogleGenerativeAI } from '@ai-sdk/google'

export type LLMModel = {
  id: string
  name: string
  provider: string
  providerId: string
  multiModal?: boolean
}

export type LLMModelConfig = {
  model?: string
  apiKey?: string
  temperature?: number
  maxTokens?: number
}

export function getModelClient(model: LLMModel, config: LLMModelConfig) {
  const { id: modelNameString } = model
  const { apiKey } = config

  return createGoogleGenerativeAI({
    apiKey: apiKey || process.env.GOOGLE_AI_API_KEY,
  })(modelNameString)
}