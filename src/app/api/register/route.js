import { Signup } from "@/Controller/Auth";
import connectDB from "@/lib/Database";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { status, body: responseBody } = await Signup(body);

  return new Response(JSON.stringify(responseBody), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
