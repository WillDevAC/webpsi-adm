"use client";

import { CanvaBuilderCreator } from "@/components/client/canva-builder";
import { Header } from "@/components/ui/header";

import { useParams } from "next/navigation";

export default function CanvaPage() {
  const params = useParams();

  return (
    <>
      <Header />
      <CanvaBuilderCreator
        idProject={(params?.id as string) ?? ""}
        type="user"
      />
    </>
  );
}
