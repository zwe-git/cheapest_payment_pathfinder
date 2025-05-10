import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { findCheapestPath } from "./index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("Payment Path API");
});

app.get("/find-path", (_req: Request, res: Response) => {
    const currency = _req.query.currency as "EUR" | "USD";
    const bank = _req.query.bank as string;

    if (!currency || !bank) {
        res.status(400).json({ error: "Missing 'currency' or 'bank' parameter" });
    }

    const result = findCheapestPath("Client", bank, currency);
    res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
