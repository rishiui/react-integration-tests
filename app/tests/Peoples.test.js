import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import App from '../containers/App';
import configureStore from '../configureStore';
import { server } from './handler';

import { API_ENDPOINT } from '../../server/api';
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
  // listen
  beforeEach(() => {
    server.listen();
  });

  // clean up once the tests are done
  afterEach(() => {
    server.resetHandlers();
    server.close();
  });

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
    userEvent.click(person1);
    expect(history.location.pathname).toBe(`/people/1`);

    expect(screen.getByText(/Loading Person.../)).toBeInTheDocument();
  });

  it('It should display error message when person listing call results in error', async () => {
    server.use(
      rest.get(`${API_ENDPOINT}/people`, (req, res, ctx) =>
        res(ctx.status(400)),
      ),
    );

    renderApp();

    /**
     * Test the following flows:
     * 1. Should display error message when get Person call results in error.
     */

    // It should initially display loading people text
    expect(screen.getByText(/Loading People.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Peoples in Starwar'
    expect(
      await screen.findByText(
        /Something went wrong.../i,
        {},
        { timeout: 3000 },
      ),
    ).toBeInTheDocument();
  });

  it('It should display message when listing call has no results.', async () => {
    server.use(
      rest.get(`${API_ENDPOINT}/people`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            results: [],
          }),
        ),
      ),
    );

    renderApp();

    /**
     * Test the following flows:
     * 1. Should display message when get Person call has no results..
     */

    // It should initially display loading people text
    expect(screen.getByText(/Loading People.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Peoples in Starwar'
    expect(
      await screen.findByText(/No people found./i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });
});
