"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { useFormik } from "formik";
import { withAuthGuard } from "@/hoc/AuthGuard";

import useGetProfile from "../_hooks/useProfile";
import useUpdateProfile, {
  UpdateProfilePayload,
} from "../_hooks/useUpdateProfile";
import { validationUserProfileSchema } from "@/features/user/profile/schema/validationUserProfileSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Save, X, Camera, Upload, Trash2 } from "lucide-react";

function UserProfilePage() {
  const { data } = useGetProfile();
  const { updateProfileMutation } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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


  const avatarSrc = useMemo(() => {
    if (formik.values.imageUrl instanceof File) {
      return URL.createObjectURL(formik.values.imageUrl);
    }
    return data?.imageUrl || "/default-profile.jpg";
  }, [formik.values.imageUrl, data?.imageUrl]);

  const handlePickFile = () => fileInputRef.current?.click();

  const clearSelectedPhoto = () => {
    formik.setFieldValue("imageUrl", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("File harus berupa gambar (png, jpg, jpeg, webp).");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 3MB.");
      return;
    }
    formik.setFieldValue("imageUrl", file);
  };

  return (
    <>
      <Head>
        <title>Akun Saya - TICKLY</title>
      </Head>

      <div className="min-h-screen bg-[#f8fafc]">
        {/* Page header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-[#001a3a]">
                Profile
              </h1>
              <p className="text-sm text-[#335071]">
                Kelola informasi akunmu di sini.
              </p>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-blue-700 font-semibold text-sm bg-white border border-blue-200 shadow hover:bg-blue-50"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => formik.handleSubmit()}
                    className="text-sm text-white font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      formik.resetForm();
                      clearSelectedPhoto();
                    }}
                    variant="destructive"
                    className="text-sm font-semibold"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Batal
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>


        <form
          onSubmit={formik.handleSubmit}
          className="px-4 sm:px-6 lg:px-8 pb-12"
        >
          <div className="grid gap-6 lg:gap-8 md:grid-cols-[320px_1fr]">

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">
                  Foto & Ringkasan
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Image
                      src={avatarSrc}
                      alt="Foto Profil"
                      width={144}
                      height={144}
                      className="h-36 w-36 rounded-full object-cover border-4 border-blue-100 shadow-md bg-white"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handlePickFile}
                        className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-200 shadow hover:bg-blue-50"
                      >
                        <Camera className="h-4 w-4" />
                        Ganti
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-base font-semibold text-[#001a3a]">
                      {data?.firstName || "-"} {data?.lastName || ""}
                    </p>
                    <p className="text-sm text-[#335071]">
                      @{data?.username || "-"}
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePickFile}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={clearSelectedPhoto}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </Button>
                    </div>
                  )}

     
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />

                  <Separator className="my-4" />

                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#335071]">Email</span>
                      <span className="text-sm font-medium text-[#001a3a]">
                        {data?.email || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#335071]">Phone</span>
                      <span className="text-sm font-medium text-[#001a3a]">
                        {data?.phoneNumber || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#335071]">
                        Referral Code
                      </span>
                      <span className="text-sm font-semibold text-blue-700">
                        {data?.referralCode || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">
                  Pengaturan Akun
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>


                  <TabsContent value="profile" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[#001a3a]">
                          {fieldLabels.firstName}
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${
                            formik.touched.firstName && formik.errors.firstName
                              ? "border-red-400"
                              : ""
                          }`}
                          placeholder="Nama depan"
                        />
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <p className="text-xs text-red-500">
                              {formik.errors.firstName}
                            </p>
                          )}
                      </div>

     
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[#001a3a]">
                          {fieldLabels.lastName}
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${
                            formik.touched.lastName && formik.errors.lastName
                              ? "border-red-400"
                              : ""
                          }`}
                          placeholder="Nama belakang"
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                          <p className="text-xs text-red-500">
                            {formik.errors.lastName}
                          </p>
                        )}
                      </div>

    
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-[#001a3a]">
                          {fieldLabels.phoneNumber}
                        </Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                              ? "border-red-400"
                              : ""
                          }`}
                          placeholder="08xxxxxxxxxx"
                        />
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber && (
                            <p className="text-xs text-red-500">
                              {formik.errors.phoneNumber}
                            </p>
                          )}
                      </div>

  
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-[#001a3a]">
                          {fieldLabels.username}
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${
                            formik.touched.username && formik.errors.username
                              ? "border-red-400"
                              : ""
                          }`}
                          placeholder="username"
                        />
                        {formik.touched.username && formik.errors.username && (
                          <p className="text-xs text-red-500">
                            {formik.errors.username}
                          </p>
                        )}
                      </div>

  
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-[#001a3a]">
                          {fieldLabels.email}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${
                            formik.touched.email && formik.errors.email
                              ? "border-red-400"
                              : ""
                          }`}
                          placeholder="you@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-xs text-red-500">
                            {formik.errors.email}
                          </p>
                        )}
                      </div>
                    </div>

       
                    {isEditing && (
                      <div className="mt-6 flex gap-2 md:hidden">
                        <Button
                          type="button"
                          onClick={() => formik.handleSubmit()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Simpan
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            formik.resetForm();
                            clearSelectedPhoto();
                          }}
                          variant="destructive"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Batal
                        </Button>
                      </div>
                    )}
                  </TabsContent>


                  <TabsContent value="security" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border bg-white p-4">
                        <div>
                          <p className="text-sm font-medium text-[#001a3a]">
                            Password
                          </p>
                          <p className="text-sm text-[#335071]">**********</p>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="border-blue-200 hover:bg-blue-50 text-blue-700"
                        >
                          <Link href="/reset-password">Edit Password</Link>
                        </Button>
                      </div>

                      <div className="rounded-lg border bg-white p-4">
                        <p className="text-sm font-medium text-[#001a3a] mb-1">
                          Referral Code
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[#001a3a]">
                            {data?.referralCode || "-"}
                          </p>
                          <Button
                            type="button"
                            variant="secondary"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                            onClick={() => {
                              if (!data?.referralCode) return;
                              navigator.clipboard.writeText(
                                String(data.referralCode)
                              );
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1500); // reset ke normal setelah 1.5 detik
                            }}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuthGuard(UserProfilePage, {
  allowedRoles: ["USER"],
  redirectTo: "/user/login",
});
