export function redirect(location: string) {
  return new Response(null, {
    headers: {
      location,
    },
    status: 302, // status code: found
  });
}

export type Snowflake = number;

export function snowflake(): Snowflake {
  const timestamp = Math.floor(Date.now());
  // const random = BigInt(Math.floor(Math.random() * 65536)); // 2^16
  return timestamp;
}

export interface KVMessage {
  id: Snowflake;
  tag: string;
  name: string;
  message: string;
  avatar: string;
}
