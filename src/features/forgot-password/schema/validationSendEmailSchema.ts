import * as Yup from "yup";

export const validationSendEmailSchema = Yup.object().shape({
  email: Yup.string().required("Email is required!").email(),
});
