function verdoppeln(zahl, callback){
    const ergebnis = zahl * 2
    callback(ergebnis)
}

//function callback(ergebnis){
//    console.log('Das Ergebnis ist: ', ergebnis)
//}
//
//verdoppeln(5, callback)

verdoppeln(5, function(ergebnis) {
    console.log('Das Ergebnis ist:', ergebnis);
  });