import axios from "../../../lib/api";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "GET") {
    console.log(req.headers.cookie);
    if (!req.headers.cookie) {
      res.status(403).json({ message: "not authorized" });
    }
    const { token } = cookie.parse(req.headers.cookie);
    if (!token) {
      res.status(403).json({ message: "not authorized" });
    }
    try {
      const response = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.status(200).json({
        user: response.data.username,
        email: response.data.email,
        id: response.data.id,
      });
    } catch (error) {
      return res.status(403).json({ message: "not authorized" });
    }
  }
};
