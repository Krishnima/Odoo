import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


import authRouter from './routes/auth.routes.js'
import itemRoute from './routes/item.routes.js'
import adminRoute from './routes/admin.routes.js'
import swapRoute from './routes/swap.routes.js'

app.use('/api/users', authRouter)
app.use('/api/items', itemRoute)
app.use('/api/admins', adminRoute)
app.use('/api/swaps', swapRoute)


export { app };

