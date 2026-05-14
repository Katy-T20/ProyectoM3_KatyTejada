export function debounce(fn, delay) {
    let timer = null;
    return function debounce( ...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
