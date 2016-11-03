function getCookie(cookieName) {
    for (let cookie of document.cookie.split('; ')) {
        let [name, value] = cookie.split('=');
        if (name == cookieName) {
            return value
        }
    }
    return '';
}

const headers = {'x-csrftoken': getCookie('csrftoken')};

function myFetchWrapper(url, method = 'GET', body) {
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
        let body = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key))
                body.append(key, data[key]);
        }

        return myFetchWrapper(this.url, 'POST', body)
    }


    del(pk) {
        return myFetchWrapper(`${this.url}${pk}/`, 'DELETE')
    }

    update(pk, data) {
        let body = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key))
                body.append(key, data[key]);
        }

        return myFetchWrapper(`${this.url}${pk}/`, 'PATCH', body)
    }
}

export const tasks = new Resource('/api/tasks/');