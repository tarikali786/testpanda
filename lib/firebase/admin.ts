import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// ⚠️ TEMP DEBUG ONLY — revert before committing
const FIREBASE_PROJECT_ID  = "testpanda-8fe4d";
const FIREBASE_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@testpanda-8fe4d.iam.gserviceaccount.com";
const FIREBASE_PRIVATE_KEY  = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpN0ykzuMYetQW\nbMpe6p6y8Fzqqrc9Lfp8HETN52H4bhByUcStaY9Yp3VhlNv1CeuP3Z4gVFEi2Dt/\nknzNiLx9NPEf9WyJ4TcRg7ORZXKlrFho0gQyKruus6ldkoGGHx1/H13isXNnrqyv\nZmKUOuI6eoW4LZmjyPgIUYzJ1i/7Q+Gomzl/SSdAGjX6cJ33GA0ssV+iXRz7/M4g\nc0t1V1C2qAmYpDN2nA6Pr9uek4uKqdYV57K5kOXXCM9RdmieG3u/4gisFdUntq+G\nnyHMmhevfOKOg6P0FcwebtWLPvJX3yxKRNCtww8JJ+a24UusvD6wy49c16IaeDwg\n9jmRk/m/AgMBAAECggEAUEnQQFx3jRxueCtrQ+jvnriEZcXVhp5DvNKO5OGV7xGO\nFSft+VfeL3LZM5E1YkkwL0U4a1+GVdGiPXAMblskEAZoKEFDHBKzlchXEbRAVxJ0\nqluHqSP0hDpzsFW8xh4KWVBRNCf9OWM8RUb/nBRqVdPfkZl1TiyjXxMOiY/qmT2A\nxYL4h8DAFT/G9EXyfd1czEJcINPz6jvEjlOF4sL7H4FM0JOsx6Vsjb/y5WJEcwNe\n8MXP4kVhXN60/W8QWa7rWWpaQKi7bCjpBNv99fDDc0vrlv0AphD6BO6rnGoCTLEi\nvAPdfg7RVhw5+XtZ+8LMWC5BV7D75iJftFxHRc5ZNQKBgQDcaI4iud/RflcbCi/7\nEcridQEwuRjrmpbXVJ3BTek5fARsfWyhKXCrs89lLtcX3csF1eX4Jbo5AQsYoHDO\nzuN6vzfvYmU7W7spOMSxGWhEk/1I9saLHPDh0Q0PmabBULW6HWpdzNqdnlJp5u/k\nBXcnKV/sAWwoajz72XL/ZEM+CwKBgQDEioF1NfNAJWMgcAEXC1I9sWKBJ4NfbbVz\n2Jkp1D1bs1fwr4u3CpX4HcmtbI+jda4H7kQrZ+991Eg+1aP3hCJhZYR7cCL+VeCm\n0BYYi3UoHRrZXjyRI+R9UYmyhaeQd9GYbmv+oAxWp0UKO1959kXPuCtqI+h77DAf\nLpR7XfHnnQKBgQDBpesbf4uyF/qX+z9kq6FBjeNZ14aZmdzlm6Zu6/D5XIjWeOw0\nPKCNexHAqIK6qVdy7Rd8CkmvQ8dn/66dRRCAC/ktDZo7qMCr2wCVSOlfN1bWAFs4\nZlkNTgrXpfvo5OyFdMq7VvzMdwmZmhkykcq6UZPBWw6YA59I9ygeUwzxOQKBgEAS\nezOv29Ycmh04BlLx4OS10EwUipJwnIfgo8XsJ/ieFdwkDmMks1FIvLepvYXnVk3F\nkjmoT33w14CMe0C0tdSUmMT5AJ9zdaJMEff8drwWCOu1+f7C+bkU/NPTGJZTSWPt\nE43VtVAGhc5ZHr4O2CFog9a9UAweKm3v7H3vWW5NAoGARwhxz7duklnplWSWyVP9\n2ODcTV+tAqRyZQAWON4+iOGEumXGF2KfoVkrA7NFooon+Se9u540w0ScqNUmi3vK\n/F02rN24qYz9KHPDKs6jbZn5+aL1AVtvuR8xeOEgN2wgFxoIf3Fz2ODLFG3Dgg7c\n7/5bgN0U+t87qlbvhpJNcoY=\n-----END PRIVATE KEY-----\n`;

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  return initializeApp({
    credential: cert({
      projectId:   FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey:  FIREBASE_PRIVATE_KEY,
    }),
  });
}

const adminApp = getAdminApp();

export const adminAuth = getAuth(adminApp);
export const adminDb   = getFirestore(adminApp);
