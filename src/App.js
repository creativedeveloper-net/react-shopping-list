import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.state = {items: [], newItem: ''};
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Shopping list</h1>

                <ul className="list-unstyled">
                    {this.state.items.map(item => (
                        <li key={item.id}>
                            <div className="checkbox">
                                <label>
                                    <input onChange={this.handleCheckboxChange} value={item.id} type="checkbox" name="checkbox"/>
                                    <span className={item.isChecked ? "strikethrough" : ""}>{item.name}</span>
                                </label>
                                <button onClick={this.deleteItem} value={item.id} type="button" className="close">&times;</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <form onSubmit={this.createItem} className="form-inline">
                    <div className="form-group">
                        <input onChange={this.handleInputChange} value={this.state.newItem} className="form-control"/>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({newItem: e.target.value});
    }

    handleCheckboxChange(e) {
        var id = Number(e.target.value);
        this.setState((prevState) => ({
            items: prevState.items.map(function (item) {
                if (item.id === id) {
                    if (event.target.checked) {
                        item.isChecked = true;
                    }
                    else {
                        item.isChecked = false;
                    }
                }
                return item;
            })
        }));
        this.sortItems();
    }

    createItem(e) {
        e.preventDefault();
        var newItem = {
            name: this.state.newItem,
            id: Date.now(),
            isChecked: false
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem),
            newItem: ''
        }));
        this.sortItems();
    }

    deleteItem(e) {
        var id = Number(e.target.value);
        this.setState((prevState) => ({
            items: prevState.items.filter(function (item) {
                return item.id !== id;
            })
        }));
    }

    sortItems() {
        this.setState((prevState) => ({
            items: prevState.items.sort(function (a, b) {
                return a.isChecked - b.isChecked;
            })
        }));
    }
}

export default App;
