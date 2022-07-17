const csv = require("csvtojson")
const fs = require("fs")
const path = require("path")

const csvFilePath = path.join(__dirname, "csv", "nodejs-hw1-ex1.csv")
const textFilePath = path.join(__dirname, "text", "nodejs-hw1-ex2.txt")

const redLog = "\x1b[31m"
const whiteLog = "\x1b[37m"

const readStream = fs.createReadStream(csvFilePath)
readStream.on("error", (e) => {
  console.log(redLog + "\nRead Stream error\n" + whiteLog, e, "\n")
})

const writeStream = fs.createWriteStream(textFilePath, "utf8")
writeStream.on("error", (e) => {
  console.log(redLog + "\nWrite Stream error\n" + whiteLog, e, "\n")
})

readStream
  .pipe(
    csv({
      noheader: false,
      headers: ["book", "author", "amount", "price"],
      colParser: {
        amount: "omit",
        price: item => Number(item.replace(',', '.')),
      },
      checkType: true,
    })
  )
  .pipe(writeStream)
