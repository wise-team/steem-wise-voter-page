/*
Source: https://stackoverflow.com/a/979995/761265
*/
function parseQueryString(query: string): { [key: string]: string } {
    const vars = query.split("&");
    const queryString: { [x: string]: any; } = {};
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        const key: string = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        if (typeof queryString[key] === "undefined") {
            queryString[key] = decodeURIComponent(value);
        } else if (typeof queryString[key] === "string") {
            const arr = [queryString[key], decodeURIComponent(value)];
            queryString[key] = arr;
        } else {
            queryString[key].push(decodeURIComponent(value));
        }
    }
    return queryString;
}

export const queryParams: { [key: string]: string } = parseQueryString(window.location.search.substring(1));
