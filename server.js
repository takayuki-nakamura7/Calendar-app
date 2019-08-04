import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import CurrentBmr from './currentBmr' // モデルをimport


const app = express()
const port = 3002
const dbUrl = 'mongodb://localhost/bmr'

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
    if (dbErr) throw new Error(dbErr)
    else console.log("db connected")

    // POSTリクエストに対処
    app.post('/api/bmrs', (request, response) => {
        const { bmrResult } = request.body
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

    app.get('/api/bmrs', (request, response) => {
        CurrentBmr.find({}, (err, CurrentBmr) => {  // 取得したドキュメントをクライアント側と同じくcurrentBmrと命名
            if (err) response.status(500).send()
            else response.status(200).send(CurrentBmr)  // CurrentBmrArrayをレスポンスとして送り返す
        })
    })

    // ここでcurrentBmrの値を変更する
    app.put('/api/bmrs', (request, response) => {
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
