'use client'

import { useContext } from 'react';
import SnackbarContext from '@/src/context/snackbar/SnackbarContext';

export default function Snackbar() {
  const snackbar = useContext(SnackbarContext);
  
  if (snackbar!.snackbar.ativo) {
    return (
      <div className="fixed top-0 w-full flex justify-center items-center mt-4 z-20">
        <div className='w-fit mw-80 px-8 py-4 bg-slate-600 border border-slate-800 rounded-md text-white'>
          <span className="">{snackbar!.snackbar.texto}</span>
        </div>
      </div>
    )
  }
}