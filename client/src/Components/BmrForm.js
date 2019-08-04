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

    const closeButton = e => {
        document.getElementById("calorieTable").style.display = "none";
        document.getElementById("masking").style.display = "none";
    }

    const openButton = e => {
        document.getElementById("calorieTable").style.display = "block";
        document.getElementById("masking").style.display = "block";
    }


    return (
        <div>
            {currentBmr === false ?
                <div><p className="clickText">基礎代謝を測るにはこのボタンをクリックしてください。</p>
                    <button onClick={e => openButton(e.target.value)}> クリック </button>
                </div> :
                ''
            }
            <div className="masking" id="masking" onClick={e => closeButton(e.target.value)}></div>
            <div className="calorieTable" id="calorieTable">
                <div className="closeButton" id="closeButton">
                    <i onClick={e => closeButton(e.target.value)} className="fas fa-times"></i>
                </div>
                <form onSubmit={e => handleSubmit(e)}>
                    <label className="height">
                        身長:
                    </label>
                    <input type="number" min="0" value={height} onChange={e => store.dispatch(changeHeight(e.target.value))} />cm
                    <label className="age">
                        年齢:
                    </label>
                    <input type="number" min="0" value={age} onChange={e => store.dispatch(changeAge(e.target.value))} />歳
                    <label className="weight">
                        体重:
                    </label>
                    <input type="number" min="0" value={weight} onChange={e => store.dispatch(changeWeight(e.target.value))} />kg
                    <label className="sex">
                        性別:
                        </label>

                    <input type="radio" name="sex" id="man" value='man' onChange={e => store.dispatch(changeSex(e.target.value))} />男性

                    <input type="radio" name="sex" id="woman" value='woman' onChange={e => store.dispatch(changeSex(e.target.value))} />女性
                    <button onClick={e => closeButton(e.target.value)} type="submit">基礎代謝を計算</button>
                </form>
            </div>


        </div>
    )
}

export default BmrForm