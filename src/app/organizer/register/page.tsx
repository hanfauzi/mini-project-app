// pages/login.tsx
"use client";
import { validationOrganizerRegisterSchema } from "@/features/organizer/register/schema/validationOrganizerRegisterSchema";
import { useFormik } from "formik";
import Head from "next/head";
import useRegisterHook from "../_hooks/orgRegister";

export default function RegisterOrganizerPage() {
  const { registerOrganizerMutation } = useRegisterHook();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationOrganizerRegisterSchema,
    onSubmit: async (values) => {
      registerOrganizerMutation.mutate(values);
    },
  });

  return (
    <>
      <Head>
        <title>Daftar Organizer TICKLY</title>
      </Head>
      <div className="min-h-screen flex flex-col px-6 pt-6">
        {/* Header */}
        <div className="flex justify-center items-center mb-8 text-[#001a3a]">
          <h1 className="text-[24px] font-semibold">Daftar Organizer TICKLY</h1>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-[#001a3a]">
              Username
            </label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan Username "
                className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-500">{formik.errors.username}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#001a3a]">Email</label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan Email"
                className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#001a3a]">
              Password
            </label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan Password"
                className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerOrganizerMutation.isPending}
            className="bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            {registerOrganizerMutation.isPending ? "Memproses..." : "Daftar"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun Organizer?{" "}
            <a href="#" className="text-blue-700 font-medium">
              Masuk Sekarang
            </a>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-auto text-center text-xs text-gray-500 mb-4">
          Butuh bantuan? Hubungi kami di{" "}
          <a href="#" className="text-blue-600">
            Layanan Pelanggan
          </a>
        </div>
      </div>
    </>
  );
}
