//TODO: formatCurrentUV function cannot work because it wrongly parse the json
//requires fixing....

import { setUVData } from 'UVData.jsx';

const formatCurrentUV = (data) => {
    const {
        result: {
            uv, uv_time, uv_max, uv_max_time, ozone_time,
        safe_exposure_time,
        sun_info: {sun_times, sun_position}
        }
    } = data;


    return {uv, uv_time, uv_max, uv_max_time, ozone_time, 
        safe_exposure_time, sun_times, sun_position};
};

var myHeaders = new Headers();
myHeaders.append("x-access-token", "openuv-lijrliuzfspp-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


const fetchDataUV = async function (lat, lng) {
    try {
        const response = await fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=100&dt=`, requestOptions);
        const result = await response.json();
        const formattedResult = formatCurrentUV(result);
        console.log(formattedResult);
        return formattedResult;
    } catch (error) {
        console.log('error', error);
    }
};




// Bali uv-index data
/*
fetchDataUV(-8.409518, 115.188916)
    .then((formattedResult) => {
        console.log(formattedResult.uv);
        console.log(formattedResult.uv_time);
    });
*/

fetchDataUV(-8.409518, 115.188916);

console.log(uvValue, uvTimeValue, uvMaxValue);


