function createUserDistributionChart() {
    const ctx = document.getElementById('userDistributionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Actifs', 'Inactifs', 'En attente'],
            datasets: [{
                data: [65, 20, 15],
                backgroundColor: [
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createOrdersChart() {
    const ctx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Commandes',
                data: [65, 59, 80, 81, 56, 55, 40, 60, 75, 90, 85, 95],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createOrdersStatusChart() {
    const ctx = document.getElementById('ordersStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Livrées', 'En cours', 'En attente', 'Annulées'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#F44336'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Revenu ($)',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: '#9C27B0',
                borderColor: '#7B1FA2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
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
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function createTopProductsChart() {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    new Chart(ctx, {
        type: 'horizontalBar',
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
                ]
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createCustomersByRegionChart() {
    const ctx = document.getElementById('customersByRegionChart').getContext('2d');
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
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}