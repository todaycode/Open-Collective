import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import router from '../server/pages';
import HashLink from 'react-scrollchor';

const star = '/static/images/icons/star.svg';

const icons = {
  star
};

class Button extends React.Component {

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    disabled: PropTypes.bool,
    type: PropTypes.string, // e.g. type="submit"
    onClick: PropTypes.func,
    href: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { type, href, onClick, disabled } = this.props;
    if (type === "submit") return;
    e.preventDefault();
    if (href && href.substr(0,1) !== '#') {
      const routeFromRouter = router.findByName(href);
      return router.Router.pushRoute(href);
    }
    if (!onClick) return;
    return !disabled && onClick && onClick();
  }

  renderButton() {
    return (
      <button 
        type={this.props.type}
        disabled={this.props.disabled}
        style={this.props.style}
        className={`Button ${this.props.className}`}
        onClick={this.onClick} >
        <style jsx>{`
        .Button {
          --webkit-appearance: none;
          font-family: Rubik;
          font-size: 1.4rem;
          font-weight: 500;
          height: 3.6rem;
          border: 2px solid #45474D;
          border-radius: 500px;
          padding: 0 24px;
          color: #45474D;
          background-color: transparent;
        }
        .Button:hover {
          border: 2px solid #2E8AE6;
        }
        .bluewhite {
          border: 2px solid #CACBCC;
          color: #3399FF;
        }
        .Button:focus {
          outline: 0;
        }
        .Button:active {
          background-color: #297ACC;
          border-color: #297ACC;
        }
        .Button[disabled] {
          opacity: 0.24;
        }
        .Button[type=submit] {
          height: 4rem;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border: 2px solid;
          line-height: 17px;
          border-color: ${colors.lightgray};
        }
        img {
          height: 1.6rem;
          margin: 0 0.5rem;
        }
        .allcaps {
          text-transform: 'uppercase';
        }
        .whiteblue, .whiteblue :global(a) {
          color: ${colors.blue};
          background: white;
        }
        .whiteblue.small {
          width: 20rem;
        }
        .whiteblue:hover {
          box-shadow: 0 0 4px 0 rgba(63, 175, 240, 0.4);
        }
        .blue {
          color: white;
          border-color: ${colors.white};
          background-color: ${colors.blue};
        }
        .blue:hover {
          background-color: ${colors.blueHover};
        }
        .blue:active {
          background-color: ${colors.blueActive};
          border-color: ${colors.blueActive};          
        }
        .gray {
          color: ${colors.darkgray};
          border-color: ${colors.lightgray};
          background: ${colors.lightgray}
        }
        .gray:hover {
          color: ${colors.gray}
        }
        .Button :global(a) {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 5.4rem;
        }
        .green {
          color: white;
          border-color: ${colors.green};
          background: ${colors.green};
        }
        .Button :global(span) {
          white-space: nowrap;
        }
        `}</style>
        <style jsx global>{`
        .mobileOnly .Button {
          padding: 0 16px;
        }        
        `}</style>
        {this.props.icon && <img src={icons[this.props.icon]} />}
        {this.props.label && <span>{this.props.label}</span>}
        {this.props.children}
      </button>
    );
  }

  render() {
    const { href } = this.props;
    if (href && href.substr(0,1) === '#') {
      return (<HashLink to={href}>{this.renderButton()}</HashLink>)
    } else {
      return this.renderButton();
    }
  }
}

export default Button;