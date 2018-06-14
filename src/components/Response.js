import React from 'react';
import colors from '../constants/colors';

import { defineMessages, injectIntl } from 'react-intl';

const star = '/static/images/icons/star.svg';

const avatar1 = '/static/images/avatar-01.svg';
const avatar2 = '/static/images/avatar-02.svg';
const avatar3 = '/static/images/avatar-03.svg';
const avatar4 = '/static/images/avatar-04.svg';

const avatars = [avatar1, avatar2, avatar3, avatar4];

class Response extends React.Component {

  static propTypes = {
    response: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.messages = defineMessages({
      INTERESTED: { id: 'response.status.interested', defaultMessage: '{name} is interested' },
      YES: { id: 'response.status.yes', defaultMessage: '{name} is going' }
    });

  }

  pickAvatar(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return avatars[sum % 4];
  }

  render() {
    const { intl, response } = this.props;
    const { user, description, status } = response;

    const name = ((user.name && user.name.match(/^null/)) ? null : user.name) || user.email && user.email.substr(0, user.email.indexOf('@'));

    if (!name) return (<div/>);

    const avatar = user.avatar || this.pickAvatar(name);

    const linkTo = `https://opencollective.com/${user.username}`;
    const title = intl.formatMessage(this.messages[status], { name });

    return (
      <a href={linkTo} title={title} >
        <style jsx>{`
        .Response {
          display: flex;
          align-items: center;
          width: 100%;
          margin: 10px;
          max-width: 300px;
          float: left;
          position: relative;
        }
        
        img {
          float: left;
          width: 45px;
          border-radius: 50%;
        }

        .bubble {
            padding: 10px;
        }

        .name {
            font-family: 'montserratlight';
            font-size: 1.7rem;
        }

        .description {
          font-family: 'lato';
          font-size: 1.4rem;
        }

        .star {
          width: 14px;
          height: 14px;
          position: absolute;
          top: 45px;
          left: 0;
        }
        `}</style>
        <div className="Response">
          { status === 'INTERESTED' && <object title={title} type="image/svg+xml" data={star} className="star" /> }
          <img src={avatar} />
          <div className="bubble">
            <div className="name">{name}</div>
            <div className="description" style={{color: colors.darkgray}}>{description || user.description}</div>
          </div>
        </div>
      </a>
    )
  }

}

export default injectIntl(Response);