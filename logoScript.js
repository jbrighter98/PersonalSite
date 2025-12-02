// Start logo animation

const logo = document.getElementById('logo');

logo.addEventListener('mouseover', () => {
    logo.querySelectorAll('.logoSubText').forEach(span => {
        span.style.width = span.scrollWidth + 'px';
    });
});

logo.addEventListener('mouseout', () => {
    logo.querySelectorAll('.logoSubText').forEach(span => {
        span.style.width = 0;
    });
});

// End logo animation