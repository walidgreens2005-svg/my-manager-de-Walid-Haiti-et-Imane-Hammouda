document.addEventListener('DOMContentLoaded', async function () {
    // Vérifier l'authentification
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const entityType = urlParams.get('entity') || 'users';
    const itemId = parseInt(urlParams.get('id'));

    // Configuration par défaut simplifiée pour l'affichage
    // Note: Pour une meilleure robustesse, cela devrait être partagé avec entities.js
    const simpleSchemas = {
        users: { label: 'Utilisateur' },
        products: { label: 'Produit' },
        orders: { label: 'Commande' },
        customers: { label: 'Client' },
        invoices: { label: 'Facture' }
    };

    if (!itemId) {
        alert("ID manquant");
        goBack();
        return;
    }

    try {
        // Initialiser crudManager (en mode lecture locale seulement)
        // On passe un config minimal car on veut juste lire par ID
        if (window.crudManager) {
            await window.crudManager.init(entityType, {
                useLocalData: true,
                fields: [] // On n'a pas besoin de validation ici
            });
        }

        // Charger et afficher les détails
        loadItemDetails(entityType, itemId);
    } catch (e) {
        console.error("Erreur d'initialisation:", e);
        alert("Erreur lors du chargement des données");
    }
});

// Configuration des layouts pour l'affichage détaillé
const entityLayouts = {
    users: [
        {
            title: 'Informations Personnelles',
            fields: [
                { key: 'firstName', label: 'Prénom' },
                { key: 'lastName', label: 'Nom' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Téléphone' }
            ]
        },
        {
            title: 'Compte',
            fields: [
                { key: 'role', label: 'Rôle' },
                { key: 'status', label: 'Statut' },
                { key: 'id', label: 'ID Utilisateur' },
                { key: 'createdAt', label: 'Date d\'inscription' }
            ]
        }
    ],
    products: [
        {
            title: 'Détails Produit',
            fields: [
                { key: 'name', label: 'Nom' },
                { key: 'category', label: 'Catégorie' },
                { key: 'description', label: 'Description' }
            ]
        },
        {
            title: 'Inventaire & Prix',
            fields: [
                { key: 'price', label: 'Prix' },
                { key: 'stock', label: 'Stock' },
                { key: 'status', label: 'Statut' },
                { key: 'sku', label: 'SKU' }
            ]
        }
    ],
    orders: [
        {
            title: 'Commande',
            fields: [
                { key: 'orderNumber', label: 'N° Commande' },
                { key: 'date', label: 'Date' },
                { key: 'status', label: 'Statut' }
            ]
        },
        {
            title: 'Client',
            fields: [
                { key: 'customerName', label: 'Nom Client' },
                { key: 'shippingAddress', label: 'Adresse de livraison' }
            ]
        },
        {
            title: 'Paiement',
            fields: [
                { key: 'totalAmount', label: 'Montant Total' },
                { key: 'paymentMethod', label: 'Moyen de paiement' }
            ]
        }
    ],
    customers: [
        {
            title: 'Profil',
            fields: [
                { key: 'name', label: 'Nom complet' },
                { key: 'company', label: 'Entreprise' },
                { key: 'status', label: 'Statut' }
            ]
        },
        {
            title: 'Contact',
            fields: [
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Téléphone' },
                { key: 'address', label: 'Adresse' }
            ]
        }
    ],
    invoices: [
        {
            title: 'Facture',
            fields: [
                { key: 'invoiceNumber', label: 'N° Facture' },
                { key: 'date', label: 'Date émission' },
                { key: 'dueDate', label: 'Date échéance' },
                { key: 'status', label: 'Statut' }
            ]
        },
        {
            title: 'Client',
            fields: [
                { key: 'client', label: 'Client' },
                { key: 'clientAddress', label: 'Adresse Client' }
            ]
        },
        {
            title: 'Montant',
            fields: [
                { key: 'amount', label: 'Montant HT' },
                { key: 'tax', label: 'TVA' },
                { key: 'total', label: 'Total TTC' }
            ]
        }
    ]
};

function loadItemDetails(entityType, itemId) {
    // Récupérer l'item réel via crudManager
    const item = window.crudManager.getItemById(itemId);

    if (!item) {
        document.getElementById('detailsContent').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Élément introuvable (ID: ${itemId})</p>
                <button class="btn btn-primary" onclick="goBack()">Retour</button>
            </div>
        `;
        return;
    }

    // Mettre à jour le titre
    const labels = {
        users: 'Utilisateur',
        products: 'Produit',
        orders: 'Commande',
        customers: 'Client',
        invoices: 'Facture'
    };
    const entityLabel = labels[entityType] || entityType;

    document.getElementById('detailsTitle').textContent = `Détails - ${entityLabel}`;
    document.getElementById('itemTitle').textContent = `${entityLabel} #${itemId}`;

    // Générer le contenu des détails
    const detailsContent = document.getElementById('detailsContent');
    console.log('Displaying details for:', entityType, item);

    let detailsHtml = '';

    // Vérifier si un layout spécifique existe
    if (entityLayouts[entityType]) {
        detailsHtml += '<div class="details-grid-organized">';

        entityLayouts[entityType].forEach(section => {
            // Vérifier si la section a des données à afficher
            const hasData = section.fields.some(field => item[field.key] !== undefined && item[field.key] !== '');

            if (hasData || true) { // On affiche quand même la section pour la structure
                detailsHtml += `
                    <div class="detail-card">
                        <div class="detail-card-header">
                            <h3>${section.title}</h3>
                        </div>
                        <div class="detail-card-body">
                `;

                section.fields.forEach(field => {
                    // Chercher la valeur (support pour les propriétés alternatives si la clé principale est absente)
                    let value = item[field.key];

                    // Fallbacks communs
                    if (value === undefined) {
                        if (field.key === 'name' && item.firstName) value = `${item.firstName} ${item.lastName}`;
                        if (field.key === 'customerName' && item.client) value = item.client;
                        if (field.key === 'totalAmount' && item.amount) value = item.amount;
                    }

                    if (value !== undefined && value !== '') {
                        detailsHtml += `
                            <div class="detail-row">
                                <span class="label">${field.label}</span>
                                <span class="value">${formatValue(field.key, value)}</span>
                            </div>
                        `;
                    }
                });

                detailsHtml += `
                        </div>
                    </div>
                `;
            }
        });

        detailsHtml += '</div>';

        // Ajouter une section "Autres" pour les champs non affichés si besoin (debug)
        // ...

    } else {
        // Fallback: Affichage générique (ancien comportement amélioré)
        detailsHtml += '<div class="details-grid">';

        const ignoredKeys = ['password', 'id'];

        // Groupons tout dans une seule carte pour la cohérence visuelle
        detailsHtml += `
            <div class="detail-card full-width">
                <div class="detail-card-header">
                    <h3>Informations Générales</h3>
                </div>
                <div class="detail-card-body">
        `;

        for (const [key, value] of Object.entries(item)) {
            if (ignoredKeys.includes(key)) continue;
            if (typeof value === 'object' && value !== null) continue; // On ignore les objets complexes dans le fallback simple

            detailsHtml += `
                <div class="detail-row">
                    <span class="label">${formatKey(key)}</span>
                    <span class="value">${formatValue(key, value)}</span>
                </div>
            `;
        }

        detailsHtml += `
                </div>
            </div>
        </div>`;
    }

    detailsContent.innerHTML = detailsHtml;
}

// Helpers de formatage
function formatKey(key) {
    // camelCase to Words
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/Id$/, ' ID'); // ex: customerId -> Customer ID
}

function formatValue(key, value) {
    if (value === null || value === undefined) return '-';

    // Dates
    if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
        try {
            return new Date(value).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { return value; }
    }

    // Prix / Montants
    if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('price') || key.toLowerCase().includes('total')) {
        if (typeof value === 'number' || !isNaN(parseFloat(value))) {
            // Vérifier si c'est déjà formaté avec un symbole
            if (typeof value === 'string' && (value.includes('€') || value.includes('$'))) return value;
            return parseFloat(value).toFixed(2) + ' €';
        }
    }

    // Status
    if (key === 'status') {
        return `<span class="status-badge ${getStatusClass(value)}">${getStatusTranslation(value)}</span>`;
    }

    return value;
}

function getStatusClass(status) {
    status = (status || '').toLowerCase();
    if (['active', 'delivered', 'paid', 'shipped', 'in_stock'].includes(status)) return 'status-active';
    if (['inactive', 'cancelled', 'out_of_stock', 'discontinued'].includes(status)) return 'status-inactive';
    return 'status-warning';
}

function getStatusTranslation(status) {
    const map = {
        'pending': 'En attente',
        'shipped': 'Expédiée',
        'delivered': 'Livrée',
        'cancelled': 'Annulée',
        'paid': 'Payée',
        'active': 'Actif',
        'inactive': 'Inactif',
        'in_stock': 'En stock',
        'out_of_stock': 'Rupture',
        'discontinued': 'Arrêté'
    };
    return map[status] || status;
}

function goBack() {
    window.history.back();
}

function printDetails() {
    window.print();
}