import withData from '../lib/withData';
import withIntl from '../lib/withIntl';
import React from 'react';
import CreateEvent from '../components/CreateEvent';
<<<<<<< HEAD
import { IntlProvider, addLocaleData } from 'react-intl';
<<<<<<< HEAD
=======
=======
>>>>>>> b28dbc6... better i18n
import { addGetLoggedInUserFunction, addCollectiveData } from '../graphql/queries';
<<<<<<< HEAD
import NotFound from '../components/NotFound';
<<<<<<< HEAD
>>>>>>> 6032982... fetching currency from the collective
=======
=======
import NotFound from '../components/NotFoundPage';
>>>>>>> 05cc50a... not found page
import Loading from '../components/Loading';
<<<<<<< HEAD
>>>>>>> dc1a5a1... events widget
=======
import { intersection } from 'lodash';
>>>>>>> 20155ce... work in progress

class CreateEventPage extends React.Component {

<<<<<<< HEAD
=======
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

<<<<<<< HEAD
>>>>>>> dc1a5a1... events widget
  static getInitialProps ({ query: { collectiveSlug } }) {
    return { collectiveSlug }
=======
  static getInitialProps ({ query: { parentCollectiveSlug } }) {
    return { slug: parentCollectiveSlug }
>>>>>>> 20155ce... work in progress
  }

<<<<<<< HEAD
=======
  async componentDidMount() {
    const { getLoggedInUser, slug } = this.props;
    const LoggedInUser = getLoggedInUser && await getLoggedInUser();
    this.setState({ LoggedInUser, loading: false });
  }

>>>>>>> dc1a5a1... events widget
  render() {

<<<<<<< HEAD
    return (
      <IntlProvider locale="en-US" messages={enUS}>
        <div>
          <CreateEvent collectiveSlug={this.props.collectiveSlug} />
=======
    const { data } = this.props;

    if (this.state.loading) {
      return (<Loading />)
    }

    if (!data.loading && !data.Collective) {
      return (<NotFound />)
    }

    return (
<<<<<<< HEAD
      <IntlProvider locale="en-US" messages={enUS}>
        <div>
          <CreateEvent collective={data.Collective} LoggedInUser={this.state.LoggedInUser} />
>>>>>>> 6032982... fetching currency from the collective
        </div>
      </IntlProvider>
=======
      <div>
        <CreateEvent parentCollective={data.Collective} LoggedInUser={this.state.LoggedInUser} />
      </div>
>>>>>>> b28dbc6... better i18n
    );
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
export default withData(CreateEventPage);
=======
export default withData(addGetLoggedInUserFunction(addCollectiveData(CreateEventPage)));
>>>>>>> 6032982... fetching currency from the collective
=======
export default withData(withIntl(addGetLoggedInUserFunction(addCollectiveData(CreateEventPage))));
>>>>>>> b28dbc6... better i18n
