'use client'

import { useContext, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReceitasContext from '@/src/context/receitas/ReceitasProvider';
import SnackbarContext from "@/src/context/snackbar/SnackbarContext";
import { TReceita } from '@/src/types/types';
import BarraPesquisa from '@/src/components/BarraPesquisa';
import ButtonAddReceita from '@/src/components/ButtonAddReceita';
import ListaReceitas from '@/src/components/ListaReceitas';
import Paginacao from '@/src/components/Paginacao';

export default function Page() {
  const sistemaSnackbar = useContext(SnackbarContext);
  const sistemaReceitas = useContext(ReceitasContext);
  const [receitasFiltradas, setReceitasFiltradas] = useState<TReceita[]>();
  const pesquisaRef = useRef<HTMLInputElement | null>(null);
  const qtdReceitasPorPagina = 20;

  const { data: dataReceitas, isLoading: isLoadingReceitas } = useQuery({
    queryKey: ['receitas'],
    queryFn: async () => {
      const response = await fetch('/api/receitas')

      if (!response.ok) {
        sistemaSnackbar?.mostrarSnackbar("Erro ao carregar receitas");
      }
      const json = await response.json();
      if (json !== undefined) {
        sistemaReceitas?.obterReceitas(await json);
      }
      return json;
    }
  })

  function receitasPagina(pagina: number) {
    const primeiroItem = (pagina - 1) * qtdReceitasPorPagina;
    const ultimoItem = primeiroItem + qtdReceitasPorPagina;
    setReceitasFiltradas(() => sistemaReceitas?.receitas.slice(primeiroItem, ultimoItem));
    return sistemaReceitas?.receitas.slice(primeiroItem, ultimoItem);
  }

  if (isLoadingReceitas) {
    return (
      <span className='flex justify-center items-center mt-8'>Carregando Receitas...</span>
    )
  }

  return (
    <main className='p-4'>
      <div className='flex justify-between items-center gap-4 mb-8'>
        <BarraPesquisa receitasPagina={receitasPagina} pesquisaRef={pesquisaRef} receitasFiltradas={receitasFiltradas} setReceitasFiltradas={setReceitasFiltradas} />
        <ButtonAddReceita />
      </div>
      <ListaReceitas receitasPagina={receitasPagina} receitasFiltradas={receitasFiltradas} />
      <Paginacao receitasPagina={receitasPagina} pesquisaRef={pesquisaRef} qtdReceitasPorPagina={qtdReceitasPorPagina} />
    </main>
  )
}
