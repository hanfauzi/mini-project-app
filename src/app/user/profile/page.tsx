"use client";

import Image from "next/image";
import Head from "next/head";
import useGetProfile from "../_hooks/useProfile";
import { useFormik } from "formik";
import useUpdateProfile, {
  UpdateProfilePayload,
} from "../_hooks/useUpdateProfile";
import { validationUserProfileSchema } from "@/features/user/profile/schema/validationUserProfileSchema";
import { useState } from "react";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { Button } from "@/components/ui/button";

function UserProfilePage() {
  const { data } = useGetProfile();
  const { updateProfileMutation } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);

  const fieldLabels: Record<keyof UpdateProfilePayload, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    username: "Username",
    email: "Email",
    imageUrl: "Profile Picture",
  };

  const formik = useFormik<UpdateProfilePayload>({
    enableReinitialize: true,
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phoneNumber: data?.phoneNumber || "",
      username: data?.username || "",
      email: data?.email || "",
      imageUrl: null,
    },
    validationSchema: validationUserProfileSchema,
    onSubmit: (values) => {
      updateProfileMutation.mutate(values);
      setIsEditing(false);
    },
  });

  return (
    <>
      <Head>
        <title>Akun Saya - TICKLY</title>
      </Head>

      <div className="min-h-screen flex flex-col px-4 pt-8 bg-[#f8fafc]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 text-[#001a3a]">
          <h1 className="text-[28px] font-bold tracking-tight">Profile</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-700 font-semibold text-sm bg-white border border-blue-200 shadow hover:bg-blue-50 transition"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => formik.handleSubmit()}
                  className="text-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
                >
                  Simpan
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                  }}
                  variant="destructive"
                  className="text-sm font-semibold"
                >
                  Batal
                </Button>
              </>
            )}
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-1 w-full max-w-screen  mx-auto bg-white rounded-xl shadow p-4 sm:p-6 md:p-8"
        >
          {/* Foto Profil */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <Image
                src={
                  formik.values.imageUrl instanceof File
                    ? URL.createObjectURL(formik.values.imageUrl)
                    : data?.imageUrl || "/default-profile.jpg"
                }
                alt="Foto Profile"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full object-cover border-4 border-blue-100 shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer border border-blue-200 hover:bg-blue-50 transition flex items-center gap-1">
                  <Image
                    src="/camera.png" // pastikan file ini ada di public/
                    alt="Edit"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <span className="text-xs text-blue-600 font-medium">Edit</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("imageUrl", file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Fields */}
          {["firstName", "lastName", "phoneNumber", "username", "email"].map(
            (field) => (
              <div className="mb-5" key={field}>
                <label className="text-xs font-semibold text-[#001a3a] capitalize mb-1 block">
                  {fieldLabels[field as keyof UpdateProfilePayload]}
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name={field}
                      value={
                        formik.values[
                          field as keyof UpdateProfilePayload
                        ] as string
                      }
                      onChange={formik.handleChange}
                      className={`w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition ${
                        formik.touched[field as keyof UpdateProfilePayload] &&
                        formik.errors[field as keyof UpdateProfilePayload]
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                    />
                    {formik.touched[field as keyof UpdateProfilePayload] &&
                      formik.errors[field as keyof UpdateProfilePayload] && (
                        <div className="text-xs text-red-500 mt-1">
                          {formik.errors[field as keyof UpdateProfilePayload]}
                        </div>
                      )}
                  </>
                ) : (
                  <div className="flex items-center border-b border-gray-200 py-2">
                    <p className="text-gray-700 text-base">
                      {data?.[field as keyof typeof data]}
                    </p>
                  </div>
                )}
              </div>
            )
          )}

          {/* Password (readonly display only) */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-[#001a3a] mb-1 block">
              Password
            </label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <p className="text-gray-400 text-sm italic">**********</p>
            </div>
          </div>

          {/* Referral Code */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-[#001a3a] mb-1 block">
              Referral Code
            </label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <p className="text-gray-700 text-base">{data?.referralCode}</p>
            </div>
          </div>
        </form>

        {/* Hapus akun */}
        <div className="mt-8 text-center mb-6">
          <button className="text-sm text-red-500 font-semibold hover:underline hover:text-red-700 transition">
            Hapus Akun Saya
          </button>
        </div>
      </div>
    </>
  );
}

export default withAuthGuard(UserProfilePage, {
  allowedRoles: ["USER"],
  redirectTo: "/user/login",
});
