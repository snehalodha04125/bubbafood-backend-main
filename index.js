const router = require('./routes')
const adRouter = require('./Ads/')
const adminRouter = require('./Admin/routes')
const express = require('express')
const cors = require('cors')
const { conn } = require('./salesforce')
const { logger } = require('./middlewares')
const figlet = require('figlet')
const chalk = require('chalk')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/api', router)
app.use('/ads', adRouter)
app.use('/admin', adminRouter)

try {
    conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PWD)
        .then(() => {
            app.listen(8000, async () => {
                figlet('Bubba Foods', (_, res) => console.log(res))
                console.log('Server Started on port :8000')

                const sfuser = await conn.identity()

                console.log(chalk.bold(`Salesforce connected : ${sfuser.username}\n`))
            })
        })
} catch {
    console.error(chalk.red.bold("Salesforce couldn't connect"))
    console.error(err)
}
