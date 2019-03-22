import React, {Component} from 'react';

export default class FilterPanel extends Component {
    state = {
        ArchiveChecked: false
    }
    
    
    onRoleChange = (e) => {
        this.props.onRoleChange(e.target.value);
    }

    onArchiveChange = () => {
        this.setState(({
            ArchiveChecked: !this.state.ArchiveChecked
        }), () => {
            this.props.onArchiveChange(
                    this.state.ArchiveChecked);
        });
    };



    render() {
        return (
        <>
        <div className="form-group">
            <label className="col-md-9 col-form-label">Фильтр по должности: </label>
            <select className="browser-default custom-select col-md-3"
            onChange={this.onRoleChange}>
                <option value="all">Все</option>
                <option value="cook">Повар</option>
                <option value="waiter">Официант</option>
                <option value="driver">Водитель</option>
            </select>
        </div>
        <div className="form-group">
            <label className="col-md-12 from-check-label">
                <input className="form-check-input" 
                type="checkbox"
                onChange={this.onArchiveChange} 
                value="false"/>
                В архиве
            </label>
        </div>
        </>
        )
    }
}