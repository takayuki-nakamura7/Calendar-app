import React from 'react'
import axios from 'axios'
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

const DisplayBmr = ({ store }) => {
    const { isFetching, currentBmr } = store.getState().currentBmr


    const handleFetchData = () => {
        store.dispatch(requestData())  // axios.get()を呼ぶ前にisFetchingをtrueにしておく
        axios.get('/api/bmrs')
            .then(response => {  // データ受け取りに成功した場合
                const _currentBmr = response.data
                store.dispatch(receiveDataSuccess(_currentBmr))    // データをstoreに保存するとともにisFetchingをfalseに
            })
            .catch(err => {  // データ受け取りに失敗した場合
                console.error(new Error(err))
                store.dispatch(receiveDataFailed())  // isFetchingをfalseに
            })
    }

    const handleUpdateCharacter = id => {
        store.dispatch(requestData())
        axios.put('/api/bmrs', {
            id,
        })
            .then(response => {
                const _currentBmr = response.data
                store.dispatch(receiveDataSuccess(_currentBmr))
            })
            .catch(err => {
                console.error(new Error(err))
                store.dispatch(receiveDataFailed())
            })
    }

    const handleDeleteCharacter = id => {
        store.dispatch(requestData())
        // 気持ちとしては、axios.delete('/api/characters', { id })
        axios({
            method: 'delete',
            url: '/api/bmrs',
            data: {
                id,
            }
        })
            .then(response => {
                const _currentBmr = response.data
                store.dispatch(receiveDataSuccess(_currentBmr))
            })
            .catch(err => {
                console.error(new Error(err))
                store.dispatch(receiveDataFailed())
            })
    }

    return (
        <div>
            {
                isFetching  // isFetchingの値で分岐
                    ? <h2>Now Loading...</h2>  // データをFetch中ならばローディングアイコンを表示
                    : <div>
                        <button onClick={() => handleFetchData()}>fetch data</button>
                        <ul>
                            {currentBmr.map(currentBmr => (
                                <li key={currentBmr._id}>
                                    {`${currentBmr.height} ${currentBmr.weight} ${currentBmr.sex} (${currentBmr.age})`}
                                    <button onClick={() => handleUpdateCharacter(currentBmr._id)}>1</button>
                                    <button onClick={() => handleDeleteCharacter(currentBmr._id)}>delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </div>
    )
}

export default DisplayBmr