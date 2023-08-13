import {
  handleCallback,
} from "https://deno.land/x/deno_kv_oauth@v0.3.0/mod.ts";
import { oauth2Client } from "../../lib/kv.ts";

export default async function handleOAuth2Callback(request: Request) {
  const { response } = await handleCallback(request, oauth2Client);
  return response;
}
