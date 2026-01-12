/**
 * Gestion des appels API pour l'application MyManager
 * Centralise toutes les communications avec les APIs externes
 */

const API_CONFIG = {
    baseURLs: {
        jsonplaceholder: 'https://jsonplaceholder.typicode.com',
        fakestore: 'https://fakestoreapi.com',
        dummyapi: 'https://dummyapi.io/data/v1',
        reqres: 'https://reqres.in/api'
    },
    endpoints: {
        users: {
            jsonplaceholder: '/users',
            reqres: '/users',
            dummyapi: '/user'
        },
        products: {
            fakestore: '/products'
        },
        orders: {
            fakestore: '/carts'
        },
        posts: {
            jsonplaceholder: '/posts'
        },
        comments: {
            jsonplaceholder: '/comments'
        }
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

class ApiService {
    constructor() {
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes
    }

    /**
     * Récupère les données d'une API
     * @param {string} entity - Type d'entité (users, products, etc.)
     * @param {string} source - Source API (jsonplaceholder, fakestore, etc.)
     * @param {object} params - Paramètres de requête
     * @returns {Promise} Données de l'API
     */
    async fetchData(entity, source = 'jsonplaceholder', params = {}) {
        const cacheKey = `${entity}_${source}_${JSON.stringify(params)}`;
        
        // Vérifier le cache
        const cachedData = this.getFromCache(cacheKey);
        if (cachedData) {
            console.log(`Récupération depuis le cache: ${cacheKey}`);
            return cachedData;
        }
        
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            let url = `${baseURL}${endpoint}`;
            
            // Ajouter les paramètres de requête
            if (Object.keys(params).length > 0) {
                const queryParams = new URLSearchParams(params).toString();
                url += `?${queryParams}`;
            }
            
            console.log(`Requête API: ${url}`);
            
            const response = await fetch(url, {
                headers: API_CONFIG.headers
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Mettre en cache
            this.setCache(cacheKey, data);
            
            return data;
            
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            throw error;
        }
    }

    /**
     * Récupère un élément spécifique par ID
     * @param {string} entity - Type d'entité
     * @param {string|number} id - ID de l'élément
     * @param {string} source - Source API
     * @returns {Promise} Données de l'élément
     */
    async fetchById(entity, id, source = 'jsonplaceholder') {
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            const url = `${baseURL}${endpoint}/${id}`;
            
            const response = await fetch(url, {
                headers: API_CONFIG.headers
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error(`Erreur lors de la récupération de ${entity} ${id}:`, error);
            throw error;
        }
    }

    /**
     * Crée un nouvel élément
     * @param {string} entity - Type d'entité
     * @param {object} data - Données de l'élément
     * @param {string} source - Source API
     * @returns {Promise} Élément créé
     */
    async create(entity, data, source = 'jsonplaceholder') {
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            const url = `${baseURL}${endpoint}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: API_CONFIG.headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error(`Erreur lors de la création de ${entity}:`, error);
            throw error;
        }
    }

    /**
     * Met à jour un élément existant
     * @param {string} entity - Type d'entité
     * @param {string|number} id - ID de l'élément
     * @param {object} data - Données mises à jour
     * @param {string} source - Source API
     * @returns {Promise} Élément mis à jour
     */
    async update(entity, id, data, source = 'jsonplaceholder') {
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            const url = `${baseURL}${endpoint}/${id}`;
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: API_CONFIG.headers,
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de ${entity} ${id}:`, error);
            throw error;
        }
    }

    /**
     * Supprime un élément
     * @param {string} entity - Type d'entité
     * @param {string|number} id - ID de l'élément
     * @param {string} source - Source API
     * @returns {Promise} Résultat de la suppression
     */
    async delete(entity, id, source = 'jsonplaceholder') {
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            const url = `${baseURL}${endpoint}/${id}`;
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: API_CONFIG.headers
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            return { success: true, message: `${entity} ${id} supprimé avec succès` };
            
        } catch (error) {
            console.error(`Erreur lors de la suppression de ${entity} ${id}:`, error);
            throw error;
        }
    }

    /**
     * Récupère depuis le cache
     * @param {string} key - Clé de cache
     * @returns {any|null} Données en cache ou null
     */
    getFromCache(key) {
        const cached = this.cache.get(key);
        
        if (cached && (Date.now() - cached.timestamp) < this.cacheDuration) {
            return cached.data;
        }
        
        // Supprimer du cache si expiré
        if (cached) {
            this.cache.delete(key);
        }
        
        return null;
    }

    /**
     * Met en cache des données
     * @param {string} key - Clé de cache
     * @param {any} data - Données à cacher
     */
    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Vide le cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Récupère les données depuis plusieurs sources
     * @param {string} entity - Type d'entité
     * @returns {Promise} Données combinées
     */
    async fetchFromMultipleSources(entity) {
        const sources = Object.keys(API_CONFIG.endpoints[entity] || {});
        
        if (sources.length === 0) {
            throw new Error(`Aucune source configurée pour ${entity}`);
        }
        
        const promises = sources.map(source => 
            this.fetchData(entity, source).catch(error => {
                console.error(`Erreur avec la source ${source}:`, error);
                return null;
            })
        );
        
        const results = await Promise.all(promises);
        
        // Fusionner les résultats valides
        return results
            .filter(result => result !== null)
            .flat();
    }

    /**
     * Recherche des données
     * @param {string} entity - Type d'entité
     * @param {string} query - Terme de recherche
     * @param {string} source - Source API
     * @returns {Promise} Résultats de recherche
     */
    async search(entity, query, source = 'jsonplaceholder') {
        try {
            const baseURL = API_CONFIG.baseURLs[source];
            const endpoint = API_CONFIG.endpoints[entity]?.[source] || `/${entity}`;
            
            const url = `${baseURL}${endpoint}?q=${encodeURIComponent(query)}`;
            
            const response = await fetch(url, {
                headers: API_CONFIG.headers
            });
            
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error(`Erreur lors de la recherche de ${entity}:`, error);
            throw error;
        }
    }
}

// Instance singleton
const apiService = new ApiService();

// Export pour utilisation globale
window.apiService = apiService;

// Fonctions utilitaires d'export
window.fetchData = (entity, source) => apiService.fetchData(entity, source);
window.fetchById = (entity, id, source) => apiService.fetchById(entity, id, source);
window.createEntity = (entity, data, source) => apiService.create(entity, data, source);
window.updateEntity = (entity, id, data, source) => apiService.update(entity, id, data, source);
window.deleteEntity = (entity, id, source) => apiService.delete(entity, id, source);