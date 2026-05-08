/* =========================
   THEME TOGGLE
========================= */

const themeToggle =
document.querySelector('.theme-toggle');

const savedTheme =
localStorage.getItem('theme');

const prefersLight =
window.matchMedia('(prefers-color-scheme: light)').matches;

const setTheme = (theme) => {

    const isLight =
        theme === 'light';

    document.body.classList.toggle('light-theme', isLight);

    themeToggle.setAttribute(
        'aria-label',
        isLight
            ? 'Switch to dark theme'
            : 'Switch to light theme'
    );

    themeToggle.setAttribute(
        'aria-pressed',
        String(isLight)
    );

};

setTheme(
    savedTheme ||
    (prefersLight ? 'light' : 'dark')
);

themeToggle.addEventListener('click', () => {

    const nextTheme =
        document.body.classList.contains('light-theme')
            ? 'dark'
            : 'light';

    localStorage.setItem('theme', nextTheme);

    setTheme(nextTheme);

});


/* =========================
   CURSOR GLOW
========================= */

const glow =
document.querySelector('.cursor-glow');

document.addEventListener('mousemove',(e)=>{

    glow.animate({

        left:`${e.clientX}px`,
        top:`${e.clientY}px`

    },{

        duration:300,
        fill:'forwards'

    });

});


/* =========================
   HORIZONTAL SCROLL
========================= */

const track =
document.querySelector('.horizontal-track');

const horizontalSection =
document.querySelector('.horizontal-section');

window.addEventListener('scroll',()=>{

    const sectionTop =
    horizontalSection.offsetTop;

    const scrollY =
    window.scrollY;

    const distance =
    scrollY - sectionTop;

    if(distance >= 0){

        track.style.transform =
        `translateX(-${distance}px)`;
    }

});


/* =========================
   SKILL DETAILS
========================= */

const skillCards =
document.querySelectorAll('.skill-card');

const skillDetailPanel =
document.querySelector('.skill-detail-panel');

skillCards.forEach((card) => {

    card.addEventListener('click', () => {

        skillCards.forEach((item) => {
            item.classList.remove('active');
        });

        card.classList.add('active');

        skillDetailPanel.classList.remove('reveal');

        window.requestAnimationFrame(() => {

            skillDetailPanel.innerHTML =
                `<span>${card.dataset.skill}</span>
                <h3>${card.dataset.level}</h3>
                <p>${card.dataset.detail}</p>`;

            skillDetailPanel.classList.add('reveal');

        });

    });

});


/* =========================
   PREMIUM MAGNIFY EFFECT
========================= */

const magneticElements = document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

    const text = element.innerText.trim();
    element.innerHTML = "";

    const words =
        text.split(/\s+/);

    words.forEach((word, wordIndex) => {

        const wordSpan =
            document.createElement("span");

        wordSpan.classList.add("mag-word");

        [...word].forEach((char) => {

            const span = document.createElement("span");

            span.classList.add("mag-char");

            span.textContent = char;

            wordSpan.appendChild(span);

        });

        element.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
            element.appendChild(
                document.createTextNode(" ")
            );
        }

    });

});


document.addEventListener("mousemove", (e) => {

    const chars =
        document.querySelectorAll(".mag-char");

    chars.forEach((char) => {

        const rect =
            char.getBoundingClientRect();

        const x =
            rect.left + rect.width / 2;

        const y =
            rect.top + rect.height / 2;

        const distance =
            Math.hypot(
                e.clientX - x,
                e.clientY - y
            );

        const maxDistance = 180;

        let scale =
            1 + (maxDistance - distance) / 500;

        if (distance > maxDistance) {
            scale = 1;
        }

        scale =
            Math.min(scale, 1.35);

        char.style.transform =
            `scale(${scale}) translateY(${(scale - 1) * -6}px)`;

        char.style.opacity =
            scale > 1.05
                ? 1
                : 0.85;

    });

});
