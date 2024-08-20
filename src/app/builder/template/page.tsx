"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DynamicWebsiteBuilder = dynamic(() => import('@/components/website-builder'), {
  ssr: false,
});

const BuilderContent = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  return <DynamicWebsiteBuilder projectId={"TEMPLATE-HERE-TO-CREATE-AFTER"} templateId={templateId ?? null} />;
};

const BuilderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
};

export default BuilderPage;