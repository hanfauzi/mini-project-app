"use client";

import { validationOrganizerProfileSchema } from "@/features/organizer/profile/schema/validationOrganizerProfileSchema";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import useGetOrganizerProfile from "../../_hooks/useProfile";
import useUpdateProfileOrganizer, {
  UpdateProfileOrganizer,
} from "../../_hooks/useUpdateProfile";
import { withAuthGuard } from "@/hoc/AuthGuard";
import Link from "next/link";
import { useOrganizerReviews } from "../../_hooks/useOrganizerReview";

function OrganizerProfilePage() {
  const { data } = useGetOrganizerProfile();
  const { updateProfileOrganizerMutation } = useUpdateProfileOrganizer();
  const [isEditing, setIsEditing] = useState(false);
  const { data: reviewData, isLoading: loadingReviews } = useOrganizerReviews(data?.id || "");


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

      <div className="min-h-screen flex flex-col px-4 pt-8 bg-[#f8fafc]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 text-[#001a3a]">
          <h1 className="text-[28px] font-bold tracking-tight">Profile</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-700 font-semibold text-sm bg-white border border-blue-200 shadow hover:bg-blue-50 transition px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => formik.handleSubmit()}
                  className="text-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                  }}
                  className="text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              </>
            )}
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-1 w-full max-w-screen mx-auto bg-white rounded-xl shadow p-4 sm:p-6 md:p-8"
        >
          {/* Foto Profil */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <Image
                src={
                  formik.values.logoUrl instanceof File
                    ? URL.createObjectURL(formik.values.logoUrl)
                    : data?.logoUrl || "/default-profile.jpg"
                }
                alt="Foto Profile"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full object-cover border-4 border-blue-100 shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer border border-blue-200 hover:bg-blue-50 transition flex items-center gap-1">
                  <Image
                    src="/camera.png"
                    alt="Edit"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <span className="text-xs text-blue-600 font-medium">
                    Edit
                  </span>
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
              )}
            </div>
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
            <div className="mb-5" key={field}>
              <label className="text-xs font-semibold text-[#001a3a] capitalize mb-1 block">
                {fieldLabels[field as keyof UpdateProfileOrganizer]}
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name={field}
                    value={
                      formik.values[
                        field as keyof UpdateProfileOrganizer
                      ] as string
                    }
                    onChange={formik.handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition ${
                      formik.touched[field as keyof UpdateProfileOrganizer] &&
                      formik.errors[field as keyof UpdateProfileOrganizer]
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched[field as keyof UpdateProfileOrganizer] &&
                    formik.errors[field as keyof UpdateProfileOrganizer] && (
                      <div className="text-xs text-red-500 mt-1">
                        {formik.errors[field as keyof UpdateProfileOrganizer]}
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
          ))}

          {/* Password (readonly display only) */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-[#001a3a] mb-1 block">
              Password
            </label>
            <div className="flex items-center border-b border-gray-200 py-2">
              <p className="text-gray-400 text-sm italic">**********</p>
            </div>
            <Link href="/reset-password">
              <div>Edit Password</div>
            </Link>
          </div>
        </form>

       
      </div>

      {/* Review Section */}
      <div className="my-10  bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-[#001a3a] mb-4">
          User Reviews
        </h2>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviewData?.reviews?.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet.</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-yellow-500 font-semibold text-lg">
                Rating: ⭐ {reviewData?.averageRating?.toFixed(1) ?? "-"} / 5
              </p>
              <p className="text-sm text-gray-500">
                Total Reviews: {reviewData?.totalReviews}
              </p>
            </div>

            <ul className="space-y-4">
              {reviewData?.reviews.map((review: any) => (
                <li
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">
                      {review.user?.firstName || review.user?.username}
                    </span>{" "}
                    on <span className="italic">{review.event?.title}</span>
                  </p>
                  <p className="text-yellow-500 mb-2">⭐ {review.rating}</p>
                  <p className="text-gray-800">{review.comment}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default withAuthGuard(OrganizerProfilePage, {
  allowedRoles: ["ORGANIZER"],
});
