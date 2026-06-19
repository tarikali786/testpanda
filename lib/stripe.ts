import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export const PLANS = {
  single: {
    name: "Single Course",
    amount: 4900,
    description: "1 course of your choice — 12 months access",
  },
  bundle: {
    name: "3-Course Bundle",
    amount: 9900,
    description: "3 courses of your choice — 12 months access",
  },
  all_access: {
    name: "All Access",
    amount: 14900,
    description: "All 6 courses — 12 months access",
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export const COURSES = {
  "naplan-year-3":  { name: "NAPLAN Year 3",  amount: 1000 },
  "oc-year-4":      { name: "OC Year 4",       amount: 1500 },
  "naplan-year-5":  { name: "NAPLAN Year 5",   amount: 2000 },
  "selective-year-6": { name: "Selective Year 6", amount: 2500 },
  "naplan-year-7":  { name: "NAPLAN Year 7",   amount: 3000 },
  "naplan-year-9":  { name: "NAPLAN Year 9",   amount: 3500 },
} as const;

export type CourseKey = keyof typeof COURSES;
