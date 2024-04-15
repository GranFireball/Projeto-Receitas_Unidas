import Image from 'next/image';
import img from '@/src/imgs/imgHeader.jpg';
import Login from '@/src/components/Login';
import Snackbar from '@/src/components/Snackbar';

export default function Header() {
  return (
    <>
      <Snackbar />
      <header className="relative w-full h-[320px] sm:h-[280px] md:h-[260px] lg:h-[160px] flex flex-col justify-center items-center p-2 bg-gradient-to-r from-yellow-700 to-yellow-900 font-bold overflow-hidden">
        <Image priority src={img} alt="Imagem" className='absolute w-full h-[320px] sm:h-[280px] md:h-[260px] lg:h-[160px] object-cover opacity-40' />
        <h1 className="p-4 text-6xl text-slate-100 text-center font-extrabold z-10">Receitas Unidas</h1>
        <Login />
      </header>
    </>
  );
}
