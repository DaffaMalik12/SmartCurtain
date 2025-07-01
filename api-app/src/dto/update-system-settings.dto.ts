import { z } from 'zod';

export const UpdateSystemSettingsSchema = z.object({
  open_hour: z.number(),
  open_minute: z.number(),
  open_second: z.number(),
  close_hour: z.number(),
  close_minute: z.number(),
  close_second: z.number(),
  status: z.boolean(),
});

export type UpdateSystemSettingsDto = z.infer<
  typeof UpdateSystemSettingsSchema
>;
