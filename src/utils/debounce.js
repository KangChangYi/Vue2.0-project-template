// kcy debounce 练习
export default function debounce(func, wait = 200, immediate = true) {
    let timer;
    let context;
    const later = args => setTimeout(() => {
        timer = null;
        if (!immediate) {
            func.apply(context, args);
        }
    }, wait);
    return function(...args) {
        if (!timer) {
            timer = later(args);
            if (immediate) {
                func.apply(this, args);
            }
            context = this;
        } else {
            clearTimeout(timer);
            timer = later(args);
        }
    };
}
