import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//  スキーマの作成
const DailyCalSchema = new mongoose.Schema({
    dailyCal: Number
})

// モデルの作成
// mongoose.modelの第一引数の複数形の名前（今回だと'dailycals'）のコレクションが生成される
const DailyCal = mongoose.model('DailyCal', DailyCalSchema)

// モデルをexport
export default DailyCal