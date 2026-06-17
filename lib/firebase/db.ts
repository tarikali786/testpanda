import { adminDb } from "./admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserRecord {
  uid:       string;
  email:     string;
  name:      string;
  photoURL:  string;
  createdAt: FirebaseFirestore.Timestamp;
  role:      "user" | "admin";
}

export interface TrialRecord {
  userId:    string;
  startedAt: FirebaseFirestore.Timestamp;
  expiresAt: FirebaseFirestore.Timestamp;
  isActive:  boolean;
}

export interface SubscriptionRecord {
  id:                 string;
  userId:             string;
  courseId:           string;
  stripeSessionId:    string;
  amount:             number;
  purchasedAt:        FirebaseFirestore.Timestamp;
  validUntil:         FirebaseFirestore.Timestamp;
  driveAccessGranted: boolean;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUser(uid: string): Promise<UserRecord | null> {
  const snap = await adminDb.collection("users").doc(uid).get();
  return snap.exists ? (snap.data() as UserRecord) : null;
}

export async function createUser(data: {
  uid:      string;
  email:    string;
  name:     string;
  photoURL: string;
}): Promise<void> {
  await adminDb.collection("users").doc(data.uid).set({
    ...data,
    role:      "user",
    createdAt: FieldValue.serverTimestamp(),
  });
}

// ─── Trials ───────────────────────────────────────────────────────────────────

export async function getTrial(userId: string): Promise<TrialRecord | null> {
  const snap = await adminDb.collection("trials").doc(userId).get();
  return snap.exists ? (snap.data() as TrialRecord) : null;
}

export async function createTrial(userId: string): Promise<void> {
  const startedAt = new Date();
  const expiresAt = new Date(startedAt);
  expiresAt.setDate(expiresAt.getDate() + 30);

  await adminDb.collection("trials").doc(userId).set({
    userId,
    startedAt: FieldValue.serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
    isActive:  true,
  });
}

export function getTrialDaysLeft(trial: TrialRecord): number {
  const now     = new Date();
  const expires = trial.expiresAt.toDate();
  const diff    = expires.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

export async function getUserSubscriptions(userId: string): Promise<SubscriptionRecord[]> {
  const snap = await adminDb
    .collection("subscriptions")
    .where("userId", "==", userId)
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as SubscriptionRecord));
}
