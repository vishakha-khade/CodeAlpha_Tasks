const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = [...document.querySelectorAll(".gallery-item")];

const searchInput = document.getElementById("searchInput");
const photoCount = document.getElementById("photo-count");
const noResults = document.getElementById("noResults");

const preview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const previewCaption = document.getElementById("previewCaption");

const closeButton = document.querySelector(".close-preview");
const previousButton = document.querySelector(".preview-nav.prev");
const nextButton = document.querySelector(".preview-nav.next");

let selectedCategory = "all";
let currentImageIndex = 0;

// Filter and search images
function updateGallery() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    galleryItems.forEach(function(item) {
        const category = item.dataset.category;
        const title = item.querySelector("h3").textContent.toLowerCase();
        const imageAlt = item.querySelector("img").alt.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" || category === selectedCategory;

        const matchesSearch =
            title.includes(searchText) ||
            category.includes(searchText) ||
            imageAlt.includes(searchText);

        const isVisible = matchesCategory && matchesSearch;

        item.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    photoCount.textContent =
        visibleCount + (visibleCount === 1 ? " Photo" : " Photos");

    noResults.hidden = visibleCount !== 0;
}

// Filter button clicks
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        updateGallery();
    });
});

// Search photos
searchInput.addEventListener("input", updateGallery);

// Get the currently visible images
function getVisibleItems() {
    return galleryItems.filter(function(item) {
        return !item.hidden;
    });
}

// Open image preview
function openPreview(item) {
    const visibleItems = getVisibleItems();

    currentImageIndex = visibleItems.indexOf(item);

    if (currentImageIndex === -1) {
        return;
    }

    showCurrentImage();
    preview.classList.add("show");
    preview.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
}

// Display selected image
function showCurrentImage() {
    const visibleItems = getVisibleItems();

    if (visibleItems.length === 0) {
        closePreview();
        return;
    }

    if (currentImageIndex < 0) {
        currentImageIndex = visibleItems.length - 1;
    }

    if (currentImageIndex >= visibleItems.length) {
        currentImageIndex = 0;
    }

    const item = visibleItems[currentImageIndex];
    const image = item.querySelector("img");
    const title = item.querySelector("h3").textContent;

    previewImage.src = image.src;
    previewImage.alt = image.alt;
    previewCaption.textContent =
        title + " — " + item.dataset.category;
}

// Close preview
function closePreview() {
    preview.classList.remove("show");
    preview.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Navigate images
function showNextImage() {
    currentImageIndex++;
    showCurrentImage();
}

function showPreviousImage() {
    currentImageIndex--;
    showCurrentImage();
}

// Attach click events to gallery images
galleryItems.forEach(function(item) {
    item.addEventListener("click", function() {
        openPreview(item);
    });
});

closeButton.addEventListener("click", closePreview);

nextButton.addEventListener("click", showNextImage);

previousButton.addEventListener("click", showPreviousImage);

// Close preview by clicking the dark background
preview.addEventListener("click", function(event) {
    if (event.target === preview) {
        closePreview();
    }
});

// Keyboard controls
document.addEventListener("keydown", function(event) {
    if (!preview.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closePreview();
    } else if (event.key === "ArrowRight") {
        showNextImage();
    } else if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});

// Initial gallery count
updateGallery();