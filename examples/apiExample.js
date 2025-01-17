import CircuitBreaker from "../src/index.js";
import { get } from "axios";

const breaker = new CircuitBreaker();

const apiCall = async()=>
{
    const response = await get("https://httpbin.org/get");
    return response.data;
};

(async()=>
{
    try {
        const result = await breaker.executeAction(apiCall);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
})();