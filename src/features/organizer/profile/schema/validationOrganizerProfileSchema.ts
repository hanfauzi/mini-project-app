import * as Yup from "yup";

export const validationOrganizerProfileSchema = Yup.object().shape({
  username: Yup.string().min(6, "Minimal 6 Karakter"),
  email: Yup.string().email(),
  orgName: Yup.string(),
  address: Yup.string(),
  phoneNumber: Yup.string(),
  bio: Yup.string(),
  image: Yup.mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "Ukuran maksimum gambar adalah 5MB",
      (file) => !file || file.size <= 5 * 1024 * 1024
    )
    .test(
      "fileType",
      "Format gambar tidak didukung",
      (file) =>
        !file ||
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file.type
        )
    ),
});
