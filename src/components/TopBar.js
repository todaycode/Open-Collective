import React from 'react';
<<<<<<< HEAD
=======
import TopBarProfileMenu from './TopBarProfileMenu';
<<<<<<< HEAD
import { Link } from '../server/pages';
>>>>>>> df13894... fix /signin
=======
>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow

const logo = '/static/images/opencollective-icon.svg';

class TopBar extends React.Component {

<<<<<<< HEAD
<<<<<<< HEAD
=======
  constructor(props) {
    super(props);
    this.state = {
      showProfileMenu: false
    };
  }

  componentDidMount() {
    this.onClickOutsideRef = this.onClickOutside.bind(this);
    document.addEventListener('click', this.onClickOutsideRef);
    if (typeof window !== 'undefined') {
      this.redirect = window.location.href.replace(/^https?:\/\/[^\/]+/,'');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutsideRef);
  }

  onClickOutside() {
    this.setState({showProfileMenu: false});
  }

  toggleProfileMenu(e) {
    if (e.target.className.indexOf('LoginTopBarProfileButton') !== -1) {
      this.setState({showProfileMenu: !this.state.showProfileMenu});
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  onClickLogout(e) {
    this.props.logout();
    this.toggleProfileMenu(e);
  }

=======
>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow
  onClickSubscriptions(e) {
    this.props.pushState(null, '/subscriptions')
    this.toggleProfileMenu(e);
  }
  
  renderProfileMenu() {
    const { LoggedInUser } = this.props;

    return (
      <div className='LoginTopBarProfileMenu' onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <div>
          <div className='LoginTopBarProfileMenuHeading'>
            <span>collectives</span>
            <div className='-dash'></div>
          </div>
          <ul>
          {this.showCreateBtn && <li><a href='/create'>create a collective</a></li>}
          <li><a href='/discover'>Discover</a></li>
            <li><a href='#' onClick={this.onClickSubscriptions.bind(this)}>Subscriptions</a></li>
          </ul>
        </div>
        <div>
          <div className='LoginTopBarProfileMenuHeading'>
            <span>my account</span>
            <div className='-dash'></div>
          </div>
          <ul>
            <li><a href={`/${LoggedInUser.username}`}>Profile</a></li>
          </ul>
          <ul>
            <li><a className='-blue' href='#' onClick={this.onClickLogout.bind(this)}>Logout</a></li>
          </ul>
        </div>
      </div>
    )
  }

>>>>>>> df13894... fix /signin
  render() {
<<<<<<< HEAD
    const {className} = this.props;
=======
    const { className, LoggedInUser } = this.props;

>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow
    return (
      <div className={`${className} TopBar`}>
        <style jsx>{`
        .TopBar {
          height: 60px;
          width: 100%;
          position: relative;
        }
        .logo {
          margin: 10px;
        }
        .loading .logo {
          animation: oc-rotate 0.8s infinite linear;
        }
        @keyframes oc-rotate {
          0%    { transform: rotate(0deg); }
          100%  { transform: rotate(360deg); }
        }
        .nav {
          box-sizing: border-box;
          position: absolute;
          top: 0px;
          right: 20px;
          padding-top: 10px;
        }
        ul {
          display: inline-block;
          min-width: 200px;
          list-style: none;
          text-align: right;
          margin: 0;
          padding-left: 10px;
          padding-right: 10px;
        }
        li {
          display: inline-block;
        }
        .separator {
          display: inline-block;
          width: 1px;
          margin: 0 5px;
          height: 30px;
          height: 40px;
          background-color: #e6e6e6;
          vertical-align: middle;
        }
        @media(max-width: 380px) {
          ul {
            display: none;
          }
        }
        `}</style>
        <style jsx global>{`
        .TopBar .nav a {
          box-sizing: border-box;
          display: inline-block;
          font-size: 12px;
          letter-spacing: 1px;
          text-align: center;
          color: #b4bbbf;
          text-transform: capitalize;
          padding: 4px 16px;
          cursor: pointer;
        }
        .TopBar .nav a:last-child {
          margin-right: 0;
          padding-right: 0;
        }
        `}</style>
        <img src={logo} width="40" height="40" className="logo" alt="Open Collective logo" />
        <div className="nav">
          <ul className="mediumScreenOnly">
            <li><a href="/learn-more">How it works</a></li>
            <li><a href="/discover">Discover</a></li>
            <li><a href="https://medium.com/open-collective">Blog</a></li>
          </ul>
          <div className="separator"></div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <a href="/login?next=/">Login</a>
=======
          { !LoggedInUser && <a href="/signin?next=/">Login</a> }
=======
          { !LoggedInUser && <Link route="signin" params={ { next: this.redirect } }><a>Login</a></Link> }
>>>>>>> df13894... fix /signin
          { LoggedInUser && <TopBarProfileMenu LoggedInUser={LoggedInUser} /> }
>>>>>>> 2b606ab... using /signin - white title for cover - ...
=======
          <TopBarProfileMenu LoggedInUser={LoggedInUser} />
>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow
        </div>
      </div>
    )
  }
}

export default TopBar;