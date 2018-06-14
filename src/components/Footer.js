import React from 'react';
import Link from '../components/Link';

class Footer extends React.Component {

  render() {

    return (
      <div className="Footer">
        <style jsx>{`
        .Footer {
          background-color: #303233;
          margin-top: 2rem;
          overflow: hidden;
          position: absolute;
          bottom: 0;
          min-height: 7.5rem;
          width: 100%;
          padding: 1rem;
        }
        .content {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1244px;
          margin: 0 auto;
        }
        .logo {
          margin-top: 8px;
        }
        ul {
          list-style: none;
          margin: 0;
          padding-left: 0;
          text-align: center;
        }
        .Footer li {
          display: inline-block;
          margin: 0;
        }
        .Footer li :global(a) {
          opacity: 0.5;
          color: white;
          font-size: 1.2rem;
          font-weight: 300;
          font-family: montserratlight,arial,sans-serif;
          text-decoration: none;
          padding: 1rem;
          display: block;
          margin: 0;
        }
        @media(max-width: 600px) {
          .content {
            flex-direction: column;
          }
        }
        :global(svg #logotype) {
          fill: red;
        }
        `}</style>
        <div className="content">
          <div>
            <object ref="svg" type="image/svg+xml" data="/static/images/opencollectivelogo-footer.svg" height='20' className="logo"></object>
          </div>
          <div>
            <nav>
              <ul>
                <li><a href="/learn-more">How It Works</a></li>
                <li><a href="https://opencollective.com/#opensource">Use Cases</a></li>
                <li><a href="https://opencollective.com/faq">FAQ</a></li>
                <li><a href="https://forum.opencollective.com">Forum</a></li>
                <li><a href="https://medium.com/open-collective">Blog</a></li>
                <li><Link route="/tos">Terms Of Service</Link></li>
                <li><a href="https://opencollective.com/about">About</a></li>
                <li><a href="mailto:info@opencollective.com">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

