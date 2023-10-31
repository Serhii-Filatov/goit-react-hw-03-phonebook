import React from 'react';

import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from 'components/App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  // UNDONE=============================================================================
  // Phonebook: В локальне сховище дані потрібно записувати в тому випадку,
  // коли змінився масив з контактами (відбулося додавання/видалення контактів)
  // componentDidUpdate(prevProps, prevState){
  //   if(this.state.contacts !== prevState.contacts){
  //    localStorage.setItem()
  //   }
  //  }
  // Вся основна логіка повинна бути в Арр.
  // Для додавання і видалення контактів використовувати значення від попереднього,
  // уникаємо мутацій стейту. В компоненті ContactsList ніяких фільтрів не потрібно,
  // лише створення розмітки.
  // UNDONE=============================================================================

  addNewContact = contact => {
    const { contacts } = this.state;

    const isExist = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...contact }],
    }));
  };

  setFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={this.state.filter} onSetFilter={this.setFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
