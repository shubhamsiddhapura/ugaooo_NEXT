const connectDB = require("../../../lib/Database");
const { getAllSectionsWithSubsections } = require("../../../Controller/Section");

export default async function handler(req, res) {
  await connectDB(); // 🧠 Ensure DB is connected

  if (req.method === "GET") {
    return getAllSectionsWithSubsections(req, res);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
