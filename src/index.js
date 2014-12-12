var Reveal = require('reveal.js'),
    hljs = require('highlight.js');

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: 'sky',
    transition: 'linear'
});

// Enable syntax highlighting
hljs.initHighlightingOnLoad();
