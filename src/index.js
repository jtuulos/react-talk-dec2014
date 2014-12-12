var Reveal = require('reveal.js'),
    hljs = require('highlight.js');

// Expose reveal.js in global scope for plugins
window.Reveal = Reveal;

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: 'sky',
    transition: 'fade',
    transitionSpeed: 'fast'
});

// Enable syntax highlighting
hljs.initHighlightingOnLoad();
