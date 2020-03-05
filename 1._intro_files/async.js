// CALLBACK FUNCTIONS - asyncronous

function callingCustomerBack(name){
    console.log('We are ready to help you,', name);
}
function greetingCustomer(name){
    console.log('hello', name);
}

// callback using arrow function
const ringingUpCustomerUpRude = (name) => {
    console.log('What do you want', name,'?');
}

function itHelpDesk(name, callback){
    callback(name);
}

// itHelpDesk('Mathilde', ringingUpCustomerUpRude);

// promises = same as callback, but the rule is that it takes to arguments - resolve and reject
// new Promise ((resolve, reject) => {

//     // handle exceptions with try/catch
//     try{
//     // code
//         setTimeout(() => {
//             resolve('Everything went well');
//             console.log('hello timeout function');
//         }, 4000);
//     } catch(error){
//         reject('something went wrong');
//     }
// }).then(message => {
//     console.log(message);
// }).catch(error => console.log(error));




// New promise, wrapped in a function
function myPromise(){
    return new Promise((resolve, reject) => {
        try{
            const message = 'good';
            resolve(message);

        } catch(error) {
            const message = 'bad';
            reject(message);
        }
    });
}

// Async await 
// differences between a promise and async await = the same, async await is a promise under the hood

async function callMyPromise (){

    const message = await myPromise();

    console.log(message);

    // myPromise().then(message => console.log(message));
}

callMyPromise();


const asyncAwaitArrowFunction = async () => {
    const message = await myPromise();
    console.log(message);
}