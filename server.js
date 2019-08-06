import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import CurrentBmr from './currentBmr' // モデルをimport
import DailyCal from './dailyCal' // モデルをimport


const app = express()
const port = 3002
const dbUrl = 'mongodb://localhost/crud' // dbの名前をcrudに指定



// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
    if (dbErr) throw new Error(dbErr)
    else console.log("db connected")

    // POSTリクエストに対処
    app.post('/api/currentBmr', (request, response) => {
        const { bmrResult } = request.body
        console.log('what am i ' + bmrResult)
        new CurrentBmr({
            bmrResult
        }).save(err => {
            if (err) response.status(500)
            else {
                CurrentBmr.find({}, (findErr, CurrentBmr) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(CurrentBmr)
                })
            }
        })
    })

    // dailyCalのPOSTリクエスト
    app.post('/api/dailyCal', (request, response) => {
        const { dailyCal } = request.body
        console.log('what am i ' + dailyCal)
        new DailyCal({
            dailyCal
        }).save(err => {
            if (err) response.status(500)
            else {
                DailyCal.find({}, (findErr, DailyCal) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(DailyCal)
                })
            }
        })
    })

    app.get('/api/currentBmr', (request, response) => {
        CurrentBmr.find({}, (err, CurrentBmr) => {  // 取得したドキュメントをクライアント側と同じくcurrentBmrと命名
            if (err) response.status(500).send()
            else response.status(200).send(CurrentBmr)  // CurrentBmrをレスポンスとして送り返す
        })
    })

    app.get('/api/dailyCal', (request, response) => {
        DailyCal.find({}, (err, CurrentBmr) => {
            if (err) response.status(500).send()
            else response.status(200).send(CurrentBmr)
        })
    })

    app.put('/api/currentBmr', (request, response) => {
        const { id } = request.body
        CurrentBmr.findByIdAndUpdate(id, err => {
            if (err) response.status(500).send()
            else {  // updateに成功した場合、すべてのデータをあらためてfindしてクライアントに送る
                CurrentBmr.find({}, (findErr, CurrentBmr) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(CurrentBmr)
                })
            }
        })
    })
})

app.listen(port, error => {
    if (error) throw new Error(error)
    else console.log(`listening on port ${port}`)
})
