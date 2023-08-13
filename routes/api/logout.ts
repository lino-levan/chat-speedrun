import { signOut } from "https://deno.land/x/deno_kv_oauth@v0.3.0/mod.ts";

export default async function handleSignOut(request: Request) {
  return await signOut(request);
}
