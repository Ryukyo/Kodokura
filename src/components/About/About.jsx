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

            <main>

                <section>
                    <header>
                        <p>Meet the Team</p>
                    </header>
                    <MemberCard img={edu} name="Eduardo" role="Frontend Developer" git="https://github.com/eduru" linkIn="https://www.linkedin.com/in/eduru/" />
                    <MemberCard img={flo} name="Florian" role="Fullstack Developer" git="https://github.com/Ryukyo" linkIn="https://www.linkedin.com/in/florian-fejer/" />
                    <MemberCard img={phi} name="Philippe" role="Frontend Developer"  git="https://github.com/pw-yuu" linkIn="https://linkedin.com/in/philippe-huynh-0a7151109" />
                    <MemberCard img={tom} name="Tomoyuki" role="Fullstack Developer" git="https://github.com/bakisunsan" linkIn="https://www.linkedin.com/in/kobayashi-tomoyuki/" />
                    <MemberCard img={vin} name="Vincent" role="Frontend Developer" git="https://github.com/TwenLeMammouth" linkIn="https://www.linkedin.com/in/vincent-groslier/" />
                </section>
                <section className="about-section">
                    <header>
                        <p>About Kodokura</p>
                    </header>
                    <p>
                    A desire to belong is deeply rooted in people. That's because our ancestors depended on group cohesion to survive.<br/><br/>
                    Unfortunately we are experiencing a loneliness epidemic that is growing up every year…<br/><br/>
                    Kodokura will help you to quickly connect with others so you wont feel lonely anymore.
                    </p>

                    <hr/>

                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

                </section>
            </main>
        </div>
    )
}