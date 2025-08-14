"use client";

import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import useForgotPasswordOrganizer from "@/app/organizer/_hooks/useForgotPasswordOrganizer";
import { validationNewPasswordSchema } from "@/features/forgot-password/schema/validationNewPasswordSchema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

export default function NewPasswordPage() {
  const { forgotPasswordOrganizerMutation } = useForgotPasswordOrganizer();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { newPassword: "" },
    validationSchema: validationNewPasswordSchema,
    onSubmit: (values) => {
      forgotPasswordOrganizerMutation.mutate(values);
    },
  });

  const pending = forgotPasswordOrganizerMutation.isPending;
  const hasErr = !!(formik.touched.newPassword && formik.errors.newPassword);

  return (
    <>
      <Head>
        <title>Buat Password Baru | TICKLY</title>
      </Head>

      <div className="min-h-screen grid place-items-center bg-[#f8fafc] px-4">
        <Card className="w-full max-w-md border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center">
              <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
              <CardTitle className="mt-1 text-[#001a3a] text-[20px]">Buat Password Baru</CardTitle>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4" aria-busy={pending}>
              <p className="text-sm text-[#001a3a]/70">
                Masukkan password baru untuk akun organizer kamu.
              </p>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[#001a3a]">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={show ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    {...formik.getFieldProps("newPassword")}
                    autoComplete="new-password"
                    disabled={pending}
                    className={hasErr ? "border-red-400 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(v => !v)}
                    disabled={pending}
                    className="absolute inset-y-0 right-0 px-3 grid place-items-center text-[#001a3a]/60 hover:text-[#001a3a]"
                    aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {hasErr && (
                  <p className="text-xs text-red-500" role="alert">
                    {formik.errors.newPassword}
                  </p>
                )}
                <p className="text-[11px] text-[#001a3a]/60">
                  Gunakan kombinasi huruf, angka, dan simbol.
                </p>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60"
              >
                {pending ? "Memproses..." : "Simpan Password"}
              </Button>


              {forgotPasswordOrganizerMutation.isError && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  Gagal menyimpan password. Coba lagi.
                </p>
              )}
              {forgotPasswordOrganizerMutation.isSuccess && (
                <p className="text-sm text-green-600 text-center" role="status">
                  Password berhasil diperbarui.
                </p>
              )}
            </form>

            <Separator className="my-6" />
            <p className="text-center text-xs text-[#001a3a]/60">
              Butuh bantuan? Hubungi{" "}
              <a href="#" className="text-blue-700 hover:underline">Layanan Pelanggan</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
