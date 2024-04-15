import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ICardReceitaProps{
  idReceita: string;
  nome: string;
  imagem: string;
}

export default function CardReceita({idReceita, nome, imagem}: ICardReceitaProps){
  const router = useRouter();
  
  return(
    <article className="cursor-pointer flex w-[600px] h-[150px] bg-slate-100 border-[1px] border-slate-200 hover:border-yellow-500 rounded-lg overflow-hidden" onClick={() => router.push('/receita/'+ idReceita)}>
      <Image width={200} height={150} src={imagem} alt="Imagem da Comida" className="object-cover w-[150px] sm:w-[200px] h-[150px]"/>
      <h1 className="line-clamp-6 p-1">{nome}</h1>
    </article>
  );
}