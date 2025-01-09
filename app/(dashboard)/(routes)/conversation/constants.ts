// import * as z from "zod";

// export const formSchema = z.object({
//   prompt: z
//     .string()
//     .min(1, { message: "Prompt must be at least 1 character long." })
//     .max(500, { message: "Prompt must not exceed 500 characters." })
//     .transform((val) => val.trim())
//     .refine((val) => val.length > 0, {
//       message: "Prompt cannot be empty after trimming.",
//     }),
// });
