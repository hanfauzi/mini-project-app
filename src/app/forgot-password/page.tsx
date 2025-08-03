"use client";

import { useFormik } from "formik";
import Head from "next/head";
import useSendEmail from "./_hooks/useSendEmail";
import { validationSendEmailSchema } from "@/features/forgot-password/schema/validationSendEmailSchema";

export default function SendEmailPage() {
  const { sendEmailMutation } = useSendEmail();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSendEmailSchema,
    onSubmit: async (values) => {
      sendEmailMutation.mutate(values);
    },
  });
  return (
    <>
      <Head>
        <title>Send Email</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <div className="min-h-screen flex flex-col px-6 pt-6 gap-8">
          {/* Header */}
          <div className="flex justify-center items-center mb-8 text-[#001a3a]">
            <h1 className="text-[24px] font-semibold">Forgot Password</h1>
          </div>

          <div>
            <label className="text-sm font-medium text-[#001a3a]">Email</label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan Email"
                className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            Submit
          </button>

          {/* Footer */}
          <div className="mt-auto text-center text-xs text-gray-500 mb-4">
            Butuh bantuan? Hubungi kami di{" "}
            <a href="#" className="text-blue-600">
              Layanan Pelanggan
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
