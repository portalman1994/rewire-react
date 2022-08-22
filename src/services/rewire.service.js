import http from '../http-common';

class RewireDataService {
    getAll() {
        return http.get(`/rewire`);
    }

    get(id) {
        return http.get(`/rewire/${id}`);
    }

    create(data) {
        return http.post(`/rewire`, data)
    }

    update(id, data) {
        return http.put(`/rewire/${id}`, data);
    }

    delete(id) {
        return http.delete(`/rewire/${id}`);
    }
}

export default new RewireDataService();