"use client";
import { useForm } from "react-hook-form";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "./ui/field";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters!" })
    .max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  location: z.string().min(2),
  role: z.enum(["admin", "user"]),
});

const EditUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "ruhul-amin-sharif",
      email: "test@gmail.com",
      phone: "+88 018 XXXXXXXX",
      location: "BD",
      role: "admin",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const roleValue = watch("role");

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Edit User</SheetTitle>
        <SheetDescription
          render={
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FieldGroup>
                <Field data-invalid={!!errors.username}>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" {...register("username")} />
                  <FieldDescription>
                    This is your public username.
                  </FieldDescription>
                  {errors.username && (
                    <FieldError>{errors.username.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" {...register("email")} />
                  <FieldDescription>
                    Only admin can see your email.
                  </FieldDescription>
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.phone}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input id="phone" {...register("phone")} />
                  <FieldDescription>
                    Only admin can see your phone number.
                  </FieldDescription>
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.location}>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input id="location" {...register("location")} />
                  <FieldDescription>
                    This is the public location.
                  </FieldDescription>
                  {errors.location && (
                    <FieldError>{errors.location.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.role}>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Select
                    value={roleValue}
                    onValueChange={(value) =>
                      setValue("role", value as "admin" | "user", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Only verified users can be admin.
                  </FieldDescription>
                  {errors.role && (
                    <FieldError>{errors.role.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>

              <Button type="submit">Submit</Button>
            </form>
          }
        ></SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditUser;
