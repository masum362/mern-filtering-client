import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../../components/logo/Logo'

const Footer = () => {
  return (
    <footer className="footer bg-black text-white p-10">
      <aside>
      <Link to={"/"} className='font-mono text-4xl uppercase italic'>The Find</Link>

        <p>
          Find your fevorites in here.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Trending products</a>
        <a className="link link-hover">Hot Deals</a>
        <a className="link link-hover">Free Shipping</a>
        <a className="link link-hover">Vouchers</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer