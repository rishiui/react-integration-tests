/* eslint-disable no-console */
export const API_ENDPOINT = `https://swapi.dev/api`;

export const getAllPeople = async () => {
  const people = await fetch(`${API_ENDPOINT}/people`);
  const data = await people.json();
  return data;
};

export const getPerson = async id => {
  const person = await fetch(`${API_ENDPOINT}/people/${id}`);
  const data = await person.json();
  return data;
};
