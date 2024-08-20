"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "react-query";

import axios from "axios";

import Swal from "sweetalert2";

import { NavigationType, RootTemplate } from "@/components/layout/root";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LucideEdit, LucideTrash, LucidePlus } from "lucide-react";

import Link from "next/link";
import { useToken } from "@/store/auth.store";

export default function TemplateWebsitesPage() {
  const { token } = useToken();
  const queryClient = useQueryClient();

  const fetchTemplates = async () => {
    const response = await axios.get(
      "https://api.psiweb.com.br/website/template",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  };

  const deleteTemplate = async (id: string) => {
    await axios.delete(`https://api.psiweb.com.br/website-template/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data: templates, isLoading } = useQuery("templates", fetchTemplates);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [errors, setErrors] = useState({ title: "", thumb: "" });

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setSelectedTemplate(null);
    setErrors({ title: "", thumb: "" });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTemplate(id);
          Swal.fire(
            "Excluído!",
            "O template foi excluído com sucesso.",
            "success"
          );
          queryClient.invalidateQueries("templates");
        } catch (error) {
          Swal.fire("Erro!", "Ocorreu um erro ao excluir o template.", "error");
        }
      }
    });
  };

  return (
    <>
      <RootTemplate type={NavigationType.TemplateWebsites}>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-black text-3xl font-semibold">
                Templates de Websites
              </h1>
              <div className="flex items-center space-x-4">
                <Link href="/builder/template">
                  <Button>
                    <LucidePlus className="w-4 h-4 mr-2" />
                    Adicionar Novo
                  </Button>
                </Link>
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
                      Ativo
                    </th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Público
                    </th>
                    <th className="text-left py-3 px-4 border-b border-gray-300">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    templates.map((template: any, key: number) => (
                      <tr
                        key={key}
                        className="hover:bg-gray-200 transition-colors duration-200"
                      >
                        <td className="py-3 px-4 border-b border-gray-300">
                          {template.title}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          <Badge variant="default">
                            {template.isActive ? "Sim" : "Não"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300">
                          <Badge variant="default">
                            {template.thumb.isPublic ? "Sim" : "Não"}
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
              {!isLoading && templates.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  Nenhum template encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </RootTemplate>

      {isEditModalOpen && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Editar Template</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Título</label>
              <input
                type="text"
                value={selectedTemplate.title}
                onChange={(e) =>
                  setSelectedTemplate({
                    ...selectedTemplate,
                    title: e.target.value,
                  })
                }
                className={`w-full p-2 border rounded ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Thumbnail URL</label>
              <input
                type="text"
                value={selectedTemplate.thumb.url}
                onChange={(e) =>
                  setSelectedTemplate({
                    ...selectedTemplate,
                    thumb: { ...selectedTemplate.thumb, url: e.target.value },
                  })
                }
                className={`w-full p-2 border rounded ${
                  errors.thumb ? "border-red-500" : ""
                }`}
              />
              {errors.thumb && (
                <p className="text-red-500 text-sm mt-1">{errors.thumb}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <Button onClick={closeModal}>Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
