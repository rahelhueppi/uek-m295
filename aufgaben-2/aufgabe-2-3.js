function simuliereVerzoegerung(ms){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()   
        }, ms);
    })
} //Diese Funktion ist asynchron, weil man darin ein Promise hat.
//Async könnte man auch vor diese Funktion schreiben. Es empfiehlt sich jedoch,
//nur async zu verwenden, wenn auch await verwendet wird. 

async function addiereNachVerzoegerung(a, b, ms){
    await simuliereVerzoegerung(ms);
    const ergebnis = a + b;
    console.log('Das Ergebnis ist:', ergebnis);
}

addiereNachVerzoegerung(3, 7, 2000);