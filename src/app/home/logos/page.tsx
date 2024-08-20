"use client";

import { NavigationType, RootTemplate } from "@/components/layout/root";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useToken } from "@/store/auth.store";
import { LucideEdit, LucideTrash, LucidePlus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";

export default function TemplateLogosPage() {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [errors, setErrors] = useState({ name: "", height: "", width: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTemplates = async () => {
    const response = await api.get("/editor/templates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.templates;
  };

  const deleteTemplate = async (id: string) => {
    await api.delete(`/editor/delete-template/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const {
    data: templates = [],
    isLoading,
    isError,
  } = useQuery(["get-templates-admin"], fetchTemplates);

  const mutation = useMutation(deleteTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-templates-admin"]);
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setSelectedTemplate(null);
    setErrors({ name: "", height: "", width: "" });
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = { name: "", height: "", width: "" };

    if (!selectedTemplate.name) {
      newErrors.name = "O título é obrigatório.";
      valid = false;
    }

    if (!selectedTemplate.height || isNaN(selectedTemplate.height)) {
      newErrors.height = "A altura deve ser um número.";
      valid = false;
    }

    if (!selectedTemplate.width || isNaN(selectedTemplate.width)) {
      newErrors.width = "A largura deve ser um número.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      closeModal();
    }
  };

  // Função para filtrar templates com base no termo de busca
  const filteredTemplates = templates.filter((template: any) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <RootTemplate type={NavigationType.Logos}>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-black text-3xl font-semibold">
                Templates de logos
              </h1>
              <div className="flex items-center space-x-4">
                <Link href="/home/create-template/2">
                  <Button>
                    <LucidePlus className="w-4 h-4 mr-2" />
                    Adicionar Novo
                  </Button>
                </Link>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                    className="py-2 px-4 bg-gray-200 text-black rounded-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-100 text-black">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Título
                    </th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Dimensões
                    </th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Tamanho
                    </th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.map((template: any, key: any) => (
                    <tr
                      key={key}
                      className="hover:bg-gray-200 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 border-b border-gray-300">
                        {template.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        {template.height} x {template.width}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300">
                        <Badge variant="default">
                          {template.type === "logo" ? "Logotipo" : "Outro"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 border-b border-gray-300 flex space-x-2">
                        <Button onClick={() => handleEdit(template)}>
                          <LucideEdit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          className="bg-red-600 hover:bg-red-800 text-white"
                          onClick={() => handleDelete(template.id)}
                        >
                          <LucideTrash className="w-4 h-4 mr-2" />
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTemplates.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  Nenhum template encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </RootTemplate>

      {/* Modal de Edição */}
      {isEditModalOpen && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Editar Template</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Título</label>
              <input
                type="text"
                value={selectedTemplate.name}
                onChange={(e) =>
                  setSelectedTemplate({
                    ...selectedTemplate,
                    name: e.target.value,
                  })
                }
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 flex space-x-4">
              <div>
                <label className="block text-gray-700">Altura</label>
                <input
                  type="text"
                  value={selectedTemplate.height}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      height: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded ${
                    errors.height ? "border-red-500" : ""
                  }`}
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Largura</label>
                <input
                  type="text"
                  value={selectedTemplate.width}
                  onChange={(e) =>
                    setSelectedTemplate({
                      ...selectedTemplate,
                      width: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded ${
                    errors.width ? "border-red-500" : ""
                  }`}
                />
                {errors.width && (
                  <p className="text-red-500 text-sm mt-1">{errors.width}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo</label>
              <select
                value={selectedTemplate.type}
                onChange={(e) =>
                  setSelectedTemplate({
                    ...selectedTemplate,
                    type: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="logo">Logotipo</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <Button onClick={closeModal}>Cancelar</Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
