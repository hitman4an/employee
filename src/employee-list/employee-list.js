import React, {Component} from 'react';
import SortPanel from '../sort-panel';
import FilterPanel from '../filter-panel';

import { Link } from 'react-router-dom';

import './employee-list.css';


export default class EmployeeList extends Component {

    state = {
        sortType: 'empty',
        archive: false,
        role: 'all'
    }

      onSortChange = (sortType) => {
        console.log('sort is ' + sortType);
        this.setState({sortType});
      };
      
      onArchiveChange = (archiveChecked) => {
        console.log('archive is ' + archiveChecked);
        this.setState({archive: archiveChecked });
      }
      
      onRoleChange = (role) => {
        console.log('position is ' + role);
        this.setState({role: role});
      }
      
      sortByName(items) {
        return items.sort((a,b) => {
          const nameA = a.name.toUpperCase(); 
          const nameB = b.name.toUpperCase();
      
          return nameA > nameB ? 1 : -1;
          
        });
      }
      
      sortByDate(items) {
        return items.sort((a,b) => {
          const dateA = 
          new Date(a.birthday.replace(
                        /(\d+).(\d+).(\d+)/, '$3/$2/$1')); 
          const dateB = 
          new Date(b.birthday.replace(
                        /(\d+).(\d+).(\d+)/, '$3/$2/$1'));
          return dateA - dateB; 
        });
      }
      
      showEmployee(items, sortType, archive, pos) {
        let showItems = [];
        switch(sortType) {
          case 'empty':
          showItems = items.sort((a,b) => a.id-b.id);
          break;
          case 'name':
          showItems = this.sortByName(items);
          break;
          case 'birthday':
          showItems = this.sortByDate(items);
          break;
          default :
          showItems = [];
        };
      
        console.log('Items is ', showItems);
        console.log('archive is ', archive);
      
        if (pos === 'all') {
          return showItems.filter((item) => 
          item.isArchive === archive)
        };
      
        return showItems.filter((item) => 
          item.isArchive === archive && 
          item.role === pos);
      };
        
        getRole(role) {
            if (role==='driver') return 'Водитель';
            if (role==='waiter') return 'Официант';
            if (role==='cook') return 'Повар';

            return 'Неизвестная должность';
        }
  
       render() {
        const {sortType, 
            archive, role} = this.state;

        const {data, onItemDeleted} = this.props;

        console.log('employee-list data ', data);
        
        const visibleItems = 
        this.showEmployee(data, sortType, 
          archive, role);
        
        const elements = visibleItems.map((item) => {
            
               return (
                    <tr key={item.id}> 
                        <td>{item.name}</td>
                        <td>{this.getRole(item.role)}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`/editItem/${item.id}`}>
                                <button type="button"
                                className="btn btn-outline-dark
                                    btn-sm">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </Link>
                            
                            <Link to="/">
                                <button type="button"
                                className="btn btn-outline-danger
                                    btn-sm delbtn"
                                onClick={() => onItemDeleted(item.id)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </Link>
                            
                        </td>
                    </tr>             
               );
    
           });
    
       return (
        <div className="Employee-App">
            <h1>Список сотрудников</h1>
            <SortPanel onSortChange={this.onSortChange}/>
            <FilterPanel onRoleChange={this.onRoleChange}
                        onArchiveChange={this.onArchiveChange}/>
            <div className="row">
                <div className="col-md-12">
                <Link style={{ color: '#007bff', float: 'left'}}
                  to="/addEmployee">Добавить сотрудника</Link>
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Телефон</th>
                    <th/>
                </tr>
                </thead>
                <tbody>{elements}</tbody>
            </table>
        </div>
        );
       }
   }