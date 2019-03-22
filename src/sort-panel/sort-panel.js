import React, {Component} from 'react';
import './sort-panel.css';

export default class SortPanel extends Component {

    onSortChange = (e) => {
        this.props.onSortChange(e.target.value);
    };
    
    render() {
        return (
            <div className="form-group">
                <label className="col-md-9 col-form-label">Сортировать по: </label>
                <select className="browser-default custom-select col-md-3"
                    onChange={this.onSortChange}>
                    <option value="empty"></option>
                    <option value="name">ФИО</option>
                    <option value="birthday">дате рождения</option>
                </select>
            </div>
        )
            
       
    }
}