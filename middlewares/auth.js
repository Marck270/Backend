// middlewares/auth.js
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

export const adminRequired = (req, res, next) => {
  if (req.user?.tipo !== 'admin') {
    return res.status(403).json({ msg: 'Se requieren permisos de administrador' });
  }
  next();
};