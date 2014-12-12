var Reveal = require('reveal.js'),
    hljs = require('highlight.js'),
    drawEffect = require('./scripts/drawEffect');

// Expose reveal.js in global scope for plugins
window.Reveal = Reveal;

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    transition: 'fade',
    transitionSpeed: 'fast'
});

// Enable syntax highlighting
hljs.initHighlightingOnLoad();


function tryDrawEffect(el) {
    var svg = el.querySelector('svg');
    if (svg && drawEffect.shouldAnimate()) {
        drawEffect.animatePaths(svg);
    }
}

Reveal.addEventListener('slidechanged', function(event) {
    tryDrawEffect(event.currentSlide);
});

Reveal.addEventListener('fragmentshown', function(event) {
    tryDrawEffect(event.fragment);
});
