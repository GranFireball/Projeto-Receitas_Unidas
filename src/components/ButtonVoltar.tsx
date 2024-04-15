import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

interface IButtonVoltarProps {
  url?: string;
}

export default function ButtonVoltar({ url }: IButtonVoltarProps) {
  const router = useRouter();

  return (
    <IoArrowBackCircleOutline size={30} className='cursor-pointer absolute top-4 left-2' onClick={() => {
      if (url) {
        router.push(url);
      }
      else {
        router.push('../');
      }
    }} />
  )
}