import type { SupabaseClient } from "@supabase/supabase-js";

export type DbUser = {
  id: string;
  email: string;
  name: string;
  photo_url: string;
  created_at: string;
  role: string;
  is_verified: boolean;
};

export type Trial = {
  id: string;
  user_id: string;
  started_at: string;
  expires_at: string;
  is_active: boolean;
};

export type Subscription = {
  id: string;
  user_id: string;
  course_id: string;
  stripe_session_id: string;
  amount: number;
  purchased_at: string;
  valid_until: string;
  drive_access_granted: boolean;
};

export async function getUser(supabase: SupabaseClient, id: string): Promise<DbUser | null> {
  const { data } = await supabase.from("users").select("*").eq("id", id).single();
  return data ?? null;
}

export async function createUser(
  supabase: SupabaseClient,
  user: { id: string; email: string; name: string; photo_url: string; is_verified?: boolean }
): Promise<void> {
  await supabase.from("users").insert(user);
}

export async function setUserVerified(supabase: SupabaseClient, id: string): Promise<void> {
  await supabase.from("users").update({ is_verified: true }).eq("id", id);
}

export async function getTrial(supabase: SupabaseClient, id: string): Promise<Trial | null> {
  const { data } = await supabase.from("trials").select("*").eq("user_id", id).single();
  return data ?? null;
}

export async function createTrial(supabase: SupabaseClient, id: string): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  await supabase.from("trials").insert({ user_id: id, expires_at: expiresAt.toISOString() });
}

export function getTrialDaysLeft(trial: Trial): number {
  const diff = new Date(trial.expires_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export async function getUserSubscriptions(supabase: SupabaseClient, id: string): Promise<Subscription[]> {
  const { data } = await supabase.from("subscriptions").select("*").eq("user_id", id);
  return data ?? [];
}
