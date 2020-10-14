import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUnixMs } from "../../lib/timeUtil";

export default function ComponentTimers({stepInterval = 1000}) {

    const [timers, setTimers] = useState({
        init: getCurrentUnixMs(),
        was: 0,
        changed: 0
    });

    useEffect(() => {
        const updateTimers = () => {
            const newState = {
                init: timers.init,
                was: timers.changed,
                changed: getCurrentUnixMs(),
            };

            setTimers(newState);
        };

        setTimeout(updateTimers, stepInterval);

    }, [timers, stepInterval])

    let actual = timers.changed - timers.was;
    let drift = stepInterval - actual;
    let absDrift = Math.abs(drift) + ' ms';
    let driftModifier = drift === 0
        ? "as"
        : drift > 0
            ? `${absDrift} quicker than`
            : `${absDrift} slower than`;

    let driftString = `${driftModifier} expected`;

    return (
        <>
        <div>initialized: {timers.init}</div>
        <div>changed: {timers.changed}</div>
        <div>previous change: {timers.was}</div>
        <div>expected interval ms: {stepInterval} -- actual ms: {actual}</div>
        <div>interval was {driftString}</div>
        </>
    )
}

ComponentTimers.propTypes = {
    stepInterval: PropTypes.number
}