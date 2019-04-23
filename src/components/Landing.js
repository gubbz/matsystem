import React, { Component } from 'react'
import LandingHeader from './LandingHeader'
import LandingFooter from './LandingFooter'
import '../styles/Landing.css'
import Stats from '../resources/stats.png'
import Friends from '../resources/friends.png'
import Process from '../resources/process.png'
import Agreement from '../resources/agreement.png'

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.scrollTop = React.createRef();
    this.scrollWhy = React.createRef();
    this.scrollHow = React.createRef();
    this.scrollContact = React.createRef();
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToWhy = this.scrollToWhy.bind(this);
    this.scrollToHow = this.scrollToHow.bind(this);
    this.scrollToContact = this.scrollToContact.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    if (window.innerWidth >= 992) {
      return (
        <div className="LandingHeader" ref={this.scrollTop}>
          <div className="LandingLogo"><h1>mealrate</h1></div>
          <div className="LandingHeaderLink" onClick={this.scrollToWhy}>Varför Mealrate</div>
          <div className="LandingHeaderLink" onClick={this.scrollToHow}>Hur fungerar det?</div>
          <div className="LandingHeaderLink" onClick={this.scrollToContact}>Kontakta oss</div>
          <div className="LandingLogin">Logga in</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="MobileLandingHeader" ref={this.scrollTop}>
            <div className="LandingLogo"><h1>mealrate</h1></div>
            <div className="LandingLogin">Logga in</div>
          </div>
        </div>
      );
    }
  }

  scrollToTop() {
    this.scrollTop.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToWhy() {
    this.scrollWhy.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToHow() {
    this.scrollHow.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToContact() {
    this.scrollContact.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    document.body.style.background = "white";
    return (
      <div className="LandingContainer">
        {this.renderHeader()}
        <section className="Section1">
          <div className="SectionText">
            <h1>Vad tycker eleverna om maten?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="Buttons">
              <button className="_FilledButton"
                onClick={this.scrollToContact}
              >Kom igång!</button>
              <button className="_OutlinedButton"
                onClick={this.scrollToWhy}
              >Läs mer</button>
            </div>
          </div>
          <div className="ImageContainer">
            <img src={Stats} alt="Bild på statistik" className="HeroImage" />
          </div>
        </section>
        <section className="Section1" ref={this.scrollWhy}>
          <div className="SectionText">
            <h2>Varför mealrate?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisl orci, hendrerit in turpis ac, placerat porttitor elit. Suspendisse non cursus enim. Etiam porta metus ultrices porta tempus.</p>
          </div>
          <div className="ImageContainer">
            <img src={Friends} alt="Bild på vänner" className="SectionImage" />
          </div>
        </section>
        <section className="Section1" ref={this.scrollHow}>
          <div className="SectionText">
            <h2>Hur fungerar det?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisl orci, hendrerit in turpis ac, placerat porttitor elit. Suspendisse non cursus enim. Etiam porta metus ultrices porta tempus.</p>
          </div>
          <div className="ImageContainer">
            <img src={Process} alt="Bild på hur systemet fungerar" className="SectionImage" />
          </div>
        </section>
        <section className="Section1" ref={this.scrollContact}>
          <div className="SectionText">
            <h2>Kom igång!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisl orci, hendrerit in turpis ac, placerat porttitor elit. Suspendisse non cursus enim. Etiam porta metus ultrices porta tempus.</p>
          </div>
          <div className="ImageContainer">
            <img src={Agreement} alt="Bild på handslag" className="AgreementImage" className="SectionImage" />
          </div>
        </section>
        <div className="LandingFooter">
          <p>© Mealrate 2019</p>
          <p>Länkar</p>
          <p className="FooterLink" onClick={this.scrollToContact}>Kontakta oss</p>
          <p className="FooterLink" onClick={this.scrollToTop}>Tillbaka till toppen</p>
        </div>
      </div>
    )
  }
}
