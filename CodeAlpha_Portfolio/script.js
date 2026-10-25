// 1. Smooth scrolling for navigation links
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
link.addEventListener("click", function (event) {
const targetId = link.getAttribute("href");

if (!targetId || !targetId.startsWith("#")) return;

const targetSection = document.querySelector(targetId);

if (targetSection) {
  event.preventDefault();
  targetSection.scrollIntoView({
    behavior: "smooth",
  });
}


});
});

// 2. Automatically update footer year
const footer = document.querySelector("footer p");

if (footer) {
footer.innerHTML = `&copy; ${new Date().getFullYear()} Vishakha Khade. Built with HTML, CSS and JavaScript.`;
}

// 3. Cursor-following glow
const glow = document.querySelector(".cursor-glow");

if (glow) {
document.addEventListener("mousemove", function (event) {
glow.style.left = event.clientX + "px";
glow.style.top = event.clientY + "px";
});
}

// 4. Show sections when they enter the screen
const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
const observer = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
}
});
},
{ threshold: 0.15 }
);

sections.forEach(function (section) {
observer.observe(section);
});
} else {
sections.forEach(function (section) {
section.classList.add("visible");
});
}

// 5. Robot image follows the cursor reveal
const avatar = document.getElementById("avatarContainer");
const robot = document.getElementById("robotImage");

if (avatar && robot) {
avatar.addEventListener("mousemove", function (event) {
const rect = avatar.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;


robot.style.setProperty("--x", `${x}px`);
robot.style.setProperty("--y", `${y}px`);


});

avatar.addEventListener("mouseleave", function () {
robot.style.setProperty("--x", "-200px");
robot.style.setProperty("--y", "-200px");
});
}

const robotSound = document.getElementById("robotSound");
/* 6. Scan automatically when the website opens */
if (avatar) {
  let scanStarted = false;

  function startRobotScan() {
    if (scanStarted) return;
    scanStarted = true;

    avatar.classList.add("scanning");

    setTimeout(function () {
      avatar.classList.remove("scanning");
    }, 1800);
  }

  window.addEventListener("load", function () {
    setTimeout(startRobotScan, 500);
  });
}

// 7. Play scanning audio only while hovering
if (robotSound && avatar) {
  robotSound.volume = 0.2;
  robotSound.loop = true;

  avatar.addEventListener("mouseenter", function () {
    robotSound.currentTime = 0;

    robotSound.play().catch(function (error) {
      console.log("Audio playback failed:", error);
    });
  });

  avatar.addEventListener("mouseleave", function () {
    robotSound.pause();
    robotSound.currentTime = 0;
  });
}
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾ Dark" : "☼ Light";
}

updateThemeButton();

// Toggle theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", theme);

    updateThemeButton();
});