import React from 'react'


const DisplayBmr = ({ store }) => {
    const isFetching = store.getState().currentBmr.isFetching
    const currentBmr = store.getState().currentBmr.currentBmr


    return (
        <div>
            {
                isFetching  // isFetchingの値で分岐
                    ? <h2>Now Loading...</h2>  // データをFetch中ならばローディングアイコンを表示
                    : <div>
                        <p className="currentBmr">あなたの基礎代謝は<span>{currentBmr}kcal</span>です。</p>
                    </div>
            }
        </div>
    )
}

export default DisplayBmr