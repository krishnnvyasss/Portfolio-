/*=========================================================
            PORTFOLIO JAVASCRIPT
            PART 1
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
            DOM ELEMENTS
    ==========================================*/

    const loader = document.getElementById("loader");

    const themeToggle = document.getElementById("themeToggle");

    const body = document.body;

    const hamburger = document.querySelector(".hamburger");

    const mobileMenu = document.querySelector(".mobile-menu");

    const progressBar = document.querySelector(".progress-bar");

    const navbar = document.querySelector(".navbar");



    /*==========================================
            LOADER
    ==========================================*/

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        }, 1200);

    });



    /*==========================================
            THEME
    ==========================================*/

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {

        body.classList.remove("light", "dark");

        body.classList.add(savedTheme);

    }

    else {

        body.classList.add("dark");

    }



    /*==========================================
            UPDATE THEME ICON
    ==========================================*/

    function updateThemeIcons() {

        const sun = themeToggle.querySelector(".fa-sun");

        const moon = themeToggle.querySelector(".fa-moon");

        if (body.classList.contains("dark")) {

            sun.style.opacity = "1";
            moon.style.opacity = ".35";

        }

        else {

            sun.style.opacity = ".35";
            moon.style.opacity = "1";

        }

    }

    updateThemeIcons();



    /*==========================================
            THEME BUTTON
    ==========================================*/

    themeToggle.addEventListener("click", () => {

        if (body.classList.contains("dark")) {

            body.classList.remove("dark");

            body.classList.add("light");

            localStorage.setItem("portfolio-theme", "light");

        }

        else {

            body.classList.remove("light");

            body.classList.add("dark");

            localStorage.setItem("portfolio-theme", "dark");

        }

        updateThemeIcons();

    });



    /*==========================================
            MOBILE MENU
    ==========================================*/

    hamburger.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        hamburger.classList.toggle("active");

    });



    /*==========================================
            CLOSE MENU WHEN CLICKING A LINK
    ==========================================*/

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            hamburger.classList.remove("active");

        });

    });



    /*==========================================
            SCROLL PROGRESS BAR
    ==========================================*/

    function updateProgressBar() {

        const scrollTop = window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = progress + "%";

    }



    /*==========================================
            NAVBAR EFFECT
    ==========================================*/

    function navbarScrollEffect() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        }

        else {

            navbar.classList.remove("scrolled");

        }

    }



    /*==========================================
            SCROLL EVENTS
    ==========================================*/

    window.addEventListener("scroll", () => {

        updateProgressBar();

        navbarScrollEffect();

    });



    updateProgressBar();

    navbarScrollEffect();



    /*==========================================
            SMOOTH SECTION SCROLL
    ==========================================*/

    const allLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    allLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#")
                return;

            const target = document.querySelector(targetId);

            if (!target)
                return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

});
/*=========================================================
                SCROLL REVEAL
=========================================================*/

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {

        threshold:0.15

    }

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});



/*=========================================================
                COUNTER ANIMATION
=========================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries, observer)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const counter = entry.target;

                const target = +counter.dataset.target;

                let current = 0;

                const increment = target / 80;

                const updateCounter = ()=>{

                    current += increment;

                    if(current < target){

                        counter.innerText = Math.ceil(current);

                        requestAnimationFrame(updateCounter);

                    }

                    else{

                        counter.innerText = target + "+";

                    }

                };

                updateCounter();

                observer.unobserve(counter);

            }

        });

    },

    {

        threshold:0.6

    }

);

counters.forEach(counter=>{

    counterObserver.observe(counter);

});



/*=========================================================
                SKILL BAR ANIMATION
=========================================================*/

const progressBars = document.querySelectorAll(".progress-fill");

const progressObserver = new IntersectionObserver(

    (entries, observer)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const bar = entry.target;

                bar.style.width = bar.dataset.width;

                observer.unobserve(bar);

            }

        });

    },

    {

        threshold:0.5

    }

);

progressBars.forEach(bar=>{

    progressObserver.observe(bar);

});



/*=========================================================
                TYPING ANIMATION
=========================================================*/

const typingElement = document.getElementById("typing-text");

const typingWords = [

    "with purpose and precision.",

    "for practical innovation.",

    "beyond prototypes into real solutions.",

    "that solves real problems.",

    "drives innovation."

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;



function typeEffect(){

    const currentWord = typingWords[wordIndex];

    if(!deleting){

        typingElement.textContent = currentWord.substring(0,charIndex+1);

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(typeEffect,2000);

            return;

        }

    }

    else{

        typingElement.textContent = currentWord.substring(0,charIndex-1);

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= typingWords.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 40 : 90);

}

typeEffect();



/*=========================================================
                SECTION ACTIVE LINK
=========================================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 180;

        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
/*=========================================================
                CURSOR GLOW
=========================================================*/

const cursorGlow = document.querySelector(".cursor-glow");

if (window.innerWidth > 768 && cursorGlow) {

    document.addEventListener("mousemove", (e) => {

        requestAnimationFrame(() => {

            cursorGlow.style.left = e.clientX + "px";
            cursorGlow.style.top = e.clientY + "px";

        });

    });

}


/*=========================================================
                BACK TO TOP BUTTON
=========================================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/*=========================================================
                SIMPLE FLOATING PARTICLES
=========================================================*/

const particleContainer = document.getElementById("particles-js");

if (particleContainer) {

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";

        particle.style.top = Math.random() * 100 + "%";

        particle.style.width = (Math.random() * 6 + 3) + "px";

        particle.style.height = particle.style.width;

        particle.style.animationDuration =
            (Math.random() * 12 + 10) + "s";

        particle.style.animationDelay =
            (Math.random() * 5) + "s";

        particleContainer.appendChild(particle);

    }

}


/*=========================================================
                MAGNETIC BUTTON EFFECT
=========================================================*/

const magneticButtons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .resume-btn"
);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 8;

        const moveY = (y - rect.height / 2) / 8;

        button.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0,0)";

    });

});


/*=========================================================
                MOBILE MENU CLOSE ON OUTSIDE CLICK
=========================================================*/

document.addEventListener("click", (e) => {

    if (
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {

        mobileMenu.classList.remove("active");

        hamburger.classList.remove("active");

    }

});


/*=========================================================
                PROFILE IMAGE PARALLAX
=========================================================*/

const profileWrapper = document.querySelector(".profile-wrapper");

if (profileWrapper && window.innerWidth > 992) {

    document.addEventListener("mousemove", (e) => {

        const x =
            (window.innerWidth / 2 - e.clientX) / 60;

        const y =
            (window.innerHeight / 2 - e.clientY) / 60;

        profileWrapper.style.transform =
            `rotateY(${-x}deg) rotateX(${y}deg)`;

    });

    document.addEventListener("mouseleave", () => {

        profileWrapper.style.transform =
            "rotateY(0deg) rotateX(0deg)";

    });

}


/*=========================================================
                PARALLAX BACKGROUND BLOBS
=========================================================*/

const blurOne = document.querySelector(".blur-one");
const blurTwo = document.querySelector(".blur-two");

window.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 992) return;

    const x =
        (e.clientX / window.innerWidth - 0.5) * 30;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 30;

    blurOne.style.transform =
        `translate(${x}px, ${y}px)`;

    blurTwo.style.transform =
        `translate(${-x}px, ${-y}px)`;

});


/*=========================================================
                NAVBAR SHADOW
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.boxShadow =
            "0 12px 40px rgba(0,0,0,.18)";

    }

    else {

        navbar.style.boxShadow = "none";

    }

});


/*=========================================================
                PREVENT FORM SUBMISSION
=========================================================*/

const contactForm = document.querySelector("form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        contactForm.reset();

    });

}


/*=========================================================
                PRELOAD IMAGES
=========================================================*/

document.querySelectorAll("img").forEach((img) => {

    if (img.complete) {

        img.classList.add("loaded");

    } else {

        img.addEventListener("load", () => {

            img.classList.add("loaded");

        });

    }

});


/*=========================================================
                CONSOLE MESSAGE
=========================================================*/

console.log(

`%c
╔════════════════════════════════════════════╗
║                                            ║
║      Krishn Vyas Portfolio Loaded 🚀       ║
║                                            ║
║      Designed with HTML CSS JavaScript     ║
║                                            ║
╚════════════════════════════════════════════╝
`,
"color:#4F8CFF;font-size:14px;font-weight:bold;"
);

/*=========================================================
            ABOUT IMAGE SLIDER
=========================================================*/

const aboutImage = document.getElementById("aboutImage");

if (aboutImage) {

    const images = [
        "assets/images/img1.png",
        "assets/images/img2.png"
    ];

    let currentImage = 0;

    setInterval(() => {

        aboutImage.classList.add("fade");

        setTimeout(() => {

    currentImage = (currentImage + 1) % images.length;

    const nextImage = new Image();

    nextImage.src = images[currentImage];

    nextImage.onload = () => {

        aboutImage.src = nextImage.src;

        requestAnimationFrame(() => {
            aboutImage.classList.remove("fade");
        });

    };

}, 450);

    }, 2000);

}

