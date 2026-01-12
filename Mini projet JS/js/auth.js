/**
 * Gestion de l'authentification pour MyManager Backoffice
 */

class AuthManager {
    constructor() {
        this.init();
    }

    /**
     * Initialise le gestionnaire d'authentification
     */
    init() {
        console.log('Auth module loaded');
        this.setupEventListeners();
    }

    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Initialiser l'i18n pour les erreurs si disponible
            if (window.i18n) {
                const errorMessage = document.getElementById('errorMessage');
                if (errorMessage) {
                    errorMessage.setAttribute('data-i18n', 'login.error');
                }
            }

            // Vérifier sur quelle page on est
            if (this.isLoginPage()) {
                if (this.isAuthenticated()) {
                    console.log('User already authenticated, redirecting to dashboard');
                    this.redirectToDashboard();
                } else {
                    this.setupLoginForm();
                }
            }
        });
    }

    /**
     * Vérifie si on est sur la page de login
     */
    isLoginPage() {
        const path = window.location.pathname;
        return path.includes('index.html') || path === '/' || path.endsWith('/');
    }

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    isAuthenticated() {
        try {
            return localStorage.getItem('isLoggedIn') === 'true';
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    /**
     * Configure le formulaire de login
     */
    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');

        if (!loginForm) {
            // Peut être normal si on n'est pas sur la page de login
            return;
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';

            // Validation basique
            if (!username || !password) {
                this.showErrorMessage('Veuillez remplir tous les champs');
                return;
            }

            // Authentification
            await this.authenticate(username, password);
        });

        // Pré-remplir pour les tests (seulement si les champs existent)
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = 'admin';
        if (passwordInput) passwordInput.value = 'admin';
    }

    /**
     * Authentifie l'utilisateur
     */
    async authenticate(username, password) {
        this.showLoading(true);

        try {
            // Simulation d'un appel asynchrone (Promesse)
            await new Promise(resolve => setTimeout(resolve, 500));

            if (username === 'admin' && password === 'admin') {
                // Sauvegarder l'état de connexion
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('loginTime', new Date().toISOString());

                // Rediriger vers le dashboard
                this.redirectToDashboard();
            } else {
                this.showErrorMessage('Identifiants incorrects. Utilisez admin / admin');
                this.showLoading(false);
            }
        } catch (error) {
            console.error('Auth error:', error);
            this.showErrorMessage('Une erreur est survenue');
            this.showLoading(false);
        }
    }

    /**
     * Redirige vers le dashboard
     */
    redirectToDashboard() {
        console.log('Redirecting to dashboard...');

        this.preloadDashboardResources();

        setTimeout(() => {
            try {
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error('Redirect error:', error);
                window.location.replace('dashboard.html');
            }
        }, 300);
    }

    /**
     * Précharge les ressources du dashboard
     */
    preloadDashboardResources() {
        // Précharger les CSS
        const dashboardCSS = document.createElement('link');
        dashboardCSS.rel = 'stylesheet';
        dashboardCSS.href = 'css/dashboard.css';
        document.head.appendChild(dashboardCSS);

        // Précharger Chart.js
        const chartJS = document.createElement('script');
        chartJS.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        chartJS.async = true;
        document.head.appendChild(chartJS);
    }

    /**
     * Affiche un message d'erreur
     */
    showErrorMessage(message) {
        const errorMessage = document.getElementById('errorMessage');
        if (!errorMessage) return;

        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');

        setTimeout(() => {
            errorMessage.classList.remove('show');
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }

    /**
     * Affiche/cache l'indicateur de chargement
     */
    showLoading(show) {
        let loadingIndicator = document.getElementById('loadingIndicator');

        if (show) {
            if (!loadingIndicator) {
                loadingIndicator = document.createElement('div');
                loadingIndicator.id = 'loadingIndicator';
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.innerHTML = `
                    <div class="loading-spinner"></div>
                    <span>Authentification en cours...</span>
                `;
                document.body.appendChild(loadingIndicator);
            }
            loadingIndicator.style.display = 'flex';
        } else if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    /**
     * Déconnecte l'utilisateur
     */
    async logout() {
        console.log('Logging out...');

        this.showLoading(true);

        // Simulation délai déconnexion
        await new Promise(resolve => setTimeout(resolve, 500));

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('currentItem');
        localStorage.removeItem('currentEntity');

        window.location.href = 'index.html';
    }

    /**
     * Vérifie l'authentification et redirige si nécessaire
     */
    checkAuth() {
        if (!this.isAuthenticated()) {
            console.warn('User not authenticated, redirecting to login');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
}

// Instance singleton
const authManager = new AuthManager();

// Export pour utilisation globale (rétrocompatibilité)
window.authManager = authManager;
window.logout = () => authManager.logout();
window.checkAuth = () => authManager.checkAuth();