import React from 'react'
import axios from 'axios'

import {
    changeWeight, changeAge, changeHeight, changeSex, initializeForm
} from '../actions'


const BmrForm = ({ store }) => {
    const { weight, age, height, sex } = store.getState().form  // storeからフォームの内容を取得
    const handleSubmit = e => {
        e.preventDefault()    // フォームsubmit時のデフォルトの動作を抑制

        axios.post('/api/bmrs', {
            weight,
            age,
            height,
            sex
        })  // キャラクターの名前、年齢からなるオブジェクトをサーバーにPOST
            .then(response => {
                console.log(response)  // 後で行う動作確認のためのコンソール出力
                store.dispatch(initializeForm())  // submit後はフォームを初期化
            })
            .catch(err => {
                console.error(new Error(err))
            })
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    身長:
                    <input value={height} onChange={e => store.dispatch(changeHeight(e.target.value))} />
                </label>
                <label>
                    年齢:
                    <input value={age} onChange={e => store.dispatch(changeAge(e.target.value))} />
                </label>
                <label>
                    体重:
                    <input value={weight} onChange={e => store.dispatch(changeWeight(e.target.value))} />
                </label>
                <label>
                    性別:
                    {/* <input value={sex} onChange={e => store.dispatch(changeSex(e.target.value))} /> */}
                    <label>男性
                        <input type="radio" name="sex" id="man" value='man' onChange={e => store.dispatch(changeSex(e.target.value))} />
                    </label>
                    <label>女性
                        <input type="radio" name="sex" id="woman" value='woman' onChange={e => store.dispatch(changeSex(e.target.value))} />
                    </label>
                </label>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default BmrForm