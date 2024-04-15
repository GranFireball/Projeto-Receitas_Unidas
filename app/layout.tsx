import Header from "@/src/components/Header";
import Providers from "@/src/components/Providers";
import { ProvidersContext } from "@/src/context/ProvidersContext";
import 'tailwindcss/tailwind.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8"/>
        <meta name="description" content="O site Receitas Unidas foi criado com o objetivo de agrupar diversas receitas"/> 
        <meta name="keywords" content="Receitas, Comidas, Ingredientes"/>
        <meta name="author" content="Leonardo Kawamoto (Gran Fireball)"/>
        <title>Receitas Unidas</title>
      </head>
      <body>
        <ProvidersContext>
          <Providers>
            <Header/>
            {children}
          </Providers>
        </ProvidersContext>
      </body>
    </html>
  );
}
