import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

<<<<<<< HEAD
<<<<<<< HEAD
=======
export const getLoggedInUserQuery = gql`
  query LoggedInUser {
    LoggedInUser {
      id,
      username,
      firstName,
      lastName,
      avatar,
      collectives {
        id,
        slug,
        name,
        role
      }
    }
  }
`;

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
      currency
    }
  }
`;

>>>>>>> 6032982... fetching currency from the collective
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
      location {
        name,
        address,
        lat,
        long
      },
>>>>>>> 1d3dfd6... InputTypeLocation
      tiers {
        id,
        name,
        description,
        amount,
        currency,
        maxQuantity
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
        createdAt,
        quantity,
        status,
        description,
        user {
          name,
          avatar,
          username,
          twitterHandle,
          description
        },
        tier {
          name
        }
      }
    }
  }`;

export const addEventData = graphql(getEventQuery);

const getEventsQuery = gql`
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
      location {
        name,
        address,
        lat,
        long
      },
      tiers {
        id,
        name,
        description,
        amount
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
      }
    }
  }
`;

export const addEventsData = graphql(getEventsQuery);

const getAttendeesQuery = gql`
  query Event($collectiveSlug: String!, $eventSlug: String!) {
    Event(collectiveSlug: $collectiveSlug, eventSlug: $eventSlug) {
      slug,
      name,
      startsAt,
      locationName,
      responses {
        createdAt,
        quantity,
        status,
        description,
        user {
          id,
          firstName,
          lastName,
          avatar,
          username,
          twitterHandle,
          description
        },
        tier {
          name
        }
      }
    }
  }
`;

<<<<<<< HEAD
export const addAttendeesData = graphql(getAttendeesQuery);
=======
export const addCollectiveData = graphql(getCollectiveQuery);
export const addEventData = graphql(getEventQuery);
export const addEventsData = graphql(getEventsQuery);
export const addAttendeesData = graphql(getAttendeesQuery);

export const addGetLoggedInUserFunction = graphql(getLoggedInUserQuery, {
  props: ({ data }) => ({
    data,
    getLoggedInUser: () => {
      return data.refetch();
    }
  })
});
>>>>>>> 6032982... fetching currency from the collective
