import fs from 'fs';

const readData = (file) => fs.readFileSync(file,{encoding:'utf8'});

const normaliseData = (csvData) => {
    const rowsWithHeader = csvData.split("\r\n")
    const rows = rowsWithHeader.slice(1)
    let result = rows.map(function(row){
        const rowData = row.split(",")
        const person = {
            firstName: rowData[0], 
            lastName: rowData[1],
            gender: rowData[2],
            maritalStatus: rowData[3],
            age: parseInt(rowData[4]),
        }
        return person
    })
    return result
}

const marriedAndTwenties = (people) => people.filter((person) =>  person.age > 19 && person.age < 30 && person.maritalStatus === 'Married').length

const oldestSinglePeople = (people) => people.reduce((oldest, current) => current.age > oldest.age ? current : oldest, { age: -Infinity });


const data = readData('./data.csv')

const people = normaliseData(data)

const singleMales = people.filter((person) => person.maritalStatus === 'Single' && person.gender === 'Male')

const singleFemales = people.filter((person) => person.maritalStatus === 'Single' && person.gender === 'Female')

console.log(marriedAndTwenties(people))
console.log(oldestSinglePeople(singleMales))
console.log(oldestSinglePeople(singleFemales))
