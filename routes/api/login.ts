import { signIn } from "https://deno.land/x/deno_kv_oauth@v0.3.0/mod.ts";
import { oauth2Client } from "../../lib/kv.ts";

export default async function handleSignIn(request: Request) {
  return await signIn(request, oauth2Client);
}
