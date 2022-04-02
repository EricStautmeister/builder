/*
  Utility functions, like the ones you'd
  get from a library like lodash.
*/

/**
 * It takes a function and returns a memoized version of that function
 * @param callback - The function to be memoized.
 * @returns A function that returns the same result as the original function, but only executes the
 * original function once for each unique set of arguments.
 */
export function memoize(callback) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);

        const result = callback(...args);
        cache.set(key, result);
        return result;
    };
}

/**
 * Sleep for a given number of milliseconds
 * @param ms - The number of milliseconds to wait.
 * @returns A promise.
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Redirects to the specified URL
 * @param url - The URL to redirect to.
 */
export function redirect(url) {
    window.location.href = url;
}
