import { signal } from "@preact/signals";
import { KVMessage } from "../lib/util.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

function Message(
  props: { tag: string; name: string; message: string; avatar: string },
) {
  return (
    <div class="flex gap-4">
      <img src={props.avatar} class="w-12 h-12 rounded-full"></img>
      <div>
        <p>
          <span class="text-red-500">[{props.tag}]</span> {props.name}
        </p>
        <p class="text-gray-800 dark:text-gray-300">
          {props.message}
        </p>
      </div>
    </div>
  );
}

const chat = signal<KVMessage[]>([]);

if (IS_BROWSER) {
  const eventSource = new EventSource("/api/message");

  eventSource.addEventListener("message", (e) => {
    if (e.type === "message") {
      const message = JSON.parse(e.data);
      chat.value = [
        ...chat.value,
        message,
      ];
    }
  });
}

export default function Chat() {
  return (
    <div class="flex-grow flex flex-col gap-4">
      {chat.value.map((msg) => (
        <Message
          tag={msg.tag}
          name={msg.name}
          message={msg.message}
          avatar={msg.avatar}
        />
      ))}
    </div>
  );
}
