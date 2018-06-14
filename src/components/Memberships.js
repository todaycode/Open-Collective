import React from 'react';
import PropTypes from 'prop-types';
import Membership from './Membership';

class Collectives extends React.Component {

  static propTypes = {
    memberships: PropTypes.arrayOf(PropTypes.object).isRequired,
    LoggedInUser: PropTypes.object
  }

  render() {
    const memberships = [...this.props.memberships];

    memberships.sort((a, b) => {
      if (b.stats.totalDonations !== a.stats.totalDonations) {
        return b.stats.totalDonations - a.stats.totalDonations;
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    if (!memberships || memberships.length === 0) return (<div />);

    return (
      <div className="Collectives" >
        <style jsx>{`
        .Collectives {
          margin: 3rem auto 3rem;
          text-align: center;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        `}</style>

        {memberships.map(membership => (
          <Membership
            key={membership.id}
            membership={membership}
            LoggedInUser={this.props.LoggedInUser}
            />
          )
        )}
      </div>
    )
  }

}

export default Collectives;
