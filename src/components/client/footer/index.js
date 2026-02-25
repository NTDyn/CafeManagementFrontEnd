import React, { useState } from 'react'
import CoffeeLogo from "../../../image/client/coffeeLogo.svg"
import Facebook from "../../../image/client/Facebook.svg"
import Twitter from "../../../image/client/Twitter.svg"
import Instagram from "../../../image/client/Instagram.svg"
import './footer.css'
import { Link } from 'react-router-dom'
import Scroll from "../../../image/client/up.svg"
import ChatBot from '../../../image/client/chatbot.svg'
import ChatAIModal from '../chatAI/chatAI'

function Footer() {

    const scrollTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <footer>
            <ChatAIModal></ChatAIModal>
            <img onClick={scrollTop} id="scrollTop" src={Scroll} alt="up" />
            <div className="container-fluid footer-global" style={{ height: '466px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-8 pt-footer-global">
                            <Link to="/">
                                <img src={CoffeeLogo} alt="logo" className="pb-2" />
                                <p className="d-inline ps-2 footer-name-tag">DYN
                                    COFFEE</p>
                            </Link>
                            <p className="mt-3 footer-p">
                                Coffee Shop is a store that sells some good <br />meals, and especially coffee. We provide
                                <br />high quality beans
                            </p>
                            <div className="d-lg-flex">
                                <a href="https://www.facebook.com/ryanagungsamudra/" target="_blank" rel="noreferrer" style={{ marginLeft: '-20px' }}>
                                    <img src={Facebook} alt="Facbook" />
                                </a>
                                <a href="https://mobile.twitter.com/ryansamudra67" target="_blank" rel="noreferrer" style={{ marginLeft: '-15px' }}>
                                    <img src={Twitter} alt="Twitter" />
                                </a>
                                <a href="https://instagram.com/ryanagungsamudra/" target="_blank" rel="noreferrer" style={{ marginLeft: '-15px' }}>
                                    <img src={Instagram} alt="instagram logo" />
                                </a>
                            </div>
                            <p style={{ color: '#AFB5C0', fontSize: '16px', fontWeight: 400 }}>©2022CoffeeStore</p>
                        </div>
                        <div className="col-2 pt-footer-global">
                            <h5 className="mb-4 footer-h5">Product</h5>
                            <a href="/">
                                <p>Download</p>
                            </a>
                            <a href="/">
                                <p>Pricing</p>
                            </a>
                            <a href="/">
                                <p>Locations</p>
                            </a>
                            <a href="/">
                                <p>Countries</p>
                            </a>
                            <a href="/">
                                <p>Blog</p>
                            </a>
                        </div>
                        <div className="col-2 pt-footer-global d-none d-lg-block">
                            <h5 className="mb-4 footer-h5">Engage</h5>
                            <a href="/">
                                <p>Coffe Shop ?</p>
                            </a>
                            <a href="/">
                                <p>FAQ</p>
                            </a>
                            <a href="/">
                                <p>About Us</p>
                            </a>
                            <a href="/">
                                <p>Privacy Policy</p>
                            </a>
                            <a href="/">
                                <p>Terms of Service</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    )
}

export default Footer