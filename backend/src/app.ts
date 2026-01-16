import express from "express";
import cors from "cors";
import path from "path";

import documentRoutes from "./routes/document.routes";
import requestRoutes from "./routes/request.routes";
import contactRoutes from "./routes/contact.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", requestRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin", adminRoutes);



app.use(
  "/documents",
  express.static(path.join(__dirname, "../uploads/documents"))
);
app.use("/api/documents", documentRoutes);


app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
