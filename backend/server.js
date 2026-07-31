const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Smart Email Reply Generator Backend is Running 🚀");
});

// Generate reply
app.post("/generate", (req, res) => {
    const { email, tone } = req.body;

    let replies = [];
    let text = email.toLowerCase();

    if (text.includes("meeting")) {
        replies = [
            "I will attend the meeting as scheduled.",
            "Looking forward to the meeting.",
            "I will be available for the meeting."
        ];
    } 
    else if (text.includes("report")) {
        replies = [
            "I will send the report soon.",
            "The report will be shared shortly.",
            "I am working on the report and will update you soon."
        ];
    } 
    else if (text.includes("deadline")) {
        replies = [
            "I will complete the work before the deadline.",
            "Deadline noted. I will ensure timely completion.",
            "I will make sure to meet the deadline."
        ];
    } 
    else {
        replies = [
            "Thank you for your email. I will get back to you.",
            "I received your message and will respond soon.",
            "Thank you for reaching out. I will reply shortly."
        ];
    }

    // Apply tone
    replies = replies.map(reply => {
        if (tone === "formal") {
            return "Dear Sir/Madam,\n\n" + reply + "\n\nRegards,\nSakshi";
        } 
        else if (tone === "friendly") {
            return "Hi,\n\n" + reply + " 😊\n\nBest regards,\nSakshi";
        } 
        else {
            return "Hello,\n\n" + reply + "\n\nBest regards,\nSakshi";
        }
    });

    res.json({ replies });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});