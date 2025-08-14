"use client";

import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import useResetPassword from "./_hooks/useResetPassword";
import { validationResetPasswordSchema } from "@/features/reset-password/schema/validationResetPasswordSchema";
import { useAuthStore } from "@/stores/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const { user } = useAuthStore();
  const role = user?.role === "ORGANIZER" ? "ORGANIZER" : "USER";
  const { resetPasswordMutation } = useResetPassword(role);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationResetPasswordSchema,
    onSubmit: (values) => {
      resetPasswordMutation.mutate(values);
    },
  });

  const pending = resetPasswordMutation.isPending;

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <div className="min-h-screen grid place-items-center bg-[#f8fafc] px-4">
        <Card className="w-full max-w-md border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center">
              <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
              <CardTitle className="mt-1 text-[#001a3a] text-[20px]">Reset Password</CardTitle>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4" aria-busy={pending}>
              {/* Old Password */}
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-[#001a3a]">Password Lama</Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showOld ? "text" : "password"}
                    placeholder="Masukkan password lama"
                    {...formik.getFieldProps("oldPassword")}
                    autoComplete="current-password"
                    disabled={pending}
                    className={formik.touched.oldPassword && formik.errors.oldPassword ? "border-red-400 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(v => !v)}
                    disabled={pending}
                    className="absolute inset-y-0 right-0 px-3 grid place-items-center text-[#001a3a]/60 hover:text-[#001a3a]"
                    aria-label={showOld ? "Sembunyikan password lama" : "Tampilkan password lama"}
                  >
                    {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <p className="text-xs text-red-500" role="alert">{formik.errors.oldPassword}</p>
                )}
              </div>


              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[#001a3a]">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    {...formik.getFieldProps("newPassword")}
                    autoComplete="new-password"
                    disabled={pending}
                    className={formik.touched.newPassword && formik.errors.newPassword ? "border-red-400 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    disabled={pending}
                    className="absolute inset-y-0 right-0 px-3 grid place-items-center text-[#001a3a]/60 hover:text-[#001a3a]"
                    aria-label={showNew ? "Sembunyikan password baru" : "Tampilkan password baru"}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="text-xs text-red-500" role="alert">{formik.errors.newPassword}</p>
                )}

                <p className="text-[11px] text-[#001a3a]/60">Gunakan kombinasi huruf, angka, dan simbol untuk keamanan maksimal.</p>
              </div>


              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60"
              >
                {pending ? "Memproses..." : "Simpan Password Baru"}
              </Button>


              {resetPasswordMutation.isError && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  Gagal mengubah password. Coba lagi.
                </p>
              )}
              {resetPasswordMutation.isSuccess && (
                <p className="text-sm text-green-600 text-center" role="status">
                  Password berhasil diperbarui.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
