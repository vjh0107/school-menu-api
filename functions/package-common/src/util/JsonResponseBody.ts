import { InvalidResponseBodyError } from "../error/InvalidResponseBodyError";
import process from "process";

export class JsonResponseBody {

    private responseBody = { server_message: [] };

    constructor() {
        this.responseBody.server_message = process.env.COMMON_MSGS?.split("*");
    }

    addMessage(message: string) {
        this.responseBody.server_message.push(message);
    }

    create(data: Object): Object {
        if (data.hasOwnProperty("server_message")) {
            throw new InvalidResponseBodyError();
        }
        Object.assign(this.responseBody, data);
        return this.responseBody;
    }
}