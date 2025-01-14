const {expect} = require('chai');

const CircuitBreaker = require("../src/CircuitBreaker");

describe("CircuitBreaker",()=>
{
    it("should start in CLOSED state",()=>
    {
        const breaker = new CircuitBreaker();
        const failingServices = async()=>{
            throw new Error("Service failed");
        }
    })

    try{await breaker.execute(failingService);} 





















P
0
})