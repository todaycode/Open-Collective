import withData from '../lib/withData'
import React from 'react'
import { addEventData, addGetLoggedInUserFunction } from '../graphql/queries';

import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Event from '../components/Event';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en.js'; // for old browsers without window.Intl
import en from 'react-intl/locale-data/en';
import enUS from '../lang/en-US.json';
// import fr from 'react-intl/locale-data/fr';
// import es from 'react-intl/locale-data/es';
// import frFR from '../lang/fr-FR.json';

addLocaleData([...en]);
addLocaleData({
    locale: 'en-US',
    parentLocale: 'en',
});

class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getInitialProps ({ query: { collectiveSlug, eventSlug } }) {
    return { collectiveSlug, eventSlug }
  }

  async componentDidMount() {
    setTimeout(async () => {
    const res = await this.props.getLoggedInUser();
    const LoggedInUser = res.data.LoggedInUser;
    const membership = LoggedInUser.collectives.find(c => c.slug === this.props.collectiveSlug);
    LoggedInUser.membership = membership;
    LoggedInUser.canEditCollective = membership && membership.role === 'MEMBER';
    console.log("Logged in user: ", LoggedInUser);
    this.setState({LoggedInUser});
    }, 0);
  }

  render() {
    const { data } = this.props;

    if (data.loading) return (<Loading />);
    if (!data.Event) return (<NotFound />);

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<Error message="GraphQL error" />)
    }

    return (
      <IntlProvider locale="en-US" messages={enUS}>
        <div>
          <Event event={data.Event} LoggedInUser={this.state.LoggedInUser} />
        </div>
      </IntlProvider>
    );
  }
}

export default withData(addGetLoggedInUserFunction(addEventData(EventPage)));
