export function getQueryParam(param) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}