export class JsonError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
    }
}

export class PageError extends Error {
    constructor(message) {
        super(message);
        this.status = status || 500;
    }
}
