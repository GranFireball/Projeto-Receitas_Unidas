export type TFormLogin = {
  usuario: string;
  senha: string;
}

export type TFormReceita = {
  id?: string;
  nome: string;
  imagem: any;
  ingredientes: string;
  comoFazer: string;
  autorId: string;
}

export type TReceita = {
  id: string;
  nome: string;
  imagem: string;
  ingredientes: string;
  comoFazer: string;
  autorId: string;
}


export type TSnackbar = {
  ativo: boolean;
  texto: string;
}

