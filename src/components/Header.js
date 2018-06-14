import React from 'react'
import Head from 'next/head';
import TopBar from './TopBar';

import { truncate, getQueryParams } from '../lib/utils';
import storage from '../lib/storage';
import colors from '../constants/colors';

class Header extends React.Component {

  constructor(props) {
    super(props);
    const { description, image, twitterHandle } = props;
    const meta = {
      'twitter:site': 'opencollect',
      'twitter:creator': twitterHandle, 
      'fb:app_id': '266835577107099',
      'og:image': image,
      'description': truncate(description, 256)
    };

    this.meta = [];
    for (const name in meta) {
      this.meta.push({
        name,
        content: meta[name]
      })
    }
  }

  componentDidMount() {
    const urlParams = getQueryParams();
    if (urlParams.referral) {
      storage.set('referral', urlParams.referral, 48 * 60 * 60 * 1000); // we keep the referral for 48h or until we receive a new ?referral=
    }
    if (urlParams.matchingFund) {
      storage.set('matchingFund', urlParams.matchingFund, 1 * 60 * 60 * 1000); // we keep the matchingFund for 1h or until we receive a new ?matchingFund=
    }
  }

  render() {
    const { css, className } = this.props;
    let title = this.props.title || "Open Collective - open your finances to your community";
    if (!title.match(/open collective/i)) {
      title += ` - Open Collective`;
    }
    return (
    <header>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:logo" content="/static/images/opencollectiveicon240x240" size="240x240" />
        <meta property="og:logo" content="/static/images/opencollectiveicon48x48" size="48x48" />
        <meta property="og:logo" content="/static/images/opencollectivelogo480x80" size="480x80" />
        <meta property="og:logo" content="/static/images/opencollectivelogo480x80@2x" size="960x160" />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Rubik" />
        { css && <link rel="stylesheet" href={css} /> }
        <title>{title}</title>
        { this.meta.map(({name, content}, index) => <meta property={name} content={content} key={`meta-${index}`} />) }
      </Head>

      <style jsx global>{`
      @font-face {
        font-family: 'montserratlight';
        src: url('/static/fonts/montserrat/montserrat-light-webfont.eot');
        src: url('/static/fonts/montserrat/montserrat-light-webfont.eot?#iefix') format('embedded-opentype'),
          url('/static/fonts/montserrat/montserrat-light-webfont.woff2') format('woff2'),
          url('/static/fonts/montserrat/montserrat-light-webfont.woff') format('woff'),
          url('/static/fonts/montserrat/montserrat-light-webfont.ttf') format('truetype'),
          url('/static/fonts/montserrat/montserrat-light-webfont.svg#montserratlight') format('svg');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'lato';
        src: url('/static/fonts/montserrat/lato-regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      html {
        --charcoal-grey-two: #373a3d;
        --charcoal-grey-three: #45484c;
        --main-custom-color: #8f47b3;
        --silver-four: #e1e4e6;
        --cool-grey: #9ea2a6;
        --attention: #e69900;
        --gunmetal: #505559;
      }

      body.showModal {
        overflow: hidden;
      }
      body.showModal .EventPage {
        filter: blur(3px); background: rgba(0,0,0,0.6);
      }

      body > div:first-child {
        position: relative;
        min-height: 100%;
      }

      @media(max-width: 600px) {
        html {
          font-size: 55%;
        }
      }

      #root {
        height: 100%;
      }

      .EventPage {
        position: relative;
        height: 100%;
      }

      @media(max-width: 600px) {
        .showModal .EventPage {
          display: none;
        }
      }

      section {
        margin: 3rem 0px;
        overflow: hidden;
      }

      h1, h2, h3, h4 {
        font-family: 'lato','montserratlight';
      }

      h1 {
        text-align: center;
        margin: 40px 0px 20px;
        font-size: 1.8rem;
        font-weight: bold;
      }

      .getTicketForm {
        margin: 20px auto;
        max-width: 400px;
      }

      .map {
        border: 1px solid #eee;
        height: 300px;
        position: relative;
      }

      .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      .btn-primary {
        background-color: ${colors.blue};
        border-color: ${colors.blue};
      }

      .clear {
        clear: both;
      }

      .pullLeft {
        float: left;
      }      

      .pullRight {
        float: right;
      }

      .hidden {
        display: none;
      }

      .mobileOnly {
        display: none;
      }
      .mediumScreenOnly {
        display: none;
      }
      .desktopOnly {
        display: none;
      }
      @media(min-width: 1024px) {
        .desktopOnly {
          display: inherit !important;
        }
      }
      @media(min-width: 420px) and (max-width: 1024px) {
        .mediumScreenOnly {
          display: inherit !important;
        }
      }
      @media(max-width: 420px) {
        .mobileOnly {
          display: inherit !important;
        }
      }

      `}
      </style>
<<<<<<< HEAD
      <TopBar className={className} />
=======
      <div id="top" />
      <TopBar className={className} LoggedInUser={this.props.LoggedInUser} />
>>>>>>> 0c1d867... updated design and fixed e2e tests
    </header>
    );
  }
}

export default Header;
