"use client";

import { CanvaBuilderCreator } from "@/components/client/canva-builder";
import { Header } from "@/components/ui/header";

import { useParams } from "next/navigation";

export default function CreateTemplatePage() {
  const params = useParams();

  return (
    <>
      <Header />
      <CanvaBuilderCreator
        idProject={(params?.id as string) ?? ""}
        type="admin"
      />
    </>
  );
}