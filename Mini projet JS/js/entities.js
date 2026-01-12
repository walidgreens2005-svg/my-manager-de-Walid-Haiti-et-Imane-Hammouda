/**
 * Gestion des entités (Users, Products, etc.)
 */

class EntityManager {
    constructor() {
        this.currentEntity = 'users';
        this.editId = null;

        // Initialiser au chargement
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Entities JS loaded');
            this.init();
        });
    }

    /**
     * Initialisation principale
     */
    async init() {
        // Authentification
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html';
            return;
        }

        // Récupérer l'entité depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        this.currentEntity = urlParams.get('entity') || 'users';

        console.log('Loading entity:', this.currentEntity);

        // Initialiser CRUD Manager
        if (window.crudManager) {
            await window.crudManager.init(this.currentEntity, {
                useLocalData: true,
                searchFields: this.getSearchFields(this.currentEntity),
                fields: entitySchemas[this.currentEntity].fields
            });
        }

        try {
            this.initUI();
            await this.loadData();
            this.initEvents();
            this.hideLoading();
        } catch (error) {
            console.error('Error loading entity:', error);
            alert('Erreur de chargement des données');
        }
    }

    /**
     * Initialise l'interface utilisateur
     */
    initUI() {
        const titles = {
            users: { main: 'Utilisateurs', desc: 'Gérez les utilisateurs du système' },
            products: { main: 'Produits', desc: 'Gérez votre catalogue de produits' },
            orders: { main: 'Commandes', desc: 'Gérez les commandes des clients' },
            customers: { main: 'Clients', desc: 'Gérez votre base clients' },
            invoices: { main: 'Factures', desc: 'Gérez les factures' }
        };

        const title = titles[this.currentEntity] || titles.users;

        const pageTitle = document.getElementById('pageTitle');
        const entityTitle = document.getElementById('entityTitle');
        const entityDesc = document.getElementById('entityDescription');

        if (pageTitle) pageTitle.textContent = title.main;
        if (entityTitle) entityTitle.textContent = title.main;
        if (entityDesc) entityDesc.textContent = title.desc;

        this.generateTableHeaders();
        this.updateStatusFilter();
    }

    /**
     * Génère les en-têtes du tableau
     */
    generateTableHeaders() {
        const headersRaw = {
            users: ['ID', 'Nom', 'Email', 'Rôle', 'Statut', 'Date', 'Actions'],
            products: ['ID', 'Nom', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'],
            orders: ['ID', 'N° Commande', 'Client', 'Montant', 'Statut', 'Date', 'Actions'],
            customers: ['ID', 'Nom', 'Email', 'Tél', 'Entreprise', 'Statut', 'Actions'],
            invoices: ['ID', 'N° Facture', 'Client', 'Montant', 'Statut', 'Date', 'Échéance', 'Actions']
        };

        const headers = headersRaw[this.currentEntity] || headersRaw.users;
        const headerRow = document.getElementById('tableHeaders');
        if (headerRow) {
            headerRow.innerHTML = headers.map(h => `<th>${h}</th>`).join('');
        }
    }

    /**
     * Met à jour le filtre de statut dynamiquement
     */
    updateStatusFilter() {
        const statusFilter = document.getElementById('statusFilter');
        if (!statusFilter) return;

        const schema = entitySchemas[this.currentEntity];
        if (!schema) return;

        const statusField = schema.fields.find(f => f.name === 'status');
        if (!statusField || !statusField.options) return;

        const currentValue = statusFilter.value;
        statusFilter.innerHTML = '';

        // Option "Tous"
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = window.i18n ? (window.i18n.t('entity.all') || 'Tous') : 'Tous';
        statusFilter.appendChild(allOption);

        // Options spécifiques
        statusField.options.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = window.i18n ? window.i18n.t('status.' + status) : status;
            statusFilter.appendChild(option);
        });

        if (statusField.options.includes(currentValue) || currentValue === 'all') {
            statusFilter.value = currentValue;
        } else {
            statusFilter.value = 'all';
        }
    }

    /**
     * Charge les données de l'entité
     */
    async loadData() {
        console.log('Loading data for:', this.currentEntity);
        const result = window.crudManager.getPaginatedData();
        this.displayDataInTable(result.data);
        this.updatePaginationInfo(result.pagination);
    }

    /**
     * Affiche les données dans le tableau
     */
    displayDataInTable(data) {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return;

        if (data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="10" class="no-data">
                        <i class="fas fa-database"></i>
                        <p>Aucune donnée disponible</p>
                    </td>
                </tr>
            `;
            return;
        }

        let html = '';
        data.forEach(item => {
            html += this.createRow(item);
        });

        tableBody.innerHTML = html;
    }

    /**
     * Crée une ligne de tableau HTML
     */
    createRow(item) {
        let row = '<tr>';

        switch (this.currentEntity) {
            case 'users':
                const fullName = item.name || `${item.firstName} ${item.lastName}`;
                row += `
                    <td>${item.id}</td>
                    <td><span class="text-elegant-name">${fullName}</span></td>
                    <td><span class="text-elegant-email">${item.email}</span></td>
                    <td><span class="text-elegant-name" style="font-size: 13px;">${item.role}</span></td>
                    <td>${this.getStatusBadge(item.status)}</td>
                    <td>${this.formatDate(item.createdAt || item.registrationDate || item.date)}</td>
                `;
                break;
            case 'products':
                row += `
                    <td>${item.id}</td>
                    <td><span class="text-elegant-name">${item.name}</span></td>
                    <td><span class="text-elegant-name" style="font-weight: 500; color: #555;">${item.category}</span></td>
                    <td><span class="text-elegant-name" style="color: var(--primary-color);">${this.formatPrice(item.price)}</span></td>
                    <td>${item.stock}</td>
                    <td>${this.getStatusBadge(item.status)}</td>
                `;
                break;
            case 'orders':
                row += `
                    <td>${item.id}</td>
                    <td><span class="text-elegant-name">${item.orderNumber || '-'}</span></td>
                    <td><span class="text-elegant-name">${item.customerName || item.client}</span></td>
                    <td><span class="text-elegant-name" style="color: var(--primary-color);">${this.formatPrice(item.totalAmount || item.amount)}</span></td>
                    <td>${this.getStatusBadge(item.status)}</td>
                    <td>${this.formatDate(item.orderDate || item.date)}</td>
                `;
                break;
            case 'customers':
                row += `
                    <td>${item.id}</td>
                    <td><span class="text-elegant-name">${item.name}</span></td>
                    <td><span class="text-elegant-email">${item.email}</span></td>
                    <td><span class="text-elegant-email" style="font-style: normal;">${item.phone}</span></td>
                    <td><span class="text-elegant-name" style="font-size: 14px;">${item.company}</span></td>
                    <td>${this.getStatusBadge(item.status)}</td>
                `;
                break;
            case 'invoices':
                row += `
                    <td>${item.id}</td>
                    <td><span class="text-elegant-name">${item.invoiceNumber}</span></td>
                    <td><span class="text-elegant-name">${item.client || item.customerName}</span></td>
                    <td><span class="text-elegant-name" style="color: var(--primary-color);">${this.formatPrice(item.amount)}</span></td>
                    <td>${this.getStatusBadge(item.status)}</td>
                    <td>${this.formatDate(item.date || item.issueDate)}</td>
                    <td>${this.formatDate(item.dueDate)}</td>
                `;
                break;
        }

        // Actions
        row += `
            <td class="actions">
                <button class="btn-action view" title="Voir détails" onclick="window.location.href='entity-details.html?entity=${this.currentEntity}&id=${item.id}'">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action edit" title="Modifier" onclick="entityManager.editItem(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action delete" title="Supprimer" onclick="entityManager.deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;

        return row;
    }

    // --- Helpers d'affichage ---

    getStatusBadge(status) {
        const statusClass = this.getStatusClass(status);
        const icon = this.getStatusIcon(status);
        // Translation or raw status
        const label = window.i18n ? window.i18n.t('status.' + status) : status;
        return `<span class="status-badge ${statusClass}">${icon} ${label}</span>`;
    }

    getStatusClass(status) {
        status = (status || '').toLowerCase();
        if (['actif', 'active', 'en stock', 'in_stock', 'livré', 'delivered', 'payée', 'paid', 'shipped'].includes(status)) return 'status-active';
        if (['inactif', 'inactive', 'rupture', 'out_of_stock', 'annulé', 'cancelled', 'impayée', 'discontinued'].includes(status)) return 'status-inactive';
        return 'status-warning';
    }

    getStatusIcon(status) {
        const cls = this.getStatusClass(status);
        if (cls === 'status-active') return '<i class="fas fa-check-circle"></i>';
        if (cls === 'status-inactive') return '<i class="fas fa-ban"></i>';
        return '<i class="fas fa-clock"></i>';
    }

    formatDate(dateStr) {
        if (!dateStr) return '-';
        try {
            return new Date(dateStr).toLocaleDateString('fr-FR');
        } catch (e) { return dateStr; }
    }

    formatPrice(price) {
        if (price == null) return '-';
        if (typeof price === 'string' && (price.includes('€') || price.includes('$'))) return price;
        return parseFloat(price).toFixed(2) + ' €';
    }

    // --- Gestion de la Pagination ---

    updatePaginationInfo(pagination) {
        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) {
            pageInfo.textContent = `Page ${pagination.currentPage} sur ${pagination.totalPages} (${pagination.totalItems} éléments)`;
        }

        const pageNumbers = document.getElementById('pageNumbers');
        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= pagination.totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = i === pagination.currentPage ? 'active' : '';
                btn.onclick = () => this.changePage(i - pagination.currentPage);
                pageNumbers.appendChild(btn);
            }
        }
    }

    changePage(delta) {
        const current = window.crudManager.currentPage;
        window.crudManager.setPage(current + delta);
        this.loadData();
    }

    changeItemsPerPage(value) {
        window.crudManager.setItemsPerPage(value);
        this.loadData();
    }

    // --- Filtres et Recherche ---

    initEvents() {
        // Recherche
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                window.crudManager.setSearchTerm(e.target.value);
                this.loadData();
            });
        }

        // Tri
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                window.crudManager.setSortField(e.target.value);
                this.loadData();
            });
        }
    }

    filterData() {
        const status = document.getElementById('statusFilter').value;
        window.crudManager.setFilter('status', status);
        this.loadData();
    }

    // --- CRUD Operations ---

    openCreateModal() {
        this.editId = null; // Création
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = 'Ajouter : ' + this.currentEntity;

        this.generateForm(null);

        const modal = document.getElementById('createModal');
        if (modal) modal.style.display = 'block';
    }

    editItem(id) {
        this.editId = id; // Modification
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = 'Modifier : ' + this.currentEntity;

        const item = window.crudManager.getItemById(id);
        if (!item) {
            alert("Élément introuvable");
            return;
        }

        this.generateForm(item);

        const modal = document.getElementById('createModal');
        if (modal) modal.style.display = 'block';
    }

    generateForm(itemData) {
        const form = document.getElementById('entityForm');
        if (!form) return;

        const schema = entitySchemas[this.currentEntity];
        if (!schema) {
            form.innerHTML = '<p>Aucun schéma défini pour ce type.</p>';
            return;
        }

        let html = '';
        schema.fields.forEach(field => {
            const value = itemData ? (itemData[field.name] || '') : '';

            html += `<div class="form-group">
                <label for="${field.name}">${field.label}</label>`;

            if (field.type === 'select') {
                html += `<select id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>
                    <option value="">Sélectionner...</option>`;
                field.options.forEach(opt => {
                    const selected = (value == opt || (value && value.toString().toLowerCase() == opt.toString().toLowerCase())) ? 'selected' : '';
                    const label = window.i18n ? window.i18n.t(field.name === 'status' ? 'status.' + opt : opt) : opt;
                    html += `<option value="${opt}" ${selected}>${label}</option>`;
                });
                html += `</select>`;
            } else if (field.type === 'textarea') {
                html += `<textarea id="${field.name}" name="${field.name}" class="form-control" ${field.required ? 'required' : ''}>${value}</textarea>`;
            } else {
                html += `<input type="${field.type}" id="${field.name}" name="${field.name}" value="${value}" class="form-control" ${field.required ? 'required' : ''} ${field.step ? `step="${field.step}"` : ''}>`;
            }
            html += `</div>`;
        });

        form.innerHTML = html;
    }

    async saveEntity() {
        const form = document.getElementById('entityForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            let result;
            if (this.editId) {
                result = await window.crudManager.updateItem(this.editId, data);
            } else {
                result = await window.crudManager.createItem(data);
            }

            if (result.success) {
                this.closeModal();
                this.loadData();
            } else {
                alert('Erreur: ' + result.error);
            }
        } catch (e) {
            console.error(e);
            alert('Erreur lors de la sauvegarde');
        }
    }

    closeModal() {
        const modal = document.getElementById('createModal');
        if (modal) modal.style.display = 'none';
    }

    // --- Suppression ---

    deleteItem(id) {
        this.itemToDeleteId = id;
        const modal = document.getElementById('deleteModal');
        if (modal) modal.style.display = 'block';
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) modal.style.display = 'none';
    }

    async confirmDelete() {
        if (!this.itemToDeleteId) return;
        try {
            const result = await window.crudManager.deleteItem(this.itemToDeleteId);
            if (result.success) {
                this.loadData();
                this.closeDeleteModal();
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (e) {
            console.error(e);
            alert("Erreur lors de la suppression");
        }
    }

    // --- Utils ---
    hideLoading() {
        const loadingElement = document.getElementById('globalLoading');
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 300);
        }
        document.body.style.opacity = '1';
    }

    getSearchFields(entityType) {
        const map = {
            users: ['firstName', 'lastName', 'email', 'role'],
            products: ['name', 'category'],
            orders: ['orderNumber', 'customerName'],
            customers: ['name', 'email', 'company'],
            invoices: ['invoiceNumber', 'customerName']
        };
        return map[entityType] || ['id'];
    }
}

// Schémas (conservés globalement pour la config)
const entitySchemas = {
    users: {
        fields: [
            { name: 'firstName', label: 'Prénom', type: 'text', required: true },
            { name: 'lastName', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'role', label: 'Rôle', type: 'select', options: ['admin', 'user', 'editor'], required: true },
            { name: 'status', label: 'Statut', type: 'select', options: ['active', 'inactive'], required: true }
        ]
    },
    products: {
        fields: [
            { name: 'name', label: 'Nom du produit', type: 'text', required: true },
            { name: 'category', label: 'Catégorie', type: 'select', options: ['Électronique', 'Vêtements', 'Alimentation', 'Maison', 'Sports'], required: true },
            { name: 'price', label: 'Prix (€)', type: 'number', step: '0.01', required: true },
            { name: 'stock', label: 'Stock', type: 'number', required: true },
            { name: 'status', label: 'Statut', type: 'select', options: ['in_stock', 'out_of_stock', 'discontinued'], required: true }
        ]
    },
    orders: {
        fields: [
            { name: 'customerName', label: 'Client', type: 'text', required: true },
            { name: 'totalAmount', label: 'Montant', type: 'number', step: '0.01', required: true },
            { name: 'status', label: 'Statut', type: 'select', options: ['pending', 'shipped', 'delivered', 'cancelled'], required: true }
        ]
    },
    customers: {
        fields: [
            { name: 'name', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
            { name: 'company', label: 'Entreprise', type: 'text', required: false },
            { name: 'status', label: 'Statut', type: 'select', options: ['active', 'inactive'], required: true }
        ]
    },
    invoices: {
        fields: [
            { name: 'client', label: 'Client', type: 'text', required: true },
            { name: 'amount', label: 'Montant', type: 'text', required: true },
            { name: 'status', label: 'Statut', type: 'select', options: ['paid', 'pending', 'overdue'], required: true },
            { name: 'dueDate', label: 'Date d\'échéance', type: 'date', required: true }
        ]
    }
};

// Instance
const entityManager = new EntityManager();
window.entityManager = entityManager;

// Wrappers pour le HTML (onclick="...")
window.openCreateModal = () => entityManager.openCreateModal();
window.editItem = (id) => entityManager.editItem(id);
window.closeModal = () => entityManager.closeModal();
window.saveEntity = () => entityManager.saveEntity();
window.deleteItem = (id) => entityManager.deleteItem(id);
window.confirmDelete = () => entityManager.confirmDelete();
window.closeDeleteModal = () => entityManager.closeDeleteModal();
window.searchData = () => { /* Géré par event listener */ };
window.filterData = () => entityManager.filterData();
window.sortData = () => { /* Géré par event listener */ };
window.changePage = (d) => entityManager.changePage(d);
window.changeItemsPerPage = () => {
    const val = document.getElementById('itemsPerPage').value;
    entityManager.changeItemsPerPage(val);
};

// Export (Wrapper vers crudManager)
window.exportToCSV = () => window.crudManager.exportToCSV();