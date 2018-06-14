import React from 'react';
import PropTypes from 'prop-types';
import Error from '../components/Error';
import withIntl from '../lib/withIntl';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Nav, NavItem, Badge } from 'react-bootstrap';
import Currency from '../components/Currency';
import { FormattedMessage } from 'react-intl';
import { connectAccount } from '../lib/api';

class CollectivePickerWithData extends React.Component {

  static propTypes = {
    hostCollectiveSlug: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { CollectiveId: 0, connectingPaypal: false };
    this.onChange = this.onChange.bind(this);
    this.connectPaypal = this.connectPaypal.bind(this);
  }

  onChange(CollectiveId) {
    this.setState({ CollectiveId });
    this.props.onChange(CollectiveId);
  }

  async connectPaypal() {
    this.setState({ connectingPaypal: true });
    try {
      const json = await connectAccount(this.props.data.Collective.id, 'paypal');
      window.location.replace(json.redirectUrl);
    } catch (e) {
      this.setState({ connectingPaypal: false });
      console.error(e);
    }
  }

  render() {
    const { data: { loading, error, Collective } } = this.props;

    if (error) {
      console.error("graphql error>>>", error.message);
      return (<Error message="GraphQL error" />)
    }
    if (loading || !Collective) {
      return (<div />);
    }
    console.log(">>> Collective", Collective);
    const collectives = Collective.collectives;
    const selectedCollective = this.state.CollectiveId > 0 && collectives.find(c => c.id === this.state.CollectiveId);
    const paypalPaymentMethod = Collective.paymentMethods.find(pm => pm.service === 'paypal');

    return (
      <div className="CollectivesContainer">
        <style jsx>{`
          .collectivesFilter {
            display: flex;
            justify-content: center;
          }
          .collectiveBalance {
            text-align: center;
          }
          .collectiveBalance label {
            margin: 1rem 0.5rem 1rem 0;
          }
        `}</style>
        <div className="connectPaypal">
          <Button bsStyle="primary" onClick={this.connectPaypal} disabled={this.state.connectingPaypal}>
            { this.state.connectingPaypal && "Connecting..."}
            { !this.state.connectingPaypal && "Connect Paypal"}
          </Button>
        </div>
      { collectives.length > 0 &&
        <div className="collectivesFilter">
          <Nav bsStyle="pills" activeKey={this.state.CollectiveId} onSelect={this.onChange}>
            <NavItem eventKey={0} title={"show all expenses across all collectives"}>
              all
            </NavItem>
            { collectives.filter(c => c.stats.expenses.pending > 0).map(collective => (
              <NavItem key={collective.id} eventKey={collective.id} title={collective.name}>
                {collective.slug}
                <Badge pullRight={true} >{collective.stats.expenses.pending}</Badge>
              </NavItem>
            ))}
          </Nav>
        </div>
      }
      { selectedCollective &&
        <div className="collectiveBalance">
          <label><FormattedMessage id="collective.stats.balance.title" defaultMessage="Available balance:" /></label>
          <Currency value={selectedCollective.stats.balance} currency={selectedCollective.currency} />
        </div>
      }
      </div>
    );
  }
}

const getCollectivesQuery = gql`
query Collective($hostCollectiveSlug: String!) {
  Collective(slug: $hostCollectiveSlug) {
    id
    paymentMethods {
      id
      service
      createdAt
      balance
    }
    collectives {
      id
      slug
      name
      currency
      stats {
        id
        balance
        expenses {
          id
          all
          pending
          paid
          rejected
          approved
        }
      }
    }
  }
}
`;

const COLLECTIVES_PER_PAGE = 20;
export const addCollectivesData = graphql(getCollectivesQuery, {
  options(props) {
    return {
      variables: {
        hostCollectiveSlug: props.hostCollectiveSlug,
        offset: 0,
        limit: props.limit || COLLECTIVES_PER_PAGE * 2,
        includeHostedCollectives: true
      }
    }
  },
  props: ({ data }) => ({
    data,
    fetchMore: () => {
      return data.fetchMore({
        variables: {
          offset: data.allCollectives.length,
          limit: COLLECTIVES_PER_PAGE
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allCollectives: [...previousResult.allCollectives, ...fetchMoreResult.allCollectives]
          })
        }
      })
    }
  })  
});


export default addCollectivesData(withIntl(CollectivePickerWithData));