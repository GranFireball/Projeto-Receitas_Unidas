'use client'

import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import LoginContext from '@/src/context/login/LoginProvider';
import SnackbarContext from "@/src/context/snackbar/SnackbarContext";
import { TFormReceita } from '@/src/types/types';
import ButtonVoltar from '@/src/components/ButtonVoltar';
import FormReceita from '@/src/components/FormReceita';
import Notificacao from '@/src/components/Notificacao';

export default function EditarReceitaPage() {
  const sistemaSnackbar = useContext(SnackbarContext);
  const sistemaLogin = useContext(LoginContext);
  const [receita, setReceita] = useState<TFormReceita>();
  const [suaReceita, setSuaReceita] = useState<boolean>(false);
  const [receitaEditada, setReceitaEditada] = useState<boolean>(false);
  const { idReceita } = useParams<{ idReceita: string }>();
  const router = useRouter();

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

  const { mutate: getReceita, isPending: loadingReceita } = useMutation({
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

  const editarReceita: SubmitHandler<TFormReceita> = (data) => {
    if (data.imagem.length < 1) {
      data.imagem = receita?.imagem;
      updateReceita(data);
    }
    else {
      const reader = new FileReader();
      reader.onload = function () {
        data.imagem = this.result;
        updateReceita(data);
      };
      reader.readAsDataURL(data.imagem[0]);
    }

  }

  const { mutate: updateReceita, isPending: loadingEditar } = useMutation({
    mutationFn: (dadosReceita: TFormReceita) => {
      return fetch("/api/receitas/editar", {
        method: "PUT",
        body: JSON.stringify(dadosReceita),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => {
          if (data.status === 200) {
            setReceitaEditada(true);
            setTimeout(() => {
              router.push(`/receita/${idReceita}`);
              router.refresh();
            }, 2000);
          }
          else {
            if (data.status === 400) {
              sistemaSnackbar?.mostrarSnackbar("Receita já existe");
            }
            else {
              sistemaSnackbar?.mostrarSnackbar("Erro ao editar receita");
            }

          }
        })
    },
  })

  if (loadingReceita) {
    return (
      <span className='flex justify-center items-center mt-8'>Carregando Receita...</span>
    )
  }

  return (
    <main className='relative w-full flex justify-center items-center p-4'>
      <ButtonVoltar url={`/receita/${idReceita}`} />
      {
        receitaEditada === true ?
          <Notificacao color="green" msgPrincipal="Receita editada com sucesso" msgRedirect="Redirecionando para Página da Receita" />
          :
          receita ?
            suaReceita === true ?
              <div className='w-[80%] sm:w-fit p-4 border-2 border-black rounded-md overflow-hidden'>
                <h1 className='w-full text-2xl text-center font-bold'>Editar Receita</h1>
                <FormReceita receita={receita} submit={editarReceita} loading={loadingEditar} />
              </div>
              :
              <span className='w-[80%] text-center'>Você não tem permissão para editar essa receita!</span>
            :
            <span>Receita não encontrada</span>
      }
    </main>
  );
}
