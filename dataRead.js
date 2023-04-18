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

const oldestPeople = (people) => people.reduce((oldest, current) => current.age > oldest.age ? current : oldest, { age: -Infinity });

const singlePeople = (people) => people.filter((person) => person.maritalStatus === 'Single')

const data = readData('./data.csv')

const people = normaliseData(data)

const males = people.filter((person) => person.gender === 'Male')

const females = people.filter((person) => person.gender === 'Female')

const singleMales = singlePeople(males)

const singleFemales = singlePeople(females)

// console.log(marriedAndTwenties(people))
console.log(oldestPeople(singleFemales))
console.log(oldestPeople(singleMales))


