'use client'

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TFormLogin } from '@/src/types/types';

interface IFormLoginProps {
  submit: SubmitHandler<TFormLogin>;
  isPending: boolean;
}

export default function FormLogin({ submit, isPending }: IFormLoginProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { register, handleSubmit } = useForm<TFormLogin>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col justify-center items-center gap-2 mt-2'>
      <div className="w-full flex justify-end items-center gap-1">
        <label>Usuário</label>
        <input type='text' {...register("usuario", { required: true })} className='w-40 h-6 p-2 text-black font-normal rounded-xl' />
      </div>
      <div className="w-full flex justify-end items-center gap-1">
        <label>Senha</label>
        <input type='password' {...register("senha", { required: true })} className='w-40 h-6 p-2 text-black font-normal rounded-xl' />
      </div>
      {
        isPending ?
          <button disabled type='submit' className="py-2 px-3 bg-slate-500 border border-slate-700 rounded-md" >Confirmar</button>
          :
          <button type='submit' className="py-2 px-3 bg-blue-600 hover:bg-blue-800 border border-blue-800 rounded-md" >Confirmar</button>
      }
    </form>
  )
}