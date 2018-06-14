import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import TopBarProfileMenu from './TopBarProfileMenu';
<<<<<<< HEAD
import { Link } from '../server/pages';
>>>>>>> df13894... fix /signin
=======
>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow
=======
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchIcon from './SearchIcon';
import TopBarProfileMenu from './TopBarProfileMenu';
<<<<<<< HEAD
import { FormattedMessage } from 'react-intl';
>>>>>>> 72e482d... Better status in top bar for logging in / logging out
=======
import { defineMessages, FormattedMessage } from 'react-intl';
import withIntl from '../lib/withIntl';
>>>>>>> 3517ef1... Link OC Logo to homepage, fix edit tickets and Latest Expense title

const logo = '/static/images/opencollective-icon.svg';

class TopBar extends React.Component {

<<<<<<< HEAD
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
=======
  static propTypes = {
    LoggedInUser: PropTypes.object.isRequired,
    showSearch: PropTypes.bool,
  }

  static defaultProps = {
    showSearch: true,
  }

<<<<<<< HEAD
>>>>>>> 72e482d... Better status in top bar for logging in / logging out
=======
  constructor(props) {
    super(props);
    this.messages = defineMessages({
      'menu.homepage': { id: 'menu.homepage', defaultMessage: `Go to Open Collective Homepage`}
    });
  }

>>>>>>> 3517ef1... Link OC Logo to homepage, fix edit tickets and Latest Expense title
  onClickSubscriptions(e) {
    this.props.pushState(null, '/subscriptions')
    this.toggleProfileMenu(e);
  }

  renderProfileMenu() {
    const { LoggedInUser } = this.props;

    return (
      <div className="LoginTopBarProfileMenu" onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <div>
          <div className="LoginTopBarProfileMenuHeading">
            <span>collectives</span>
            <div className="-dash"></div>
          </div>
          <ul>
            {this.showCreateBtn && <li><a href="/create">create a collective</a></li>}
            <li><a href="/discover"><FormattedMessage id="menu.discover" defaultMessage="discover" /></a></li>
            <li><a href="#" onClick={this.onClickSubscriptions.bind(this)}>Subscriptions</a></li>
          </ul>
        </div>
        <div>
          <div className="LoginTopBarProfileMenuHeading">
            <span><FormattedMessage id="menu.myAccount" defaultMessage="My account" /></span>
            <div className="-dash"></div>
          </div>
          <ul>
            <li><a href={`/${LoggedInUser.username}`}><FormattedMessage id="menu.profile" defaultMessage="Profile" /></a></li>
          </ul>
          <ul>
            <li><a className="-blue" href="#" onClick={this.onClickLogout.bind(this)}><FormattedMessage id="menu.logout" defaultMessage="Logout" /></a></li>
          </ul>
        </div>
      </div>
    )
  }

>>>>>>> df13894... fix /signin
  render() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const {className} = this.props;
=======
    const { className, LoggedInUser } = this.props;
=======
    const { className, LoggedInUser, intl } = this.props;
>>>>>>> 3517ef1... Link OC Logo to homepage, fix edit tickets and Latest Expense title
=======
    const { className, LoggedInUser, intl, showSearch } = this.props;
>>>>>>> 74c02fa... feat(TopBar): add responsive search input

>>>>>>> fa600af... fix for 404 when click on create event, better signin/signoff flow
    return (
      <div className={classNames(className, 'TopBar')}>
        <style jsx>{`
        .TopBar {
          width: 100%;
          position: relative;
        }
        .logo {
          margin: 1rem;
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
          top: 0;
          right: 2rem;
          padding-top: 1rem;
          display: flex;
          align-items: center;
        }
        ul {
          display: inline-block;
          min-width: 20rem;
          list-style: none;
          text-align: right;
          margin: 0;
          padding-left: 1rem;
        }
        li {
          display: inline-block;
          text-transform: capitalize;
        }
        .separator {
          display: inline-block;
          width: 0.1rem;
          margin: 0 1rem;
          height: 3rem;
          height: 4rem;
          background-color: #e6e6e6;
          vertical-align: middle;
        }
        @media(max-width: 380) {
          ul {
            display: none;
          }
        }
        .TopBar .nav a {
          box-sizing: border-box;
          display: inline-block;
          font-size: 1.2rem;
          letter-spacing: 0.1rem;
          color: #b4bbbf;
          padding: 0.4rem 1.6rem;
          cursor: pointer;
        }
        .TopBar .nav a:last-child {
          margin-right: 0;
          padding-right: 0;
        }

        .topbar-search-form {
          padding: 1rem;
          width: 100%;
        }

        .topbar-search-container {
          align-items: center;
          border: solid 1px var(--silver-four);
          border-radius: 2px;
          display: flex;
          justify-content: space-between;
        }

        .topbar-search-input {
          background-color: white;
          border: none;
          font-size: 1.2rem;
          letter-spacing: 0.1rem;
          padding: 1rem;
          width: 80%;
        }

        .topbar-search-input:focus ~ .topbar-search-button {
          background-color: var(--fade-blue);
        }

        .topbar-search-button {
          appearance: none;
          background-color: var(--silver-four);
          border: none;
          border-radius: 2px;
          display: flex;
          margin-right: 5px;
          padding: 5px;
        }

        @media(min-width: 500px) {
          .topbar-search-form {
            display: inline-block;
            max-width: 30rem;
            min-width: 10rem;
            width: 40%;
          }
        }
        `}</style>
        <a href="/" title={intl.formatMessage(this.messages['menu.homepage'])}><img src={logo} width="40" height="40" className="logo" alt="Open Collective logo" /></a>

        {showSearch && (
          <form action="/search" method="GET" className="topbar-search-form">
            <div className="topbar-search-container">
              <input type="search" name="q" placeholder="Search Open Collective" className="topbar-search-input" />
              <button className="topbar-search-button">
                <SearchIcon size={16} />
              </button>
            </div>
          </form>
        )}

        <div className="nav">
          <ul className="mediumScreenOnly">
            <li><a className="menuItem" href="/learn-more"><FormattedMessage id="menu.howItWorks" defaultMessage="How it works" /></a></li>
            <li><a className="menuItem" href="/discover"><FormattedMessage id="menu.discover" defaultMessage="discover" /></a></li>
            <li><a className="menuItem" href="https://medium.com/open-collective"><FormattedMessage id="menu.blog" defaultMessage="Blog" /></a></li>
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

export default withIntl(TopBar);
