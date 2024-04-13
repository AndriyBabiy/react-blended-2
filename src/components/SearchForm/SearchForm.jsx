import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: '',
  };

  handleChange = evt => {
    this.setState({ search: evt.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleSearch(this.state.search);
  };

  render() {
    return (
      <>
        <h2>SearchForm</h2>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <FormBtn type="submit">
            <FiSearch size="16px" />
          </FormBtn>
          <InputSearch
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="What do you want to write?"
            name="search"
            required
            autoFocus
          />
        </SearchFormStyled>{' '}
      </>
    );
  }
}
