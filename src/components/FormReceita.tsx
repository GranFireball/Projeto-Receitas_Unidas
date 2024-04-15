import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import LoginContext from '@/src/context/login/LoginProvider';
import { TFormReceita } from '@/src/types/types';

interface IFormReceitaProps {
  submit: SubmitHandler<TFormReceita>;
  receita?: TFormReceita;
  loading: boolean;
}

export default function FormReceita({ receita, submit, loading }: IFormReceitaProps) {
  const { register, handleSubmit } = useForm<TFormReceita>();
  const sistemaLogin = useContext(LoginContext);
  useEffect(() => {
    register('autorId', { value: sistemaLogin?.idUsuario });
    if (receita) {
      register('id', { value: receita.id });
    }
  })

  return (
    <form onSubmit={handleSubmit(submit)} className='w-full flex flex-col justify-center items-start gap-8 mt-8'>
      <div className="flex flex-col gap-1">
        <label >Nome da Comida</label>
        <input type='text' defaultValue={receita && receita.nome} {...register("nome", { required: true })} className='h-6 p-2 text-black font-normal' />
      </div>
      <div className="flex flex-col gap-1">
        <label>Imagem da Comida</label>
        <input type='file' accept=".png, .jpg, .jpeg" {...register("imagem", { required: receita ? false : true })} />
        {
          receita &&
          <>
            <div className="flex flex-col gap-1 mt-2">
              <label>Imagem Atual</label>
              <Image width={300} height={250} src={receita.imagem} alt="Imagem" className='object-cover border border-black' />
            </div>
          </>
        }
      </div>
      <div className="flex flex-col gap-1 ">
        <label>Ingredientes</label>
        <textarea defaultValue={receita && receita.ingredientes}   {...register("ingredientes", { required: true })} className='resize-none w-[100%] sm:w-60 h-40 ' />
      </div>
      <div className="flex flex-col gap-1">
        <label>Como Fazer</label>
        <textarea defaultValue={receita && receita.comoFazer} {...register("comoFazer", { required: true })} className='resize-none w-[100%] sm:w-60 h-40' />
      </div>
      <div className='w-full flex justify-center'>
        {
          loading ?
            <span>Aguarde...</span>
            :
            <button type='submit' className='py-2 px-3 bg-green-600 hover:bg-green-800 border border-green-800 rounded-md text-sm text-white font-bold '>
              {receita ? "Salvar Alterações" : "Criar Receita"}
            </button>
        }
      </div>
    </form>
  );
}