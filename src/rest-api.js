function getCookie(cookieName) {
    for (let cookie of document.cookie.split('; ')) {
        let [name, value] = cookie.split('=');
        if (name == cookieName) {
            return value
        }
    }
    return '';
}

function get_body(data) {
    if (typeof data == 'undefined') {
        return data
    }
    let body = new FormData();
    for (let key of Object.keys(data)) {
        body.append(key, data[key]);
    }
    return body
}

function myFetchWrapper(url, method = 'GET', data) {
    const body = get_body(data);
    const headers = {'x-csrftoken': getCookie('csrftoken')};
    return fetch(url, {
        method,
        body,
        headers,
        credentials: 'same-origin',
    }).then(response => {
        if (method == 'DELETE') {
            if (response.ok) {
                return response
            } else {
                throw new Error('Ошибка');
            }
        } else {
            return response.json().then(json => {
                if (response.ok) {
                    return json
                } else {
                    throw new Error(Object.keys(json).map((key) => `${key}: ${json[key][0]}`).join('\n'));
                }
            })
        }

    });
}

class Resource {
    constructor(url) {
        this.url = url;
    }

    all(query) {
        const params = Object.keys(query).map(
            (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        ).join('&').replace(/%20/g, '+');

        const url = this.url + (params ? `?${params}` : '');
        return myFetchWrapper(url)
    }

    add(data) {
        return myFetchWrapper(this.url, 'POST', data)
    }


    del(pk) {
        return myFetchWrapper(`${this.url}${pk}/`, 'DELETE')
    }

    update(pk, data) {
        return myFetchWrapper(`${this.url}${pk}/`, 'PATCH', data)
    }
}

export const tasks = new Resource('/api/tasks/');