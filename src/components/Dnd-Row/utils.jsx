import React from "react";

export function convertMinute(newTime) {
    /**
     * @param {Date} newTime new time after calculate add minutes
     */
    let minutes = "";

    if (newTime.getMinutes() < 10) {
        minutes = "0".concat(String(newTime.getMinutes()));
    } else {
        minutes = String(newTime.getMinutes());
    }

    const endTime = String(newTime.getHours()).concat(":", minutes);

    return endTime;
}

export function addMinutes(dt, store) {
    /** 把選擇課程的時間加到原本的時間
     * @param {Date} dt start date
     * @param {Array} store seletec course array
     */

    console.log("addMinutes() : ", dt, typeof dt);
    if (dt === 0) {
        console.log("dt == null");
        return dt;
    }

    let duration = store.reduce(function (accumulator, curruentValue) {
        if (curruentValue.Status === 2) {
            return accumulator + parseInt(curruentValue.duration);
        } else {
            return accumulator;
        }
    }, 0);

    console.log("new date: ", dt.getTime());

    let newTime = new Date(dt.getTime() + duration * 60000);
    let endTime = convertMinute(newTime);

    return endTime;
}
