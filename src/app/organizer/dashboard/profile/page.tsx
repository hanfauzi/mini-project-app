"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { withAuthGuard } from "@/hoc/AuthGuard";

import { validationOrganizerProfileSchema } from "@/features/organizer/profile/schema/validationOrganizerProfileSchema";
import useGetOrganizerProfile from "../../_hooks/useProfile";
import useUpdateProfileOrganizer, { UpdateProfileOrganizer } from "../../_hooks/useUpdateProfile";
import { useOrganizerReviews } from "../../_hooks/useOrganizerReview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Pencil, Save, X, Camera, Upload, Trash2,
  MapPin, Phone, AtSign, Star
} from "lucide-react";

function OrganizerProfilePage() {
  const { data } = useGetOrganizerProfile();
  const { updateProfileOrganizerMutation } = useUpdateProfileOrganizer();
  const { data: reviewData, isLoading: loadingReviews } = useOrganizerReviews(data?.id || "");

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fieldLabels: Record<keyof UpdateProfileOrganizer, string> = {
    orgName: "Organizer Name",
    address: "Address",
    phoneNumber: "Phone Number",
    bio: "Bio",
    username: "Username",
    email: "Email",
    logoUrl: "Logo",
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

  const avatarSrc = useMemo(() => {
    if (formik.values.logoUrl instanceof File) {
      return URL.createObjectURL(formik.values.logoUrl);
    }
    return data?.logoUrl || "/default-profile.jpg";
  }, [formik.values.logoUrl, data?.logoUrl]);


  useEffect(() => {
    if (!(formik.values.logoUrl instanceof File)) return;
    const url = avatarSrc;
    return () => {
      try {
        URL.revokeObjectURL(url as string);
      } catch {}
    };
  }, [avatarSrc, formik.values.logoUrl]);

  const handlePickFile = () => fileInputRef.current?.click();

  const clearSelectedPhoto = () => {
    formik.setFieldValue("logoUrl", null);
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
    formik.setFieldValue("logoUrl", file);
  };

  return (
    <>
      <Head>
        <title>Organizer Profile - TICKLY</title>
      </Head>

      <div className="min-h-screen bg-[#f8fafc]">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-[#001a3a]">Organizer Profile</h1>
              <p className="text-sm text-[#335071]">Kelola identitas brand, kontak, dan profil publik organisermu.</p>
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

        <form onSubmit={formik.handleSubmit} className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid gap-6 lg:gap-8 md:grid-cols-[320px_1fr]">
            {/* Left card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">Brand Overview</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Image
                      src={avatarSrc}
                      alt="Organizer Logo"
                      width={144}
                      height={144}
                      className="h-36 w-36 rounded-full object-cover border-4 border-blue-100 shadow-md bg-white"
                    />


                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={onFileChange}
                    />

                    {isEditing && (
                      <button
                        type="button"
                        onClick={handlePickFile}
                        className="absolute -bottom-2 -right-2 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-200 shadow hover:bg-blue-50"
                      >
                        <Camera className="h-4 w-4" />
                        Ganti
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-base font-semibold text-[#001a3a]">
                      {data?.orgName || "-"}
                    </p>
                    <p className="text-sm text-[#335071]">@{data?.username || "-"}</p>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
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

                  <Separator className="my-4" />

                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-2 text-[#335071]">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {data?.address || <span className="italic text-slate-500">No address</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#335071]">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{data?.phoneNumber || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#335071]">
                      <AtSign className="h-4 w-4" />
                      <span className="text-sm">{data?.email || "-"}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-semibold">
                          {reviewData?.averageRating?.toFixed(1) ?? "-"} / 5
                        </span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        {reviewData?.totalReviews ?? 0} reviews
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#001a3a]">Pengaturan Organizer</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="orgName" className="text-[#001a3a]">
                          {fieldLabels.orgName}
                        </Label>
                        <Input
                          id="orgName"
                          name="orgName"
                          type="text"
                          value={formik.values.orgName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${formik.touched.orgName && formik.errors.orgName ? "border-red-400" : ""}`}
                          placeholder="Nama organizer"
                        />
                        {formik.touched.orgName && formik.errors.orgName && (
                          <p className="text-xs text-red-500">{formik.errors.orgName}</p>
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
                          className={`${formik.touched.username && formik.errors.username ? "border-red-400" : ""}`}
                          placeholder="username"
                        />
                        {formik.touched.username && formik.errors.username && (
                          <p className="text-xs text-red-500">{formik.errors.username}</p>
                        )}
                      </div>

                      <div className="space-y-2">
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
                          className={`${formik.touched.email && formik.errors.email ? "border-red-400" : ""}`}
                          placeholder="you@brand.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-xs text-red-500">{formik.errors.email}</p>
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
                          className={`${formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-400" : ""}`}
                          placeholder="08xxxxxxxxxx"
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                          <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-[#001a3a]">
                          {fieldLabels.address}
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${formik.touched.address && formik.errors.address ? "border-red-400" : ""}`}
                          placeholder="Alamat kantor / operasional"
                          rows={3}
                        />
                        {formik.touched.address && formik.errors.address && (
                          <p className="text-xs text-red-500">{formik.errors.address}</p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio" className="text-[#001a3a]">
                          {fieldLabels.bio}
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formik.values.bio}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                          className={`${formik.touched.bio && formik.errors.bio ? "border-red-400" : ""}`}
                          placeholder="Deskripsi singkat brand, niche event, keunggulan, dsb."
                          rows={4}
                        />
                        {formik.touched.bio && formik.errors.bio && (
                          <p className="text-xs text-red-500">{formik.errors.bio}</p>
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
                          <p className="text-sm font-medium text-[#001a3a]">Password</p>
                          <p className="text-sm text-[#335071]">**********</p>
                        </div>
                        <Button asChild variant="outline" className="border-blue-200 hover:bg-blue-50 text-blue-700">
                          <Link href="/reset-password">Edit Password</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    {loadingReviews ? (
                      <p className="text-sm text-[#335071]">Loading reviews...</p>
                    ) : !reviewData?.reviews?.length ? (
                      <p className="text-sm italic text-slate-500">No reviews yet.</p>
                    ) : (
                      <div className="space-y-4">
                        <div className="mb-2">
                          <p className="text-yellow-500 font-semibold">
                            Rating: ⭐ {reviewData?.averageRating?.toFixed(1) ?? "-"} / 5
                          </p>
                          <p className="text-sm text-gray-500">
                            Total Reviews: {reviewData?.totalReviews}
                          </p>
                        </div>

                        <ul className="space-y-4">
                          {reviewData.reviews.map((review: any) => (
                            <li key={review.id} className="rounded-lg border border-gray-200 p-4">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">
                                    {review.user?.firstName || review.user?.username}
                                  </span>{" "}
                                  on <span className="italic">{review.event?.title}</span>
                                </p>
                                <span className="text-yellow-500">⭐ {review.rating}</span>
                              </div>
                              <p className="mt-2 text-gray-800">{review.comment}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default withAuthGuard(OrganizerProfilePage, {
  allowedRoles: ["ORGANIZER"], redirectTo: "/organizer/login",
});
