export default function Chatbox() {
  return (
    <input
      placeholder="Message in global chatroom"
      class="w-full rounded-lg px-4 py-3 outline-none bg-gray-200 dark:bg-gray-800"
      onKeyUp={async (e) => {
        const input = e.currentTarget;

        if (e.key === "Enter") {
          await fetch("/api/message", {
            method: "POST",
            body: input.value,
          });
          input.value = "";
        }
      }}
    />
  );
}
