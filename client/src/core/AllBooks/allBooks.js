import React, {useState, useEffect} from "react";
import Layout from "../Layout";
import Card from "../Card/Card";
import {getCategories, getFilteredProducts} from "../apiCore";
import Checkbox_subject from "../Components/Checkbox_subject";
import RadioBox from "../Components/RadioBox_grade";
import RadioBox2 from "../Components/RadioBox_lang";
import {filter_grades} from "../Utils/gradesFilter";
import {filter_languages} from "../Utils/langFilter";

import styled from 'styled-components';

export const Wrapper = styled.div`

`;

export const SpinnerStyle = styled.div`
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -2rem;
    margin-top: -2rem;
  }
`

const AllBooks = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], grade: [], lang: []},
    });
    const [categories, setCategories] = useState([]); // eslint-disable-next-line
    const [error, setError] = useState(false); // eslint-disable-next-line
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);
    const [load, setLoad] = useState(false);

    const initCategory = () => {
        getCategories().then((data) => {
            if (data && data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters);
        setLoad(true);
        getFilteredProducts(skip, limit, newFilters).then((data) => {
            if (data && data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
                setLoad(false);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
            if (data && data.error) {
                setError(data.error);
            } else {
                if (data) {
                    setFilteredResults([...filteredResults, ...data.data]);
                    setSize(data.size);
                    setSkip(0);
                }
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load More
                </button>
            )
        );
    };

    useEffect(() => {
        initCategory();
        loadFilteredResults(skip, limit, myFilters.filters); // eslint-disable-next-line
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "grade") {
            let gradeValues = handleGrades(filters);
            newFilters.filters[filterBy] = gradeValues;
        }
        if (filterBy === "lang") {
            let langValues = handleLang(filters);
            newFilters.filters[filterBy] = langValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handleGrades = (value) => {
        const data = filter_grades;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const handleLang = (value) => {
        const data = filter_languages;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };


    const show = () => (
        <div className="row">
            {filteredResults.map((product, i) => (
                <div key={i} className="col-xl-3 col-lg-3.5 col-md-4 col-sm-6 col-xs-6 pt-2">
                    <Card product={product}/>
                </div>
            ))}
        </div>
    );

    const loading = () => (
        <SpinnerStyle>
            <div className="spinner">
                <div className="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </SpinnerStyle>
    );

    return (
        <Layout
            title="All Books Page"
            description="Search and find books of your choice"
            className="">
            <div className="my-1">
                <div className="d-lg-none">
                    <h2 className="" align="left">Filter</h2>
                    <div className="row justify-content-center  pb-2 pt-3 border rounded" align="center">
                        <div className="col-4 align-items-center" align="right">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                   id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="true">
                                    Subjects
                                </a>
                                <div className="dropdown-menu">
                                    <Checkbox_subject
                                        categories={categories}
                                        handleFilters={(filters) =>
                                            handleFilters(filters, "category")
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4 align-items-center" align="center">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                   id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="true">
                                    Grades
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <RadioBox
                                        filter_grades={filter_grades}
                                        handleFilters={(filters) => handleFilters(filters, "grade")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4 align-items-center" align="left">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                   id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="true">
                                    Language
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <RadioBox
                                        filter_grades={filter_languages}
                                        handleFilters={(filters) => handleFilters(filters, "lang")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 pb-2 border rounded ">
                        <h2 className="mb-2">Books</h2>

                        {load === true ? loading() : show()}

                        {loadMoreButton()}
                    </div>

                    <Wrapper>
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 d-none d-lg-block">
                            <h2 className="mb-2">Filter</h2>
                            <div className="ui vertical menu">
                                <div className="item">
                                    <div className="header">Grades</div>
                                    <div className="row">
                                        <RadioBox
                                            filter_grades={filter_grades}
                                            handleFilters={(filters) => handleFilters(filters, "grade")}
                                        />
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="header">Language</div>
                                    <div className="row">
                                        <RadioBox2
                                            filter_grades={filter_languages}
                                            handleFilters={(filters) => handleFilters(filters, "lang")}
                                        />
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="header">Subjects</div>
                                    <div className="row">
                                        <Checkbox_subject
                                            categories={categories}
                                            handleFilters={(filters) =>
                                                handleFilters(filters, "category")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>
        </Layout>
    );
};

export default AllBooks;
