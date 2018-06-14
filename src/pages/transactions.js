import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import { addCollectiveCoverData, addGetLoggedInUserFunction } from '../graphql/queries';
import NotFound from '../components/NotFoundPage';
import ErrorPage from '../components/ErrorPage';
import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import TransactionsWithData from '../components/TransactionsWithData';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl'

class TransactionsPage extends React.Component {

  static getInitialProps ({ query: { collectiveSlug }, data }) {
    return { slug: collectiveSlug, data }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser(this.props.collectiveSlug);
    this.setState({LoggedInUser});
  }

  render() {
    const { data } = this.props;
    const { LoggedInUser } = this.state;

    if (!data.Collective) return (<NotFound />);

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<ErrorPage message="GraphQL error" />)
    }

    const collective = data.Collective;

    return (
      <div className="TransactionsPage">

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
            title={<FormattedMessage id="collective.transactions.title" defaultMessage="{n, plural, one {Latest transaction} other {Latest transactions}}" values={{n: 2 }} />}
            className="small"
            style={get(collective, 'settings.style.hero.cover')}
            />

          <div className="content" >

            <TransactionsWithData
              collective={collective}
              LoggedInUser={this.state.LoggedInUser}
              showCSVlink={true}
              />

          </div>

        </Body>

        <Footer />

      </div>
    );
  }

}

export default withData(addGetLoggedInUserFunction(addCollectiveCoverData(withIntl(TransactionsPage))));
