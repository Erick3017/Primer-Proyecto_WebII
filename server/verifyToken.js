import jwt from "jsonwebtoken";

// Middleware para verificar el token de autenticación
export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  // Verificar si existe el encabezado de autorización
  if (!authorizationHeader) {
    return res.status(401).json("No estás autenticado!");
  }

  const token = authorizationHeader.split(' ')[1];

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json("No estás autenticado!");
  }

  // Verificar el token utilizando jwt.verify
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(403).json("El token no es válido!");
    }
    req.user = user;
    next(); // Continuar con el siguiente middleware o controlador
  });
};

// Middleware para verificar autorización de usuarios y administradores
export const verifyAuthorization = (req, res, next) => {
  // Verificar el token de autenticación
  verifyToken(req, res, () => {
    const userId = req.params.id;
    const isAdmin = req.user.isAdmin;

    // Verificar si el usuario es un administrador o si el ID del usuario solicitado coincide con el ID del usuario del token
    if (isAdmin || (userId && req.user.id === userId)) {
      next(); // Continuar con el siguiente middleware o controlador
    } else {
      return res.status(403).json("No estás autorizado!");
    }
  });
};
