import { Dispatch, SetStateAction, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SnackbarContext from '@/src/context/snackbar/SnackbarContext';
import { MdDelete } from 'react-icons/md';

interface IButtonDeleteReceitaProps{
  setReceitaDeletada: Dispatch<SetStateAction<boolean>>;
  idReceita: string;
}

export default function ButtonDeleteReceita({setReceitaDeletada, idReceita}: IButtonDeleteReceitaProps) {  
  const sistemaSnackbar = useContext(SnackbarContext);
  const router = useRouter();

  const { mutate: deleteReceita, isPending: loadingDeleteReceita } = useMutation({
    mutationFn: async (idReceita: string) => {
      return await fetch("/api/receitas/deletar", {
        method: "DELETE",
        body: JSON.stringify({ id: idReceita }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => {
          if (data.status === 200) {
            setReceitaDeletada(true);
            setTimeout(() => {
              router.push("../");
              router.refresh();
            }, 2000);
          }
          else {
            sistemaSnackbar?.mostrarSnackbar("Erro ao deletar receita");
          }
        })
    }
  })

  return (
    loadingDeleteReceita ?
      <button disabled className='p-2 bg-slate-500 border-slate-700 hover:bg-slate-700 border rounded-md' onClick={() => deleteReceita(idReceita)}>
        <MdDelete size={28} />
      </button>
      :
      <button className='p-2 bg-red-500 border-red-700 hover:bg-red-700 border rounded-md' onClick={() => deleteReceita(idReceita)}>
        <MdDelete size={28} />
      </button>
  )
}