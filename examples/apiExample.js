const CircuitBreaker = require("../src/CircuitBreaker");
const circuitBreaker = require("../src/CircuitBreaker");
const axios = require("axios");

const breaker = new CircuitBreaker();

const apiCall = async()=>
{
    const response = await axios.get("https://httpbin.org/get");
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