const connectDB = require("../../lib/Database");
const { Login } = require("../../Controller/Auth");

export default async function handler(req, res) {
  await connectDB(); // 🧠 Ensure DB is connected

  if (req.method === "POST") {
    return Login(req, res);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
