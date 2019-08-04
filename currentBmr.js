import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//  スキーマの作成
//  今回保存したいドキュメントはbmrResult(Number),1つのフィールドを持つ
const CurrentBmrSchema = new mongoose.Schema({
    bmrResult: Number
})

// モデルの作成
// mongoose.modelの第一引数の複数形の名前（今回だと'currentbmrs'）のコレクションが生成される(db.currentbmrs.find().pretty())
const CurrentBmr = mongoose.model('CurrentBmr', CurrentBmrSchema)

// モデルをexport
export default CurrentBmr