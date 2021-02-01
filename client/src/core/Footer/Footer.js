import React from 'react';
import './Footer.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import logo from '../../assets/edoo3.svg';


import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import {MdFingerprint} from 'react-icons/md';

function Footer() {
    return (
        <Router>
            <div className='footer-container'>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link to='/sign-up'>How it works</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Contact Us</h2>
                            <Link to='/'>Contact</Link>
                            <Link to='/'>Support</Link>
                            <Link to='/'>Sponsorships</Link>
                        </div>
                    </div>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>Videos</h2>
                            <Link to='/'>Submit Video</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Social Media</h2>
                            <Link to='/'>Instagram</Link>
                            <Link to='/'>Facebook</Link>
                            <Link to='/'>Youtube</Link>
                            <Link to='/'>Twitter</Link>
                        </div>
                    </div>
                </div>
                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <div className='social-logo'>
                                <img src={logo} className='navbar-icon'/>
                                <small className='website-rights'>© 2021 Edoo,LLC.All rights reserved  </small>
                            </div>
                        </div>

                        <div className='social-icons'>
                            <Link className='social-icon-link' to='/' target='_blank' aria-label='Facebook'>
                                <FaFacebook/>
                            </Link>
                            <Link className='social-icon-link' to='/' target='_blank' aria-label='Instagram'>
                                <FaInstagram/>
                            </Link>
                            <Link className='social-icon-link'
                                  target='_blank' aria-label='Youtube'>
                                <FaYoutube/>
                            </Link>
                            <Link className='social-icon-link' to='/' target='_blank' aria-label='Twitter'>
                                <FaTwitter/>
                            </Link>
                            <Link className='social-icon-link' to='/' target='_blank' aria-label='LinkedIn'>
                                <FaLinkedin/>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Router>
    );
}

export default Footer;
