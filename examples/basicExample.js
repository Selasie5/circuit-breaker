const CircuitBreaker = require("../src/CircuitBreaker")

const breaker = new CircuitBreaker();

(async ()=>
{
    const unstableService = async()=>
    {
        if(Math.random() < 0.7) throw new Error ("Service failed");
        return "Service succeeded"
    }
    try {
        const result = await breaker.execute(unstableService);
        console.log(result);
    } catch (error) {
        console.error(error.message)
    }
})();