const btn = document.getElementById("scrollBtn");
const target = document.getElementById("scroll-button-destination");


window.addEventListener("scroll", () => {
    const rect = target.getBoundingClientRect();

    if (rect.top > window.innerHeight * 0.1) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});


btn.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth" });
});