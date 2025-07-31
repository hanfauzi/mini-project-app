import * as Yup from "yup";

export const validationOrganizerLoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email required!"),
  password: Yup.string().required("Password is required!"),
});
