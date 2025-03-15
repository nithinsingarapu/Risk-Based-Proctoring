require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const DataSchema = new mongoose.Schema({ content: String });
const DataModel = mongoose.model("Data", DataSchema);


app.post('/collect', async (req, res) => {
    try {
        const { content } = req.body;
        const newData = new DataModel({ content });
        await newData.save();
        res.status(200).json({ message: "Data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
