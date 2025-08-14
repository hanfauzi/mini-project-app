// pages/login.tsx
"use client";

import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import useLoginHook from "../_hooks/useLogin";
import { validationUserLoginSchema } from "@/features/user/login/schema/validationUserLoginSchema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

export default function LoginUserPage() {
  const { loginUserMutation } = useLoginHook();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: validationUserLoginSchema,
    onSubmit: (values) => {
      loginUserMutation.mutate(values);
    },
  });

  const pending = loginUserMutation.isPending;

  return (
    <>
      <Head>
        <title>Masuk ke TICKLY</title>
      </Head>

      <div className="min-h-screen grid place-items-center bg-[#f8fafc] px-4">
        <Card className="w-full max-w-md border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center">
              <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
              <CardTitle className="mt-1 text-[#001a3a] text-[20px]">Masuk ke TICKLY</CardTitle>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4"
              aria-busy={pending}
            >

              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail" className="text-[#001a3a]">
                  Username / Email
                </Label>
                <Input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="Masukkan Username atau Email"
                  {...formik.getFieldProps("usernameOrEmail")}
                  autoComplete="username email"
                  disabled={pending}
                  className={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? "border-red-400" : ""}
                />
                {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && (
                  <p className="text-xs text-red-500" role="alert">
                    {formik.errors.usernameOrEmail}
                  </p>
                )}
              </div>


              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#001a3a]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    {...formik.getFieldProps("password")}
                    autoComplete="current-password"
                    disabled={pending}
                    className={formik.touched.password && formik.errors.password ? "border-red-400 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={pending}
                    className="absolute inset-y-0 right-0 px-3 grid place-items-center text-[#001a3a]/60 hover:text-[#001a3a]"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500" role="alert">
                    {formik.errors.password}
                  </p>
                )}
                <div className="mt-1 text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-700 font-medium hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>
              </div>


              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60"
              >
                {pending ? "Memproses..." : "Masuk"}
              </Button>


              {loginUserMutation.isError && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  Login gagal. Coba periksa kembali data Anda.
                </p>
              )}


              <p className="text-center text-sm text-[#001a3a]/70">
                Belum punya akun?{" "}
                <a href="/user/register" className="text-blue-700 font-medium hover:underline">
                  Daftar Sekarang
                </a>
              </p>
            </form>

  
            <Separator className="my-6" />
            <p className="text-center text-xs text-[#001a3a]/60">
              Butuh bantuan? Hubungi{" "}
              <a href="#" className="text-blue-700 hover:underline">
                Layanan Pelanggan
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
