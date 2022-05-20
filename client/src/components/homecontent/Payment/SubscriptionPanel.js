import axios from "axios"
import "./SubscriptionPanel.css"
import { useState } from 'react'
import {useSelector} from 'react-redux'

function SubscriptionPanel({ plan }) {

    const [priceId, setPriceId] = useState("")
    const auth = useSelector(state => state.authReducers)
    const { _id } = auth.user

    const handleState = (price_id) => {
        setPriceId(price_id)
    }

    if (priceId) {
        const handleCheckout = () => {
            console.log(_id)
            axios.post("/eb/create-checkout-session", { priceId, _id })
                .then((res) => {
                    if (res.data.url) {
                        window.location.href = res.data.url
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
        handleCheckout()
    }


    return (
        <div className="subscription__panel__container">
            <div className="subscription__panel__intro__wrapper">
                <h2 className="subscription__panel__intro__one subscription__intro">Join Entertainment Bucket</h2>
                <p className="subscription__panel__intro__two subscription__intro">and get access to Movies Tv Series Sports Gaming content at just one place!</p>
                <h4 className="subscription__panel__intro__three subscription__intro">choose a plan</h4>
            </div>
            <div className="subscription__panel__plans__wrapper">
                <div className="plan__one__wrapper plans">
                    <div className="plan__one__desc plans__desc">
                        <h3>MONTHLY</h3>
                        <span>₹ 199</span>
                        <span>PER MONTH</span>
                    </div>
                    <button className="subscription__btn" onClick={() => handleState('price_1L0h98SIxvgeJX8OoYVa1j5u')}>CONTINUE</button>
                </div>
                <div className="plan__two__wrapper plans">
                    <div className="plan__two__desc plans__desc">
                        <h3>QUATERLY</h3>
                        <span>₹ 1200</span>
                        <span>PER 6 MONTH</span>
                    </div>
                    <button className="subscription__btn" onClick={() => handleState('price_1L0h98SIxvgeJX8OMc11Eq1u')}>CONTINUE</button>
                </div>
                <div className="plan__three__wrapper plans">
                    <div className="plan__one__desc plans__desc">
                        <h3>YEARLY</h3>
                        <span>₹ 2400</span>
                        <span>PER YEAR</span>
                    </div>
                    <button className="subscription__btn" onClick={() => handleState('price_1L0h98SIxvgeJX8Or1y7LEJK')}>CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPanel