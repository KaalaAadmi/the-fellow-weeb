import { z } from "zod";

export const AuthCredentialValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password musut be at least 8 characters long." }),
});
export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialValidator>;