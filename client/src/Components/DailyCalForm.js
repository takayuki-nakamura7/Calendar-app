import React from 'react';
import axios from 'axios'




export default class DailyCalForm extends React.Component {
    state = {
        protein: 0,
        fat: 0,
        carbo: 0
    }

    handleSubmit = e => {
        e.preventDefault()    // フォームsubmit時のデフォルトの動作を抑制
        // cal計算ロジック
        let dailyCal;
        dailyCal = this.state.protein * 4 + this.state.fat * 9 + this.state.carbo * 4

        console.log('dailyCal:' + dailyCal)
        axios.post('/api/dailyCal', {
            dailyCal
        })// calをサーバーにPOST
    };

    initializeForm = () => {
        this.state({
            protein: 0,
            fat: 0,
            carbo: 0
        })
    }

    changeProtein = value => {
        this.setState({
            protein: value
        });
    };

    changeFat = value => {
        this.setState({
            fat: value
        });
    };

    changeCarbo = value => {
        this.setState({
            carbo: value
        });
    };


    render() {
        return (

            <form onSubmit={e => this.handleSubmit(e)}>
                <label>
                    タンパク質:
                    <input onChange={e => this.changeProtein(e.target.value)} />
                </label>
                <label>
                    脂質:
                    <input onChange={e => this.changeFat(e.target.value)} />
                </label>
                <label>
                    炭水化物:
                    <input onChange={e => this.changeCarbo(e.target.value)} />
                </label>
                <button type="submit">カロリーを計算</button>
            </form>
        )
    }
}

