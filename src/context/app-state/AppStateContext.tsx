import { createContext } from 'react';

import type { AppStateContextValue } from './types';

const AppStateContext = createContext<AppStateContextValue | null>(null);

export default AppStateContext;
