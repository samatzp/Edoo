import React, {useState} from "react";

const Checkbox_subject = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (c) => () => {
        const currentCategoryId = checked.indexOf(c); // return firest index else -1
        const newCheckedCategoryId = [...checked];
        //if currently checked is not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };
    return categories.map((c, i) => (
        <div key={i} className="m-1 border rounded">
            <label className="m-1" role="button">
                <input
                    value={checked.indexOf(c._id === -1)}
                    onChange={handleToggle(c._id)}
                    type="checkbox"
                    className="m-1"
                />
                {c.name}</label>
        </div>
    ));
};
export default Checkbox_subject;
