import { Component } from 'react/cjs/react.production.min';
import './employees-add-form.css';

class EmployeesAddForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitItem = (e) => {
        e.preventDefault();
        if(this.state.name < 3 || !this.state.salary) return;
        this.props.addItem(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render(){
        let {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmitItem}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        onInput={this.onValueChange}
                        value={name}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        onInput={this.onValueChange}
                        value={salary}/>

                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;