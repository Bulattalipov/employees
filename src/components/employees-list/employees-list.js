import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProps}) => {

        let elemens = data.map(item => {
            let {id, ...itemProps} = item;
            return <EmployeesListItem
                key={id}
                onDelete={() => {onDelete(id)}}
                onToggleProps={(e) => onToggleProps(id, e.currentTarget.getAttribute('data-toggle'))}
                {...itemProps}/>
        })

        return (
            <ul className="app-list list-group">
                {elemens}
            </ul>
        )
}

export default EmployeesList;