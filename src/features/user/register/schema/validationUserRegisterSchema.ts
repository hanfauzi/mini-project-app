import * as Yup from "yup";

export const validationUserRegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username required!"),
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
  referralCode: Yup.string(),
});
