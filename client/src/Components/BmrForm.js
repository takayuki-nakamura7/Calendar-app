import React from 'react'
import { changeWeight, changeAge, changeHeight, changeSex } from '../actions'

const BmrForm = ({ store }) => {
    const { weight, age, height, sex } = store.getState().form  // storeからフォームの内容を取得

    return (
        <div>
            <form>
                <label>
                    体重:
                    <input value={weight} onChange={e => store.dispatch(changeWeight(e.target.value))} />
                </label>
                <label>
                    年齢:
                    <input value={age} onChange={e => store.dispatch(changeAge(e.target.value))} />
                </label>
                <label>
                    身長:
                    <input value={height} onChange={e => store.dispatch(changeHeight(e.target.value))} />
                </label>
                <label>
                    年齢:
                    <input value={sex} onChange={e => store.dispatch(changeSex(e.target.value))} />
                </label>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default BmrForm