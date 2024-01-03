function getQueryStringFromURL(url) {
    const url_parts = url.split("?")
    const qa_index = url_parts.length - 1
    return url_parts[qa_index]
}


function isValid(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(regex) !== null 
}
