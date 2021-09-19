import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: [],
    };
  }

  addItem(todoValue) {
    if (todoValue !== '') {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({ list: list, newItem: '' });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedlist = list.filter((item) => item.id !== id);
    this.setState({ list: updatedlist });
  }
  checkedItem(id) {
    const list = [...this.state.list];
    const checkedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }

      return item;
    });
    console.log(checkedList);
    this.setState({ list: checkedList });
  }

  handleChange(item) {
    if (item.isDone) {
      return null;
    }
    this.checkedItem(item.id);
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }

  render() {
    return (
      <div className='main-container'>
        <img src={logo} width='100' height='100' className='logo' />
        <h1 className='app-title'>Abhishek ToDo</h1>
        <div className='container'>
          Add an Item...
          <br />
          <input
            type='text'
            name=''
            className='form-control'
            placeholder='write a todo'
            required
            value={this.state.newItem}
            onChange={(e) => this.updateInput(e.target.value)}
          />
          <button
            className='btn btn-success add-btn'
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >
            Add ToDo
          </button>
          <div className='list'>
            <ul className='list-ul'>
              {this.state.list.map((item) => {
                return (
                  <li key={item.id} className='li-cl'>
                    <input
                      type='checkbox'
                      name='idDone'
                      checked={item.isDone}
                      onChange={() => this.handleChange(item)}
                    />
                    <span
                      style={
                        item.isDone
                          ? { textDecoration: 'line-through' }
                          : { textDecoration: 'none' }
                      }
                      className='title-span'
                    >
                      {item.value}
                    </span>

                    <button
                      className='btn btn-danger btn-del'
                      onClick={() => {
                        this.deleteItem(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
              <li className='li-cl'>
                <input type='checkbox' name='' />
                <span className='title-span'>You can not delete me</span>
                <button className='btn btn-danger btn-del'>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
