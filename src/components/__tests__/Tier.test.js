
import { mount } from 'enzyme';
import React from 'react';
import Tier from '../Tier';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
addLocaleData([...en]);
import { capitalize } from '../../lib/utils';

describe("Tier component", () => {

  const tiers = {
    donor: {
      name: 'donor',
      slug: 'donors',
      presets: [1000, 5000, 25000],
      currency: 'USD',
      button: 'donate'
    },
    backer: {
      name: 'backer',
      amount: 1000,
      interval: 'month'
    }
  }

  const expectValue = (component, className, value) => {
    expect(component.find(`.${className} .value`).text()).toEqual(value);
  }

  const fillValue = (component, field, value) => {
    component.find({ name: field }).simulate('change', { target: { value } });
  }

  const mountComponent = (props) => mount(
    <IntlProvider locale="en">
      <Tier {...props} />
      </IntlProvider>
  );

  describe('Donate Tier', () => {
    it('Change the preset and interval', (done) => {

      const donorTier = {
          type: 'TIER',
          name: 'donor',
          slug: 'donors',
          presets: [200, 5000, 10000],
          button: 'donate',
          currency: 'USD'
        }

      const onClick = (tier) => {
        expect(tier).toEqual({
          id: undefined,
          quantity: 1,
          amount: 5000,
          interval: 'year'
        })
        done();
      }

      const component = mountComponent({ tier: donorTier, values: {amount: 5000, interval: 'year', quantity: 1}, onClick })

      expect(component.find('.presetBtn').hostNodes().length).toEqual(3);
      expect(component.find('.presetBtn').hostNodes().at(1).text()).toEqual('$50');
      expect(component.find('input[name="amount"]').props().value).toEqual(50);
      expect(component.find('.ctabtn').hostNodes().text()).toEqual('donate');
      component.find('.ctabtn').hostNodes().simulate('click');
    });
  })

  describe('Become a member', () => {
    it('onClick returns the expected value', (done) => {

      const backerTier = {
          type: 'TIER',
          id: 1,
          name: 'backer',
          slug: 'backers',
          amount: 1000,
          interval: 'month',
          currency: 'USD'
        }

      const onClick = (tier) => {
        expect(tier).toEqual({
          quantity: 1,
          id: 1,
          amount: 1000,
          interval: 'month'
        })
        done();
      }

      const component = mountComponent({ tier: backerTier, onClick })

      expect(component.find('.ctabtn').hostNodes().text()).toEqual('become a backer');
      component.find('.ctabtn').hostNodes().simulate('click');
    });
  })

  describe('Get a ticket', () => {
    it('Get 2 tickets', (done) => {

      const ticket = {
          type: 'TICKET',
          id: 1,
          name: 'early bird ticket',
          slug: 'earlybirds',
          amount: 1000,
          currency: 'USD'
        }

      const onClick = (tier) => {
        expect(tier).toEqual({
          quantity: 2,
          amount: 2 * ticket.amount,
          id: ticket.id
        })
        done();
      }

      const component = mountComponent({ tier: ticket, values: {quantity: 2}, onClick })

      expect(component.find('.title').first().text()).toEqual(capitalize(ticket.name));
      expect(component.find('.ctabtn').hostNodes().text()).toEqual('get tickets');
      component.find('.ctabtn').hostNodes().simulate('click');
      console.log(">>> state", component.state());
    });
  })


});
