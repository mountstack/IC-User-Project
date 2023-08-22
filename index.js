
setTimeout(() => {
    console.log('Hello');
}, 10) 

console.log(1); 

someTime(); 

console.log(2); 

function someTime() {
    let i = 0, n = 1000000000; 
    while(i < 5*n) { 
        i++; 
    } 
} 