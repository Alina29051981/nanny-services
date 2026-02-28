import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
  childAge: yup
    .number()
    .typeError("Child age is required")
    .required("Child age is required"),
  time: yup.string().required("Time is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  parentName: yup.string().required("Parent name is required"),
  comment: yup.string().required("Comment is required"),
});

const form = useForm<FormData>({
  resolver: yupResolver(schema),
});