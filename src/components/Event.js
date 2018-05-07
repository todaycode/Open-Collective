import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import CollectiveCover from '../components/CollectiveCover';
import Location from '../components/Location';
import HashLink from 'react-scrollchor';
import Tier from '../components/Tier';
import NotificationBar from '../components/NotificationBar';
import InterestedForm from '../components/InterestedForm';
import Sponsors from '../components/Sponsors';
import Responses from '../components/Responses';
import { capitalize, filterCollection, formatCurrency, trimObject } from '../lib/utils';
import Markdown from 'react-markdown';
<<<<<<< HEAD
import TicketsConfirmed from '../components/TicketsConfirmed';
<<<<<<< HEAD
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
<<<<<<< HEAD
<<<<<<< HEAD
import { pick, uniqBy, get, union } from 'lodash';
import { capitalize } from '../lib/utils';
import { Router } from '../server/pages';
import { addEventMutations } from '../graphql/mutations';
=======
import { uniq } from 'underscore';
=======
=======
=======
>>>>>>> 0d14167... eslint feedback in components
import { defineMessages, FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
>>>>>>> 5745bc1... notification after event is over to move money to parent collective
import { uniqBy, get, union } from 'lodash';
import { Router } from '../server/pages';
import { addEventMutations } from '../graphql/mutations';
<<<<<<< HEAD
>>>>>>> bf84558... added Expense components
import { exportMembers } from '../lib/export_file';
<<<<<<< HEAD
>>>>>>> 5084c48... add export csv for list of attendees (for admins)
=======
=======
import { exportRSVPs } from '../lib/export_file';
<<<<<<< HEAD
>>>>>>> 84a4983... Show event title and fix export RSVPs
import { Link } from '../server/pages';
<<<<<<< HEAD
>>>>>>> 5845d1a... fix for /events/new and /edit
=======
=======
>>>>>>> 0d14167... eslint feedback in components
import SectionTitle from './SectionTitle';
import ExpensesSection from './ExpensesSection';
<<<<<<< HEAD
>>>>>>> c68915d... add budget to event collective
=======
import withIntl from '../lib/withIntl';
import Button from './Button';
import SendMoneyToCollectiveBtn from './SendMoneyToCollectiveBtn';
>>>>>>> 5745bc1... notification after event is over to move money to parent collective

const defaultBackgroundImage = '/static/images/defaultBackgroundImage.png';

class Event extends React.Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
    LoggedInUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.event = this.props.event; // pre-loaded by SSR
    this.setInterested = this.setInterested.bind(this);
    this.removeInterested = this.removeInterested.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.resetResponse = this.resetResponse.bind(this);
    this.handleOrderTier = this.handleOrderTier.bind(this);

    this.state = {
      showInterestedForm: false,
      order: { tier: {} },
      tierInfo: {},
      api: { status: 'idle' },
<<<<<<< HEAD
<<<<<<< HEAD
      event: this.props.event,
      actions: this.defaultActions
=======
      actions: this.getDefaultActions(this.props)
>>>>>>> d7dcdf9... make sure we show the edit event on reload
    };
=======
      event: this.props.event
    }

<<<<<<< HEAD
<<<<<<< HEAD
    this.state.actions = this.getDefaultActions(this.props);
>>>>>>> 948d8e6... added events on collective page, consolidated avatars, fix bug when no credit card on file

    // To test confirmation screen, uncomment the following:
    // this.state.view = "GetTicket";
    // this.state.order = {
    //   user: { email: "etienne@gmail.com"},
    //   tier: this.state.event && this.state.event.tiers[1],
    //   quantity: 2
    // };

=======
>>>>>>> 620c5df... Show edit event button
=======
    this.messages = defineMessages({
      'event.over.sendMoneyToParent.title': { id: 'event.over.sendMoneyToParent.title', defaultMessage: 'Event is over and still has a positive balance'},
      'event.over.sendMoneyToParent.description': { id: 'event.over.sendMoneyToParent.description', defaultMessage: 'If you still have expenses related to this event, please file them. Otherwise consider moving the money to your collective {collective}'},
      'event.over.sendMoneyToParent.transaction.description': { id: 'event.over.sendMoneyToParent.transaction.description', defaultMessage: 'Balance of {event}'}
    });

<<<<<<< HEAD
    this.notification = {};
    // If event is over and has a positive balance, we ask the admins if they want to move the money to the parent collective
    if ((new Date(this.event.endsAt)).getTime() < (new Date).getTime() && this.event.stats.balance >= 0 && LoggedInUser && LoggedInUser.canEditEvent(this.event)) {
      this.notification.title = intl.formatMessage(this.messages['event.over.sendMoneyToParent.title']);
      this.notification.description = intl.formatMessage(this.messages['event.over.sendMoneyToParent.description'], { collective: this.event.parentCollective.name });
      this.notification.actions = [
        <Button className="submitExpense gray" href={`${this.event.path}/expenses/new`}><FormattedMessage id="menu.submitExpense" defaultMessage="Submit Expense" /></Button>,
        <SendMoneyToCollectiveBtn
          fromCollective={this.event}
          toCollective={this.event.parentCollective}
          LoggedInUser={LoggedInUser}
          amount={this.event.stats.balance}
          currency={this.event.currency}
          />
      ]
    }

>>>>>>> 5745bc1... notification after event is over to move money to parent collective
=======
    this.isEventOver = (new Date(this.event.endsAt)).getTime() < (new Date).getTime();
>>>>>>> 7ee3f75... fetch opencollective paymentMethod
  }

  componentDidMount() {
    window.oc = { event: this.state.event }; // for easy debugging
  }

  async removeInterested() {
    const { LoggedInUser } = this.props;
    const memberCollectiveId = this.state.interestedUserCollectiveId || LoggedInUser && LoggedInUser.CollectiveId;
    const res = await this.props.removeMember({ id: memberCollectiveId }, { id: this.state.event.id }, 'FOLLOWER');
    const memberRemoved = res.data.removeMember;
    const event = { ... this.state.event };
    event.members = event.members.filter(member => member.id !== memberRemoved.id);
    this.setState({ showInterestedForm: false, event });
  }

  /**
   * If user is logged in, we directly create a response
   * Otherwise, we show the form to enter an email address
   */
  async setInterested(member) {
    member = member || this.props.LoggedInUser && { id: this.props.LoggedInUser.CollectiveId };
    if (member) {
      const parts = member.email && member.email.substr(0, member.email.indexOf('@')).split('.');
      if (parts && parts.length > 1) {
        member.firstName = capitalize(parts[0] || '');
        member.lastName = capitalize(parts[1] || '');
      }
      try {
        const res = await this.props.createMember(member, { id: this.state.event.id }, 'FOLLOWER');
        const memberCreated = res.data.createMember;
        const interestedUserCollectiveId = memberCreated.member.id;
        const event = { ... this.state.event };
        event.members = [ ...event.members, memberCreated ];
        this.setState({ showInterestedForm: false, event, interestedUserCollectiveId });
        this.setState({ showInterestedForm: false });
      } catch (e) {
        console.error(e);
        let message = '';
        if (e && e.graphQLErrors) {
          message = ` (error: ${e.graphQLErrors[0].message})`;
        }
        this.error(`An error occured 😳. We couldn't register you as interested. Please try again in a few.${message}`);
      }
      return;
    } else {
      this.setState({ showInterestedForm: !this.state.showInterestedForm });
      return;
    }
  }

  error(msg) {
    this.setState({ status: 'error', error: msg });
    setTimeout(() => {
      this.setState({ status: 'idle', error: null });
    }, 5000);
  }

  resetResponse() {
    this.setState({ response: {} });
  }

  updateOrder(tier) {
    const tierInfo = Object.assign({}, {...this.state.tierInfo});
    const order = {
      tier: { id: tier.id },
      quantity: tier.quantity,
      totalAmount: (tier.quantity || 1) * tier.amount,
      interval: tier.interval
    }
    tierInfo[tier.id] = tier;
    this.setState({ order, tierInfo });
    return order;
  }

  handleOrderTier(tier) {
    const order = this.updateOrder(tier);
    const { event } = this.state;

    this.setState({ order, showInterestedForm: false });
    const params = trimObject({
      eventSlug: event.slug,
      collectiveSlug: event.parentCollective.slug,
      TierId: order.tier.id,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      interval: order.interval
    });
    Router.pushRoute('orderEventTier', params);
  }

  render() {
<<<<<<< HEAD
<<<<<<< HEAD
    const { event } = this.state;
    const { LoggedInUser } = this.props;
<<<<<<< HEAD
=======
    const { LoggedInUser } = this.props;
    const canEditEvent = LoggedInUser && LoggedInUser.canEditEvent;
>>>>>>> 657ee04... added link to print nametags if canEditEvent
=======
=======
    const { LoggedInUser, intl } = this.props;
    const { event } = this.state;
>>>>>>> 7ee3f75... fetch opencollective paymentMethod

    const canEditEvent = LoggedInUser && LoggedInUser.canEditEvent(event);
>>>>>>> 3c77df1... LoggedInUser.canEditEvent
    const responses = {};
    responses.sponsors = filterCollection(event.orders, { tier: { name: /sponsor/i }});

    const guests = {};
    guests.interested = [];
    filterCollection(event.members, { role: 'FOLLOWER' }).map(follower => {
      if (!follower.member) {
        console.error(">>> no user collective for membership", follower);
        return;
      }
      guests.interested.push({
        user: follower.member,
        status: 'INTERESTED'
      });
    });
    guests.confirmed = [];
    event.orders.map(order => {
      if (!order.fromCollective) {
        console.error(">>> no user collective for order", order);
        return;
      }
      guests.confirmed.push({
        user: order.fromCollective,
        createdAt: order.createdAt,
        status: 'YES'
      })
    });

    const allGuests = union(guests.interested, guests.confirmed).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    responses.guests = uniqBy(allGuests, (r) => r.user && r.user.id);
    responses.going = filterCollection(responses.guests, { status: 'YES' });
    responses.interested = filterCollection(responses.guests, { status: 'INTERESTED' });

    let notification = {};
    // If event is over and has a positive balance, we ask the admins if they want to move the money to the parent collective
    if (this.isEventOver && get(this.props.event, 'stats.balance') > 0 && canEditEvent) {
      notification = {
        title: intl.formatMessage(this.messages['event.over.sendMoneyToParent.title']),
        description: intl.formatMessage(this.messages['event.over.sendMoneyToParent.description'], { collective: event.parentCollective.name }),
        actions: [
          <Button className="submitExpense gray" href={`${event.path}/expenses/new`}><FormattedMessage id="menu.submitExpense" defaultMessage="Submit Expense" /></Button>,
          <SendMoneyToCollectiveBtn
            fromCollective={event}
            toCollective={event.parentCollective}
            LoggedInUser={LoggedInUser}
            description={intl.formatMessage(this.messages['event.over.sendMoneyToParent.transaction.description'], { event: event.name })}
            amount={event.stats.balance}
            currency={event.currency}
            />
        ]
      }
    }

    const info = (
      <HashLink to="#location">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <FormattedDate value={this.event.startsAt} weekday='short' day='numeric' month='long' />, &nbsp;
        <FormattedTime value={this.event.startsAt} timeZone={this.event.timezone} />&nbsp; - &nbsp;
        {this.event.location.name}
=======
        <FormattedDate value={Event.startsAt} weekday='short' day='numeric' month='long' />, &nbsp;
        <FormattedTime value={Event.startsAt} timeZone={Event.timezone} />&nbsp; - &nbsp;
        {Event.locationName}
>>>>>>> 7dbcbbe... make Sustain great again
=======
        <FormattedDate value={event.startsAt} weekday='short' day='numeric' month='long' />, &nbsp;
=======
        <FormattedDate value={event.startsAt} weekday="short" day="numeric" month="long" />, &nbsp;
>>>>>>> d9e7825... eslint (version 1.2.0) --fix
        <FormattedTime value={event.startsAt} timeZone={event.timezone} />&nbsp; - &nbsp;
        {event.location.name}
>>>>>>> 20155ce... work in progress
      </HashLink>
    );

    const backgroundImage = event.backgroundImage || get(event, 'parentCollective.backgroundImage') || defaultBackgroundImage;

    return (
      <div>
        <style jsx>{`
          .adminActions {
            text-align: center;
            text-transform: uppercase;
            font-size: 1.3rem;
            font-weight: 600;
            letter-spacing: 0.05rem;
          }
          .adminActions ul {
            overflow: hidden;
            text-align: center;
            margin: 0 auto;
            padding: 0;
            display: flex;
            justify-content: center;
            flex-direction: row;
            list-style: none;
          }
          .adminActions ul li {
            margin: 0 2rem;
          }
          #tickets :global(.tier) {
            margin: 4rem auto;
          }
        `}</style>

        <div className="EventPage">

          <Header
            title={event.name}
            description={event.description || event.longDescription}
            twitterHandle={event.parentCollective.twitterHandle}
            image={event.parentCollective.image || backgroundImage}
            className={this.state.status}
            LoggedInUser={LoggedInUser}
            />

          <Body>

            <div className={`EventPage ${this.state.modal && 'showModal'}`}>

              <NotificationBar
                status={this.state.status}
                title={notification.title}
                description={notification.description}
                actions={notification.actions}
                error={this.state.error}
                />

              <CollectiveCover
                collective={event}
                title={event.name}
                description={info}
                LoggedInUser={LoggedInUser}
                style={get(event, 'settings.style.hero.cover') || get(event.parentCollective, 'settings.style.hero.cover')}
                />

              { this.state.showInterestedForm &&
                <InterestedForm onSubmit={this.setInterested} />
              }

              <div>
                <div className="content" >
                  <div className="eventDescription" >
                    <Markdown source={event.description || event.longDescription} escapeHtml={false} />
                  </div>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  <Location location={this.event.location} />
<<<<<<< HEAD
=======
                  <Location
                    location={Event.locationName}
                    address={Event.address}
                    lat={Event.lat}
                    long={Event.long}
                    />
>>>>>>> 7dbcbbe... make Sustain great again
=======
                  <Location location={event.location} />
>>>>>>> 20155ce... work in progress
=======
>>>>>>> e6e13c8... added link to download invoice for a donation if logged in as member/host

                  { responses.guests.length > 0 &&
                    <section id="responses">
                      <h1>
                        <FormattedMessage id='event.responses.title.going' values={{n: responses.going.length}} defaultMessage={`{n} {n, plural, one {person going} other {people going}}`} />
                        { responses.interested.length > 0 &&
                          <span>
                            <span> - </span>
                            <FormattedMessage id='event.responses.title.interested' values={{n: responses.interested.length}} defaultMessage={`{n} interested`} />
                          </span>
                        }
                      </h1>
                      { canEditEvent &&
                      <div className="adminActions" id="adminActions">
                        <ul>
                          <li><a href={`/${event.parentCollective.slug}/events/${event.slug}/nametags.pdf`}>Print name tags</a></li>
                          <li><a href={`mailto:${event.slug}@${event.parentCollective.slug}.opencollective.com`}>Send email</a></li>
                          <li><a onClick={ () => exportRSVPs(event) }>Export CSV</a></li>
                        </ul>
                      </div>
                      }
                      <Responses responses={responses.guests} />
                    </section>
                  }
                  { responses.sponsors.length > 0 &&
                    <section id="sponsors">
                      <h1>
                        <FormattedMessage id='event.sponsors.title' defaultMessage={`Sponsors`} />
                      </h1>
                      <Sponsors sponsors={responses.sponsors.map(r => {
                        const user = Object.assign({}, r.user);
                        user.tier = r.tier;
                        user.createdAt = new Date(r.createdAt);
                        return user;
                      })} />
                    </section>
                  }

=======
                  <section id="tickets">
                    { event.tiers.map((tier) =>
                      (<Tier
                        key={tier.id}
                        tier={tier}
                        values={this.state.tierInfo[tier.id] || {}}
                        onChange={(response) => this.updateOrder(response)}
                        onClick={(response) => this.handleOrderTier(response)}
                        />)
                    )}
                  </section>
>>>>>>> fbafc5f... cleaning event and fix css for tier
                </div>

                <Location location={event.location} />

                { responses.guests.length > 0 &&
                  <section id="responses">
                    <h1>
                      <FormattedMessage id="event.responses.title.going" values={{n: responses.going.length}} defaultMessage={`{n} {n, plural, one {person going} other {people going}}`} />
                      { responses.interested.length > 0 &&
                        <span>
                          <span> - </span>
                          <FormattedMessage id="event.responses.title.interested" values={{n: responses.interested.length}} defaultMessage={`{n} interested`} />
                        </span>
                      }
                    </h1>
                    { canEditEvent &&
                    <div className="adminActions" id="adminActions">
                      <ul>
                        <li><a href={`/${event.parentCollective.slug}/events/${event.slug}/nametags.pdf`}>Print name tags</a></li>
                        <li><a href={`mailto:${event.slug}@${event.parentCollective.slug}.opencollective.com`}>Send email</a></li>
                        <li><a onClick={() => exportRSVPs(event)}>Export CSV</a></li>
                      </ul>
                    </div>
                    }
                    <Responses responses={responses.guests} />
                  </section>
                }

                { responses.sponsors.length > 0 &&
                  <section id="sponsors">
                    <h1>
                      <FormattedMessage id="event.sponsors.title" defaultMessage={`Sponsors`} />
                    </h1>
                    <Sponsors sponsors={responses.sponsors.map(r => {
                      const user = Object.assign({}, r.user);
                      user.tier = r.tier;
                      user.createdAt = new Date(r.createdAt);
                      return user;
                    })}
                              />
                  </section>
                }

                <section id="budget" className="clear">
                  <div className="content" >
                    <SectionTitle section="budget" values={{ balance: formatCurrency(get(event, 'stats.balance'), event.currency) }} />
                    <ExpensesSection
                      collective={event}
                      LoggedInUser={LoggedInUser}
                      limit={10}
                      />
                  </div>
                </section>

              </div>
            </div>
          </Body>
          <Footer />
        </div>
      </div>
    )
  }
}

export default withIntl(addEventMutations(Event));
