import fs from 'fs';

const readData = (file) => fs.readFileSync(file,{encoding:'utf8'});

const normaliseData = (csvData) => {
    const rowsWithHeader = csvData.split("\r\n")
    const rows = rowsWithHeader.slice(1)
    const result = rows.map(function(row){
        const rowData = row.split(",")
        const person = {
            firstName: rowData[0], 
            lastName: rowData[1],
            gender: rowData[2],
            maritalStatus: rowData[3],
            age: rowData[4],
        }
        return person
    })
    return result
}

const marriedAndTwenties = (people) => people.filter((person) =>  person.age > 19 && person.age < 30 && person.maritalStatus === 'Married').length


const data = readData('./data.csv')

const people = normaliseData(data)

console.log(marriedAndTwenties(people))