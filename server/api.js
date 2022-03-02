/* eslint-disable no-console */
const API_ENDPOINT = `https://swapi.dev/api`;

export const getAllPeople = async () => {
  console.log('before');
  const people = await fetch(`${API_ENDPOINT}/people`);
  const data = await people.json();
  console.log('after', data);
  return data;
};

export const getPerson = async id => {
  const person = await fetch(`${API_ENDPOINT}/people/${id}`);
  const data = await person.json();
  return data;
};
