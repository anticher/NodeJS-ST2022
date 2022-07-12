import csv from 'csvtojson'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvFilePath = path.join(__dirname, "../", "csv", "nodejs-hw1-ex1.csv")
const textFilePath = path.join(__dirname, "../", "text", "nodejs-hw1-ex2.txt")

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
        price: function (item) {
          const values = item.split(",")
          const major = parseFloat(values[0])
          const minor = parseFloat(values[1])
          let minorLength = minor.toString().length
          let divider = 1
          while (minorLength > 0) {
            divider *= 10
            minorLength -= 1
          }
          return major + minor / divider
        },
      },
      checkType: true,
    })
  )
  .pipe(writeStream)
