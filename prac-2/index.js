let num = 0;
console.log(`Current directory: ${__dirname}`);
console.log("__filename : " + __filename);

function globobj() {
    num++;

    if (num <= 10) {
        console.log(num);
    } else {
        clearInterval(intervalObj);
    }
}

const timeoutObj = setTimeout(globobj, 2000);
const intervalObj = setInterval(globobj, 100);