function rem(numRem=1) {
    return numRem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

function getLayoutChangePoint() {
    return (700 * 2) + (rem() + rem(3) * 4);
};

function getLayoutMode() {
    return (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > getLayoutChangePoint()) ? "icon":"list";
};