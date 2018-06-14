
import { mount } from 'enzyme';
import React from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
addLocaleData([...en]);

import Expenses from '../Expenses';


describe("Expenses component", () => {

  const collective = {
    slug: 'test',
    id: 1,
    name: 'webpack',
    stats: { balance: 10000}
  }

  const fromCollective = {
    id: 2,
    type: 'USER',
    slug: 'user1',

  }

  const expenseConsts = { 
    currency: 'USD', 
    status: 'APPROVED', 
    payoutMethod: 'paypal', 
    incurredAt: '2017-11-05',
    collective, 
    fromCollective};

  const expenses = [
    Object.assign({}, {...expenseConsts}, {id: 1, amount: 1000}),
    Object.assign({}, {...expenseConsts}, {id: 2, amount: 1000})
  ];

  const loggedInUser = { 
    canPayExpense: () => true, 
    canApproveExpense: () => true,
    canEditExpense: () => true,
    collective: {
      id: 3,
      slug: 'hostuser'
    }}

  const component = mount(
    <IntlProvider locale="en">
      <Expenses
        expenses={expenses}
        editable={true}
        LoggedInUser={loggedInUser}
        payExpense={() => setTimeout(() => Promise.resolve(), 2000)}
        />
      </IntlProvider>
  );

  describe('Paying expenses', () => {
    it('disables all buttons while one expense is being paid', done => {

      // make sure there are two pay buttons on the page
      expect(component.find('.PayExpenseBtn button').length).toEqual(2);

      // make sure none are disabled
      expect(component.find('.PayExpenseBtn button[disabled]').lenght).toEqual(undefined);

      // click on the first one
      component.find('.PayExpenseBtn button').first().simulate('click');
      
      // expect two disabled buttons again
      expect(component.find('.PayExpenseBtn button[disabled]').length).toEqual(2);

      // after timeout, make sure there is only button and it's not disabled.
      setTimeout(() => {
        expect(component.find('.PayExpenseBtn button').length).toEqual(1);
        expect(component.find('.PayExpenseBtn button[disabled]').length).toEqual(undefined);
      }, 2000)
      done();
    });
  })
});
