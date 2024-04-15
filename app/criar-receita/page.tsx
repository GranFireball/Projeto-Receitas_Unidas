'use client'

import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import LoginContext from '@/src/context/login/LoginProvider';
import SnackbarContext from "@/src/context/snackbar/SnackbarContext";
import { TFormReceita } from '@/src/types/types';
import ButtonVoltar from '@/src/components/ButtonVoltar';
import FormReceita from '@/src/components/FormReceita';
import Notificacao from '@/src/components/Notificacao';

export default function CriarReceitaPage() {
  const sistemaSnackbar = useContext(SnackbarContext);
  const sistemaLogin = useContext(LoginContext);
  const [receitaCriada, setReceitaCriada] = useState<boolean>(false);
  const router = useRouter();

  const criarReceita: SubmitHandler<TFormReceita> = (data) => {
    const reader = new FileReader();
    reader.onload = function () {
      data.imagem = this.result;
      postReceita(data);
    };
    reader.readAsDataURL(data.imagem[0]);
  }

  const { mutate: postReceita, isPending: loadingCriar } = useMutation({
    mutationFn: (dadosReceita: TFormReceita) => {
      return fetch("/api/receitas/criar", {
        method: "POST",
        body: JSON.stringify(dadosReceita),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => {
          if (data.status === 200) {
            setReceitaCriada(true);
            setTimeout(() => {
              router.push("../");
              router.refresh();
            }, 2000);
          }
          else {
            if (data.status === 400) {
              sistemaSnackbar?.mostrarSnackbar("Receita já existe");

            }
            else {
              sistemaSnackbar?.mostrarSnackbar("Erro ao criar receita");
            }

          }
        })
    },
  })

  return (
    <main className='relative w-full flex justify-center items-center p-4'>
      <ButtonVoltar />
      {
        receitaCriada === true ?
          <Notificacao color="green" msgPrincipal="Receita criada com sucesso" msgRedirect="Redirecionando para Página Inicial" />
          :
          sistemaLogin?.estado === "Logado" ?
            <div className='w-[80%] sm:w-fit p-4 border-2 border-black rounded-md overflow-hidden'>
              <h1 className='w-full text-2xl text-center font-bold'>Nova Receita</h1>
              <FormReceita submit={criarReceita} loading={loadingCriar} />
            </div>
            :
            <span>Faça o login para criar uma receita!</span>
      }
    </main>
  );
}
