import { BotError } from '../Utils/errors'

export interface EngineSymbols {
    first: string;
    second: string;
  }
  
  export interface EnginePressions {
    quantity: number;
    price: number;
  }
  
  export declare type EngineResponseSuccess = {
    success: true;
    data: any,
  };
  
  export declare type EngineResponseError = {
    success: false;
    error: BotError
  };
  
  export declare type EngineResponse = EngineResponseError | EngineResponseSuccess;
  
  export interface EngineInitParams {
    symbols: EngineSymbols;
    pressions: EnginePressions,
  }
  
