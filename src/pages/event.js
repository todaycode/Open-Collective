import withData from '../lib/withData'
import withIntl from '../lib/withIntl';
import React from 'react'
import { addEventCollectiveData, addGetLoggedInUserFunction } from '../graphql/queries';
import { intersection } from 'lodash';

import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import Error from '../components/Error';
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
    const LoggedInUser = getLoggedInUser && await getLoggedInUser(this.props.collectiveSlug);
    this.setState({ LoggedInUser });
  }

  render() {
    const { data, slug, parentCollectiveSlug } = this.props;
    const { LoggedInUser } = this.state;

    if (data.loading) return (<Loading />);
    if (!data.Collective) return (<NotFound />);

    if (data.error) {
      console.error("graphql error>>>", data.error.message);
      return (<Error message="GraphQL error" />)
    }

    const event = data.Collective;

<<<<<<< HEAD
    if (LoggedInUser) {
      LoggedInUser.canEditEvent = (event.createdByUser && event.createdByUser.id === LoggedInUser.id) 
<<<<<<< HEAD
        || intersection(LoggedInUser.roles[slug], ['HOST','ADMIN']).length
        || intersection(LoggedInUser.roles[parentCollectiveSlug], ['HOST','ADMIN']).length;
=======
    if (LoggedInUser && !LoggedInUser.canEditEvent) {
      LoggedInUser.canEditEvent = LoggedInUser.membership && (['HOST', 'MEMBER'].indexOf(LoggedInUser.membership.role) !== -1 || event.createdByUser.id === LoggedInUser.id);
=======
        || intersection(LoggedInUser.roles[slug], ['HOST','ADMIN']).length > 0
        || intersection(LoggedInUser.roles[parentCollectiveSlug], ['HOST','ADMIN']).length > 0;

>>>>>>> a50b96f... add view all expenses/transactions
      if (LoggedInUser.canEditEvent) {
        // We refetch the data to get the email addresses of the participants
        // We need to bypass the cache otherwise it won't update the list of participants with the email addresses
        data.refetch({ options: { fetchPolicy: 'network-only' }});
      }
>>>>>>> 137a983... fetch email addresses to export members
    }

    return (
      <div>
        <Event event={event} LoggedInUser={LoggedInUser} client={this.props.client} />
      </div>
    );
  }
}

export default withData(addGetLoggedInUserFunction(addEventCollectiveData(withIntl(EventPage))));
