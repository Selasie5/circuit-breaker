 class CircuitBreaker {
    //Deifine the failure threshold, success threshold and timeout
    constructor({failureThreshold = 5, successThreshold = 1, timeout=5000}={}){
            this.failureThreshold = failureThreshold;
            this.successThreshold = successThreshold;
            this.timeout = timeout;

            this.failures = 0;
            this.successes = 0;
            this.state=  "CLOSED";
            this.nextAttempt = Date.now();
    }

    //Execute the action and manage state transitions
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
           this._onFailure();
           throw error;
        }
    }
//Private methods
//Handle successful actions
    _onSuccess(){
        if(this.state === "HALF_OPEN"){
            this.successes +=1;
            if(this,this.successes >= this.successThreshold){
                this._close();
            }

        }
        else{
            this.successes =0;
        }
    }

    //Track failures and open the circuit if the threshold is reached
    onFailure()
    {
        this.failures +=1;
        if(this.failures >= this.failureThreshold){
            this._open();
        }
    }

    //Manageing state transitions

    _open(){
        this.state ="OPEN";
        this.nextAttempt = Date.now()+ this.timeout;
    }

    _close(){
        this.state ="CLOSED";
        this.failures = 0;
        this.successes = 0;
    }
}

module.exports = CircuitBreaker;