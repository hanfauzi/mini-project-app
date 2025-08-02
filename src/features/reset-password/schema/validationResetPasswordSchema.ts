import * as Yup from "yup";

export const validationResetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password required!"),
  newPassword: Yup.string().required("New password required!"),
});
