"use client";

import { useGetEventById } from "@/app/organizer/_hooks/useGetEventById";
import useUpdateEvent, {
  UpdateEventFormValues,
} from "@/app/organizer/_hooks/useUpdateEvent";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export default function EditEventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const { data } = useGetEventById(eventId);
  const { updateEventMutation } = useUpdateEvent();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik<UpdateEventFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || "",
      category: data?.category || "",
      location: data?.location || "",
      description: data?.description || "",
      startDay: data?.startDay?.slice(0, 10) || "",
      endDay: data?.endDay?.slice(0, 10) || "",
      startTime: data?.startTime || "",
      endTime: data?.endTime || "",
      status: data?.status || "UPCOMING",
      maxCapacity: data?.maxCapacity || "",
      imageUrl: null,
    },
    onSubmit: (values) => {
      updateEventMutation.mutate(values);
      setIsEditing(false);
    },
  });

  return (
    <>
      <Head>
        <title>Edit Event - TICKLY</title>
      </Head>
      <div className="min-h-screen px-6 pt-6 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[24px] font-semibold text-[#001a3a]">
            Edit Event
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-700 text-sm font-medium"
            >
              Edit Event
            </button>
          )}
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          {/* Image Preview */}
          <div className="flex flex-col items-center">
            <Image
              src={
  formik.values.imageUrl instanceof File
    ? URL.createObjectURL(formik.values.imageUrl)
    : data?.imageURL || "/fallback-image.jpg"
}
              alt="Event Image"
              width={200}
              height={150}
              className="rounded-lg border object-cover w-full max-w-screen"
            />
            {isEditing && (
              <label className="mt-2 text-sm text-blue-600 cursor-pointer font-medium hover:underline">
                Ganti Gambar
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

          {/* Input Fields */}
          {[
            ["title", "Judul Event"],
            ["category", "Kategori"],
            ["location", "Lokasi"],
            ["description", "Deskripsi"],
            ["startDay", "Tanggal Mulai"],
            ["endDay", "Tanggal Berakhir"],
            ["startTime", "Jam Mulai"],
            ["endTime", "Jam Selesai"],
            ["status", "Status"],
            ["maxCapacity", "Kapasitas Maksimum"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="text-sm font-medium text-[#001a3a]">
                {label}
              </label>
              {isEditing ? (
                <input
                  type={
                    field.includes("Day")
                      ? "date"
                      : field.includes("Time")
                      ? "time"
                      : field === "maxCapacity"
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={
                    formik.values[field as keyof typeof formik.values] as string
                  }
                  onChange={formik.handleChange}
                  className="w-full border-b border-gray-400 py-2 text-gray-800 focus:outline-none"
                />
              ) : (
                <div className="border-b border-gray-400 py-2 text-gray-600">
                  {field === "startDay" || field === "endDay"
                    ? dayjs(data?.[field as keyof typeof data]).format(
                        "DD MMMM YYYY"
                      )
                    : field === "startTime" || field === "endTime"
                    ? dayjs(data?.[field as keyof typeof data], "HH:mm:ss").format("HH:mm")
                    : data?.[field as keyof typeof data]}
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="text-sm text-blue-700 font-medium"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setIsEditing(false);
                }}
                className="text-sm text-gray-500"
              >
                Batal
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
