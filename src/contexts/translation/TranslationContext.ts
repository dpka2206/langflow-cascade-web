
import { createContext } from 'react';
import { TranslationContextType } from './types';

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);
