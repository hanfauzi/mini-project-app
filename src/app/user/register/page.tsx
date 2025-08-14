
"use client";

import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import useRegisterHook from "../_hooks/useRegister";
import { validationUserRegisterSchema } from "@/features/user/register/schema/validationUserRegisterSchema";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


import { Eye, EyeOff } from "lucide-react";

export default function RegisterUserPage() {
  const { registerUserMutation } = useRegisterHook();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      referralCode: "",
    },
    validationSchema: validationUserRegisterSchema,
    onSubmit: (values) => {
      registerUserMutation.mutate(values);
    },
  });

  const pending = registerUserMutation.isPending;

  return (
    <>
      <Head>
        <title>Daftar TICKLY</title>
      </Head>

      <div className="min-h-screen grid place-items-center bg-[#f8fafc] px-4">
        <Card className="w-full max-w-md border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center">
              <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
              <CardTitle className="mt-1 text-[#001a3a] text-[20px]">Daftar TICKLY</CardTitle>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4" aria-busy={pending}>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#001a3a]">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan Username"
                  {...formik.getFieldProps("username")}
                  autoComplete="username"
                  disabled={pending}
                  className={formik.touched.username && formik.errors.username ? "border-red-400" : ""}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-xs text-red-500" role="alert">{formik.errors.username}</p>
                )}
              </div>


              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#001a3a]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email"
                  {...formik.getFieldProps("email")}
                  autoComplete="email"
                  disabled={pending}
                  className={formik.touched.email && formik.errors.email ? "border-red-400" : ""}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500" role="alert">{formik.errors.email}</p>
                )}
              </div>

    
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#001a3a]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    {...formik.getFieldProps("password")}
                    autoComplete="new-password"
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
                  <p className="text-xs text-red-500" role="alert">{formik.errors.password}</p>
                )}
              </div>

  
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="referralCode" className="text-[#001a3a]">Referral Code</Label>
                  <span className="text-[11px] text-[#001a3a]/60">Opsional</span>
                </div>
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="Masukkan Referral Code (jika ada)"
                  {...formik.getFieldProps("referralCode")}
                  disabled={pending}
                  className={formik.touched.referralCode && formik.errors.referralCode ? "border-red-400" : ""}
                />
                {formik.touched.referralCode && formik.errors.referralCode && (
                  <p className="text-xs text-red-500" role="alert">{formik.errors.referralCode}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60"
              >
                {pending ? "Memproses..." : "Daftar"}
              </Button>


              {registerUserMutation.isError && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  Pendaftaran gagal. Coba periksa kembali data Anda.
                </p>
              )}

  
              <p className="text-center text-sm text-[#001a3a]/70">
                Sudah punya akun?{" "}
                <a href="/user/login" className="text-blue-700 font-medium hover:underline">
                  Masuk Sekarang
                </a>
              </p>
              <p className="text-center text-sm text-[#001a3a]/70">
                Ingin Membuat Event?{" "}
                <a href="/organizer/register" className="text-blue-700 font-medium hover:underline">
                  Daftar Menjadi Organizer
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
