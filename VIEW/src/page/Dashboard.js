import React, { Component } from "react";
import Chart from 'chart.js/auto';

class Dashboard extends Component {
    componentDidMount() {
        const ctx = document.getElementById('salesChart');
        new Chart(ctx, {
            type: 'bar', 
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], 
                datasets: [{
                    label: 'Ventes',
                    data: [12, 19, 3, 5, 2], 
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className="mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="my-4">Dashboard</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card text-light bg-primary mb-3">
                                <div className="card-header">Stocks</div>
                                <div className="card-body">
                                    <h5 className="card-title">1,250</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-header">Nombre de Produits</div>
                                <div className="card-body">
                                    <h5 className="card-title">200</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-header">Produits à Réapprovisionner</div>
                                <div className="card-body">
                                    <h5 className="card-title">15</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-header">Produits totalement épuisés</div>
                                <div className="card-body">
                                    <h5 className="card-title">5</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4 shadow">
                                <div className="card-header text-light bg-primary">Produits les Plus Vendus</div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item">Produit A</li>
                                        <li className="list-group-item">Produit B</li>
                                        <li className="list-group-item">Produit C</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card mb-4 shadow">
                                <div className="card-header text-light bg-primary">Mouvements Récents des Stocks</div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item">Ajout de 100 unités du Produit A</li>
                                        <li className="list-group-item">Retrait de 50 unités du Produit B</li>
                                        <li className="list-group-item">Ajout de 30 unités du Produit C</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4 shadow">
                                <div className="card-header text-light bg-primary">Graphiques des Ventes</div>
                                <div className="card-body">
                                    <canvas id="salesChart" className="w-100 h-100"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
