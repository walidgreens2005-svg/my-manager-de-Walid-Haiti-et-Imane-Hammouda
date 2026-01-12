/**
 * Gestion des opérations CRUD pour l'application MyManager
 * Fournit des fonctions génériques pour créer, lire, mettre à jour et supprimer des entités
 */

class CRUDManager {
    constructor() {
        this.currentEntity = null;
        this.currentData = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.searchTerm = '';
        this.sortField = 'id';
        this.sortDirection = 'asc';
        this.filters = {};
    }

    /**
     * Initialise le gestionnaire CRUD pour une entité
     * @param {string} entity - Type d'entité
     * @param {object} config - Configuration de l'entité
     */
    init(entity, config) {
        this.currentEntity = entity;
        this.config = config;

        // Réinitialiser les paramètres
        this.currentPage = 1;
        this.searchTerm = '';
        this.sortField = 'id';
        this.sortDirection = 'asc';
        this.filters = {};

        // Charger les données initiales
        return this.loadData();
    }

    /**
     * Retourne la clé de stockage pour l'entité actuelle
     */
    getStorageKey() {
        return `myManager_data_${this.currentEntity}`;
    }

    /**
     * Sauvegarde les données actuelles dans localStorage
     */
    saveToLocalStorage() {
        if (!this.config.useLocalData) return;
        try {
            localStorage.setItem(this.getStorageKey(), JSON.stringify(this.currentData));
        } catch (e) {
            console.error('Erreur lors de la sauvegarde dans localStorage:', e);
        }
    }

    /**
     * Enregistre une activité dans l'historique global
     */
    logActivity(action, item) {
        try {
            const activities = JSON.parse(localStorage.getItem('myManager_activities') || '[]');

            let title = '', description = '', icon = '', color = '';

            // Personnaliser le message selon l'entité et l'action
            switch (this.currentEntity) {
                case 'users':
                    icon = 'fa-user';
                    color = '#4CAF50';
                    const userName = item.firstName ? `${item.firstName} ${item.lastName}` : (item.name || 'Utilisateur');
                    if (action === 'create') {
                        title = 'Nouvel utilisateur';
                        description = `${userName} a été ajouté`;
                        icon = 'fa-user-plus';
                    } else if (action === 'update') {
                        title = 'Utilisateur modifié';
                        description = `${userName} a été mis à jour`;
                        icon = 'fa-user-edit';
                        color = '#2196F3';
                    } else if (action === 'delete') {
                        title = 'Utilisateur supprimé';
                        description = `L'utilisateur #${item} a été supprimé`;
                        icon = 'fa-user-times';
                        color = '#F44336';
                    }
                    break;

                case 'products':
                    icon = 'fa-box';
                    color = '#2196F3';
                    const prodName = item.name || 'Produit';
                    if (action === 'create') {
                        title = 'Nouveau produit';
                        description = `${prodName} ajouté au catalogue`;
                        icon = 'fa-box-open';
                    } else if (action === 'update') {
                        title = 'Produit mis à jour';
                        description = `${prodName} modifié`;
                        icon = 'fa-edit';
                        color = '#FF9800';
                    } else if (action === 'delete') {
                        title = 'Produit supprimé';
                        description = `Produit #${item} retiré du stock`;
                        icon = 'fa-trash';
                        color = '#F44336';
                    }
                    break;

                case 'orders':
                    icon = 'fa-shopping-cart';
                    color = '#FF9800';
                    if (action === 'create') {
                        title = 'Nouvelle commande';
                        description = `Commande #${item.orderNumber || '??'} créée`;
                    } else if (action === 'update') {
                        title = 'Commande mise à jour';
                        description = `Statut mis à jour pour #${item.orderNumber || item.id}`;
                        color = '#2196F3';
                    }
                    break;

                default:
                    title = `${this.currentEntity} : ${action}`;
                    description = `Action ${action} effectuée sur ${this.currentEntity}`;
                    icon = 'fa-info-circle';
                    color = '#607D8B';
            }

            const newActivity = {
                title,
                description,
                icon,
                color,
                timestamp: new Date().toISOString()
            };

            activities.unshift(newActivity);

            // Garder seulement les 20 dernières activités
            if (activities.length > 20) activities.pop();

            localStorage.setItem('myManager_activities', JSON.stringify(activities));

        } catch (e) {
            console.error('Erreur lors de l\'enregistrement de l\'activité:', e);
        }
    }

    /**
     * Charge les données depuis l'API ou le cache local
     */
    async loadData() {
        try {
            let data;

            if (this.config.useLocalData) {
                // Essayer de charger depuis localStorage d'abord
                const storedData = localStorage.getItem(this.getStorageKey());

                if (storedData) {
                    try {
                        data = JSON.parse(storedData);
                        console.log(`Données chargées depuis localStorage pour ${this.currentEntity}`);
                    } catch (e) {
                        console.error('Erreur de parsing localStorage', e);
                        data = this.generateLocalData();
                        this.saveToLocalStorage(); // Réparer le stockage
                    }
                } else {
                    // Si rien dans localStorage, générer les données par défaut
                    data = this.generateLocalData();
                    // Et sauvegarder immédiatement pour la prochaine fois
                    this.currentData = data;
                    this.saveToLocalStorage();
                }
            } else {
                // Utiliser l'API
                data = await apiService.fetchData(
                    this.currentEntity,
                    this.config.apiSource || 'jsonplaceholder'
                );
            }

            this.currentData = data;
            return data;

        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);

            // Fallback sur les données locales
            this.currentData = this.generateLocalData();
            return this.currentData;
        }
    }

    /**
     * Génère des données locales simulées
     */
    generateLocalData() {
        const mockGenerators = {
            users: this.generateMockUsers.bind(this),
            products: this.generateMockProducts.bind(this),
            orders: this.generateMockOrders.bind(this),
            customers: this.generateMockCustomers.bind(this),
            invoices: this.generateMockInvoices.bind(this)
        };

        const generator = mockGenerators[this.currentEntity] || this.generateMockUsers.bind(this);
        return generator();
    }

    /**
     * Génère des utilisateurs fictifs
     */
    generateMockUsers() {
        const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Anne', 'Paul', 'Julie'];
        const lastNames = ['Dupont', 'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand'];
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            firstName: firstNames[i % firstNames.length],
            lastName: lastNames[i % lastNames.length],
            email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}@${domains[i % domains.length]}`,
            phone: `+33 ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`,
            role: ['admin', 'user', 'editor', 'viewer'][Math.floor(Math.random() * 4)],
            status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
            registrationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
            lastLogin: new Date(Date.now() - Math.random() * 1000000000).toISOString()
        }));
    }

    /**
     * Génère des produits fictifs
     */
    generateMockProducts() {
        const categories = ['Électronique', 'Vêtements', 'Alimentation', 'Maison', 'Sports', 'Livres'];
        const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Bosch', 'Philips'];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `Produit ${i + 1}`,
            description: `Description détaillée du produit ${i + 1}. Caractéristiques et spécifications.`,
            price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
            category: categories[i % categories.length],
            brand: brands[i % brands.length],
            stock: Math.floor(Math.random() * 1000),
            sku: `SKU-${(i + 1).toString().padStart(6, '0')}`,
            rating: parseFloat((Math.random() * 5).toFixed(1)),
            status: ['in_stock', 'out_of_stock', 'discontinued'][Math.floor(Math.random() * 3)]
        }));
    }

    /**
     * Génère des commandes fictives
     */
    generateMockOrders() {
        const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const paymentMethods = ['credit_card', 'paypal', 'bank_transfer', 'cash'];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            orderNumber: `ORD-${(i + 1).toString().padStart(6, '0')}`,
            customerId: Math.floor(Math.random() * 20) + 1,
            customerName: `Client ${Math.floor(Math.random() * 20) + 1}`,
            totalAmount: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
            status: statuses[i % statuses.length],
            orderDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
            deliveryDate: new Date(Date.now() + Math.random() * 10000000000).toISOString().split('T')[0],
            paymentMethod: paymentMethods[i % paymentMethods.length],
            paymentStatus: ['paid', 'pending', 'failed'][Math.floor(Math.random() * 3)],
            items: Math.floor(Math.random() * 10) + 1
        }));
    }

    /**
     * Génère des clients fictifs
     */
    generateMockCustomers() {
        const companies = ['TechCorp', 'Global Solutions', 'Innovate Inc', 'FutureTech', 'Digital Systems'];
        const countries = ['France', 'USA', 'Germany', 'UK', 'Canada', 'Japan'];

        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `Client ${i + 1}`,
            email: `client${i + 1}@example.com`,
            phone: `+1 555 ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            company: companies[i % companies.length],
            country: countries[i % countries.length],
            status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
            registrationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
            totalOrders: Math.floor(Math.random() * 100),
            totalSpent: parseFloat((Math.random() * 10000 + 100).toFixed(2))
        }));
    }

    /**
     * Génère des factures fictives
     */
    generateMockInvoices() {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            invoiceNumber: `INV-${(i + 1).toString().padStart(6, '0')}`,
            customerId: Math.floor(Math.random() * 20) + 1,
            customerName: `Client ${Math.floor(Math.random() * 20) + 1}`,
            amount: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
            issueDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
            dueDate: new Date(Date.now() + Math.random() * 10000000000).toISOString().split('T')[0],
            status: ['paid', 'pending', 'overdue', 'cancelled'][Math.floor(Math.random() * 4)],
            paymentMethod: ['bank_transfer', 'credit_card', 'paypal'][Math.floor(Math.random() * 3)],
            items: Math.floor(Math.random() * 5) + 1
        }));
    }

    /**
     * Récupère les données paginées
     */
    getPaginatedData() {
        let filteredData = this.applyFilters(this.currentData);

        // Appliquer la recherche
        if (this.searchTerm) {
            filteredData = this.applySearch(filteredData, this.searchTerm);
        }

        // Appliquer le tri
        filteredData = this.applySorting(filteredData);

        // Calculer la pagination
        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, totalItems);

        const pageData = filteredData.slice(startIndex, endIndex);

        return {
            data: pageData,
            pagination: {
                currentPage: this.currentPage,
                totalPages,
                totalItems,
                itemsPerPage: this.itemsPerPage,
                startIndex: startIndex + 1,
                endIndex
            }
        };
    }

    /**
     * Applique les filtres aux données
     */
    applyFilters(data) {
        if (Object.keys(this.filters).length === 0) {
            return data;
        }

        return data.filter(item => {
            return Object.entries(this.filters).every(([key, value]) => {
                if (!value || value === 'all') return true;

                const itemValue = this.getNestedValue(item, key);
                return itemValue === value || itemValue?.toString().toLowerCase() === value.toLowerCase();
            });
        });
    }

    /**
     * Applique la recherche aux données
     */
    applySearch(data, searchTerm) {
        if (!searchTerm) return data;

        const term = searchTerm.toLowerCase();

        return data.filter(item => {
            return this.config.searchFields.some(field => {
                const value = this.getNestedValue(item, field);
                return value?.toString().toLowerCase().includes(term);
            });
        });
    }

    /**
     * Applique le tri aux données
     */
    applySorting(data) {
        return [...data].sort((a, b) => {
            let valueA = this.getNestedValue(a, this.sortField);
            let valueB = this.getNestedValue(b, this.sortField);

            // Gérer les valeurs non définies
            if (valueA === undefined) valueA = '';
            if (valueB === undefined) valueB = '';

            // Convertir en chaîne pour la comparaison
            const strA = valueA.toString().toLowerCase();
            const strB = valueB.toString().toLowerCase();

            if (this.sortDirection === 'asc') {
                return strA.localeCompare(strB);
            } else {
                return strB.localeCompare(strA);
            }
        });
    }

    /**
     * Récupère une valeur imbriquée dans un objet
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    /**
     * Définit une valeur imbriquée dans un objet
     */
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
    }

    /**
     * Calcule le prochain ID disponible (plus petit entier positif libre)
     */
    getNextAvailableId() {
        const ids = this.currentData.map(item => parseInt(item.id)).filter(id => !isNaN(id));
        ids.sort((a, b) => a - b);

        let nextId = 1;
        for (const id of ids) {
            if (id === nextId) {
                nextId++;
            } else if (id > nextId) {
                return nextId;
            }
        }
        return nextId;
    }

    /**
     * Crée un nouvel élément
     */
    async createItem(data) {
        try {
            let newItem;

            if (this.config.useLocalData) {
                // Création locale
                newItem = {
                    id: this.getNextAvailableId(), // ID séquentiel (1, 2, 3...)
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Logique spécifique pour les commandes
                if (this.currentEntity === 'orders') {
                    if (!newItem.orderNumber) {
                        const randomSuffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                        newItem.orderNumber = `ORD-${randomSuffix}`;
                    }
                    if (!newItem.orderDate) {
                        newItem.orderDate = new Date().toISOString().split('T')[0];
                    }
                }

                this.currentData.unshift(newItem);
                this.saveToLocalStorage();
            } else {
                // Création via API
                newItem = await apiService.create(this.currentEntity, data, this.config.apiSource);
                this.currentData.unshift(newItem);

                // Invalider le cache
                apiService.clearCache();
            }

            // Log activity
            this.logActivity('create', newItem);

            return { success: true, data: newItem };

        } catch (error) {
            console.error('Erreur lors de la création:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Met à jour un élément existant
     */
    async updateItem(id, data) {
        try {
            let updatedItem;

            if (this.config.useLocalData) {
                // Mise à jour locale
                const index = this.currentData.findIndex(item => item.id == id);

                if (index === -1) {
                    throw new Error('Élément non trouvé');
                }

                updatedItem = {
                    ...this.currentData[index],
                    ...data,
                    updatedAt: new Date().toISOString()
                };

                this.currentData[index] = updatedItem;
                this.saveToLocalStorage();
            } else {
                // Mise à jour via API
                updatedItem = await apiService.update(this.currentEntity, id, data, this.config.apiSource);

                // Mettre à jour les données locales
                const index = this.currentData.findIndex(item => item.id == id);
                if (index !== -1) {
                    this.currentData[index] = updatedItem;
                }

                // Invalider le cache
                apiService.clearCache();
            }

            // Log activity
            this.logActivity('update', updatedItem);

            return { success: true, data: updatedItem };

        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Supprime un élément
     */
    async deleteItem(id) {
        try {
            if (this.config.useLocalData) {
                // Suppression locale
                const index = this.currentData.findIndex(item => item.id == id);

                if (index === -1) {
                    throw new Error('Élément non trouvé');
                }

                this.currentData.splice(index, 1);
                this.saveToLocalStorage();
            } else {
                // Suppression via API
                await apiService.delete(this.currentEntity, id, this.config.apiSource);

                // Mettre à jour les données locales
                this.currentData = this.currentData.filter(item => item.id != id);

                // Invalider le cache
                apiService.clearCache();
            }

            // Log activity
            this.logActivity('delete', id);

            return { success: true };

        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Récupère un élément par son ID
     */
    getItemById(id) {
        return this.currentData.find(item => item.id == id);
    }

    /**
     * Change de page
     */
    setPage(page) {
        if (page >= 1 && page <= this.getTotalPages()) {
            this.currentPage = page;
        }
    }

    /**
     * Définit le nombre d'éléments par page
     */
    setItemsPerPage(count) {
        this.itemsPerPage = parseInt(count);
        this.currentPage = 1; // Revenir à la première page
    }

    /**
     * Définit le terme de recherche
     */
    setSearchTerm(term) {
        this.searchTerm = term;
        this.currentPage = 1; // Revenir à la première page
    }

    /**
     * Définit le champ de tri
     */
    setSortField(field) {
        if (this.sortField === field) {
            // Inverser la direction si même champ
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
    }

    /**
     * Définit un filtre
     */
    setFilter(key, value) {
        if (!value || value === 'all') {
            delete this.filters[key];
        } else {
            this.filters[key] = value;
        }
        this.currentPage = 1; // Revenir à la première page
    }

    /**
     * Calcule le nombre total de pages
     */
    getTotalPages() {
        return Math.ceil(this.currentData.length / this.itemsPerPage);
    }

    /**
     * Exporte les données en CSV
     */
    exportToCSV() {
        const data = this.getPaginatedData().data;

        if (data.length === 0) {
            throw new Error('Aucune donnée à exporter');
        }

        // Préparer les champs à exporter
        const fieldsToExport = this.config.exportFields || this.config.fields;

        // Préparer les en-têtes
        const headers = fieldsToExport.map(f => f.label);

        // Préparer les lignes de données
        const rows = data.map(item => {
            return fieldsToExport.map(field => {
                const key = field.key || field.name;
                const value = this.getNestedValue(item, key);
                // Échapper les virgules et guillemets pour le CSV
                return `"${(value || '').toString().replace(/"/g, '""')}"`;
            }).join(',');
        });

        // Combiner en-têtes et données
        const csvContent = [headers.join(','), ...rows].join('\n');

        // Créer le blob et télécharger
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${this.currentEntity}_export_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    }
}

// Instance singleton
const crudManager = new CRUDManager();

// Export pour utilisation globale
window.crudManager = crudManager;