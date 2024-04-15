interface INotificacaoProps {
  color: string;
  msgPrincipal: string;
  msgRedirect: string;
}

export default function Notificacao({color, msgPrincipal, msgRedirect}: INotificacaoProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <strong className={`text-${color}-600 text-xl`}>{msgPrincipal}</strong>
      <span>{msgRedirect}</span>
    </div>
  )
}