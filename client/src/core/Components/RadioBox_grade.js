import React, {useState} from 'react';
import styled from 'styled-components';

const RadioBox_grade = ({filter_grades, handleFilters}) => {

    const [value, setValue] = useState(0);
    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    }
    return filter_grades.map((p, i) => (
        <div key={i} className="border p-1 m-1 rounded">
            <label className="form-check-label m-1" role="button">
                <input
                    onChange={handleChange}
                    value={`${p._id}`}
                    type="radio"
                    name={p}
                    className="m-1"
                />
                {p.name}</label>
        </div>
));
}

export default RadioBox_grade;