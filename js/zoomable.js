// Attach modal trigger to all viewable images
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".viewable-img");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    images.forEach(img => {
        img.addEventListener("click", () => {
            modalImg.src = img.src;
            modal.classList.add("show");
        });
    });
});

function closeModal(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    document.getElementById("imageModal").classList.remove("show");
}