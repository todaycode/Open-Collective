import React from 'react'
import Head from 'next/head';
import TopBar from './TopBar';

import { truncate } from '../lib/utils';

class Header extends React.Component {

  constructor(props) {
    super(props);
    const { description, image, twitterHandle, scripts } = props;
    const meta = {
      'twitter:site': 'opencollect',
      'twitter:creator': twitterHandle, 
      'fb:app_id': '266835577107099',
      'og:image': image,
      'description': truncate(description, 256)
    };

    const scriptsUrls = {
      stripe: "https://js.stripe.com/v2/",
      google: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRLIexl7EkMQk_0_yNsjO4Vqb_MccD-RI&libraries=places"
    };

    this.scripts = [];
    if (scripts) {
      scripts.map(script => this.scripts.push(scriptsUrls[script]));
    }

    this.meta = [];
    for (const name in meta) {
      this.meta.push({
        name,
        content: meta[name]
      })
    }
  }

  render() {
    const { title, className } = this.props;
    return (
    <header>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet" />
        <title>{title}</title>
        {this.meta.map(({name, content}) => <meta property={name} content={content} />)}
        {this.scripts.map((script) => <script type="text/javascript" src={script} />)}
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
        font-size: 62.5%;
        height: 100%;
        width: 100%;
      }

      body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-family: Lato,Helvetica,sans-serif;
        font-weight: 300;
        font-size: 1.6rem;
        line-height: 1.5;
        overflow-x: hidden;
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

      a {
        text-decoration: none;
      }

      section {
        margin: 3rem 0px;
        overflow: hidden;
      }

      h1, h2, h3, h4 {
        font-family: 'montserratlight';
      }

      h1 {
        text-align: center;
        margin: 40px 0px 20px;
        font-size: 2rem;
        font-weight: bold;
      }

      .content {
        max-width: 768px;
        padding: 1rem;
        margin: 0 auto;
        line-height: 1.5;
      }

      .content h2 {
        font-size: 1.8rem;
      }

      .content h3 {
        font-size: 1.7rem;
      }

      .content > ul {
        padding-left: 3rem;
      }

      .content img {
        max-width: 100%;
      }

      .content code {
        background-color: #f6f8fa;
        padding: 0.5rem;
        overflow: scroll;
        max-width: 100%;
      }

      .content code:first-child:last-child {
        display: inline-block;
        padding: 1rem;
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

      .tier {
        margin: 40px auto;
      }

      label {
        line-height: 4.2rem;
        margin: 0.5rem 0;
        vertical-align: top;
      }

      input[type=text], select, textarea {
        height: 4.2rem;
        border: 1px solid rgba(48,50,51,0.2);
        border-radius: 5px;
        box-shadow: inset 0px 2px 0px rgba(0,0,0,0.05);
        padding: 5px;
        font-size: 1.8rem;
      }

      textarea {
        height: 12.6rem;
      }

      button {
        cursor: pointer;
      }

      label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
      }

      .row {
        display: flex;
        flex-direction: row;
      }

      `}
      </style>
      <TopBar className={className} />
    </header>
    );
  }
}

export default Header;
