/**
 * Gestion de l'internationalisation pour l'application MyManager
 * Support Français, Anglais, Arabe
 */

const TRANSLATIONS = {
    fr: {
        // Authentification
        'login.title': 'Connexion',
        'login.subtitle': 'Connectez-vous à votre espace administrateur',
        'login.username': 'Nom d\'utilisateur',
        'login.password': 'Mot de passe',
        'login.button': 'Se connecter',
        'login.credentials': 'Identifiants par défaut : admin / admin',
        'login.error': 'Identifiants incorrects',

        // Navigation
        'nav.dashboard': 'Tableau de bord',
        'nav.users': 'Utilisateurs',
        'nav.products': 'Produits',
        'nav.orders': 'Commandes',
        'nav.customers': 'Clients',
        'nav.invoices': 'Factures',
        'nav.logout': 'Déconnexion',
        'nav.profile': 'Profil',
        'nav.settings': 'Paramètres',

        // Dashboard
        'dashboard.title': 'Tableau de bord',
        'dashboard.welcome': 'Bienvenue, {username}',
        'dashboard.stats.users': 'Utilisateurs',
        'dashboard.stats.products': 'Produits',
        'dashboard.stats.orders': 'Commandes',
        'dashboard.stats.revenue': 'Revenu',
        'dashboard.charts.users': 'Distribution des utilisateurs',
        'dashboard.charts.orders': 'Commandes par mois',
        'dashboard.charts.status': 'Statut des commandes',
        'dashboard.charts.revenue': 'Revenu mensuel',
        'dashboard.charts.topProducts': 'Top produits',
        'dashboard.charts.customers': 'Clients par région',
        'dashboard.activity': 'Activité récente',

        // Entités
        'entity.add': 'Ajouter',
        'entity.edit': 'Modifier',
        'entity.delete': 'Supprimer',
        'entity.view': 'Voir',
        'entity.save': 'Enregistrer',
        'entity.cancel': 'Annuler',
        'entity.confirm': 'Confirmer',
        'entity.search': 'Rechercher...',
        'entity.filter': 'Filtrer',
        'entity.sort': 'Trier',
        'entity.export': 'Exporter',
        'entity.import': 'Importer',
        'entity.itemsPerPage': 'Éléments par page',
        'entity.page': 'Page',
        'entity.of': 'sur',
        'entity.previous': 'Précédent',
        'entity.next': 'Suivant',
        'entity.noData': 'Aucune donnée disponible',
        'entity.loading': 'Chargement...',

        // CRUD Actions
        'crud.create': 'Créer un nouvel élément',
        'crud.update': 'Mettre à jour l\'élément',
        'crud.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        'crud.deleteSuccess': 'Élément supprimé avec succès',
        'crud.deleteError': 'Erreur lors de la suppression',
        'crud.saveSuccess': 'Élément enregistré avec succès',
        'crud.saveError': 'Erreur lors de l\'enregistrement',
        'crud.loadError': 'Erreur lors du chargement des données',

        // Formulaires
        'form.required': 'Ce champ est requis',
        'form.email': 'Veuillez entrer un email valide',
        'form.number': 'Veuillez entrer un nombre valide',
        'form.date': 'Veuillez entrer une date valide',
        'form.maxLength': 'Maximum {max} caractères',
        'form.minLength': 'Minimum {min} caractères',

        // États
        'status.active': 'Actif',
        'status.inactive': 'Inactif',
        'status.pending': 'En attente',
        'status.completed': 'Terminé',
        'status.cancelled': 'Annulé',
        'status.delivered': 'Livré',
        'status.shipped': 'Expédié',
        'status.processing': 'En traitement',
        'status.paid': 'Payé',
        'status.unpaid': 'Impayé',
        'status.overdue': 'En retard',
        'status.in_stock': 'En stock',
        'status.out_of_stock': 'Rupture de stock',
        'status.discontinued': 'Abandonné',

        // Rôles
        'role.admin': 'Administrateur',
        'role.user': 'Utilisateur',
        'role.editor': 'Éditeur',
        'role.viewer': 'Observateur',
        'role.manager': 'Manager',
        'role.superadmin': 'Super Administrateur',

        // Messages
        'message.success': 'Succès',
        'message.error': 'Erreur',
        'message.warning': 'Attention',
        'message.info': 'Information',
        'message.confirm': 'Confirmation',
        'message.loading': 'Chargement en cours...',

        // Dates
        'date.today': 'Aujourd\'hui',
        'date.yesterday': 'Hier',
        'date.tomorrow': 'Demain',
        'date.thisWeek': 'Cette semaine',
        'date.lastWeek': 'La semaine dernière',
        'date.thisMonth': 'Ce mois',
        'date.lastMonth': 'Le mois dernier',
        'date.thisYear': 'Cette année',
        'date.lastYear': 'L\'année dernière',

        // Métriques
        'metric.total': 'Total',
        'metric.average': 'Moyenne',
        'metric.maximum': 'Maximum',
        'metric.minimum': 'Minimum',
        'metric.sum': 'Somme',
        'metric.count': 'Nombre',

        // Export
        'export.csv': 'Exporter en CSV',
        'export.pdf': 'Exporter en PDF',
        'export.excel': 'Exporter en Excel',
        'export.success': 'Export réussi',
        'export.error': 'Erreur lors de l\'export',

        // Paramètres
        'settings.title': 'Paramètres',
        'settings.language': 'Langue',
        'settings.theme': 'Thème',
        'settings.notifications': 'Notifications',
        'settings.security': 'Sécurité',
        'settings.profile': 'Profil',
        'settings.account': 'Compte',

        // Erreurs
        'error.network': 'Erreur de connexion réseau',
        'error.server': 'Erreur du serveur',
        'error.unauthorized': 'Non autorisé',
        'error.forbidden': 'Accès interdit',
        'error.notFound': 'Ressource non trouvée',
        'error.timeout': 'Temps d\'attente dépassé',
        'error.unknown': 'Erreur inconnue',

        // Succès
        'success.operation': 'Opération réussie',
        'success.saved': 'Enregistré avec succès',
        'success.updated': 'Mis à jour avec succès',
        'success.deleted': 'Supprimé avec succès',
        'success.imported': 'Importé avec succès',
        'success.exported': 'Exporté avec succès'
    },

    en: {
        // Authentication
        'login.title': 'Login',
        'login.subtitle': 'Sign in to your admin panel',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.button': 'Sign in',
        'login.credentials': 'Default credentials: admin / admin',
        'login.error': 'Invalid credentials',

        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.users': 'Users',
        'nav.products': 'Products',
        'nav.orders': 'Orders',
        'nav.customers': 'Customers',
        'nav.invoices': 'Invoices',
        'nav.logout': 'Logout',
        'nav.profile': 'Profile',
        'nav.settings': 'Settings',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.welcome': 'Welcome, {username}',
        'dashboard.stats.users': 'Users',
        'dashboard.stats.products': 'Products',
        'dashboard.stats.orders': 'Orders',
        'dashboard.stats.revenue': 'Revenue',
        'dashboard.charts.users': 'User Distribution',
        'dashboard.charts.orders': 'Orders by Month',
        'dashboard.charts.status': 'Order Status',
        'dashboard.charts.revenue': 'Monthly Revenue',
        'dashboard.charts.topProducts': 'Top Products',
        'dashboard.charts.customers': 'Customers by Region',
        'dashboard.activity': 'Recent Activity',

        // Entities
        'entity.add': 'Add',
        'entity.edit': 'Edit',
        'entity.delete': 'Delete',
        'entity.view': 'View',
        'entity.save': 'Save',
        'entity.cancel': 'Cancel',
        'entity.confirm': 'Confirm',
        'entity.search': 'Search...',
        'entity.filter': 'Filter',
        'entity.sort': 'Sort',
        'entity.export': 'Export',
        'entity.import': 'Import',
        'entity.itemsPerPage': 'Items per page',
        'entity.page': 'Page',
        'entity.of': 'of',
        'entity.previous': 'Previous',
        'entity.next': 'Next',
        'entity.noData': 'No data available',
        'entity.loading': 'Loading...',

        // CRUD Actions
        'crud.create': 'Create new item',
        'crud.update': 'Update item',
        'crud.deleteConfirm': 'Are you sure you want to delete this item?',
        'crud.deleteSuccess': 'Item deleted successfully',
        'crud.deleteError': 'Error deleting item',
        'crud.saveSuccess': 'Item saved successfully',
        'crud.saveError': 'Error saving item',
        'crud.loadError': 'Error loading data',

        // Forms
        'form.required': 'This field is required',
        'form.email': 'Please enter a valid email',
        'form.number': 'Please enter a valid number',
        'form.date': 'Please enter a valid date',
        'form.maxLength': 'Maximum {max} characters',
        'form.minLength': 'Minimum {min} characters',

        // Status
        'status.active': 'Active',
        'status.inactive': 'Inactive',
        'status.pending': 'Pending',
        'status.completed': 'Completed',
        'status.cancelled': 'Cancelled',
        'status.delivered': 'Delivered',
        'status.shipped': 'Shipped',
        'status.processing': 'Processing',
        'status.paid': 'Paid',
        'status.unpaid': 'Unpaid',
        'status.overdue': 'Overdue',
        'status.in_stock': 'In Stock',
        'status.out_of_stock': 'Out of Stock',
        'status.discontinued': 'Discontinued',

        // Roles
        'role.admin': 'Administrator',
        'role.user': 'User',
        'role.editor': 'Editor',
        'role.viewer': 'Viewer',
        'role.manager': 'Manager',
        'role.superadmin': 'Super Administrator',

        // Messages
        'message.success': 'Success',
        'message.error': 'Error',
        'message.warning': 'Warning',
        'message.info': 'Information',
        'message.confirm': 'Confirmation',
        'message.loading': 'Loading...',

        // Dates
        'date.today': 'Today',
        'date.yesterday': 'Yesterday',
        'date.tomorrow': 'Tomorrow',
        'date.thisWeek': 'This week',
        'date.lastWeek': 'Last week',
        'date.thisMonth': 'This month',
        'date.lastMonth': 'Last month',
        'date.thisYear': 'This year',
        'date.lastYear': 'Last year',

        // Metrics
        'metric.total': 'Total',
        'metric.average': 'Average',
        'metric.maximum': 'Maximum',
        'metric.minimum': 'Minimum',
        'metric.sum': 'Sum',
        'metric.count': 'Count',

        // Export
        'export.csv': 'Export to CSV',
        'export.pdf': 'Export to PDF',
        'export.excel': 'Export to Excel',
        'export.success': 'Export successful',
        'export.error': 'Export error',

        // Settings
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.theme': 'Theme',
        'settings.notifications': 'Notifications',
        'settings.security': 'Security',
        'settings.profile': 'Profile',
        'settings.account': 'Account',

        // Errors
        'error.network': 'Network connection error',
        'error.server': 'Server error',
        'error.unauthorized': 'Unauthorized',
        'error.forbidden': 'Forbidden',
        'error.notFound': 'Resource not found',
        'error.timeout': 'Timeout',
        'error.unknown': 'Unknown error',

        // Success
        'success.operation': 'Operation successful',
        'success.saved': 'Saved successfully',
        'success.updated': 'Updated successfully',
        'success.deleted': 'Deleted successfully',
        'success.imported': 'Imported successfully',
        'success.exported': 'Exported successfully'
    },

    ar: {
        // المصادقة
        'login.title': 'تسجيل الدخول',
        'login.subtitle': 'سجّل الدخول إلى لوحة التحكم',
        'login.username': 'اسم المستخدم',
        'login.password': 'كلمة المرور',
        'login.button': 'تسجيل الدخول',
        'login.credentials': 'بيانات الدخول الافتراضية: admin / admin',
        'login.error': 'بيانات الدخول غير صحيحة',

        // التنقل
        'nav.dashboard': 'لوحة التحكم',
        'nav.users': 'المستخدمين',
        'nav.products': 'المنتجات',
        'nav.orders': 'الطلبات',
        'nav.customers': 'العملاء',
        'nav.invoices': 'الفواتير',
        'nav.logout': 'تسجيل الخروج',
        'nav.profile': 'الملف الشخصي',
        'nav.settings': 'الإعدادات',

        // لوحة التحكم
        'dashboard.title': 'لوحة التحكم',
        'dashboard.welcome': 'أهلاً بك، {username}',
        'dashboard.stats.users': 'المستخدمين',
        'dashboard.stats.products': 'المنتجات',
        'dashboard.stats.orders': 'الطلبات',
        'dashboard.stats.revenue': 'الإيرادات',
        'dashboard.charts.users': 'توزيع المستخدمين',
        'dashboard.charts.orders': 'الطلبات حسب الشهر',
        'dashboard.charts.status': 'حالة الطلبات',
        'dashboard.charts.revenue': 'الإيرادات الشهرية',
        'dashboard.charts.topProducts': 'أفضل المنتجات',
        'dashboard.charts.customers': 'العملاء حسب المنطقة',
        'dashboard.activity': 'النشاط الأخير',

        // الكيانات
        'entity.add': 'إضافة',
        'entity.edit': 'تعديل',
        'entity.delete': 'حذف',
        'entity.view': 'عرض',
        'entity.save': 'حفظ',
        'entity.cancel': 'إلغاء',
        'entity.confirm': 'تأكيد',
        'entity.search': 'بحث...',
        'entity.filter': 'تصفية',
        'entity.sort': 'ترتيب',
        'entity.export': 'تصدير',
        'entity.import': 'استيراد',
        'entity.itemsPerPage': 'عناصر في الصفحة',
        'entity.page': 'صفحة',
        'entity.of': 'من',
        'entity.previous': 'السابق',
        'entity.next': 'التالي',
        'entity.noData': 'لا توجد بيانات متاحة',
        'entity.loading': 'جاري التحميل...',

        // إجراءات CRUD
        'crud.create': 'إنشاء عنصر جديد',
        'crud.update': 'تحديث العنصر',
        'crud.deleteConfirm': 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟',
        'crud.deleteSuccess': 'تم حذف العنصر بنجاح',
        'crud.deleteError': 'خطأ في حذف العنصر',
        'crud.saveSuccess': 'تم حفظ العنصر بنجاح',
        'crud.saveError': 'خطأ في حفظ العنصر',
        'crud.loadError': 'خطأ في تحميل البيانات',

        // النماذج
        'form.required': 'هذا الحقل مطلوب',
        'form.email': 'الرجاء إدخال بريد إلكتروني صالح',
        'form.number': 'الرجاء إدخال رقم صالح',
        'form.date': 'الرجاء إدخال تاريخ صالح',
        'form.maxLength': 'الحد الأقصى {max} حرف',
        'form.minLength': 'الحد الأدنى {min} حرف',

        // الحالات
        'status.active': 'نشط',
        'status.inactive': 'غير نشط',
        'status.pending': 'قيد الانتظار',
        'status.completed': 'مكتمل',
        'status.cancelled': 'ملغى',
        'status.delivered': 'تم التسليم',
        'status.shipped': 'تم الشحن',
        'status.processing': 'قيد المعالجة',
        'status.paid': 'مدفوع',
        'status.unpaid': 'غير مدفوع',
        'status.overdue': 'متأخر',
        'status.in_stock': 'متوفر',
        'status.out_of_stock': 'غير متوفر',
        'status.discontinued': 'موقوف',

        // الأدوار
        'role.admin': 'مدير',
        'role.user': 'مستخدم',
        'role.editor': 'محرر',
        'role.viewer': 'مشاهد',
        'role.manager': 'مدير',
        'role.superadmin': 'مدير عام',

        // الرسائل
        'message.success': 'نجاح',
        'message.error': 'خطأ',
        'message.warning': 'تحذير',
        'message.info': 'معلومات',
        'message.confirm': 'تأكيد',
        'message.loading': 'جاري التحميل...',

        // التواريخ
        'date.today': 'اليوم',
        'date.yesterday': 'الأمس',
        'date.tomorrow': 'غداً',
        'date.thisWeek': 'هذا الأسبوع',
        'date.lastWeek': 'الأسبوع الماضي',
        'date.thisMonth': 'هذا الشهر',
        'date.lastMonth': 'الشهر الماضي',
        'date.thisYear': 'هذه السنة',
        'date.lastYear': 'السنة الماضية',

        // المقاييس
        'metric.total': 'الإجمالي',
        'metric.average': 'المتوسط',
        'metric.maximum': 'الحد الأقصى',
        'metric.minimum': 'الحد الأدنى',
        'metric.sum': 'المجموع',
        'metric.count': 'العدد',

        // التصدير
        'export.csv': 'تصدير إلى CSV',
        'export.pdf': 'تصدير إلى PDF',
        'export.excel': 'تصدير إلى Excel',
        'export.success': 'تم التصدير بنجاح',
        'export.error': 'خطأ في التصدير',

        // الإعدادات
        'settings.title': 'الإعدادات',
        'settings.language': 'اللغة',
        'settings.theme': 'السمة',
        'settings.notifications': 'الإشعارات',
        'settings.security': 'الأمان',
        'settings.profile': 'الملف الشخصي',
        'settings.account': 'الحساب',

        // الأخطاء
        'error.network': 'خطأ في اتصال الشبكة',
        'error.server': 'خطأ في الخادم',
        'error.unauthorized': 'غير مصرح',
        'error.forbidden': 'ممنوع',
        'error.notFound': 'الموارد غير موجودة',
        'error.timeout': 'انتهت المهلة',
        'error.unknown': 'خطأ غير معروف',

        // النجاح
        'success.operation': 'تمت العملية بنجاح',
        'success.saved': 'تم الحفظ بنجاح',
        'success.updated': 'تم التحديث بنجاح',
        'success.deleted': 'تم الحذف بنجاح',
        'success.imported': 'تم الاستيراد بنجاح',
        'success.exported': 'تم التصدير بنجاح'
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.direction = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        this.init();
    }

    /**
     * Initialise l'internationalisation
     */
    init() {
        this.setLanguage(this.currentLang);
        this.addDirectionClass();
        this.translatePage();
    }

    /**
     * Définit la langue courante
     * @param {string} lang - Code de langue (fr, en, ar)
     */
    setLanguage(lang) {
        if (!TRANSLATIONS[lang]) {
            console.warn(`Langue ${lang} non supportée, utilisation du français par défaut`);
            lang = 'fr';
        }

        this.currentLang = lang;
        this.direction = lang === 'ar' ? 'rtl' : 'ltr';

        localStorage.setItem('language', lang);

        this.addDirectionClass();
        this.translatePage();

        // Déclencher un événement personnalisé
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang, direction: this.direction }
        }));

        // Mettre à jour les sélecteurs de langue
        this.updateLanguageSelectors(lang);
    }

    /**
     * Traduit une clé avec des paramètres optionnels
     * @param {string} key - Clé de traduction
     * @param {object} params - Paramètres de substitution
     * @returns {string} Texte traduit
     */
    t(key, params = {}) {
        let translation = TRANSLATIONS[this.currentLang][key] ||
            TRANSLATIONS['fr'][key] ||
            key;

        // Remplacer les paramètres
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });

        return translation;
    }

    /**
     * Traduit tout le contenu de la page
     */
    translatePage() {
        // Traduire les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const params = this.extractParams(element);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'placeholder' || element.hasAttribute('placeholder')) {
                    element.placeholder = this.t(key, params);
                } else {
                    element.value = this.t(key, params);
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = this.t(key, params);
            } else {
                element.textContent = this.t(key, params);
            }
        });

        // Traduire les titres
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Traduire les attributs alt
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            element.alt = this.t(key);
        });

        // Traduire les attributs aria-label
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            element.setAttribute('aria-label', this.t(key));
        });
    }

    /**
     * Extrait les paramètres des éléments de données
     */
    extractParams(element) {
        const params = {};

        // Extraire les paramètres des attributs data-i18n-param-*
        Array.from(element.attributes).forEach(attr => {
            if (attr.name.startsWith('data-i18n-param-')) {
                const paramName = attr.name.replace('data-i18n-param-', '');
                params[paramName] = attr.value;
            }
        });

        return params;
    }

    /**
     * Ajoute la classe de direction RTL/LTR au document
     */
    addDirectionClass() {
        document.documentElement.dir = this.direction;
        document.documentElement.lang = this.currentLang;

        // Ajouter/supprimer les classes CSS
        document.body.classList.remove('ltr', 'rtl');
        document.body.classList.add(this.direction);

        // Mettre à jour la direction du texte
        document.querySelectorAll('.text-dir').forEach(el => {
            el.style.direction = this.direction;
            el.style.textAlign = this.direction === 'rtl' ? 'right' : 'left';
        });
    }

    /**
     * Met à jour tous les sélecteurs de langue
     */
    updateLanguageSelectors(lang) {
        document.querySelectorAll('.language-selector select').forEach(select => {
            select.value = lang;
        });
    }

    /**
     * Formate une date selon la locale
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const formatOptions = { ...defaultOptions, ...options };

        return new Intl.DateTimeFormat(this.currentLang, formatOptions).format(new Date(date));
    }

    /**
     * Formate un nombre selon la locale
     */
    formatNumber(number, options = {}) {
        const defaultOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        };

        const formatOptions = { ...defaultOptions, ...options };

        return new Intl.NumberFormat(this.currentLang, formatOptions).format(number);
    }

    /**
     * Formate une devise selon la locale
     */
    formatCurrency(amount, currency = 'EUR', options = {}) {
        const defaultOptions = {
            style: 'currency',
            currency: currency
        };

        const formatOptions = { ...defaultOptions, ...options };

        return new Intl.NumberFormat(this.currentLang, formatOptions).format(amount);
    }

    /**
     * Formate une unité de mesure
     */
    formatUnit(value, unit, options = {}) {
        const defaultOptions = {
            style: 'unit',
            unit: unit
        };

        const formatOptions = { ...defaultOptions, ...options };

        return new Intl.NumberFormat(this.currentLang, formatOptions).format(value);
    }

    /**
     * Retourne la liste des langues supportées
     */
    getSupportedLanguages() {
        return Object.keys(TRANSLATIONS).map(code => ({
            code,
            name: this.getLanguageName(code),
            nativeName: this.getLanguageNativeName(code),
            direction: code === 'ar' ? 'rtl' : 'ltr'
        }));
    }

    /**
     * Retourne le nom de la langue
     */
    getLanguageName(code) {
        const names = {
            fr: 'French',
            en: 'English',
            ar: 'Arabic'
        };
        return names[code] || code;
    }

    /**
     * Retourne le nom natif de la langue
     */
    getLanguageNativeName(code) {
        const nativeNames = {
            fr: 'Français',
            en: 'English',
            ar: 'العربية'
        };
        return nativeNames[code] || code;
    }

    /**
     * Détermine la langue du navigateur
     */
    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.split('-')[0];
    }

    /**
     * Initialise automatiquement la langue
     */
    autoDetectLanguage() {
        const browserLang = this.getBrowserLanguage();
        const savedLang = localStorage.getItem('language');

        if (savedLang && TRANSLATIONS[savedLang]) {
            return savedLang;
        }

        if (TRANSLATIONS[browserLang]) {
            return browserLang;
        }

        return 'fr'; // Français par défaut
    }

    /**
     * Ajoute un observateur pour les nouveaux éléments
     */
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            this.translateElement(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Traduit un élément spécifique
     */
    translateElement(element) {
        // Traduire l'élément lui-même
        if (element.hasAttribute('data-i18n')) {
            const key = element.getAttribute('data-i18n');
            const params = this.extractParams(element);
            element.textContent = this.t(key, params);
        }

        // Traduire les enfants
        element.querySelectorAll('[data-i18n]').forEach(child => {
            const key = child.getAttribute('data-i18n');
            const params = this.extractParams(child);

            if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
                if (child.type === 'placeholder' || child.hasAttribute('placeholder')) {
                    child.placeholder = this.t(key, params);
                } else {
                    child.value = this.t(key, params);
                }
            } else {
                child.textContent = this.t(key, params);
            }
        });
    }
}

// Instance singleton
const i18n = new I18n();

// Fonctions globales pour une utilisation facile
window.i18n = i18n;
window.t = (key, params) => i18n.t(key, params);
window.changeLanguage = (lang) => i18n.setLanguage(lang);
window.getCurrentLanguage = () => i18n.currentLang;
window.formatDate = (date, options) => i18n.formatDate(date, options);
window.formatNumber = (number, options) => i18n.formatNumber(number, options);
window.formatCurrency = (amount, currency, options) => i18n.formatCurrency(amount, currency, options);

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    // Observer les changements du DOM
    i18n.observeDOM();

    // Configurer les sélecteurs de langue
    document.querySelectorAll('.language-selector select').forEach(select => {
        select.value = i18n.currentLang;
        select.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
        });
    });
});

// Export pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, i18n };
}