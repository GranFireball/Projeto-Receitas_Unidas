'use client'

import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import LoginContext from '@/src/context/login/LoginProvider';
import SnackbarContext from '@/src/context/snackbar/SnackbarContext';
import { TFormReceita } from '@/src/types/types';
import ButtonVoltar from '@/src/components/ButtonVoltar';
import ButtonEditReceita from '@/src/components/ButtonEditReceita';
import ButtonDeleteReceita from '@/src/components/ButtonDeleteReceita';
import Notificacao from '@/src/components/Notificacao';

export default function ReceitaPage() {
  const sistemaSnackbar = useContext(SnackbarContext);
  const sistemaLogin = useContext(LoginContext);
  const [receita, setReceita] = useState<TFormReceita>();
  const [suaReceita, setSuaReceita] = useState<boolean>(false);
  const [receitaDeletada, setReceitaDeletada] = useState<boolean>(false);
  const { idReceita } = useParams<{ idReceita: string }>();

  function verificaDonoReceita() {
    if (receita) {
      if (sistemaLogin?.idUsuario === receita.autorId) {
        setSuaReceita(true);
      }
      else {
        setSuaReceita(false);
      }
    }
  }

  useEffect(() => {
    getReceita(idReceita);
  }, [])

  useEffect(() => {
    verificaDonoReceita();
  }, [receita, sistemaLogin?.idUsuario]);

  const { mutate: getReceita, isPending: loadingGetReceita } = useMutation({
    mutationFn: async (idReceita: string) => {
      return await fetch("/api/receitas/receita", {
        method: "POST",
        body: JSON.stringify({ id: idReceita }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => data.json())
        .then(async (json) => {
          if (json.status === 400) {
            sistemaSnackbar?.mostrarSnackbar("Receita não encontrada");
          }
          else {
            setReceita(await json);
          }
        })
    }
  })

  if (loadingGetReceita) {
    return (
      <span className='flex justify-center items-center mt-8'>Carregando Receita...</span>
    )
  }

  return (
    <main className='relative w-full flex justify-center p-4'>
      <ButtonVoltar />
      {
        receitaDeletada === true ?
          <Notificacao color="red" msgPrincipal="Receita deletada com sucesso" msgRedirect="Redirecionando para Página Inicial" />
          :
          receita ?
            <div className='w-[80%] p-4 border-2 border-black rounded-md'>
              <article className='flex justify-center mb-8'>
                <Image width={300} height={250} src={receita.imagem} alt="Imagem" className='object-cover w-[300px] h-[250px] border border-black' />
              </article>
              {
                suaReceita === true &&
                <section className='flex justify-between items-center mb-8'>
                  <span className='text-xl text-purple-900 underline'>Sua Receita</span>
                  <div className='flex gap-4'>
                    <ButtonEditReceita idReceita={idReceita} />
                    <ButtonDeleteReceita setReceitaDeletada={setReceitaDeletada} idReceita={idReceita} />
                  </div>
                </section>
              }
              <section className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>{receita.nome}</h1>
                <div className='mt-4 border-t border-dashed border-black'>
                  <h2 >Ingredientes:</h2>
                  <p>
                    {receita.ingredientes}
                  </p>
                </div>
                <div className='mt-4 border-t border-dashed border-black '>
                  <h2>Como Fazer:</h2>
                  <p>
                    {receita.comoFazer}
                  </p>
                </div>
              </section>
            </div>
            :
            <span>Receita não encontrada</span>
      }
    </main>
  );
}
