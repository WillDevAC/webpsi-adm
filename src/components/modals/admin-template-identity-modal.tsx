"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  setAdminName: Function;
  setWidthValue: Function;
  setHeigthValue: Function;
  setTypeValue: Function;
  setAdminModal: Function;
  setValidit: Function;
}

export function AdminTemplateIdentityModal({
  setAdminName,
  setWidthValue,
  setHeigthValue,
  setTypeValue,
  setAdminModal,
  setValidit
}: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState<string>("logo");
  const [width, setWidth] = useState<string>("500");
  const [height, setHeight] = useState<string>("500");
  const [adminName, setAdminNameState] = useState<string>("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(true);
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    if (value === "logo") {
      setWidth("500");
      setHeight("500");
    } else if (value === "visit-card") {
      setWidth("1063");
      setHeight("591");
    }
  };

  const handleSubmit = () => {
    if (!adminName || !width || !height || !type) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setAdminName(adminName)
    setWidthValue(width);
    setHeigthValue(height);
    setTypeValue(type);
    setAdminModal(false);
    setValidit('ok');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>CRIAR NOVO TEMPLATE</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Nome do template"
                  onChange={(e) => setAdminNameState(e.target.value)}
                />
              </div>
              <div className="flex">
                <Select
                  value={type}
                  onValueChange={(value) => {
                    handleTypeChange(value);
                    setTypeValue(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipo de template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="visit-card">
                        Cartão de visita
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row gap-2">
                <Input
                  placeholder="Altura"
                  value={height}
                  readOnly
                />
                <Input
                  placeholder="Largura"
                  value={width}
                  readOnly
                />
              </div>
              <div className="flex mt-5 w-full items-center justify-center">
                <Button onClick={handleSubmit}>
                  INICIAR TEMPLATE
                </Button>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}