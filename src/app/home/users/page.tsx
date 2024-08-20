"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { RootTemplate, NavigationType } from "@/components/layout/root";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";
import { useToken } from "@/store/auth.store";
import Link from "next/link";

export default function UsersPage() {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    const response = await axios.get("https://api.psiweb.com.br/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: searchTerm,
      },
    });
    return response.data.users;
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`https://api.psiweb.com.br/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: users, isLoading } = useQuery(["users", searchTerm], fetchUsers, {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Usuário deletado com sucesso!',
      });
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao deletar o usuário.',
      });
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  return (
    <RootTemplate type={NavigationType.Users}>
      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant={"destructive"}
                    >
                      <LucideTrash className="w-5 h-5" />
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RootTemplate>
  );
}
