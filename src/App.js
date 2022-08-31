import './App.css';
import React, { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';
import styled from '@emotion/styled';

const StyledHeader = styled.h1({
  marginLeft: 5,
});

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const actuallContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (actuallContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(actuallContacts));
    }
  }

  deleteContact = key => {
    this.setState(state => ({ contacts: state.contacts.filter(contact => contact.id !== key) }));
  };

  addContact = (name, number) => {
    const contact = { name: name, number: number, id: nanoid() };
    const foundContant = this.state.contacts.find(contact => contact.name === name);
    if (foundContant) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts]}));
  };

  handleFilter = event => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  render() {
    return (
      <div>
        <StyledHeader>Phonebook</StyledHeader>
        <ContactForm
          value={this.state.name}
          number={this.state.number}
          onSubmit={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ContactList
          list={this.state.contacts}
          filter={this.state.filter}
          onClick={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
