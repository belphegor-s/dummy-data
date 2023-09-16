import { config } from "dotenv";
config();
const PORT = process.env?.PORT ?? 8080;

import express, { Request, Response } from "express";
import rootRoutes from "./routes/root";

declare global {
    namespace Express {
        interface Request {
            rawBody?: Buffer | string;
        }
    }
}

const app = express();

app.use(express.json({
    verify: (req: Request, res: Response, buffer: Buffer) => (req['rawBody'] = buffer),
}))

app.get('/', (req, res) => {
    res.send('Server is live 🍵');
});
app.use('/api/v1/', rootRoutes);

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
