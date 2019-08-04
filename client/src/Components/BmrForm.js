import React from 'react'
import axios from 'axios'
import {
    changeWeight, changeAge, changeHeight, changeSex, initializeForm, requestData, receiveDataSuccess, receiveDataFailed

} from '../actions'


const BmrForm = ({ store }) => {
    const { weight, age, height, sex } = store.getState().form  // storeからフォームの内容を取得
    const { currentBmr } = store.getState().currentBmr
    const handleSubmit = e => {
        e.preventDefault()    // フォームsubmit時のデフォルトの動作を抑制
        store.dispatch(requestData())
        let bmrResult;
        if (sex === "man") {
            bmrResult = 10 * weight + 6.25 * height - 5 * age + 5;
        }
        else {
            bmrResult = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        console.log(bmrResult)
        axios.post('/api/currentBmr', {
            bmrResult
        })  // bmrResultをサーバーにPOST
            .then(response => {
                console.log('what is the response' + response)  // 後で行う動作確認のためのコンソール出力
                store.dispatch(initializeForm())  // submit後はフォームを初期化
                const currentBmr = response.data
                store.dispatch(receiveDataSuccess(currentBmr[0].bmrResult))
            })
            .catch(err => {
                console.error(new Error(err))
                store.dispatch(receiveDataFailed())

            })
    }

    const handleSubmitToEdit = e => {
        e.preventDefault()    // フォームsubmit時のデフォルトの動作を抑制
        store.dispatch(requestData())
        let bmrResult;
        if (sex === "man") {
            bmrResult = 10 * weight + 6.25 * height - 5 * age + 5;
        }
        else {
            bmrResult = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        console.log(bmrResult)
        axios.put('/api/currentBmr', {
            bmrResult
        })  // bmrResultをサーバーにPOST
            .then(response => {
                console.log('what is the response' + response)  // 後で行う動作確認のためのコンソール出力
                store.dispatch(initializeForm())  // submit後はフォームを初期化
                const currentBmr = response.data
                store.dispatch(receiveDataSuccess(currentBmr[0].bmrResult))
            })
            .catch(err => {
                console.error(new Error(err))
                store.dispatch(receiveDataFailed())

            })
    }


    return (
        <div>
            {currentBmr === false ?
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
                    <label>男性
                        <input type="radio" name="sex" id="man" value='man' onChange={e => store.dispatch(changeSex(e.target.value))} />
                        </label>
                        <label>女性
                        <input type="radio" name="sex" id="woman" value='woman' onChange={e => store.dispatch(changeSex(e.target.value))} />
                        </label>
                    </label>
                    {currentBmr === false ? <button type="submit">基礎代謝を計算</button> : <button>基礎代謝を変更</button>}
                </form> :
                <form onSubmit={e => handleSubmitToEdit(e)}>
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
                    <label>男性
                        <input type="radio" name="sex" id="man" value='man' onChange={e => store.dispatch(changeSex(e.target.value))} />
                        </label>
                        <label>女性
                        <input type="radio" name="sex" id="woman" value='woman' onChange={e => store.dispatch(changeSex(e.target.value))} />
                        </label>
                    </label>
                    <button type="submit">変更</button>
                </form>}


        </div>
    )
}

export default BmrForm