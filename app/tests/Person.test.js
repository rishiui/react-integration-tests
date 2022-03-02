import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import App from '../containers/App';
import configureStore from '../configureStore';
import { server } from './handler';

import { API_ENDPOINT } from '../../server/api';
let history;
const renderApp = () => {
  history = createMemoryHistory();
  history.push('/person/1');
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

  it('It should display person details', async () => {
    renderApp();

    // It should initially display loading people text
    expect(await screen.findByText(/Loading Person.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Person Details are:'
    expect(
      await screen.findByText(/Person Details are:/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();

    expect(screen.getByText(/Name: Luke Skywalker/i));
    expect(screen.getByText(/No of starships: 2/i));
    expect(screen.getByText(/No of vehicles: 2/i));
  });

  it('It should display error message when get person call results in error', async () => {
    server.use(
      rest.get(`${API_ENDPOINT}/people/:id`, (req, res, ctx) =>
        res(ctx.status(400)),
      ),
    );

    renderApp();

    /**
     * Test the following flows:
     * 1. Should display error message when get Person call results in error.
     */

    // It should initially display loading people text
    expect(screen.getByText(/Loading Person.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Peoples in Starwar'
    expect(
      await screen.findByText(
        /Something went wrong.../i,
        {},
        { timeout: 3000 },
      ),
    ).toBeInTheDocument();
  });

  it('It should display message when get person call returns no data', async () => {
    server.use(
      rest.get(`${API_ENDPOINT}/people/:id`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json({})),
      ),
    );

    renderApp();

    /**
     * Test the following flows:
     * 1. Should display message when get Person call has no results..
     */

    // It should initially display loading people text
    expect(screen.getByText(/Loading Person.../)).toBeInTheDocument();

    // Once the Page has loaded it should display the text 'Peoples in Starwar'
    expect(
      await screen.findByText(
        /Person Details Not found/i,
        {},
        { timeout: 3000 },
      ),
    ).toBeInTheDocument();
  });
});
