const log = (message,level ="info")=>
{
    const levels ={info: "INFO", "error": "ERROR",warn:"WARN"};
    console.log(`[$levels[level]|| "INFO" ]) $new Date().toISOString() $message`);
}

module.exports =log;