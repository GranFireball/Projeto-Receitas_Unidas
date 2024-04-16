interface INotificacaoVerdeProps {
  msgPrincipal: string;
  msgRedirect: string;
}

export default function NotificacaoVerde({msgPrincipal, msgRedirect}: INotificacaoVerdeProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <strong className='text-green-600 text-xl'>{msgPrincipal}</strong>
      <span>{msgRedirect}</span>
    </div>
  )
}