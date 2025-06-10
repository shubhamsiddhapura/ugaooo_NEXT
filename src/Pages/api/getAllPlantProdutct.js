
const { getAllProductsBySection } = require("../../Controller/Section");

export default function handler(req, res) {
  if (req.method === "POST") {
    return getAllProductsBySection(req, res);
  }
  res.status(405).json({ error: "Only POST supported" });
}
