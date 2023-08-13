import Chat from "../islands/Chat.tsx";
import Chatbox from "../islands/Chatbox.tsx";
import { getUser } from "../lib/kv.ts";
import { redirect } from "../lib/util.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);

  if (!user) {
    return redirect("/api/login");
  }

  return (
    <div class="w-full h-screen flex flex-col gap-4 dark:bg-black dark:text-white p-4">
      <Chat />
      <Chatbox />
    </div>
  );
}
