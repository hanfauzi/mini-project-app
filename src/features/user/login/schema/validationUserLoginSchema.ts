import * as Yup from "yup";

export const validationUserLoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email required!"),
  password: Yup.string().required("Password is required!"),
});
