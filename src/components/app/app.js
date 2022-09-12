import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      data: [
        {name: "Bulat Talipov", salary: 1000, increase: true, rise: false, id: 1},
        {name: "Kortop Kaer", salary: 1400, increase: false, rise: true, id: 2},
        {name: "Zasdep Loder", salary: 700, increase: true, rise: false, id: 3},
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  onToggleProps = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id){
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }

  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      return {
        data: [...data, newItem]
      }
    });
  }

  searchEmp = (items, term) => {
    if(term.length === 0){
      return items;
    }

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch(filter){
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }


  render(){
    const {data, term, filter}= this.state;

    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
          <AppInfo
            employees={employees}
            increased={increased}/>
          <div className="search-panel">
              <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter
                onFilterSelect={this.onFilterSelect}
                filter={filter}/>
          </div>

          <EmployeesList
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProps={this.onToggleProps}/>
          <EmployeesAddForm
            addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;
