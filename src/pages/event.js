import withData from '../lib/withData'
import withIntl from '../lib/withIntl';
import React from 'react'
import { addEventCollectiveData, addGetLoggedInUserFunction } from '../graphql/queries';

import NotFound from '../components/NotFoundPage';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';
import Event from '../components/Event';

class EventPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getInitialProps ({ query: { parentCollectiveSlug, eventSlug } }) {
    return { parentCollectiveSlug, eventSlug }
  }

  async componentDidMount() {
    const { getLoggedInUser } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser();
    this.setState({ LoggedInUser });
  }

  render() {
    const { data } = this.props;
    const { LoggedInUser } = this.state;

    if (data.loading) return (<Loading />);
    if (!data.Collective) return (<NotFound />);

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<ErrorPage message="GraphQL error" />)
    }

    const event = data.Collective;

    if (LoggedInUser && LoggedInUser.canEditEvent(event)) {
      // We refetch the data to get the email addresses of the participants
      // We need to bypass the cache otherwise it won't update the list of participants with the email addresses
      data.refetch({ options: { fetchPolicy: 'network-only' }});
    }

    return (
      <div>
        <Event event={event} LoggedInUser={LoggedInUser} />
      </div>
    );
  }
}

export default withData(addGetLoggedInUserFunction(addEventCollectiveData(withIntl(EventPage))));
