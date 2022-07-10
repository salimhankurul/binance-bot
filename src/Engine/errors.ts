import errors from './error-messages';

export interface BotErrorResponse {
    [key: string]: unknown
    code: number
    message?: string
}

export interface BotErrorMessage {
  code: number
  message: string
}

export class BotError<T = unknown> extends Error {
  
    public readonly code: number
  
    public issues?: T = undefined
  
    public readonly message: string
  
    constructor( code: number, issues?: T){
        super('')

        const messages: BotErrorMessage[] = errors

        const errorMessage: string = messages.find(message => message.code === code)?.message || ''

        this.code = code
        this.issues = issues
        this.message = errorMessage
  
        Object.setPrototypeOf(this, BotError.prototype)
    }
  
    get response(): BotErrorResponse {
      return {
          code: this.code,
          message: this.message,
          ...this.issues,
        }
    }
  }
  