"use client";

import Head from "next/head";
import { useFormik } from "formik";
import { useMemo } from "react";
import { validationSendEmailSchema } from "@/features/forgot-password/schema/validationSendEmailSchema";
import useSendEmail from "./_hooks/useSendEmail";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SendEmailPage() {
  const { sendEmailMutation } = useSendEmail();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSendEmailSchema,
    onSubmit: (values) => {
      sendEmailMutation.mutate(values);
    },
  });

  const pending = sendEmailMutation.isPending;
  const hasErr = !!(formik.touched.email && formik.errors.email);

  const helpText = useMemo(
    () =>
      sendEmailMutation.isSuccess
        ? "Kami telah mengirim tautan reset ke email kamu. Periksa inbox/spam folder."
        : "Masukkan email terdaftar. Kami akan mengirim tautan untuk mengatur ulang password.",
    [sendEmailMutation.isSuccess]
  );

  return (
    <>
      <Head>
        <title>Forgot Password | TICKLY</title>
      </Head>

      <div className="min-h-screen grid place-items-center bg-[#f8fafc] px-4">
        <Card className="w-full max-w-md border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center text-center">
              <div className="font-extrabold text-xl tracking-tight text-blue-700">TICKLY</div>
              <CardTitle className="mt-1 text-[#001a3a] text-[20px]">Forgot Password</CardTitle>
            </div>
          </CardHeader>

        <Separator />

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-4" aria-busy={pending}>
              <p className="text-sm text-[#001a3a]/70">{helpText}</p>


              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#001a3a]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email"
                  {...formik.getFieldProps("email")}
                  autoComplete="email"
                  disabled={pending}
                  className={hasErr ? "border-red-400" : ""}
                />
                {hasErr && (
                  <p className="text-xs text-red-500" role="alert">
                    {formik.errors.email}
                  </p>
                )}
              </div>


              <Button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60"
              >
                {pending ? "Mengirim..." : "Kirim Link Reset"}
              </Button>


              {sendEmailMutation.isError && (
                <p className="text-sm text-red-600 text-center" role="alert">
                  Gagal mengirim email. Coba lagi nanti.
                </p>
              )}
              {sendEmailMutation.isSuccess && (
                <p className="text-sm text-green-600 text-center" role="status">
                  Email berhasil dikirim.
                </p>
              )}

              <div className="text-center text-sm text-[#001a3a]/70">
                Ingat password?{" "}
                <a href="/user/login" className="text-blue-700 font-medium hover:underline">
                  Kembali ke Login
                </a>
              </div>
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
