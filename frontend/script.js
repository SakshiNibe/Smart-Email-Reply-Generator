async function generateReply() {

    let email = document.getElementById("email").value;
    let tone = document.getElementById("tone").value;

    if (email.trim() === "") {
        alert("Please enter an email.");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                tone: tone
            })
        });

        const data = await response.json();

        document.getElementById("reply1").innerText = data.replies[0];
        document.getElementById("reply2").innerText = data.replies[1];
        document.getElementById("reply3").innerText = data.replies[2];

    } catch (error) {
        console.log(error);
        alert("Server is not running. Please start server.js");
    }
}

function copyReply(id) {

    let text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text);

    alert("Reply copied!");
}