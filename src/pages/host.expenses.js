import React from 'react';
import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import { get } from 'lodash';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ExpensesWithData from '../apps/expenses/components/ExpensesWithData';
import ExpensesStatsWithData from '../apps/expenses/components/ExpensesStatsWithData';

import { addGetLoggedInUserFunction } from '../graphql/queries';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';
<<<<<<< HEAD
import CollectivePicker from '../components/CollectivePickerWithData';

=======
import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import ExpensesWithData from '../components/ExpensesWithData';
import { get } from 'lodash';
import CollectivePicker, { AddFundsFormWithData } from '../components/CollectivePickerWithData';
import ExpensesStatsWithData from '../components/ExpensesStatsWithData';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
>>>>>>> 5d9caaa... chore(host.expenses): Move add funds form outside collective picker

class HostExpensesPage extends React.Component {

  static getInitialProps (props) {
    const { query, data } = props;
    return { collectiveSlug: query.hostCollectiveSlug, data, query, ssr: false }
  }

  constructor(props) {
    super(props);
    this.state = { selectedCollective: null, showAddFunds: false };
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser(this.props.collectiveSlug);
    this.setState({ LoggedInUser });
  }

  pickCollective = (selectedCollective) => {
    this.setState({ selectedCollective });
  }

  toggleAddFunds = () => {
    const showAddFunds = !this.state.showAddFunds;
    this.setState({ showAddFunds });
    console.log(showAddFunds);
  }

  render() {
    const { data } = this.props;
    const { LoggedInUser } = this.state;

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<ErrorPage message="GraphQL error" />)
    }

    if (!data.Collective) return (<Loading />);

    const collective = data.Collective;
    const selectedCollective = this.state.selectedCollective || collective;
    const includeHostedCollectives = (selectedCollective.id === collective.id);

    if (!collective.isHost) {
      return (<ErrorPage message="collective.is.not.host" />)
    }

    return (
      <div className="HostExpensesPage">
        <style jsx>{`
        .col.side {
          width: 100%;
          min-width: 20rem;
          max-width: 25%;
          margin-left: 5rem;
        }

        .col.large {
          margin-left: 6rem;
          min-width: 30rem;
          width: 50%;
          max-width: 75%;
        }

        @media(max-width: 600px) {
          .columns {
            flex-direction: column-reverse;
            .col {
              max-width: 100%;
            }
          }
        }
        `}</style>

        <Header
          title={collective.name}
          description={collective.description}
          twitterHandle={collective.twitterHandle}
          image={collective.image || collective.backgroundImage}
          className={this.state.status}
          LoggedInUser={LoggedInUser}
          />

        <Body>

          <CollectiveCover
            collective={collective}
            href={`/${collective.slug}`}
            className="small"
            style={get(collective, 'settings.style.hero.cover')}
            />

          <div className="content">
            <div className="col side pullLeft">
              <CollectivePicker
                query={this.props.query}
                hostCollectiveSlug={this.props.collectiveSlug}
                LoggedInUser={LoggedInUser}
                onChange={this.pickCollective}
                toggleAddFunds={this.toggleAddFunds} />
            </div>
            <div className="col large pullLeft">
              { this.state.showAddFunds &&
                <AddFundsFormWithData
                  hostCollective={collective}
                  selectedCollective={selectedCollective}
                  toggleAddFunds={this.toggleAddFunds}
                  LoggedInUser={LoggedInUser} /> }

              { !this.state.showAddFunds &&
                <div>
                  <h1 style={{ margin: '0 0 20px 0' }}>
                    { this.state.selectedCollective && (selectedCollective.name || selectedCollective.slug) }
                    { !this.state.selectedCollective && 'All' }
                    {' '} expenses
                  </h1>
                  <ExpensesWithData
                    collective={selectedCollective}
                    includeHostedCollectives={includeHostedCollectives}
                    LoggedInUser={this.state.LoggedInUser}
                    filters={true}
                    editable={true}
                  />
                </div> }
            </div>
          </div>

        </Body>

        <Footer />

      </div>
    );
  }
}

const getDataQuery = gql`
query Collective($collectiveSlug: String!) {
  Collective(slug: $collectiveSlug) {
    id
    type
    slug
    name
    currency
    backgroundImage
    settings
    image
    isHost
    paymentMethods {
      id
      uuid
      service
      createdAt
      balance
      currency
    }
  }
}
`;

export const addData = graphql(getDataQuery);
export default withData(addGetLoggedInUserFunction(addData(withIntl(HostExpensesPage))));
