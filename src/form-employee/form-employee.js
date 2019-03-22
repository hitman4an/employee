import React, {Component} from 'react';

import { Link, Redirect } from 'react-router-dom';
import FormErrors from '../form-errors';


import './form-employee.css';

export default class FormEmployee extends Component {
    state = {
        FIO : '',
        fioValid: false,
        phone: '',
        phoneValid: false,
        birthday: '',
        birthdayValid: false,
        role: 'cook',
        archive: false,
        redirect: false,
        formErrors: {FIO: '', phone: '', birthday: ''}
            
    }

    componentDidMount() {
        this.addMaskScript();
        console.log('propsdata ', this.props.data);
        if (this.props.typeForm === "edit") {
            if (this.props.data.length !== 0)
                this.update();
            else
                this.setState({
                    redirect: true
                });
        }
    }
    
    addMaskScript () {
        const script = document.createElement("script");

        const scriptText = document.createTextNode(`jQuery(function($){
            $(".date").mask("99.99.9999");
            $(".phone").mask("+7 (999) 999-9999");
         });`);
  
        script.appendChild(scriptText);
        document.head.appendChild(script);
    }

    update() {
        const {typeForm, id, data} = this.props
        
        const editItem = data.find(item => 
            item.id === Number(id));
        if (typeForm === "edit") {
            this.setState({
                FIO : editItem.name,
                fioValid : true,
                phone: editItem.phone,
                phoneValid: true,
                birthday: editItem.birthday,
                birthdayValid: true,
                role: editItem.role,
                archive: editItem.isArchive,
                formValid: true
            });
            }; 
        }
    

    onArchiveChange = () => {
        this.setState({
            archive : !this.state.archive,
            edited: true
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { FIO, phone, birthday, 
            role, archive} = this.state;
        
        if (this.props.typeForm === "add") {
        
        this.setState({
            redirect: true
        });

        this.props.onItemAdded(this.props.id, 
            FIO, phone, birthday,
                role, archive);
        }

        if (this.props.typeForm === "edit")
            this.editItem()
    }

    editItem() {
        if (this.state.edited) {
            const newEditItem = {
                id: this.props.id,
                name: this.state.FIO,
                phone: this.state.phone,
                birthday: this.state.birthday,
                role: this.state.role,
                isArchive: this.state.archive
            }
            console.log('editItem ', newEditItem)
            this.props.onItemChange(this.props.id, 
                                    newEditItem)
            this.setState({redirect: true})
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, edited: true}, 
                      () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let fioValid = this.state.fioValid;
        let phoneValid = this.state.phoneValid;
        let birthdayValid = this.state.birthdayValid;
      switch(fieldName) {
            case 'FIO':
            fioValid = value.length > 5;
            fieldValidationErrors.FIO = fioValid ? '' : 'Имя слишком короткое';
            break;
          case 'phone':
            phoneValid = value.match(/^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/);
            fieldValidationErrors.phone = phoneValid ? '' : 'Телефон заполнен неверно';
            break;
          case 'birthday':
            birthdayValid = value.match(/^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/)
            fieldValidationErrors.birthday = birthdayValid ? '': 'Дата рождения заполнена неверно';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        fioValid,
                        phoneValid,
                        birthdayValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.fioValid &&
                                  this.state.phoneValid &&
                                    this.state.birthdayValid});
      }


    

    
    render ()  {

        const type = this.props.typeForm;
        const {FIO, phone, birthday, 
                archive, role, formValid} = this.state;

        if (this.state.redirect) return <Redirect to="/"/>

        return (
        <div className="Employee-App form-horizontal">
        <Header type={type}/>
        <hr/>
        <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form>
            <div className="form-group row">
                <label className="control-label col-md-3">
                    ФИО
                </label>
                <div className="col-md-7">
                    <input name="FIO" type="text" className="form-control
                        text-box single-line" defaultValue={FIO}
                        onChange = {this.handleUserInput}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="control-label col-md-3">
                    Телефон
                </label>
                <div className="col-md-3">
                    <input  
                        className="form-control phone"
                        name="phone"
                        defaultValue={phone}
                        onBlur = {this.handleUserInput}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="control-label col-md-3">
                    Дата рождения
                </label>
                <div className="col-md-3">
                    <input  
                        className="form-control date"
                        name="birthday" 
                        defaultValue={birthday}
                        onBlur = {this.handleUserInput }/>
                </div>
            </div>

            <div className="form-group row">
                <label className="control-label col-md-3">
                    Должность
                </label>
                <div className="col-md-3">
                    <select className="form-control" 
                        name="role"
                        value={role}
                        onChange = {this.handleUserInput}>
                        <option value="cook">Повар</option>
                        <option value="waiter">Официант</option>
                        <option value="driver">Водитель</option>
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-md-3 form-check-label">
                    <input className="form-check-input" type="checkbox"
                        checked={archive}
                        onChange={this.onArchiveChange}/> В архиве
                </label>
           </div>

            <div className="form-group row">
                <div className="col-md-4">
                    <SubmitButton type={type} valid={formValid} 
                                onSubmit = {this.onSubmit}/>
                </div>
                <div className="col-md-4">
                <Link to = "/">
                    <button type="submit" 
                        className="btn btnform btn-dark secondbtn">
                        Вернуться
                    </button>
                </Link>
                </div>
            </div>

        </form>

            
        </div>
        
            
        )
    }
}

const Header = ({type}) => { 
    if (type === "add") 
        return (<h2>Добавление сотрудника</h2>)
    if (type === "edit")
        return (<h2>Редактирование сотрудника</h2>)
}

const SubmitButton = ({type, onSubmit, valid}) => {
    if (type === "add") {
        return (
            <button type="submit" onClick={onSubmit}
                disabled={!valid}
                className="btn btn-dark btnform">
            Добавить сотрудника</button>
        )};
    if (type === "edit") {
       return (
            <button type="submit" onClick={onSubmit}
            disabled={!valid}
                className="btn btn-dark btnform">
            Редактировать сотрудника</button>
        )};
    

}