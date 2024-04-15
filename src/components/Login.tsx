'use client'

import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginContext from '@/src/context/login/LoginProvider';
import SnackbarContext from '@/src/context/snackbar/SnackbarContext';
import { TFormLogin } from '@/src/types/types';
import FormLogin from '@/src/components/FormLogin';

export default function Login() {
  const sistemaSnackbar = useContext(SnackbarContext);
  const sistemaLogin = useContext(LoginContext);
  const { reset } = useForm<TFormLogin>();

  const realizarLogin: SubmitHandler<TFormLogin> = (data) => {
    getUsuario(data);
  }

  const { mutate: getUsuario, isPending: loadingEntrar } = useMutation({
    mutationFn: (dadosLogin: TFormLogin) => {
      return fetch("/api/contaUsuario", {
        method: "POST",
        body: JSON.stringify(dadosLogin),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.message) {
            sistemaSnackbar?.mostrarSnackbar(json.message);
          }
          else {
            sistemaSnackbar?.mostrarSnackbar("Login realizado");
            sistemaLogin?.logar(json.id);
            reset();
          }
        })
    }
  })

  const cadastrarUsuario: SubmitHandler<TFormLogin> = (data) => {
    postUsuario(data);
  }

  const { mutate: postUsuario, isPending: loadingCadastrar } = useMutation({
    mutationFn: async (dadosLogin: TFormLogin) => {
      return fetch("/api/contaUsuario/criar", {
        method: "POST",
        body: JSON.stringify(dadosLogin),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.status === 400) {
            sistemaSnackbar?.mostrarSnackbar("Nome de usuário já existe");
          }
          else {
            sistemaSnackbar?.mostrarSnackbar("Cadastrado e Logado");
            sistemaLogin?.logar(json.id);
            reset();
          }
        })
    }
  })

  return (
    <div className="lg:absolute lg:right-0 z-10 p-4 text-sm text-white">
      {
        sistemaLogin?.estado === "Logado" ?
          <button className='py-2 px-3 bg-red-600 hover:bg-red-800 border border-red-800 rounded-md' onClick={() => { sistemaSnackbar?.mostrarSnackbar("Desconectado"); sistemaLogin.deslogar(); }}>Sair</button>
          :
          <>
            <div className="w-full flex justify-center items-center gap-1">
              <span className={"cursor-pointer hover:text-slate-300 " + (sistemaLogin?.estado === "Entrar" ? "underline" : "")} onClick={sistemaLogin?.entrar}>Entrar</span>
              <span>|</span>
              <span className={"cursor-pointer hover:text-slate-300 " + (sistemaLogin?.estado === "Cadastrar" ? "underline" : "")} onClick={sistemaLogin?.cadastrar}>Cadastrar</span>
            </div>
            <FormLogin submit={sistemaLogin?.estado === "Entrar" ? realizarLogin : cadastrarUsuario} isPending={sistemaLogin?.estado === "Entrar" ? loadingEntrar : loadingCadastrar} />
          </>
      }
    </div>
  );
}
