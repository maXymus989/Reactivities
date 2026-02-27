import { z } from "zod";
import { requiredString } from "../util/util";

export const profileSchema = z.object({
  displayName: requiredString("Display Name"),
  bio: z.string().max(2000, "Bio must be at most 2000 characters").optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
