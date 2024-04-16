interface INotificacaoVermelhaProps {
  msgPrincipal: string;
  msgRedirect: string;
}

export default function NotificacaoVermelha({msgPrincipal, msgRedirect}: INotificacaoVermelhaProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <strong className='text-red-600 text-xl'>{msgPrincipal}</strong>
      <span>{msgRedirect}</span>
    </div>
  )
}