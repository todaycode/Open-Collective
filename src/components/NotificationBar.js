import React from 'react';
import logo from '../logo.svg';

class NotificationBar extends React.Component {

  static propTypes = {
    status: React.PropTypes.string,
    error: React.PropTypes.string
  }

  render() {

    return (
      <div className={`${this.props.status} NotificationBar`}>
        <style>{`
        .oc-message {
          position: fixed;
          top: -70px;
          transition: top 1s cubic-bezier(0.45, 0, 1, 1);
          left: 0;
          height: 60px;
          background: white;
          box-shadow: 0px 2px 10px rgba(0,0,0,0.5);
          width: 100%;
          z-index: 1000;
        }
        .oc-message .logo {
          margin: 10px;
        }
        .error .oc-message {
          position: fixed;
          top: 0;
        }

        .loading .oc-progress-bar {
          position:fixed;
          bottom: 0;
          top: auto;
        }
        .oc-progress-bar {
          position: relative;
          width: 100%;
        }
        .oc-bar {
          display: none;
          background-size: 23em 0.25em;
          height: 4px;
          width: 100%;
          position: relative;
          background-color: #46B0ED;
        }
        .loading .oc-bar {
          display: block;
          animation: oc-cssload-width 3.45s cubic-bezier(0.45, 0, 1, 1) infinite;
        }
        .error .oc-message {
          display: flex;
          align-items: center;
        }
        .error .oc-message p {
          margin:0;
        }
        @keyframes oc-cssload-width {
          0%, 100% {
            transition-timing-function: cubic-bezier(1, 0, 0.65, 0.85);
          }
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        `}</style>
        <div className="oc-message">
          <img src={logo} width="40" height="40" className="logo" alt="Open Collective logo" />
          <p>{this.props.error}</p>
        </div>
        <div className="oc-progress-bar">
          <div className="oc-bar" />
        </div>
      </div>
    )
  }


}

export default NotificationBar;