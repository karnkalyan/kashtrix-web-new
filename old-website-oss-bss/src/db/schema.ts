import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  workEmail: varchar("work_email", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 100 }),
  country: varchar("country", { length: 100 }),
  providerType: varchar("provider_type", { length: 100 }),
  subscriberRange: varchar("subscriber_range", { length: 100 }),
  interestedModules: text("interested_modules"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  department: varchar("department", { length: 100 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("received").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  action: varchar("action", { length: 255 }).notNull(),
  targetDevice: varchar("target_device", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  details: text("details"),
  performedBy: varchar("performed_by", { length: 100 }).default("AI Automation Agent"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
