import { z } from "zod";

export const eventFormSchema = z.object({
  name: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  maxTeams: z.coerce.number().int().min(1, {
    message: "Team limit must be at least 1.",
  }),
  maxTeamMembers: z.coerce.number().int().min(1, {
    message: "Participants per team must be at least 1.",
  }),
  registrationDeadline: z
    .date({
      required_error: "Registration deadline is required.",
    })
    .min(new Date(), {
      message: "Registration deadline must be in the future.",
    }),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
