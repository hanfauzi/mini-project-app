"use client";

import dayjs from "dayjs";
import "dayjs/locale/id";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
dayjs.locale("id");

import { useGetEventById } from "@/app/organizer/_hooks/useGetEventById";
import useUpdateEvent, { UpdateEventFormValues } from "@/app/organizer/_hooks/useUpdateEvent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";


import { CalendarDays, Clock, Pencil, Save, Trash2, Upload, X } from "lucide-react";
import { withAuthGuard } from "@/hoc/AuthGuard";

 function EditEventPage() {
  const params = useParams();
  const eventId = params.id as string;

  const { data } = useGetEventById(eventId);
  const { updateEventMutation } = useUpdateEvent();

  const [isEditing, setIsEditing] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

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
      maxCapacity: (data?.maxCapacity as any) || "", // jika backend string/number, aman
      imageUrl: null,
    },
    onSubmit: (values) => {
      updateEventMutation.mutate(values);
      setIsEditing(false);
    },
  });


  const coverSrc = useMemo(() => {
    if (formik.values.imageUrl instanceof File) {
      return URL.createObjectURL(formik.values.imageUrl);
    }
    return data?.imageURL || "/fallback-image.jpg";
  }, [formik.values.imageUrl, data?.imageURL]);

  const pickFile = () => fileRef.current?.click();
  const clearFile = () => {
    formik.setFieldValue("imageUrl", null);
    if (fileRef.current) fileRef.current.value = "";
  };
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const allow = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allow.includes(f.type)) {
      alert("File harus gambar: png/jpg/jpeg/webp");
      return;
    }
    if (f.size > 3 * 1024 * 1024) {
      alert("Maksimal 3MB");
      return;
    }
    formik.setFieldValue("imageUrl", f);
  };

  const prettyDate = (d?: string) => (d ? dayjs(d).format("DD MMMM YYYY") : "-");
  const prettyTime = (t?: string) =>
    t ? dayjs(t, ["HH:mm", "HH:mm:ss"]).format("HH:mm") : "-";

  return (
    <>
      <Head>
        <title>Edit Event - TICKLY</title>
      </Head>

      <div className="min-h-screen px-4 md:px-6 pt-6">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-semibold text-[#001a3a]">Edit Event</h1>
            <p className="text-sm text-[#001a3a]/70">Kelola detail event kamu.</p>
          </div>

          {!isEditing ? (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Event
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  formik.resetForm();
                  clearFile();
                  setIsEditing(false);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
            </div>
          )}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6 lg:gap-8 md:grid-cols-[360px_1fr]">

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">Poster Event</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="relative w-full overflow-hidden rounded-xl border border-blue-100 bg-white">
                  <Image
                    src={coverSrc}
                    alt="Event Cover"
                    width={1280}
                    height={720}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>

                {isEditing && (
                  <>
                    <div className="mt-4 flex gap-2">
                      <Button type="button" variant="outline" onClick={pickFile}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={clearFile}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                    <p className="mt-2 text-xs text-[#001a3a]/60">
                      Format: JPG/PNG/WEBP, maks 3MB. Rekomendasi rasio 16:9.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>


            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">Detail Event</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title" className="text-[#001a3a]">Judul Event</Label>
                    {isEditing ? (
                      <Input
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        placeholder="Judul event"
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2">{data?.title || "-"}</div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#001a3a]">Kategori</Label>
                    {isEditing ? (
                      <Input
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        placeholder="Misal: Music, Tech, Workshop"
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2">{data?.category || "-"}</div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#001a3a]">Lokasi</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        placeholder="Nama venue / alamat / online"
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2">{data?.location || "-"}</div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="startDay" className="text-[#001a3a]">Tanggal Mulai</Label>
                    {isEditing ? (
                      <Input
                        id="startDay"
                        name="startDay"
                        type="date"
                        value={formik.values.startDay}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-blue-600" />
                        {prettyDate(data?.startDay)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDay" className="text-[#001a3a]">Tanggal Berakhir</Label>
                    {isEditing ? (
                      <Input
                        id="endDay"
                        name="endDay"
                        type="date"
                        value={formik.values.endDay}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-blue-600" />
                        {prettyDate(data?.endDay)}
                      </div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-[#001a3a]">Jam Mulai</Label>
                    {isEditing ? (
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formik.values.startTime}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        {prettyTime(data?.startTime)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-[#001a3a]">Jam Selesai</Label>
                    {isEditing ? (
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formik.values.endTime}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        {prettyTime(data?.endTime)}
                      </div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label className="text-[#001a3a]">Status</Label>
                    {isEditing ? (
                      <Select
                        value={formik.values.status}
                        onValueChange={(v) => formik.setFieldValue("status", v)}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                          <SelectItem value="ONGOING">ONGOING</SelectItem>
                          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                          <SelectItem value="CANCELED">CANCELED</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2">{data?.status || "-"}</div>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity" className="text-[#001a3a]">Kapasitas Maksimum</Label>
                    {isEditing ? (
                      <Input
                        id="maxCapacity"
                        name="maxCapacity"
                        type="number"
                        min={0}
                        value={String(formik.values.maxCapacity ?? "")}
                        onChange={formik.handleChange}
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2">{data?.maxCapacity ?? "-"}</div>
                    )}
                  </div>


                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description" className="text-[#001a3a]">Deskripsi</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="Ceritakan tentang event kamu…"
                      />
                    ) : (
                      <div className="rounded-lg border bg-white px-3 py-2 whitespace-pre-wrap">
                        {data?.description || "-"}
                      </div>
                    )}
                  </div>
                </div>


                {isEditing && (
                  <div className="mt-6 flex gap-2 md:hidden">
                    <Button type="button" onClick={() => formik.handleSubmit()} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" />
                      Simpan
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        formik.resetForm();
                        clearFile();
                        setIsEditing(false);
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Batal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuthGuard(EditEventPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/organizer/login",
});
