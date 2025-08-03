import * as Yup from "yup";

export const validationCreateEventSchema = Yup.object().shape({
  title: Yup.string().required("Time off type is required"),
  startDay: Yup.string().required("Reason is required"),
  endDay: Yup.string().required("Date is required"),
  startTime: Yup.string().required("Date is required"),
  endTime: Yup.string().required("Date is required"),
  category: Yup.string().required("Date is required"),
  location: Yup.string().required("Date is required"),
  description: Yup.string().required("Date is required"),
  maxCapacity: Yup.number().required("Max capacity is required"),
  status: Yup.string().required("Date is required"),
  ticketCategories: Yup.array()
  .of(
    Yup.object().shape({
      name: Yup.string().required("Ticket name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .min(1, "Minimum price is 1")
        .required("Price is required"),
      quota: Yup.number()
        .typeError("quota must be a number")
        .min(1, "Minimum stock is 1")
        .required("quota is required"),
    })
  )
  .min(1, "At least one ticket category is required")
  .required("Ticket categories are required"),
  image: Yup.mixed<File>()
    .required("Image is required")
    .test("fileSize", "Maximum file size is 2MB", (file) => {
      return file && file.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (file) => {
      return (
        file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)
      );
    }),
});

