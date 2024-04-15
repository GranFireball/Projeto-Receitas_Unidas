import { useRouter } from 'next/navigation';
import { VscDiffAdded } from 'react-icons/vsc';

export default function ButtonAddReceita() {
  const router = useRouter();

  return (
    <div className='cursor-pointer w-fit flex items-center gap-1 hover:underline' onClick={() => router.push('/criar-receita')}>
      <VscDiffAdded size={30}/>
      <span>Nova Receita</span>
    </div>
  )
}