import { ReactNode, createContext, useState } from 'react';
import { TReceita } from '@/src/types/types';

interface IReceitasContextProps {
  receitas: TReceita[];
  obterReceitas: (listaReceitas: TReceita[]) => void;
  pagina: number;
  definirPagina: (novaPagina: number) => void;
  numeroPaginaVisual: number;
}

interface IProvidersProps {
  children: ReactNode;
}

const ReceitasContext = createContext<IReceitasContextProps | null>(null);

export function ReceitasProvider({ children }: IProvidersProps) {
  const [receitas, setReceitas] = useState<TReceita[]>([]);
  const [pagina, setPagina] = useState<number>(1);
  const [numeroPaginaVisual, setNumeroPaginaVisual] = useState<number>(1);

  function obterReceitas(listaReceitas: TReceita[]) {
    setReceitas(listaReceitas);
  }

  function definirPagina(novaPagina: number) {
    setPagina(novaPagina);
    setNumeroPaginaVisual(novaPagina);
  }

  return (
    <ReceitasContext.Provider value={{ receitas, obterReceitas, pagina, definirPagina, numeroPaginaVisual }}>
      {children}
    </ReceitasContext.Provider>
  )
}

export default ReceitasContext;