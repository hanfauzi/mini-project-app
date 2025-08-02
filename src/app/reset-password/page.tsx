"use client";
import Head from "next/head";

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Masuk ke TICKLY</title>
      </Head>
      <div className="min-h-screen flex flex-col px-6 pt-6 gap-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-8 text-[#001a3a]">
          <h1 className="text-[24px] font-semibold">Reset Password</h1>
        </div>



        <div>
          <label className="text-sm font-medium text-[#001a3a]">
            Old Password
          </label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <input
              type="text"
              name="oldPassword"
              placeholder="Masukkan Password Lama"
              className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-[#001a3a]">
            New Password
          </label>
          <div className="flex items-center border-b border-gray-400 py-2">
            <input
              type="password"
              name="newPassword"
              placeholder="Masukkan Password Baru"
              className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400"
            />
          </div>

          <p className="text-sm text-red-500"></p>

          <div className="mt-2 text-right">
          </div>
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
    </>
  );
}
