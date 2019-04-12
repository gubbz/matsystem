import React, { Component } from 'react'

export default class LandingHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (window.innerWidth >= 992) {
      return (
        <div className="LandingHeader">
          <div className="LandingLogo"><h1>mealrate</h1></div>
          <div className="LandingHeaderLink">Varför Mealrate</div>
          <div className="LandingHeaderLink">Hur fungerar det?</div>
          <div className="LandingHeaderLink">Kontakta oss</div>
          <div className="LandingLogin">Logga in</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="MobileLandingHeader">
            <div className="LandingLogo"><h1>mealrate</h1></div>
            <div className="LandingLogin">Logga in</div>
          </div>
        </div>
      );
    }
  }
}
