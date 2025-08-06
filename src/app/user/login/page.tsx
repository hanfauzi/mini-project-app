// pages/login.tsx
"use client";
import Head from "next/head";
import { useFormik } from "formik";
import useLoginHook from "../_hooks/useLogin";
import { validationUserLoginSchema } from "@/features/user/login/schema/validationUserLoginSchema";

export default function LoginUserPage() {
  const { loginUserMutation } = useLoginHook();
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: validationUserLoginSchema,
    onSubmit: async (values) => {
      loginUserMutation.mutate(values);
    },
  });

  return (
    <>
      <Head>
        <title>Masuk ke TICKLY</title>
      </Head>
      <div className="min-h-screen flex flex-col px-6 pt-6">
        {/* Header */}
        <div className="flex justify-center items-center mb-8 text-[#001a3a]">
          <h1 className="text-[24px] font-semibold">Masuk ke TICKLY</h1>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {/* Username or Email */}
          <div>
            <label className="text-sm font-medium text-[#001a3a]">
              Username / Email
            </label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <input
                type="text"
                name="usernameOrEmail"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan Username atau Email"
                className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
              />
            </div>
            {formik.touched.usernameOrEmail &&
              formik.errors.usernameOrEmail && (
                <p className="text-sm text-red-500">
                  {formik.errors.usernameOrEmail}
                </p>
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
            <div className="mt-2 text-right">
              <a href="/forgot-password" className="text-sm text-blue-700 font-medium">
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginUserMutation.isPending}
            className="bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loginUserMutation.isPending ? "Memproses..." : "Masuk"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{" "}
            <a href="#" className="text-blue-700 font-medium">
              Daftar Sekarang
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
