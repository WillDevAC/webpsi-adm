"use client";

import Image from "next/image";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { crypt } from "@/lib/crypth";

import Swal from "sweetalert2";
import api from "@/lib/api";
import Cookies from "js-cookie";
import Link from "next/link";

import { Lock, MailIcon } from "lucide-react";

interface IDataRequest {
  email: string;
  password: string;
}

export function LoginForm() {
  const { setUser } = useStore();
  const { replace } = useRouter();

  const LoginAction = async (CREDENTIALS: IDataRequest) => {
    const { email, password } = CREDENTIALS;
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  };

  const { mutateAsync, isLoading } = useMutation(LoginAction);

  const { register, handleSubmit } = useForm<IDataRequest>();

  const onSubmit: SubmitHandler<IDataRequest> = async (data: any) => {
    try {
      const UserDetails = await mutateAsync(data);

      const tokenEncrypted = crypt(UserDetails.token);

      Cookies.set("token-client", tokenEncrypted, {
        path: "/",
        expires: 1,
      });

      if(UserDetails.user.role === 'admin') {
        setUser(UserDetails.user);
        replace("/home");
      } else {
        Swal.fire({
          title: "Ooops...",
          text: "Você precisa de permissão para isso.",
          icon: "error",
          confirmButtonText: "Fechar",
          confirmButtonColor: "#9211ff",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Ooops...",
        text: "Usuário ou senha incorretos.",
        icon: "error",
        confirmButtonText: "Fechar",
        confirmButtonColor: "#9211ff",
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-3 min-w-[350px] max-w-[350px] p-5 md:p-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <section className="flex w-full mb-8">
          <Image
            src="/assets/logo-desktop-full.svg"
            alt="website-logo"
            width={400}
            height={400}
          />
        </section>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MailIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="pl-10"
            {...register("email")}
            required
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Senha"
            className="pl-10"
            {...register("password")}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Fazer login"}
        </Button>
      </div>
    </form>
  );
}
