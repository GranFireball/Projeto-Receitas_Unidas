import { ReactNode, createContext, useState } from 'react';
import { TSnackbar } from '@/src/types/types';

interface ISnackbarContextProps {
  snackbar: TSnackbar;
  mostrarSnackbar: (texto: string) => void;
}

interface IProvidersProps {
  children: ReactNode;
}

const SnackbarContext = createContext<ISnackbarContextProps | null>(null);

export function SnackbarProvider({ children }: IProvidersProps) {
  const [snackbar, setSnackbar] = useState<TSnackbar>({ ativo: false, texto: '' });

  function mostrarSnackbar(texto: string) {
    setSnackbar({ ativo: true, texto: texto });
    setTimeout(() => setSnackbar({ ativo: false, texto: '' }), 3000);
  }

  return (
    <SnackbarContext.Provider value={{ snackbar, mostrarSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarContext;