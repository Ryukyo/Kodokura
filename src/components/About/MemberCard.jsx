import React from 'react';

//img
import gitLogo from './img/github-logo.png';
import linkinLogo from './img/linkedin.png';

export default function MemberCard ({ img, name, role, git, linkIn }) {
    return (
        <section className="member">
            <img src={img} alt="picture" className="member-pic"/>
            <div>
                <p className="member-name">{name}</p>
                <p className="member-role">{role}</p>
            </div>
            <nav className="sns-logo">
                <a href={git} target="_blank"><img src={gitLogo} alt="git-logo"/></a>
                <a href={linkIn} target="_blank"><img src={linkinLogo} alt="linkedin-logo"/></a>
            </nav>
        </section>
    )
}