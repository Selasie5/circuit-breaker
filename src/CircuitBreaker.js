class CircuitBreaker {
    constructor({failureThreshold = 5, successThreshold = 1, timeout=5000}={}){
            this.failureThreshold = failureThreshold;
            this.successThreshold = successThreshold;
            this.timeout = timeout;

            this.failures = 0;
            this.successes = 0;
            this.state=  "CLOSED";
            this.nextAttempt = Date.now();
    }

    async executeAction(action){
        if(this.state === "OPEN"){
            if(Date.now() > this.nextAttempt){
                this.state ="HALF_OPEN";
            }
            else{
                throw new Error("Circuit is OPEN");
            }
        }
        try {
            const result = await action();
            this._onSuccess();
            return result;
        } catch (error) {
            
        }
    }
}