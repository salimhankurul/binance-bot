import errors from '../Types/error-messages';
import { BotErrorMessage, BotErrorResponse} from '../Types/error'
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
  