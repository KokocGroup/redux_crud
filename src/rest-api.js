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

class Resource {
    constructor(url) {
        this.url = url;
    }

    all() {
        return fetch(this.url, {credentials: 'same-origin'}).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText)
            }
        })
    }

    add(data) {
        let body = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key))
                body.append(key, data[key]);
        }

        return fetch(this.url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: headers,
            body: body
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText)
            }
        })
    }

    del(pk) {
        return fetch(`${this.url}${pk}/`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: headers
        }).then((res) => {
            if (res.ok) {
                return res
            } else {
                throw new Error(res.statusText)
            }
        })
    }

    update(pk, data) {
        let body = new FormData();

        for (let key in data) {
            if (data.hasOwnProperty(key))
                body.append(key, data[key]);
        }

        return fetch(`${this.url}${pk}/`, {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: headers,
            body: body
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(res.statusText)
            }
        })
    }
}

export const tasks = new Resource('/api/tasks/');