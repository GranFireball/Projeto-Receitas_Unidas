import { useRouter } from 'next/navigation';
import { LuClipboardEdit } from 'react-icons/lu';

interface IButtonEditReceitaProps{
  idReceita: string;
}

export default function ButtonEditReceita({idReceita}: IButtonEditReceitaProps) {
  const router = useRouter();

  return (
    <button className='p-2 bg-yellow-500 border border-yellow-700 hover:bg-yellow-700 rounded-md' onClick={() => router.push(`/receita/${idReceita}/editar-receita`)}>
      <LuClipboardEdit size={28} />
    </button>
  )
}