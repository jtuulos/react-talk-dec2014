var Reveal = require('reveal.js'),
    Vivus = require('vivus');

// Return unique id for current slide and fragment
function getSlideKey() {
    var indices = Reveal.getIndices();
    return [
        'h', indices.h,
        'v', indices.v,
        'f', indices.f
    ].join('');
}

// Enable draw animation if slide has a `data-draw-animation` attribute
function shouldAnimate() {
    return Reveal.getCurrentSlide().dataset.drawAnimation !== undefined;
}

// Drawing effect instances for SVG illustrations
var drawEffects = {};
function animatePaths(el) {
    var key = getSlideKey();

    // Create new effect instance if it doesn't exist yet
    if (!drawEffects[key]) {
        drawEffects[key] = new Vivus(el, {
            type: 'delayed',
            duration: 100,
            start: 'manual'
        });
    }

    // Restart draw animation
    drawEffects[key].stop().reset().play();
}

module.exports = {
    animatePaths: animatePaths,
    shouldAnimate: shouldAnimate
};
