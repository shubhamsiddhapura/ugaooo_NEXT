import dbConnect from '../../lib/Database';
import { getAllProductsBySection } from "../../Controller/Section";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    return await getAllProductsBySection(req, res);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
