import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../containers/App';
import configureStore from '../configureStore';

let history;
const renderApp = () => {
  history = createMemoryHistory();
  history.push('/');
  const store = configureStore({}, history);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );
};

describe('Test Peoples Page', () => {
  it('It should render a list of peoples and redirect to person details page when a person is clicked on the listing page', async () => {
    renderApp();

    /**
     * Test the following flows:
     * 1. It should render list of people in People List page.
     * 2. It should redirect and open Person Details page when any person is clicked.
     */

    // It should initially display loading people text
    expect(screen.getByText(/Loading People.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Peoples in Starwar'
    expect(
      await screen.findByText(/peoples in starwar/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();

    const numOfPeople = await screen.findAllByRole('link');
    expect(numOfPeople.length).toBe(10);

    const person1 = await screen.findByRole('link', {
      name: /Luke Skywalker/i,
    });
    screen.debug(person1);
    userEvent.click(person1);
    expect(history.location.pathname).toBe(`/people/1`);

    expect(screen.getByText(/Loading Person.../)).toBeInTheDocument();
  });
});
