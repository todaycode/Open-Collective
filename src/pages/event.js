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

<<<<<<< HEAD
<<<<<<< HEAD
    if (LoggedInUser) {
      LoggedInUser.canEditEvent = (event.createdByUser && event.createdByUser.id === LoggedInUser.id) 
<<<<<<< HEAD
        || intersection(LoggedInUser.roles[slug], ['HOST','ADMIN']).length
        || intersection(LoggedInUser.roles[parentCollectiveSlug], ['HOST','ADMIN']).length;
=======
    if (LoggedInUser && !LoggedInUser.canEditEvent) {
<<<<<<< HEAD
      LoggedInUser.canEditEvent = LoggedInUser.membership && (['HOST', 'MEMBER'].indexOf(LoggedInUser.membership.role) !== -1 || event.createdByUser.id === LoggedInUser.id);
=======
        || intersection(LoggedInUser.roles[slug], ['HOST','ADMIN']).length > 0
        || intersection(LoggedInUser.roles[parentCollectiveSlug], ['HOST','ADMIN']).length > 0;

>>>>>>> a50b96f... add view all expenses/transactions
=======
      LoggedInUser.canEditEvent = LoggedInUser.membership && (['HOST', 'MEMBER'].indexOf(LoggedInUser.membership.role) !== -1 || event.createdByUser && event.createdByUser.id === LoggedInUser.id);
>>>>>>> b866beb... fix for no  event.createdByUser
      if (LoggedInUser.canEditEvent) {
        // We refetch the data to get the email addresses of the participants
        // We need to bypass the cache otherwise it won't update the list of participants with the email addresses
        data.refetch({ options: { fetchPolicy: 'network-only' }});
      }
>>>>>>> 137a983... fetch email addresses to export members
=======
    if (LoggedInUser && LoggedInUser.canEditEvent(event)) {
      // We refetch the data to get the email addresses of the participants
      // We need to bypass the cache otherwise it won't update the list of participants with the email addresses
      data.refetch({ options: { fetchPolicy: 'network-only' }});
>>>>>>> 620c5df... Show edit event button
    }

    return (
      <div>
        <Event event={event} LoggedInUser={LoggedInUser} />
      </div>
    );
  }
}

export default withData(addGetLoggedInUserFunction(addEventCollectiveData(withIntl(EventPage))));
