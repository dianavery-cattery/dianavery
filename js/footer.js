// Gmail Copy Clipboard
const email = "dianaverycattery@gmail.com";

function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}