"use client";

import { validationOrganizerProfileSchema } from "@/features/organizer/profile/schema/validationOrganizerProfileSchema";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useGetOrganizerProfile from "../_hooks/useProfile";
import useUpdateProfileOrganizer, {
  UpdateProfileOrganizer,
} from "../_hooks/useUpdateProfile";
import { withAuthGuard } from "@/hoc/AuthGuard";

function OrganizerProfilePage() {
  const { data } = useGetOrganizerProfile();
  const { updateProfileOrganizerMutation } = useUpdateProfileOrganizer();
  const [isEditing, setIsEditing] = useState(false);

  const fieldLabels: Record<keyof UpdateProfileOrganizer, string> = {
    orgName: "Name",
    address: "Address",
    phoneNumber: "Phone Number",
    bio: "Bio",
    username: "Username",
    email: "Email",
    logoUrl: "Profile Picture",
  };

  const formik = useFormik<UpdateProfileOrganizer>({
    enableReinitialize: true,
    initialValues: {
      orgName: data?.orgName || "",
      address: data?.address || "",
      phoneNumber: data?.phoneNumber || "",
      bio: data?.bio || "",
      username: data?.username || "",
      email: data?.email || "",
      logoUrl: null,
    },
    validationSchema: validationOrganizerProfileSchema,
    onSubmit: (values) => {
      updateProfileOrganizerMutation.mutate(values);
      setIsEditing(false);
    },
  });

  return (
    <>
      <Head>
        <title>Akun Saya - TICKLY</title>
      </Head>

      <div className="min-h-screen flex flex-col px-6 pt-6">
        <div className="flex justify-between items-center mb-8 text-[#001a3a]">
          <h1 className="text-[24px] font-semibold">Profile</h1>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-blue-700 font-medium text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1">
          {isEditing && (
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="text-sm text-blue-700 font-medium"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
          {/* Foto Profil */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Image
                src={
                  formik.values.logoUrl instanceof File
                    ? URL.createObjectURL(formik.values.logoUrl)
                    : data?.logoUrl || "/default-profile.jpg"
                }
                alt="Foto Profile"
                width={100}
                height={100}
                className="w-[100px] h-[100px] rounded-full object-cover border border-[#001a3a]"
              />
            </div>

            {isEditing && (
              <>
                <label className="mt-2 text-sm text-blue-600 cursor-pointer font-medium hover:underline">
                  Edit Foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("logoUrl", file);
                      }
                    }}
                  />
                </label>
              </>
            )}
          </div>

          {/* Fields */}
          {[
            "orgName",
            "address",
            "phoneNumber",
            "bio",
            "username",
            "email",
          ].map((field) => (
            <div className="mb-6" key={field}>
              <label className="text-sm font-medium text-[#001a3a] capitalize">
                {fieldLabels[field as keyof UpdateProfileOrganizer]}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={
                    formik.values[
                      field as keyof UpdateProfileOrganizer
                    ] as string
                  }
                  onChange={formik.handleChange}
                  className="w-full border-b border-gray-400 py-2 text-gray-800 focus:outline-none"
                />
              ) : (
                <div className="flex items-center border-b border-gray-400 py-2">
                  <p className="text-gray-600 text-base">
                    {data?.[field as keyof typeof data]}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Password (readonly display only) */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#001a3a]">
              Password
            </label>
            <div className="flex items-center border-b border-gray-400 py-2">
              <p className="text-gray-400 text-sm italic">********</p>
            </div>
          </div>

          {/* Tombol batal */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-500 font-medium"
                onClick={() => {
                  setIsEditing(false);
                  formik.resetForm();
                }}
              >
                Batal
              </button>
            </div>
          )}
        </form>

        {/* Hapus akun */}
        <div className="mt-auto text-center mb-6">
          <button className="text-sm text-red-500 font-medium">
            Hapus Akun Saya
          </button>
        </div>
      </div>
    </>
  );
}

export default withAuthGuard(OrganizerProfilePage, {
  allowedRoles: ["ORGANIZER"],
});
