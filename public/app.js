/* global Hammer */
(function() {
    'use strict';

    const brows = document.getElementById('brows');
    const face = document.getElementById('face');

    const mc = new Hammer.Manager(brows);

    const pinch = new Hammer.Pinch();
    const pan = new Hammer.Pan();

    pinch.recognizeWith(pan);

    mc.add([pinch, pan]);

    let adjustScale = 1;
    let adjustDeltaX = 0;
    let adjustDeltaY = 0;

    let currentScale = null;
    let currentDeltaX = null;
    let currentDeltaY = null;

    // Prevent long press saving on mobiles.
    brows.addEventListener('touchstart', e => {
        e.preventDefault();
    });

    // Handles pinch and pan events/transforming at the same time;
    mc.on('pinch pan', ev => {
        const transforms = [];

        // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
        currentScale = adjustScale * ev.scale;
        currentDeltaX = adjustDeltaX + (ev.deltaX / currentScale);
        currentDeltaY = adjustDeltaY + (ev.deltaY / currentScale);

        // Concatinating and applying parameters.
        transforms.push(`scale(${currentScale})`);
        transforms.push(`translate(${currentDeltaX}px, ${currentDeltaY}px)`);
        brows.style.transform = transforms.join(' ');
    });

    // Ask for access to the camera
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        face.src = URL.createObjectURL(stream);
        face.play();
    }).catch(err => {
        face.innerHTML = `${err.name}: ${err.message}`;
    });
}());
