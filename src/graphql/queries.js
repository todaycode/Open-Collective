import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { intersection, get } from 'lodash';
import LoggedInUser from '../classes/LoggedInUser';

<<<<<<< HEAD
<<<<<<< HEAD
=======
export const getLoggedInUserQuery = gql`
  query LoggedInUser {
    LoggedInUser {
      id
      username
      firstName
      lastName
      email
      paypalEmail
      image
      CollectiveId
      collective {
        id
        name
        type
        slug
        paymentMethods {
          id
          uuid
          service
          name
          data
        }
      }
      memberOf {
        id
        role
        collective {
          id
          slug
          type
          name
          currency
          stats {
            id
            balance
          }
          paymentMethods {
            id
            uuid
            name
            service
            data
            balance
          }
        }
      }
    }
  }
`;

<<<<<<< HEAD
export const getUserQuery = gql`
  query User($username: String!) {
    User(username: $username) {
      id
      username
      firstName
      lastName
      twitterHandle
      description
      organization
      website
      email
      image
      collectives {
        id
        slug
        name
        role
        memberSince
        totalDonations
        tier {
          id
          name
          amount
          currency
          interval
        }
      }
    }
  }
`;

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1980447... show logged in user, fix create event
=======
export const getCollectiveQuery = gql`
  query Collective($collectiveSlug: String!) {
    Collective(collectiveSlug: $collectiveSlug) {
      id,
      slug,
      name,
      description,
      backgroundImage,
      logo,
=======
=======
>>>>>>> 6878cde... added export csv/json in editCollective
const getTiersQuery = gql`
  query Collective($slug: String!) {
    Collective(slug: $slug) {
      id
      slug
      name
      image
      backgroundImage
      twitterHandle
      description
>>>>>>> 20155ce... work in progress
      currency
      settings
      tiers {
        id
        type
        name
        description
        amount
        currency
        interval
      }
    }
  }
`;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6032982... fetching currency from the collective
=======
const getTiersQuery = gql`
  query Collective($collectiveSlug: String!) {
    Collective(collectiveSlug: $collectiveSlug) {
      id,
      slug,
      name,
      logo,
      backgroundImage,
      twitterHandle,
      description,
      currency,
      settings,
=======
=======
const getCollectiveToEditQuery = gql`
  query Collective($slug: String!) {
    Collective(slug: $slug) {
      id
      type
      slug
      createdByUser {
        id
      }
      name
      company
      image
      backgroundImage
      description
      longDescription
      twitterHandle
      website
      currency
      settings
      createdAt
      stats {
        id
        yearlyBudget
        backers {
          all
        }
        totalAmountSent
      }
      tiers {
        id
        slug
        type
        name
        description
        amount
        presets
        interval
        currency
        maxQuantity
      }
      memberOf {
        id
        createdAt
        role
        stats {
          totalDonations
        }
        tier {
          id
          name
        }
        collective {
          id
          type
          slug
          name
          currency
          description
          settings
          image
          stats {
            id
            backers {
              all
            }
            yearlyBudget
          }
        }
      }
      members(roles: ["ADMIN", "MEMBER"]) {
        id
        createdAt
        role
        description
        stats {
          totalDonations
        }
        tier {
          id
          name
        }
        member {
          id
          name
          image
          slug
          twitterHandle
          description
          ... on User {
            email
          }
        }
      }
      paymentMethods(service: "stripe") {
        id
        uuid
        name
        data
        monthlyLimitPerMember
        orders(hasActiveSubscription: true) {
          id
        }
      }
      connectedAccounts {
        id
        service
        username
        createdAt
      }
    }
  }
`;
>>>>>>> 28a8682... Edit connected accounts and payment methods

const getCollectiveQuery = gql`
  query Collective($slug: String!) {
    Collective(slug: $slug) {
      id
      isActive
      type
      slug
      createdByUser {
        id
      }
      name
      company
      image
      backgroundImage
      description
      longDescription
      twitterHandle
      website
      currency
      settings
      createdAt
      stats {
        id
        balance
        yearlyBudget
        backers {
          all
          users
          organizations
          collectives
        }
        collectives
        transactions
        expenses {
          id
          all
        }
        totalAmountSent
        totalAmountRaised
      }
>>>>>>> 20155ce... work in progress
      tiers {
        id
        slug
        type
        name
        description
        button
        amount
        presets
        interval
        currency
        maxQuantity
        stats {
          id
          totalOrders
          availableQuantity
        }
        orders(limit: 30) {
          fromCollective {
            id
            slug
            type
            name
            image
          }
        }
      }
      isHost
      canApply
      host {
        id
        slug
        name
        image
      }
      members {
        id
        role
        createdAt
        description
        member {
          id
          description
          name
          slug
          type
          image
        }
      }
      ... on User {
        memberOf(limit: 60) {
          id
          role
          createdAt
          stats {
            totalDonations
            totalRaised
          }
          collective {
            id
            name
            currency
            slug
            type
            image
            description
            longDescription
            backgroundImage
          }
        }
      }
    }
  }
`;

<<<<<<< HEAD
>>>>>>> 3e63f41... wip
const getEventQuery = gql`
  query Event($collectiveSlug: String!, $eventSlug: String!) {
    Event(collectiveSlug: $collectiveSlug, eventSlug: $eventSlug) {
=======
const getEventQuery = gql`query Event($collectiveSlug: String!, $eventSlug: String!) {
  Event(collectiveSlug: $collectiveSlug, eventSlug: $eventSlug) {
    id,
    slug,
    name,
    description,
    startsAt,
    endsAt,
    timezone,
    location,
    address,
    lat,
    long,
    tiers {
      id,
      name,
      description,
      amount,
      currency,
      maxQuantity
    },
    collective {
>>>>>>> bfc3279... added support for timezone
      id,
      slug,
      createdByUser {
        id
      },
      name,
      description,
      startsAt,
      endsAt,
<<<<<<< HEAD
<<<<<<< HEAD
      location,
=======
      timezone,
<<<<<<< HEAD
      locationName,
>>>>>>> e54bb4f... create/edit event
=======
      timezone,
      locationName,
>>>>>>> 7dbcbbe... make Sustain great again
      address,
      lat,
      long,
=======
=======
const getEventCollectiveQuery = gql`
  query Collective($eventSlug: String!) {
    Collective(slug: $eventSlug) {
      id
      type
      slug
      createdByUser {
        id
      }
      name
      image
      description
      longDescription
      startsAt
      endsAt
      timezone
      currency
      settings
>>>>>>> 20155ce... work in progress
      location {
        name
        address
        lat
        long
<<<<<<< HEAD
      },
>>>>>>> 1d3dfd6... InputTypeLocation
=======
      }
>>>>>>> 20155ce... work in progress
      tiers {
        id
        slug
        type
        name
        description
        amount
        currency
        maxQuantity
<<<<<<< HEAD
      }
      parentCollective {
        id
        slug
        name
        mission
        currency
        backgroundImage
        image
        settings
      }
      members {
        id
        createdAt
        role
        member {
          id
          name
          image
          slug
          twitterHandle
=======
      },
      collective {
        id,
        slug,
        name,
        mission,
        currency,
        backgroundImage,
        logo,
        stripePublishableKey
      },
      responses {
        id,
        createdAt,
        quantity,
        status,
        description,
        user {
          name,
          avatar,
          username,
          twitterHandle,
<<<<<<< HEAD
>>>>>>> e6e13c8... added link to download invoice for a donation if logged in as member/host
          description
        }
      }
      orders {
        id
        createdAt
        quantity
        processedAt
        publicMessage
        fromCollective {
          id
          name
          company
          image
          slug
          twitterHandle
          description
          ... on User {
            email
          }
        }
=======
          description,
          email
        },
>>>>>>> 3e93a48... don't run a new query to exportMembers
        tier {
          id
          name
        }
      }
    }
  }`;

export const addEventData = graphql(getEventQuery);

<<<<<<< HEAD
const getEventsQuery = gql`
<<<<<<< HEAD
  query allEvents($collectiveSlug: String) {
    allEvents(collectiveSlug: $collectiveSlug) {
      id,
      slug,
      name,
      description,
      startsAt,
      endsAt,
      timezone,
<<<<<<< HEAD
=======
  query allEvents($parentCollectiveSlug: String) {
    allEvents(slug: $parentCollectiveSlug) {
      id
      slug
      name
      description
      longDescription
      startsAt
      endsAt
      timezone
>>>>>>> 20155ce... work in progress
      location {
        name
        address
        lat
        long
      }
      tiers {
        id
        type
        name
        description
        amount
<<<<<<< HEAD
      },
=======
      locationName,
      address,
>>>>>>> 7dbcbbe... make Sustain great again
      collective {
        id,
        slug,
        name,
        mission,
        backgroundImage,
        logo
=======
      }
      parentCollective {
        id
        slug
        name
        mission
        backgroundImage
        image
>>>>>>> 20155ce... work in progress
      }
    }
  }
`;

<<<<<<< HEAD
export const addEventsData = graphql(getEventsQuery);

=======
>>>>>>> 948d8e6... added events on collective page, consolidated avatars, fix bug when no credit card on file
const getAttendeesQuery = gql`
<<<<<<< HEAD
  query Collective($slug: String!) {
    Collective(slug: $slug) {
      slug
      name
      startsAt
      location {
        name
      }
      orders {
        id
        createdAt
        quantity
        processedAt
        description
=======
  query Event($collectiveSlug: String!, $eventSlug: String!) {
    Event(collectiveSlug: $collectiveSlug, eventSlug: $eventSlug) {
      slug,
      name,
      startsAt,
      location {
        name,
        address
      },
      responses {
        id,
        createdAt,
        quantity,
        status,
        description,
>>>>>>> 3f114f9... fix nametags
        user {
          id
          firstName
          lastName
          image
          username
          twitterHandle
          description
        }
        tier {
          id
          name
        }
      }
    }
  }
`;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const addAttendeesData = graphql(getAttendeesQuery);
=======
=======
=======
const getCollectiveTierQuery = gql`
  query CollectiveTier($slug: String! $TierId: Int!) {
    Collective(slug: $slug) {
      id
      slug
      name
      type
      image
      description
      twitterHandle
      currency
      backgroundImage
      settings
      image
      host {
        id
        name
        slug
      }
    }
    Tier(id: $TierId) {
      id
      type
      name
      description
      amount
      currency
      interval
      presets
    }
  }
`;

<<<<<<< HEAD
>>>>>>> 3e63f41... wip
const getCollectiveTransactionsQuery = gql`
  query CollectiveTransactions($slug: String!, $type: String, $limit: Int, $offset: Int) {
=======
=======
>>>>>>> 948d8e6... added events on collective page, consolidated avatars, fix bug when no credit card on file
=======
>>>>>>> 5b2e73d... fix /events
const getCollectiveCoverQuery = gql`
  query CollectiveCover($slug: String!) {
>>>>>>> bf84558... added Expense components
    Collective(slug: $slug) {
      id
      type
      slug
      name
      currency
      backgroundImage
      settings
      image
      isHost
      stats {
        id
        balance
      }
      host {
        id
        slug
        name
        image
      }
    }
  }
`;

<<<<<<< HEAD
<<<<<<< HEAD
const getTransactionQuery = gql`
  query Transaction($id: Int!) {
    Transaction(id: $id) {
      id
      uuid
      description
      publicMessage
      privateMessage
      createdAt
      type
      amount
      currency
      netAmountInCollectiveCurrency
      hostFeeInHostCurrency
      platformFeeInHostCurrency
      paymentProcessorFeeInHostCurrency
      paymentMethod {
        name
      }
      user {
        id
        name
        username
        image
      }
      host {
        id
        name
      }
      ... on Expense {
        category
        attachment
      }
      ... on Donation {
        subscription {
          interval
        }
      }
=======
export const getPrepaidCardBalanceQuery = gql`
  query checkPrepaidPaymentMethod($token: String!) {
    prepaidPaymentMethod(token: $token) {
      id,
      name,
      currency,
      balance,
      uuid
>>>>>>> 3350797... working gift card flow
    }
  }
`;

<<<<<<< HEAD
const TRANSACTIONS_PER_PAGE = 10;
export const addCollectiveTransactionsData = graphql(getCollectiveTransactionsQuery, {
  options(props) {
    return {
      variables: {
        slug: props.slug,
        offset: 0,
        limit: TRANSACTIONS_PER_PAGE * 2
      }
    }
  },
  props: ({ data }) => ({
    data,
    fetchMore: () => {
      return data.fetchMore({
        variables: {
          offset: data.allTransactions.length,
          limit: TRANSACTIONS_PER_PAGE
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allTransactions: [...previousResult.allTransactions, ...fetchMoreResult.allTransactions]
          })
        }
      })
    }
  })  
});
>>>>>>> 488edbe... new route /:collectiveSlug/transactions
export const addCollectiveData = graphql(getCollectiveQuery);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 3350797... working gift card flow
export const addCollectiveData = graphql(getCollectiveQuery);
export const addCollectiveCoverData = graphql(getCollectiveCoverQuery);
>>>>>>> bf84558... added Expense components
export const addCollectiveToEditData = graphql(getCollectiveToEditQuery);
export const addEventCollectiveData = graphql(getEventCollectiveQuery);
<<<<<<< HEAD
<<<<<<< HEAD
export const addCollectiveTierData = graphql(getCollectiveTierQuery);
=======

// Need to bypass the cache otherwise it won't update the list of participants with the email addresses when we refetch the query as an admin
export const addEventData = graphql(getEventQuery, { options: { fetchPolicy: 'network-only' }});

>>>>>>> 137a983... fetch email addresses to export members
=======
export const addEventData = graphql(getEventQuery);
>>>>>>> 6519b74... bypass the cache only if admin
export const addEventsData = graphql(getEventsQuery);
=======
>>>>>>> 948d8e6... added events on collective page, consolidated avatars, fix bug when no credit card on file
export const addAttendeesData = graphql(getAttendeesQuery);
=======
>>>>>>> 5b2e73d... fix /events
export const addTiersData = graphql(getTiersQuery);

export const addGetLoggedInUserFunction = (component) => {
  const accessToken = typeof window !== 'undefined' && window.localStorage.getItem('accessToken');
  if (!accessToken) return component;
  return graphql(getLoggedInUserQuery, {
    props: ({ data }) => ({
      data,
      getLoggedInUser: () => {
        if (!window.localStorage.getItem('accessToken')) {
          return Promise.resolve(null);
        }
        return new Promise(async (resolve) => {
            let res;
            if (data.LoggedInUser) {
              const user = new LoggedInUser(data.LoggedInUser);
              console.log(">>> data", data.LoggedInUser, "class: ", user);
              return resolve(user);
            }
            try {
              res = await data.refetch();
              if (!res.data || !res.data.LoggedInUser) {
                return resolve(null);
              }
              const user = new LoggedInUser(res.data.LoggedInUser);
              return resolve(user);
            } catch (e) {
              console.error(">>> getLoggedInUser error:", e);
              return resolve(null);
            }
        });
      }
<<<<<<< HEAD
    }
  })
});
>>>>>>> 6032982... fetching currency from the collective
=======
    })
  })(component);
}
>>>>>>> b8ba07b... ssr
