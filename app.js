import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const data = JSON.parse(fs.readFileSync("./data.json"));

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());

app.put("/highlevel", (req, res) => {
    if (+req.body.highlevel > +data.highlevel) {
        data.highlevel = req.body.highlevel;
        fs.writeFileSync("./data.json", JSON.stringify(data));
        res.json({
            status: "success",
            message: "new highlevel set",
            highlevel: data.highlevel,
        });
    } else {
        res.json({
            status: "success",
            message: "not a highlevel",
            yourlevel: req.body.highlevel,
            highlevel: data.highlevel,
        });
    }
});

app.get("/highlevel", (_req, res) => {
    res.json(data);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
