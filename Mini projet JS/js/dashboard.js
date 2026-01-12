// dashboard.js - Code COMPLET et GARANTI

// Attendre que tout soit chargé
document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard JavaScript loaded');

    // Vérifier l'authentification
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Initialiser après un court délai
    setTimeout(initDashboard, 100);
});

// Fonction principale d'initialisation
function initDashboard() {
    console.log('Initializing dashboard...');

    try {
        // 1. Afficher le nom d'utilisateur
        showUsername();

        // 2. Charger les statistiques
        loadStats();

        // 3. Créer les graphiques
        createAllCharts();

        // 4. Charger l'activité récente
        loadRecentActivity();

        // 5. Initialiser les événements
        initDashboardEvents();

        // 6. Cacher le loading
        hideLoading();

        // 7. Initialiser les cartes cliquables
        initClickableCards();

        console.log('Dashboard initialized successfully!');

    } catch (error) {
        console.error('Dashboard initialization error:', error);
        // Fallback: afficher des données de base
        loadFallbackData();
        hideLoading();
    }
}

// Afficher le nom d'utilisateur
function showUsername() {
    const username = localStorage.getItem('username') || 'Administrateur';
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }
}

// Charger les statistiques
function loadStats() {
    console.log('Loading statistics...');

    const getCount = (key) => {
        try {
            const data = localStorage.getItem(`myManager_data_${key}`);
            return data ? JSON.parse(data).length : 0;
        } catch (e) {
            console.error(`Error reading ${key} stats:`, e);
            return 0;
        }
    };

    const getRevenue = () => {
        try {
            const data = localStorage.getItem('myManager_data_orders');
            if (!data) return 0;
            const orders = JSON.parse(data);
            return orders.reduce((sum, order) => {
                const amount = parseFloat(order.totalAmount || order.amount);
                return sum + (isNaN(amount) ? 0 : amount);
            }, 0);
        } catch (e) {
            console.error('Error calculating revenue:', e);
            return 0;
        }
    };

    // Données réelles depuis localStorage
    const statsData = {
        totalUsers: getCount('users'),
        totalProducts: getCount('products'),
        totalOrders: getCount('orders'),
        totalRevenue: getRevenue()
    };

    // Mettre à jour l'interface
    const userEl = document.getElementById('totalUsers');
    const prodEl = document.getElementById('totalProducts');
    const orderEl = document.getElementById('totalOrders');
    const revEl = document.getElementById('totalRevenue');

    if (userEl) userEl.textContent = formatNumber(statsData.totalUsers);
    if (prodEl) prodEl.textContent = formatNumber(statsData.totalProducts);
    if (orderEl) orderEl.textContent = formatNumber(statsData.totalOrders);
    if (revEl) revEl.textContent = formatCurrency(statsData.totalRevenue);

    return statsData;
}

// Créer tous les graphiques
function createAllCharts() {
    console.log('Creating all charts...');

    // Vérifier si Chart.js est chargé
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded!');
        setTimeout(createAllCharts, 100); // Réessayer
        return;
    }

    try {
        // 1. Distribution des utilisateurs
        createUserChart();

        // 2. Commandes par mois
        createOrdersChart();

        // 3. Statut des commandes
        createOrdersStatusChart();

        // 4. Revenu mensuel
        createRevenueChart();

        // 5. Top produits
        createTopProductsChart();

        // 6. Clients par région
        createCustomersByRegionChart();

        console.log('All charts created successfully');

    } catch (error) {
        console.error('Error creating charts:', error);
    }
}

// Graphique 1: Distribution des utilisateurs
function createUserChart() {
    const canvas = document.getElementById('userDistributionChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Actifs (65%)', 'Inactifs (20%)', 'En attente (15%)'],
                datasets: [{
                    data: [65, 20, 15],
                    backgroundColor: ['#4CAF50', '#FF9800', '#9C27B0'],
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '70%'
            }
        });
    } catch (error) {
        console.error('Error creating user chart:', error);
    }
}

// Graphique 2: Commandes par mois
function createOrdersChart() {
    const canvas = document.getElementById('ordersChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
                datasets: [{
                    label: 'Commandes',
                    data: [120, 190, 150, 250, 220, 300, 280, 350, 320, 400, 380, 450],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating orders chart:', error);
    }
}

// Graphique 3: Statut des commandes
function createOrdersStatusChart() {
    const canvas = document.getElementById('ordersStatusChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Livrées (40%)', 'En cours (30%)', 'En attente (20%)', 'Annulées (10%)'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating orders status chart:', error);
    }
}

// Graphique 4: Revenu mensuel
function createRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Revenu (€)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    backgroundColor: '#9C27B0',
                    borderColor: '#7B1FA2',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString() + ' €';
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating revenue chart:', error);
    }
}

// Graphique 5: Top produits
function createTopProductsChart() {
    const canvas = document.getElementById('topProductsChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['iPhone 14', 'MacBook Pro', 'AirPods Pro', 'iPad Air', 'Apple Watch'],
                datasets: [{
                    label: 'Ventes',
                    data: [120, 85, 60, 45, 30],
                    backgroundColor: [
                        '#FF5722',
                        '#3F51B5',
                        '#009688',
                        '#FFC107',
                        '#795548'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating top products chart:', error);
    }
}

// Graphique 6: Clients par région
function createCustomersByRegionChart() {
    const canvas = document.getElementById('customersByRegionChart');
    if (!canvas) return;

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Amérique du Nord', 'Europe', 'Asie', 'Afrique', 'Amérique du Sud'],
                datasets: [{
                    data: [300, 250, 200, 150, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating customers chart:', error);
    }
}

// Charger l'activité récente
function loadRecentActivity() {
    console.log('Loading recent activity...');

    let activities = [];
    try {
        const stored = localStorage.getItem('myManager_activities');
        if (stored) {
            activities = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading activities:', e);
    }

    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    if (activities.length === 0) {
        activityList.innerHTML = '<div class="activity-item"><p>Aucune activité récente</p></div>';
        return;
    }

    // Générer le HTML des activités
    let html = '';
    activities.forEach(activity => {
        // Calculer le temps écoulé
        const date = new Date(activity.timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let timeStr = '';
        if (diffMins < 1) timeStr = "À l'instant";
        else if (diffMins < 60) timeStr = `Il y a ${diffMins} min`;
        else if (diffHours < 24) timeStr = `Il y a ${diffHours} h`;
        else timeStr = `Il y a ${diffDays} j`;

        html += `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.color}20; color: ${activity.color};">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${timeStr}</div>
            </div>
        `;
    });

    activityList.innerHTML = html;
}


// Initialiser les événements
function initDashboardEvents() {
    console.log('Initializing dashboard events...');

    // Sélecteur de langue
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        const savedLang = localStorage.getItem('language') || 'fr';
        languageSelect.value = savedLang;
        languageSelect.addEventListener('change', function (e) {
            localStorage.setItem('language', e.target.value);
            showMessage(`Langue changée en ${getLanguageName(e.target.value)}`);
        });
    }

    // Rafraîchir le dashboard
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            refreshDashboard();
        });
    }
}

// Initialiser les cartes cliquables
function initClickableCards() {
    console.log('Initializing clickable cards...');

    // Récupérer toutes les cartes de statistiques
    const statCards = document.querySelectorAll('.stat-card[onclick]');

    statCards.forEach(card => {
        // Ajouter la classe clickable pour le style CSS
        card.classList.add('clickable');

        // Ajouter un écouteur d'événement pour l'animation
        card.addEventListener('click', function (event) {
            // Animation de clic
            card.classList.add('card-click-animation');

            // Enlever la classe d'animation après la fin de l'animation
            setTimeout(() => {
                card.classList.remove('card-click-animation');
            }, 200);

            // Afficher un feedback visuel
            showCardClickFeedback(card);
        });

        // Effet de tooltip au survol
        card.addEventListener('mouseenter', function () {
            const cardText = card.querySelector('p').textContent;
            card.setAttribute('title', `Cliquer pour voir les ${cardText}`);
        });
    });
}

// Afficher un feedback visuel lors du clic
function showCardClickFeedback(card) {
    // Créer un effet de pulse
    card.style.boxShadow = '0 0 0 5px rgba(76, 175, 80, 0.3)';

    setTimeout(() => {
        card.style.boxShadow = '';
    }, 300);

    // Afficher une notification
    const cardTitle = card.querySelector('p').textContent;
    console.log(`Navigation vers: ${cardTitle}`);
}

// Fonction de navigation pour les cartes
function navigateTo(entity) {
    console.log(`Navigation vers: ${entity}`);

    // Animation de clic
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('card-click-animation');

        setTimeout(() => {
            event.currentTarget.classList.remove('card-click-animation');
        }, 200);
    }

    // Redirection vers la page entities.html avec le paramètre d'entité
    setTimeout(() => {
        window.location.href = `entities.html?entity=${entity}`;
    }, 200);
}

// Cacher le loading
function hideLoading() {
    const loadingElement = document.getElementById('globalLoading');
    if (loadingElement) {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
    }

    // Afficher le contenu
    document.body.style.opacity = '1';
}

// Fonctions utilitaires
function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function getLanguageName(code) {
    const languages = {
        fr: 'Français',
        en: 'Anglais',
        ar: 'Arabe'
    };
    return languages[code] || code;
}

function showMessage(text) {
    // Simple notification
    alert(text);
}

function refreshDashboard() {
    console.log('Refreshing dashboard...');
    initDashboard();
}

// Fallback en cas d'erreur
function loadFallbackData() {
    console.log('Loading fallback data...');

    // Statistiques de base
    document.getElementById('totalUsers').textContent = '-';
    document.getElementById('totalProducts').textContent = '-';
    document.getElementById('totalOrders').textContent = '-';
    document.getElementById('totalRevenue').textContent = '-';

    // Message d'activité
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon" style="background: #e8f5e9; color: #4CAF50;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="activity-details">
                    <h4>Dashboard chargé</h4>
                    <p>Tableau de bord prêt à l'utilisation</p>
                </div>
                <div class="activity-time">Maintenant</div>
            </div>
        `;
    }
}

// Fonctions globales
window.initDashboard = initDashboard;
window.refreshDashboard = refreshDashboard;
window.toggleSidebar = function () {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
};

// Exposer la fonction navigateTo globalement
window.navigateTo = navigateTo;