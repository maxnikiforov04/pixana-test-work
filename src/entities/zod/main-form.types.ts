import {z} from "zod";

export const MainFormSchema = z.object({
    title:z.string()
        .min(1,'Title is required')
        .max(30,'Too many letters'),
});