 import  jwt  from "jsonwebtoken";


export const requireAuth = (req, res, next) => {
  const token = req.cookies.token; // cookie name match ho
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // ✅ role include
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
