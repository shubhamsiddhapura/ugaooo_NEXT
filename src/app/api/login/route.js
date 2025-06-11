// src/app/api/login/route.js
import { Login } from "@/Controller/Auth";
import connectDB from "@/lib/Database";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { status, body: resBody } = await Login(body);

  return new Response(JSON.stringify(resBody), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
