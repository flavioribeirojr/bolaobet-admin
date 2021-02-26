export function createJWTTokenStorage() {
    const JWT_TOKEN_KEY = 'BOLAOBET_JWT_TOKEN';

    function get() {
        return localStorage.getItem(JWT_TOKEN_KEY);
    }

    function set(token: string) {
        localStorage.setItem(JWT_TOKEN_KEY, token);
    }

    function remove() {
        localStorage.removeItem(JWT_TOKEN_KEY);
    }

    return {
        get,
        set,
        remove
    }
}