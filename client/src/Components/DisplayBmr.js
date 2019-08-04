import React from 'react'
// import axios from 'axios'
// import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'


const DisplayBmr = ({ store }) => {
    const isFetching = store.getState().currentBmr.isFetching
    const currentBmr = store.getState().currentBmr.currentBmr


    return (
        <div>
            {
                isFetching  // isFetchingの値で分岐
                    ? <h2>Now Loading...</h2>  // データをFetch中ならばローディングアイコンを表示
                    : <div>
                        <label>
                            {currentBmr}

                        </label>
                    </div>
            }
        </div>
    )
}

export default DisplayBmr