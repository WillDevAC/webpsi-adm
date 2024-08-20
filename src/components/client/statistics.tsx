import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  ActivityIcon,
  BriefcaseIcon,
  CreditCardIcon,
  DollarSignIcon,
} from "lucide-react";

export function StatisticsClient() {
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <img src="/assets/logo.png" alt="Website Logo" className="w-[250px]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSignIcon className="h-6 w-6" />
              Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0.00</div>
            <span className="text-sm opacity-80">Mês atual </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-900 to-blue-900 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCardIcon className="h-6 w-6" />
              Inscrições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <span className="text-sm opacity-80">Desde o início do ano</span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-900 to-orange-900 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="h-6 w-6" />
              Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <span className="text-sm opacity-80">Total de vendas</span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-900 to-pink-900 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-6 w-6" />
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <span className="text-sm opacity-80">Clientes ativos</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
