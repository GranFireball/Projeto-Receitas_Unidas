import { ReactNode, createContext, useState } from 'react';

interface ILoginContextProps {
  estado: "Entrar" | "Cadastrar" | "Logado";
  idUsuario: string | undefined;
  logar: (idUsuario: string) => void;
  entrar: () => void;
  cadastrar: () => void;
  deslogar: () => void;
}

interface IProvidersProps {
  children: ReactNode;
}

const LoginContext = createContext<ILoginContextProps | null>(null);

export function LoginProvider({ children }: IProvidersProps) {
  const [idUsuario, setIdUsuario] = useState<string | undefined>();
  const [estado, setEstado] = useState<"Entrar" | "Cadastrar" | "Logado">("Entrar");

  function logar(idUsuario: string) {
    setEstado("Logado");
    setIdUsuario(idUsuario);
  }

  function entrar() {
    setEstado("Entrar");
  }

  function cadastrar() {
    setEstado("Cadastrar");
  }

  function deslogar() {
    setEstado("Entrar");
    setIdUsuario(undefined);
  }
  return (
    <LoginContext.Provider value={{ estado, idUsuario, logar, entrar, cadastrar, deslogar }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;