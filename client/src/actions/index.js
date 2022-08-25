async function postData(url = '', data = {}, config) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header,
        ...config,
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export const createCluster = (formData)=>{
    return postData("/clusters/create", formData)
}

export const getClusters = (customerid)=>{
    return fetch("/clusters?" + new URLSearchParams({
        customerid
    }))
    .then(data=>data.json())
}

export const deleteCluster = ({customerid, clusterid})=> {
    return postData("/clusters/delete", {customerid, clusterid}, {method: "DELETE"})
}

export const fetchLogin = ({username, password})=>{
    // const formData = new URLSearchParams({
    //     username, password
    // });

    return postData("/login", {username, password})
}