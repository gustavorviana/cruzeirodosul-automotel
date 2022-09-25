export class ApiError extends Error {
    private code: number;
    private httpCode: number;

    constructor(message: string, code: number, httpCode: number) {
        super(message);
        this.code = code;
        this.httpCode = httpCode;
    }

    getBody() {
        return {
            message: this.message,
            code: this.code
        }    
    }

    getHttpCode(){
        return this.httpCode;
    }
}