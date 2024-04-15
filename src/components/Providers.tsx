'use client'

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IProvidersProps{
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({children}: IProvidersProps){
  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}