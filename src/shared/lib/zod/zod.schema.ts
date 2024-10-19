import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TaskSchema = z.object({
    title: z.string().min(1).max(30),
    password: z.string().min(3).max(150),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
