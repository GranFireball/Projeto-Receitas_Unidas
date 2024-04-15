'use client'

import { ReactNode } from 'react';
import { LoginProvider } from '@/src/context/login/LoginProvider';
import { ReceitasProvider } from '@/src/context/receitas/ReceitasProvider';
import { SnackbarProvider } from '@/src/context/snackbar/SnackbarContext';

interface IProvidersProps {
  children: ReactNode;
}

export function ProvidersContext({ children }: IProvidersProps) {
  return (
    <SnackbarProvider>
      <ReceitasProvider>
        <LoginProvider>
          {children}
        </LoginProvider>
      </ReceitasProvider>
    </SnackbarProvider>
  )
}