export interface BotErrorResponse {
  [key: string]: unknown
  code: number
  message?: string
}

export interface BotErrorMessage {
  code: number
  message: string
}
