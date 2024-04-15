import { MutableRefObject, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { usePagination } from '@mantine/hooks';
import ReceitasContext from '@/src/context/receitas/ReceitasProvider';
import { TReceita } from '@/src/types/types';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface IPaginacaoProps {
  receitasPagina: (pagina: number) => TReceita[] | undefined;
  pesquisaRef: MutableRefObject<HTMLInputElement | null>;
  qtdReceitasPorPagina: number;
}

export default function Paginacao({ receitasPagina, pesquisaRef, qtdReceitasPorPagina }: IPaginacaoProps) {
  const sistemaReceitas = useContext(ReceitasContext);
  const router = useRouter();
  const qtdTotalPaginas = Math.ceil(sistemaReceitas!.receitas.length / qtdReceitasPorPagina);

  const paginas = usePagination({
    total: qtdTotalPaginas,
    initialPage: sistemaReceitas!.pagina,
    onChange(pagina) {
      receitasPagina(pagina)
      sistemaReceitas!.definirPagina(pagina);
      pesquisaRef.current!.value = '';
      router.replace("/");
    }
  })

  function voltarPagina(){
    paginas.previous();
  }

  function proximaPagina(){
    paginas.next();
  }

  return (
    (sistemaReceitas?.receitas && sistemaReceitas?.receitas.length > 0) &&
    <section className='flex justify-center items-center gap-2 mt-8'>
      <IoIosArrowBack visibility={paginas.active === 1 ? "hidden" : "visible"} onClick={voltarPagina} />
      <span>Página {sistemaReceitas?.numeroPaginaVisual} de {qtdTotalPaginas}</span>
      <IoIosArrowForward visibility={paginas.active === qtdTotalPaginas ? "hidden" : "visible"} onClick={proximaPagina} />
    </section>
  )
}