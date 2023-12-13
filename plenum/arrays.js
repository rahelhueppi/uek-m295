const grades = [
    {name: "Thomann", grade: 5.0},
    {name: "Bürgis", grade: 5.0},
    {name: "Norris", grade: 7.0},
    {name: "Lopez", grade: 6.5},
    {name: "Smith", grade: 4.8},
    {name: "Patel", grade: 6.2},
    {name: "Kim", grade: 5.7},
    {name: "Garcia", grade: 6.0},
    {name: "Zhang", grade: 7.1},
    {name: "Kumar", grade: 5.5}
  ]

//Filter: Finde alle Schüler, deren Note besser als 6.0 ist
const gradesOver6 = grades.filter(grade => grade.grade > 6);
//console.log(gradesOver6);

//Map: Erstelle ein neues Array, das nur die Namen der Schüler enthält.
const namesStudents = grades.map(name => name.name)
//console.log(namesStudents)

//forEach: Verwende forEach, um jede Note im Array um 0.1 zu erhöhen.
//grades.forEach(grade => grade.grade += 0.1)
//console.log(grades)

//Reduce: Berechne die durchschnittliche Note aller Schüler im Array.
const sum = grades.reduce((sum, grade) => sum + grade.grade, 0);
const avg = sum / grades.length;
//console.log(avg)

//Find: Finde den ersten Schüler im Array, dessen Note genau 5.0 ist.
const grade5 = grades.find((grade) => grade.grade == 5)
//console.log(grade5)
