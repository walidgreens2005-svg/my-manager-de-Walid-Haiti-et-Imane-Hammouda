// La fonction exportToCSV est maintenant gérée par crud.js
// function exportToCSV() {
//     const config = getEntityConfig(currentEntity);
//     const headers = config.fields.map(f => f.label);
//     
//     // Préparer les données CSV
//     const csvRows = [];
//     
//     // Ajouter l'en-tête
//     csvRows.push(headers.join(','));
//     
//     // Ajouter les données
//     currentData.forEach(item => {
//         const row = config.fields.map(field => {
//             const value = getNestedValue(item, field.key);
//             // Échapper les virgules et les guillemets
//             const escapedValue = `"${(value || '').toString().replace(/"/g, '""')}"`;
//             return escapedValue;
//         });
//         csvRows.push(row.join(','));
//     });
//     
//     // Créer le fichier CSV
//     const csvContent = csvRows.join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     
//     // Télécharger le fichier
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `${currentEntity}_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

// Fonction pour l'export PDF (basique - implémentation complète nécessite une bibliothèque)
function exportToPDF() {
    alert('L\'export PDF nécessite l\'intégration d\'une bibliothèque comme jsPDF ou html2pdf.js');
    // Implémentation possible avec jsPDF:
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.text("Rapport PDF", 20, 20);
    // doc.save("rapport.pdf");
}

// Fonction utilitaire pour récupérer getNestedValue et getEntityConfig
// (Ces fonctions devraient être disponibles depuis entities.js)
/*
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function getEntityConfig(entityType) {
    // Cette fonction devrait être définie dans entities.js
    // Pour l'export, on utilise une version simplifiée
    const configs = {
        users: { fields: [{ label: 'ID' }, { label: 'Nom' }, { label: 'Email' }] },
        products: { fields: [{ label: 'ID' }, { label: 'Nom' }, { label: 'Prix' }] },
        orders: { fields: [{ label: 'ID' }, { label: 'Date' }, { label: 'Statut' }] },
        customers: { fields: [{ label: 'ID' }, { label: 'Nom' }, { label: 'Email' }] },
        invoices: { fields: [{ label: 'ID' }, { label: 'Client' }, { label: 'Montant' }] }
    };
    return configs[entityType] || configs.users;
}
*/