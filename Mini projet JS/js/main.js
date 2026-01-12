/**
 * Fichier principal de l'application MyManager
 * Gère l'initialisation et la coordination des modules
 */

// État global de l'application
const AppState = {
    isInitialized: false,
    isLoading: false,
    currentPage: null,
    modules: {}
};

// Initialisation principale
document.addEventListener('DOMContentLoaded', function () {
    console.log('MyManager Backoffice - Initialisation...');

    // Détecter la page courante
    AppState.currentPage = detectCurrentPage();

    // Initialiser dans l'ordre correct
    initApplication();
});

/**
 * Détecte la page courante
 */
function detectCurrentPage() {
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/' || path === '') {
        return 'login';
    } else if (path.includes('dashboard.html')) {
        return 'dashboard';
    } else if (path.includes('entities.html')) {
        return 'entities';
    } else if (path.includes('entity-details.html')) {
        return 'details';
    }

    return 'unknown';
}

/**
 * Initialise l'application dans l'ordre correct
 */
async function initApplication() {
    try {
        AppState.isLoading = true;

        // 1. Vérifier l'authentification (sauf page de login)
        if (AppState.currentPage !== 'login') {
            if (!checkAuthentication()) {
                return; // La redirection est gérée dans checkAuthentication()
            }
        }

        // 2. Initialiser l'i18n
        await initI18n();

        // 3. Initialiser les modules spécifiques à la page
        await initPageSpecificModules();

        // 4. Initialiser les composants communs
        initCommonComponents();

        // 5. Cacher le loading et afficher le contenu
        setTimeout(() => {
            AppState.isInitialized = true;
            AppState.isLoading = false;

            // Ajouter la classe pour les animations
            document.body.classList.add('initialized');

            // Cacher le loading global
            const globalLoading = document.getElementById('globalLoading');
            if (globalLoading) {
                globalLoading.style.opacity = '0';
                setTimeout(() => {
                    globalLoading.style.display = 'none';
                }, 300);
            }

            console.log('Application initialized successfully');
        }, 100);

    } catch (error) {
        console.error('Initialization error:', error);
        showError('Erreur lors de l\'initialisation de l\'application');
    }

    // Initialiser le menu mobile
    initMobileMenu();
}

/**
 * Vérifie l'authentification
 */
function checkAuthentication() {
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        // Pages qui ne nécessitent pas d'authentification
        const publicPages = ['login'];

        if (!isLoggedIn && !publicPages.includes(AppState.currentPage)) {
            console.warn('User not authenticated, redirecting to login');

            // Afficher un message
            showNotification('Redirection vers la page de connexion...', 'info');

            // Rediriger après un délai
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);

            return false;
        }

        // Si sur la page de login mais déjà connecté
        if (isLoggedIn && AppState.currentPage === 'login') {
            console.log('Already authenticated, redirecting to dashboard');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 300);
            return false;
        }

        return true;

    } catch (error) {
        console.error('Authentication check error:', error);
        return false;
    }
}

/**
 * Initialise l'internationalisation
 */
async function initI18n() {
    try {
        // Vérifier si i18n est disponible
        if (typeof i18n === 'undefined') {
            console.warn('i18n module not available');
            return;
        }

        // Appliquer les traductions
        const savedLanguage = localStorage.getItem('language') || 'fr';
        i18n.setLanguage(savedLanguage);

        // Configurer le sélecteur de langue
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
            languageSelect.addEventListener('change', function (e) {
                changeLanguage(e.target.value);
            });
        }

        console.log('i18n initialized with language:', savedLanguage);

    } catch (error) {
        console.error('i18n initialization error:', error);
    }
}

/**
 * Initialise les modules spécifiques à la page
 */
async function initPageSpecificModules() {
    switch (AppState.currentPage) {
        case 'dashboard':
            await initDashboard();
            break;
        case 'entities':
            await initEntities();
            break;
        case 'details':
            await initDetails();
            break;
        case 'login':
            // Rien à faire, géré par auth.js
            break;
        default:
            console.warn('Unknown page type:', AppState.currentPage);
    }
}

/**
 * Initialise le dashboard
 */
async function initDashboard() {
    // Vérifier si les modules sont disponibles
    if (typeof initCharts === 'function') {
        initCharts();
    }

    if (typeof loadDashboardData === 'function') {
        await loadDashboardData();
    }

    // Mettre à jour le nom d'utilisateur
    const username = localStorage.getItem('username') || 'Administrateur';
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }
}

/**
 * Initialise la page des entités
 */
async function initEntities() {
    // Le module entities.js s'initialise lui-même
    console.log('Entities page initialization');
}

/**
 * Initialise la page de détails
 */
async function initDetails() {
    // Le module details.js s'initialise lui-même
    console.log('Details page initialization');
}

/**
 * Initialise les composants communs
 */
function initCommonComponents() {
    try {
        // Menu responsive
        initResponsiveMenu();

        // Tooltips
        initTooltips();

        // Notifications
        initNotifications();

        console.log('Common components initialized');

    } catch (error) {
        console.error('Common components initialization error:', error);
    }
}

/**
 * Initialise le menu responsive
 */
function initResponsiveMenu() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleSidebar();
        });

        // Fermer le sidebar en cliquant à l'extérieur (mobile)
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                removeOverlay();
            }
        });

        // Gérer le redimensionnement
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                removeOverlay();
            }
        });
    }
}

/**
 * Basculer le sidebar
 */
window.toggleSidebar = function () {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.classList.toggle('active');

    if (window.innerWidth <= 768) {
        if (sidebar.classList.contains('active')) {
            createOverlay();
        } else {
            removeOverlay();
        }
    }
};

/**
 * Crée un overlay pour le menu mobile
 */
function createOverlay() {
    removeOverlay(); // Nettoyer d'abord

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        animation: fadeIn 0.3s ease;
    `;

    overlay.addEventListener('click', function () {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        removeOverlay();
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

/**
 * Supprime l'overlay du menu mobile
 */
function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
    document.body.style.overflow = '';
}

/**
 * Initialise les tooltips
 */
function initTooltips() {
    // Les tooltips sont gérés par CSS
}

/**
 * Initialise le système de notifications
 */
function initNotifications() {
    // Créer le conteneur de notifications s'il n'existe pas
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
}

/**
 * Affiche une notification
 */
window.showNotification = function (message, type = 'info', duration = 5000) {
    const container = document.getElementById('notifications-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto-remove
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }

    return notification;
};

/**
 * Retourne l'icône appropriée pour le type de notification
 */
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

/**
 * Supprime une notification
 */
function removeNotification(notification) {
    if (!notification || !notification.parentElement) return;

    notification.classList.remove('show');

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

/**
 * Affiche une erreur
 */
function showError(message) {
    showNotification(message, 'error');
}

/**
 * Change la langue
 */
window.changeLanguage = function (lang) {
    if (typeof i18n !== 'undefined') {
        i18n.setLanguage(lang);
        showNotification(`Langue changée en ${lang}`, 'success', 2000);
    } else {
        localStorage.setItem('language', lang);
        window.location.reload();
    }
};

/**
 * Vérifie si l'application est prête
 */
window.isAppReady = function () {
    return AppState.isInitialized && !AppState.isLoading;
};

// Exposer les fonctions globales
window.AppState = AppState;
window.initApplication = initApplication;
/**
 * Menu responsive pour mobile
 */
function initMobileMenu() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        // Créer un overlay pour fermer le menu
        function createOverlay() {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 998;
                display: none;
            `;

            overlay.addEventListener('click', function () {
                sidebar.classList.remove('active');
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            document.body.appendChild(overlay);
            return overlay;
        }

        let overlay = document.querySelector('.mobile-overlay') || createOverlay();

        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');

            if (window.innerWidth <= 768) {
                if (sidebar.classList.contains('active')) {
                    overlay.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    overlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    }
}