const fs = require("node:fs/promises")

//function leseDateiInhalt(filepath){
//    return new Promise((resolve, reject) =>{
//        fs.readFile(filepath, "utf8", function (err, inhalt){
//          if (err){
//            reject(err)
//          } else {
//            resolve(inhalt)
//          }
//        })
//    })
//}

function leseDateiInhalt(filepath){
  return new Promise((resolve, reject) => {
    fs.readFile(filepath).then((buffer) => {
      resolve(buffer.toString())
    }).catch((err) => reject(err))
  })
}

leseDateiInhalt("aufgabe-2-2.txt")
  .then(inhalt => {
    console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
  })
  .catch(err => {
    console.error('Fehler beim Lesen der Datei:', err);
  });