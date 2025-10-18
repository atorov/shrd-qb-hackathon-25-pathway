import { useContext } from 'react';

import AppStateContext from './AppStateContext';
import type { AppStateContextValue } from './types';

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);

  if (!ctx)
    throw new Error('useAppState must be used within an AppStateProvider');

  return ctx;
}

export default useAppState;
