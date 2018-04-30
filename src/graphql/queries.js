import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import LoggedInUser from '../classes/LoggedInUser';
import storage from '../lib/storage';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
export const transactionFields = `
  id
  uuid
  description
  createdAt
  type
  amount
  currency
  netAmountInCollectiveCurrency
  hostFeeInHostCurrency
  platformFeeInHostCurrency
  paymentProcessorFeeInHostCurrency
  paymentMethod {
    service
  }
  fromCollective {
    id
    name
    slug
    image
  }
  host {
    id
    name
    currency
  }
  ... on Expense {
    category
    attachment
  }
  ... on Order {
    createdAt
    subscription {
      interval
    }
  }
`;

export const getTransactionsQuery = gql`
query Transactions($CollectiveId: Int!, $type: String, $limit: Int, $offset: Int, $dateFrom: String, $dateTo: String) {
  allTransactions(CollectiveId: $CollectiveId, type: $type, limit: $limit, offset: $offset, dateFrom: $dateFrom, dateTo: $dateTo) {
    ${transactionFields}
    refundTransaction {
      ${transactionFields}
    }
  }
}
`;

<<<<<<< HEAD

>>>>>>> c88eb8e... Add transaction refund button visible for site admins only (#278)
=======
>>>>>>> 6c51800... more eslint feedback in src
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
        settings
        paymentMethods(limit: 5) {
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
          paymentMethods(limit: 5) {
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
      isHost
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
        settings
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
      path
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
        collectives {
          hosted
          memberOf
        }
        transactions {
          id
          all
        }
        expenses {
          id
          all
        }
        updates
        events
        totalAmountSent
        totalAmountRaised
        totalAmountReceived
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
            website
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
            path
            type
            image
            description
            longDescription
            backgroundImage
          }
        }
      }
      ... on Organization {
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
            path
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
      path
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
      stats {
        id
        balance
        expenses {
          id
          all
        }
        transactions {
          id
          all
        }
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
      path
      name
      currency
      backgroundImage
      settings
      image
      isHost
      tags
      stats {
        id
        balance
        updates
        events
        yearlyBudget
        totalAmountReceived
        backers {
          all
        }
      }
      createdByUser {
        id
      }
      host {
        id
        slug
        name
        image
      }
      parentCollective {
        id
        slug
        name
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
=======
export const getSubscriptionsQuery = gql`
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
      twitterHandle
      website
      currency
      settings
      createdAt
      stats {
        id
        totalAmountSent
        totalAmountRaised
      }
      ordersFromCollective (subscriptionsOnly: true) {
        id
        currency
        totalAmount
        interval
        createdAt
        isSubscriptionActive
        isPastDue
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
        fromCollective {
          id
          slug
          createdByUser {
            id
          }
        }
        paymentMethod {
          id
          uuid
          data
          name
        }
      }
      paymentMethods {
        id
        uuid
        service
        type
        data
        name
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
          }
        }
      }

      ... on Organization {
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
          }
        }
      }
    }
  }
`;

<<<<<<< HEAD
>>>>>>> f44f88f... working version e2e
=======
export const searchCollectivesQuery = gql`
  query search($term: String!, $limit: Int, $offset: Int) {
    search(term: $term, limit: $limit, offset: $offset) {
      collectives {
        id
        isActive
        type
        slug
        path
        name
        company
        image
        backgroundImage
        description
        longDescription
        website
        currency
        stats {
          id
          balance
          yearlyBudget
          backers {
            all
          }
        }
      }
      limit
      offset
      total
    }
  }
`;

>>>>>>> aaa828d... feat(graphql/queries): add search query for collectives
export const addCollectiveData = graphql(getCollectiveQuery);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 3350797... working gift card flow
export const addCollectiveData = graphql(getCollectiveQuery);
<<<<<<< HEAD
export const addCollectiveCoverData = graphql(getCollectiveCoverQuery);
>>>>>>> bf84558... added Expense components
=======
export const addCollectiveCoverData = graphql(getCollectiveCoverQuery, {
  options(props) {
    return {
      variables: {
        slug: props.collectiveSlug || props.slug
      }
    }
  }
});
>>>>>>> e882965... Wip
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
export const addSubscriptionsData = graphql(getSubscriptionsQuery);
export const addSearchQueryData = graphql(searchCollectivesQuery);

const refreshLoggedInUser = async (data) => {
  let res;

  if (data.LoggedInUser) {
    const user = new LoggedInUser(data.LoggedInUser);
    storage.set("LoggedInUser", user, 1000 * 60 * 60);
    return user;
  }

  try {
    res = await data.refetch();
    if (!res.data || !res.data.LoggedInUser) {
      storage.set("LoggedInUser", null);
      return null;
    }
    const user = new LoggedInUser(res.data.LoggedInUser);
    storage.set("LoggedInUser", user, 1000 * 60 * 60);
    return user;
  } catch (e) {
    console.error(">>> getLoggedInUser error:", e);
    storage.set("LoggedInUser", null);
    return null;
  }
};

export const addGetLoggedInUserFunction = (component) => {
  const accessToken = typeof window !== 'undefined' && window.localStorage.getItem('accessToken');
  if (!accessToken) return component;
  return graphql(getLoggedInUserQuery, {
    props: ({ data }) => ({
      data,
      getLoggedInUser: async () => {
        if (!window.localStorage.getItem('accessToken')) {
          storage.set("LoggedInUser", null);
          return null;
        }
<<<<<<< HEAD
        return new Promise(async (resolve) => {
            let res;
            if (data.LoggedInUser) {
              const user = new LoggedInUser(data.LoggedInUser);
<<<<<<< HEAD
=======
              const endTime = new Date;
              const elapsedTime = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
              console.info(`>>> LoggedInUser fetched in ${elapsedTime} seconds`);
>>>>>>> 671d8ae... require to be logged in to submit an expense
              return resolve(user);
            }
            try {
              res = await data.refetch();
              if (!res.data || !res.data.LoggedInUser) {
                return resolve(null);
              }
              const user = new LoggedInUser(res.data.LoggedInUser);
              const endTime = new Date;
              const elapsedTime = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
              console.info(`>>> LoggedInUser fetched in ${elapsedTime} seconds`);
              return resolve(user);
            } catch (e) {
              console.error(">>> getLoggedInUser error:", e);
              return resolve(null);
            }
        });
=======
        const cache = storage.get("LoggedInUser");
        if (cache) {
          refreshLoggedInUser(data); // we don't wait.
          return new LoggedInUser(cache);
        }
        return await refreshLoggedInUser(data);
>>>>>>> 0c1d867... updated design and fixed e2e tests
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
<<<<<<< HEAD
>>>>>>> b8ba07b... ssr
=======
>>>>>>> c88eb8e... Add transaction refund button visible for site admins only (#278)
