/// <reference lib="deno.unstable" />

import {
  createGitHubOAuth2Client,
  getSessionAccessToken,
  getSessionId,
} from "https://deno.land/x/deno_kv_oauth@v0.3.0/mod.ts";

export const oauth2Client = createGitHubOAuth2Client();

export const kv = await Deno.openKv();

export interface GithubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
}

async function getGitHubUser(accessToken: string): Promise<GithubUser> {
  const response = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return await response.json();
}

export async function getUser(request: Request): Promise<GithubUser | null> {
  const sessionId = getSessionId(request);
  const hasSessionIdCookie = sessionId !== undefined;

  if (!hasSessionIdCookie) return null;

  const accessToken = await getSessionAccessToken(oauth2Client, sessionId);
  if (accessToken === null) return null;

  try {
    return await getGitHubUser(accessToken);
  } catch {
    return null;
  }
}
