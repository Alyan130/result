import fs from "fs";
import xlsx from "xlsx";

// Read the file
const filePath = 'result.xlsx'; // Adjust path if necessary
const fileBuffer = fs.readFileSync(filePath);

const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON starting from the exact row where data starts (row 10)
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, range: 9 });

console.log("Parsed data:", data);

const resultData = data.map(row => {
    return {
        registrationNumber: row[0],  // Assuming rstration number is in the first column
        examResult: row[1]           // Assuming exam resultegi is in the second column
    };
});

const filteredResultData = resultData.filter(item => item.registrationNumber && item.examResult);

console.log(filteredResultData);

