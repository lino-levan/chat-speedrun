import { EventSink } from "https://deno.land/x/event_sink@v2.0.0/mod.ts";
import { Handlers } from "$fresh/server.ts";
import { getUser, kv } from "../../lib/kv.ts";
import { KVMessage, snowflake } from "../../lib/util.ts";

const channel = new BroadcastChannel("messages");

const sinks: EventSink[] = [];

async function publishMessage(msg: string) {
  for (const sink of sinks) {
    try {
      await sink.dispatchEvent(msg, "message");
    } catch {
      const index = sinks.indexOf(sink);
      sinks.splice(index, 1);
    }
  }
}

channel.onmessage = (event) => {
  publishMessage(event.data);
};

export const handler: Handlers = {
  GET() {
    const sink = new EventSink();
    sinks.push(sink);
    return sink.getResponse();
  },
  async POST(req) {
    const user = await getUser(req);
    if (!user) return new Response("no oauth bozo");

    const body = await req.text();

    const kvMessage: KVMessage = {
      id: snowflake(),
      name: user.name,
      tag: user.id === 11367844 ? "ADMIN" : "NEW_USER",
      avatar: user.avatar_url,
      message: body,
    };

    await kv.set(["rooms", "global", kvMessage.id], kvMessage);

    await publishMessage(JSON.stringify(kvMessage));
    channel.postMessage(JSON.stringify(kvMessage));

    return new Response(null);
  },
};
