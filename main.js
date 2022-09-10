const themeBtn = document.querySelector('.theme-toggler');

function getCurrentTheme() {
    let theme = window.matchMedia('(prefers-color-scheme: dark)').
        matches ? 'dark' : 'light';
    localStorage.getItem('site.theme') ? theme =
        localStorage.getItem('site.theme') : null;
   return theme;
}
function loadTheme(theme) {
    const root = document.querySelector(':root');
    if(theme === 'light') {
        themeBtn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
    } else {
        themeBtn.innerHTML = `<i class="bi bi-brightness-high"></i>`;
    }
    root.setAttribute('color-scheme', `${theme}`);
}

themeBtn.addEventListener('click', () => {
    let theme = getCurrentTheme();
    let audio;
    if(theme === 'dark') {
        audio = document.querySelector('.audio_click');
        theme = 'light';
    } else {
        audio = document.querySelector('.audio_click');
        theme = 'dark';
    }
    audio.currentTime = 0;
    audio.play();
    localStorage.setItem('site.theme', `${theme}`);
    loadTheme(theme);
})
window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme());
});

// Main sidebar show / hide function
const shrinkBtn = document.querySelector('.shrink-btn');
const search = document.querySelector('.search');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');
const active_tab = document.querySelector('.active-tab');
const shortcuts = document.querySelector('.sidebar-links h4');
const tooltip_elements = document.querySelectorAll('.tooltip-element');


shrinkBtn.addEventListener('click', () => {
   document.body.classList.toggle('shrink');
   setTimeout(moveActiveTab, 400);
   shrinkBtn.classList.add('hovered');

   setTimeout(() => {
       shrinkBtn.classList.remove('hovered');
   }, 500);
});


// Search field
search.addEventListener('click', () => {
    document.body.classList.remove('shrink');
    search.lastElementChild.focus();
});

let activeIndex;
function moveActiveTab() {
    let topPosition = activeIndex * 58 + 2.5;
    if(activeIndex > 4) {
        topPosition += shortcuts.clientHeight;
    }
    active_tab.style.top = `${topPosition}px`;
}

function changeLink() {
    sidebarLinks.forEach((sidebarLink) => sidebarLink.classList.remove('active'));
    this.classList.add('active');

    activeIndex = this.dataset.active;
    moveActiveTab();
}

sidebarLinks.forEach((link) => link.addEventListener('click', changeLink));

function showTooltip() {
   let tooltip = this.parentNode.lastElementChild;
   let spans = tooltip.children;
   let tooltipIndex = this.dataset.tooltip;

   Array.from(spans).forEach((sp) => sp.classList.remove('show'));
   spans[tooltipIndex].classList.add('show');

   tooltip.style.top = `${100 / (spans.length * 2) * (tooltipIndex * 2 + 1)}%`;
}
tooltip_elements.forEach((elem) => {
    elem.addEventListener('mouseover', showTooltip);
})

// Show hide menu
let subMenu = document.getElementById("dropdownMenu");

function toggleMenu() {
    console.log('click')
    subMenu.classList.toggle("open-menu");
}
