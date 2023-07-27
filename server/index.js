import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import promptRoutes from "./routes/promptRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// check for cors
app.use(cors({
  origin: '*', 
  methods: "*" 
}));

// Uso de rutas con los nombres correctos
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/prompts", promptRoutes);

// Conexión a la base de datos con manejo de errores
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Middleware para manejo de errores, con el orden corregido
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  connect();
  console.log("Connected to backend");
  console.log("Listening on port 3000");
});
