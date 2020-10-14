import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function People({people}) {
    const userListItems = Object.keys(people).map((personKey) => (
        <li key={personKey} className="typewritten">
            <Link to={"/person/" + personKey}>
                <button type="button">
                    {people[personKey]}
                </button>
            </Link>
        </li>
    ));

    console.log(userListItems);

    return (
        <div>
            <ul className="list-inline">{userListItems}</ul>
        </div>
    );
}

People.propTypes = {
    people: PropTypes.object,
};