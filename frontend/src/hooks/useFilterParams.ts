/**
 * Utilities for syncing filter state with URL query parameters.
 */

export function getArrayParam(params: URLSearchParams, key: string): string[] {
    const value = params.get(key);
    if (!value) return [];
    return value.split(",");
}

export function setParam(
    params: URLSearchParams,
    key: string,
    value: string | string[] | null,
): URLSearchParams {
    const next = new URLSearchParams(params);
    const serialized = Array.isArray(value) ? value.join(",") : value;
    if (!serialized) {
        next.delete(key);
    } else {
        next.set(key, serialized);
    }
    return next;
}
