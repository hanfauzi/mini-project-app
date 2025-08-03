import * as Yup from "yup";

export const validationNewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required!"),
});
