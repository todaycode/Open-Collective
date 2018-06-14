import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import { addCollectiveCoverData, addGetLoggedInUserFunction } from '../graphql/queries';
import Loading from '../components/Loading';
import NotFound from '../components/NotFoundPage';
import ErrorPage from '../components/ErrorPage';
import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import MenuBar from '../components/MenuBar';
import UpdateWithData from '../components/UpdateWithData';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl'
import { defineMessages } from 'react-intl';

class UpdatePage extends React.Component {

  static getInitialProps (props) {
    const { query: { collectiveSlug, updateSlug }, data } = props;
    return { collectiveSlug, updateSlug, data }
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.messages = defineMessages({
      'collective.contribute': { id: 'collective.contribute', defaultMessage: 'contribute' }
    });
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser(this.props.collectiveSlug);
    this.setState({LoggedInUser});
  }

  render() {
    const { intl, data, updateSlug } = this.props;
    const { LoggedInUser } = this.state;

    if (data.loading && !data.Collective) return (<Loading />);
    if (!data.Collective) return (<NotFound />);

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<ErrorPage message="GraphQL error" />)
    }

    const collective = data.Collective;

    return (
      <div className="UpdatePage">

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
            cta={{ href: `#contribute`, label: intl.formatMessage(this.messages['collective.contribute']) }}
            href={`/${collective.slug}`}
            />

          <div className="content" >
            <UpdateWithData
              collectiveSlug={collective.slug}
              updateSlug={updateSlug}
              editable={true}
              LoggedInUser={LoggedInUser}
              />
          </div>

        </Body>

        <Footer />

      </div>
    );
  }

}

export default withData(addGetLoggedInUserFunction(addCollectiveCoverData(withIntl(UpdatePage))));