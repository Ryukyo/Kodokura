import React from 'react'
import { Link } from 'react-router-dom';

//components
import MemberCard from './MemberCard';

//img
import logo from '../Utility/img/logo-wh.png';
import backIcon from '../Utility/img/back.svg';
import edu from './img/edu.jpg';
import flo from './img/flo.jpg';
import phi from './img/phi.jpg';
import tom from './img/tom.png';
import vin from './img/vin.jpg';

export default function About () {

    return (
        <div className="about">
            <nav className="navbar">
                <Link to="/">
                <img src={backIcon} alt="back"/>
                </Link>
                <p>About us</p>
            </nav>

            <header>
                <p>Meet the Team</p>
            </header>
            <MemberCard img={edu} name="Eduardo" role="Frontend Developer" git="https://github.com/eduru" linkIn="" />
            <MemberCard img={flo} name="Florian" role="Fullstack Developer" git="https://github.com/Ryukyo" linkIn="" />
            <MemberCard img={phi} name="Philippe" role="Frontend Developer"  git="https://github.com/pw-yuu" linkIn="https://linkedin.com/in/philippe-huynh-0a7151109" />
            <MemberCard img={tom} name="Tomoyuki" role="Fullstack Developer" git="https://github.com/bakisunsan" linkIn="" />
            <MemberCard img={vin} name="Vincent" role="Frontend Developer" git="https://github.com/TwenLeMammouth" linkIn="" />
        </div>
    )
}