const {expect} = require('chai');

const CircuitBreaker = require("../src/CircuitBreaker");

describe('Circuit Breaker',()=>{
    it("should start in CLOSED state",()=>
    {
        const breaker = new CircuitBreaker();
        except(breaker.state).to.equal("CLOSED");
    });

    it("should open the circuit after the threhsold failures", async()=>
    {
        const breaker = new CircuitBreaker({failureThreshold:2});
        const failingService = async()=>
        {
            throw new Error("Some Error");
        }

        try{await breaker.executeAction(failingService);} catch{}
        try {await breaker.executeAction(failingService);} catch{}

        expect (breaker.state).to.equal("OPEN");
    });

    it("should close the circuit after successful recovery", async()=>
    {
        const breaker = new CircuitBreaker({successThreshold:1});
        breaker.state ="HALF_OPEN";

        const successfulService=async()=>"Success";
        await breaker.executeAction(successfulService);

        expect(breaker.state).to.equal("CLOSED");
    })
})