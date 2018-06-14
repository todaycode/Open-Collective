import React from 'react'
import Event from '../components/Event';
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import enUS from '../lang/en-US.json';
// import frFR from '../lang/fr-FR.json';

addLocaleData([...en, ...fr, ...es]);
addLocaleData({
    locale: 'en-US',
    parentLocale: 'en',
});
class EventPage extends React.Component {
  render() {
    const { collectiveSlug, eventSlug } = this.props.params;
    return (
      <IntlProvider locale="en-US" messages={enUS}>
        <style jsx global>{`
        @font-face {
          font-family: 'montserratlight';
          src: url('../fonts/montserrat/montserrat-light-webfont.eot');
          src: url('../fonts/montserrat/montserrat-light-webfont.eot?#iefix') format('embedded-opentype'),
            url('../fonts/montserrat/montserrat-light-webfont.woff2') format('woff2'),
            url('../fonts/montserrat/montserrat-light-webfont.woff') format('woff'),
            url('../fonts/montserrat/montserrat-light-webfont.ttf') format('truetype'),
            url('../fonts/montserrat/montserrat-light-webfont.svg#montserratlight') format('svg');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'lato';
          src: url('../fonts/montserrat/lato-regular.ttf') format('truetype');
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
          font-family: 'montserratlight';
          font-weight: 400;
          font-size: 14px;
          font-size: 1.4rem;
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

        h1 {
          text-align: center;
          margin: 40px 0px 20px;
          font-family: 'montserratlight';
          font-size: 2rem;
          font-weight: bold;
        }

        .content {
            max-width: 620px;
            padding: 5px;
            margin: 0 auto;
        }

        .eventDescription {
            margin: 1rem;
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

        .location {
          text-align: center;
        }

        .location .description {
            margin: 30px 10px;
        };

        .location .name {
          font-size: 1.6rem;
          font-family: 'montserratlight';
          margin: 5px 0px;
        };

        .location .address {
          font-family: 'lato';
        }
        `}
        </style>
        <Event collectiveSlug={collectiveSlug} eventSlug={eventSlug} />
      </IntlProvider>
    );
  }
}

export default EventPage;
