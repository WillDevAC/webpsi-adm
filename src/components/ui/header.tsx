'use client'

import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { onExit } from '@/store/auth.store';

export function Header() {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você está prestes a sair...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#9211ff",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      onExit();
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 h-12 sticky top-0 z-10 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2"></div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-200"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-5 w-5" />
          Sair
        </Button>
      </header>
    </>
  );
}
