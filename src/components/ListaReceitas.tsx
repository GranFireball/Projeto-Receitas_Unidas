'use client'

import { useContext, useEffect } from 'react';
import ReceitasContext from '@/src/context/receitas/ReceitasProvider';
import { TReceita } from '@/src/types/types';
import CardReceita from '@/src/components/CardReceita';

interface IListaReceitasProps {
  receitasPagina: (pagina: number) => TReceita[] | undefined;
  receitasFiltradas: TReceita[] | undefined;
}

export default function ListaReceitas({ receitasPagina, receitasFiltradas }: IListaReceitasProps) {
  const sistemaReceitas = useContext(ReceitasContext);

  useEffect(() => {
    receitasPagina(sistemaReceitas!.pagina);
  }, [sistemaReceitas!.receitas])

  return (
    <section className='w-full flex justify-center min-[1256px]:justify-start items-center min-[1256px]:items-start gap-6 flex-wrap'>
      {
        (receitasFiltradas && receitasFiltradas.length > 0) ?
          receitasFiltradas.map((receita, index) => {
            return (
              <CardReceita key={index} idReceita={receita.id} nome={receita.nome} imagem={receita.imagem} />
            )
          })
          :
          <span className='w-full flex justify-center items-center mt-8 text-xl font-bold'>Sem Receitas</span>
      }
    </section>
  )
}