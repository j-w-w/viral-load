import React from "react";
import { useParams, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

function InteractionRow({ row }) {
    return (
        <tr>
            <td>{row.interactionId}</td>
            <td>{row.date}</td>
            <td>{row.charge}</td>
            <td>{row.points}</td>
        </tr>
    );
}

InteractionRow.propTypes = {
    row: PropTypes.object
}

/**
 * table row for the monthly total covid rewards earned
 */
function MonthTotalCovidsRow({month, covids}) {
    return (
        <tr>
            <td colSpan="3" className="total-header">
                Total covids generated for {month}:
            </td>
            <td>{covids}</td>
        </tr>
    );
}

MonthTotalCovidsRow.propTypes = {
    month: PropTypes.number,
    covids: PropTypes.number
}

/**
 * table row for the grand total covid points in the period
 */
function GrandTotalCovidsRow({covids}) {
    return (
        <tr>
            <td colSpan="3" className="total-header">
                Grand total covids:
            </td>
            <td>{covids}</td>
        </tr>
    );
}

GrandTotalCovidsRow.propTypes = {
    covids: PropTypes.number
}

export default function Person({people, interactions, flatInteractions}) {
    // get an id from the route parameter
    let personIdString = useParams().personId;
    const personId = parseInt(personIdString);
    const person = people[personId];

    // //get interactions involving this personId
    // let relevantInteractions = flatInteractions[personId].map(dateKey => {
    //     return Object.keys(interactions[dateKey]).filter(i => i)
    // })

    // var filtered = Object.fromEntries(Object.entries(dict).filter(([k,v]) => v > 1));

    // // Load transactions.
    // useEffect(() => {
    //     if (interactions === null) {
    //         // Note: Language is sloppy, so "a three month period" could mean a lot
    //         // of different things--three calendar months, the previous two full
    //         // months plus the current month up to today, three 31-day periods, etc.
    //         // I used a Moment call to get the same day of the month three months
    //         // prior, but I'd want to check with a product manager for clarification
    //         // in a real coding scenario.
    //         const threeMonthsAgo = moment(date)
    //             .subtract(3, "months")
    //             .format("YYYY-MM-DD");
    //         setTransactions(
    //             getTransactionsByUserId(userId, threeMonthsAgo, date)
    //         );
    //     }
    // }, [userId, interactions, date]);

    // // Show a loading message until we have interactions to display
    // if (interactions === null) {
    //     return <Loading />;
    // }

    // // Go through the transactions and build table rows.
    // let lastMonth = null;
    // let rowCounter = 0;
    // let twoWeekTotal = 0;
    // let grandTotal = 0;
    let interactionRows = [];

    // interactions.forEach((interaction) => {
    //     // convert the date to a moment
    //     const date = moment(interaction.date);
    //     const thisMonth = date.format("MMMM YYYY"); // e.g., "January 2036"

    //     // did we finish putting out rows for this month? Output the total.
    //     if (lastMonth !== null && lastMonth !== thisMonth) {
    //         interactionRows.push(
    //             <MonthTotalCovidsRow
    //                 month={lastMonth}
    //                 points={twoWeekTotal}
    //                 key={rowCounter}
    //             />
    //         );
    //         twoWeekTotal = 0;
    //     }

    //     lastMonth = thisMonth;

    //     // get the covids for this interaction
    //     const points = chargeToPoints(interaction.charge);

    //     const interactionRow = {
    //         transId: interaction.transId,
    //         date: date.format("YYYY-MM-DD"),
    //         charge: numeral(interaction.charge).format("$0,0.00"),
    //         points: points,
    //     };

    //     twoWeekTotal += points;
    //     grandTotal += points;

    //     interactionRows.push(
    //         <InteractionRow row={interactionRow} key={rowCounter} />
    //     );
    // });

    // // totals
    // interactionRows.push(
    //     <MonthTotalCovidsRow month={lastMonth} points={twoWeekTotal} key={rowCounter} />
    // );

    // interactionRows.push(
    //     <GrandTotalCovidsRow points={grandTotal} key={rowCounter} />
    // );

    // rowCounter++;

    return (
        <Table striped bordered hover>
            <thead className="thead-dark">
                <tr>
                    <th>Interaction ID</th>
                    <th>Date</th>
                    <th>Interactors</th>
                    <th>Covids Generated</th>
                </tr>
            </thead>
            <tbody>{interactionRows}</tbody>
        </Table>
    );
}

Person.propTypes = {
    people: PropTypes.object,
    interactions: PropTypes.object,
    flatInteractions: PropTypes.object
}