import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

<<<<<<< HEAD
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
      name,
      description,
      startsAt,
      endsAt,
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
        id,
        slug,
        name,
        mission,
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
      location,
      address,
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