import React, {Component} from 'react'
import  Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients :{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice: 4,
        purchasing: false
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const priceAddition = INGREDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
            return
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const priceAddition = INGREDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0
        return (
            <Aux>
                {
                    <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                        <OrderSummary
                            ingredients = {this.state.ingredients}
                            cancel = {this.purchaseCancelHandler}
                            continue = {this.purchaseContinueHandler}
                            price = {this.state.totalPrice}/>
                    </Modal>
                }
                <Burger ingredients ={this.state.ingredients}/>
                <BuildControls
                    more ={this.addIngredient}
                    less ={this.removeIngredient}
                    disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    orderClick = {this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;