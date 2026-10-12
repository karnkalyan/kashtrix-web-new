import { z } from "zod";

export const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  workEmail: z.string().email("Please enter a valid work email."),
  companyName: z.string().min(2, "Company name is required."),
  phoneNumber: z.string().optional(),
  country: z.string().min(2, "Please select or type your country."),
  providerType: z.string().min(1, "Please select provider type."),
  subscriberRange: z.string().min(1, "Please select your subscriber range."),
  interestedModules: z.array(z.string()).min(1, "Select at least one module of interest."),
  message: z.string().optional(),
});

export type DemoRequestFormValues = z.infer<typeof demoRequestSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  department: z.string().min(1, "Please select department."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
