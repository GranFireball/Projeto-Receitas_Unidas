import { Dispatch, MutableRefObject, SetStateAction, useContext } from 'react';
import ReceitasContext from '@/src/context/receitas/ReceitasProvider';
import { TReceita } from '@/src/types/types';
import { CiSearch } from 'react-icons/ci';

interface IBarraPesquisaProps {
  receitasPagina: (pagina: number) => TReceita[] | undefined;
  pesquisaRef: MutableRefObject<HTMLInputElement | null>;
  receitasFiltradas: TReceita[] | undefined;
  setReceitasFiltradas: Dispatch<SetStateAction<TReceita[] | undefined>>;
}

export default function BarraPesquisa({ receitasPagina, pesquisaRef, receitasFiltradas, setReceitasFiltradas }: IBarraPesquisaProps) {
  const sistemaReceitas = useContext(ReceitasContext);

  function filtrarReceitas() {
    const todasReceitas = receitasPagina(sistemaReceitas!.pagina);
    if (pesquisaRef.current?.value !== "") {
      let receitasFiltradasPorNome = todasReceitas!.filter((receita: TReceita) => {
        if (pesquisaRef.current?.value !== undefined) {
          return (receita.nome.includes(pesquisaRef.current.value));
        }
      })
      setReceitasFiltradas(receitasFiltradasPorNome);
    }
  }

  return (
    <>
      <datalist id="receitas">
        {
          (receitasFiltradas && receitasFiltradas.length > 0) &&
          receitasFiltradas.map((receita, index) => {
            return (
              index < 5 &&
              <option key={index} value={receita.nome}>{receita.nome}</option>
            )
          })}
      </datalist>
      <div className='flex items-center gap-1 pr-1 border border-black bg-gray-100'>
        <input list="receitas" ref={pesquisaRef as any} onChange={filtrarReceitas} className='h-6 p-2 text-black border-none' />
        <CiSearch size={24} />
      </div>
    </>
  )
}