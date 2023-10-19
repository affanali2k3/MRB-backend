import * as admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";
import { Auth } from "firebase-admin/lib/auth/auth";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const auth: Auth = admin.auth();

export default auth;
