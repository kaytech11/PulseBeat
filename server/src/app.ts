import express from 'express';
import cors from 'cors';
// import prisma from './config/prisma'; // temporary import to ensure prisma is initialized
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// app.get ("/users", async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });

app.get('/', (_req, res) => {
    res.send("PulseBeat API running...");
});

export default app;