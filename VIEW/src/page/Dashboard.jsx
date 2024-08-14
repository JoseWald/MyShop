import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function Dashboard() {
    const [gain, setGain] = useState(0);
    const [prodNbr, setProdNbr] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);
    const [mostSelled, setMostSelled] = useState([]);
    const [replenish,setReplenish]=useState([]);
    const [status, setStatus] = useState('');
    const [weekly,setWeekly]=useState('');

    useEffect(() => {
        Createchart();
        getDailyGain();
        getProdNbr();
        getLowStock();
        getOutOfStock();
        getMostSelled();
        getReplenish();
        handleCleanup();
        getWeeklyStat();
    }, []);

    useEffect(()=>{
        if(weekly.length>0)
            Createchart()
    },[weekly])

    const Createchart = () => {
        const ctx = document.getElementById('salesChart').getContext('2d');
    
        if (Chart.getChart('salesChart')) {
            Chart.getChart('salesChart').destroy();
        }

    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Tur', 'Fri','Sat','Sun'],
                datasets: [{
                    label: 'Ventes',
                    data: [
                        weekly[0],
                        weekly[1],
                        weekly[2],
                        weekly[3],
                        weekly[4],
                        weekly[5],
                        weekly[6]
                    ],
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
    };

    const getDailyGain = async () => {
        try {
            const response = await axios.get("http://localhost:8000/stat/daily-gain");
            setGain(response.data.message);
        } catch (err) {
            console.log(err.response?.data.message || "Erreur lors de la récupération du gain quotidien");
        }
    };

    const getProdNbr = async () => {
        try {
            const response = await axios.get("http://localhost:8000/stat/product-count");
            setProdNbr(response.data.message);
        } catch (err) {
            console.log(err.response?.data.message || "Erreur lors de la récupération du nombre de produits");
        }
    };

    const getLowStock = async () => {
        try {
            const response = await axios.get("http://localhost:8000/stat/stock-to-replenish");
            setLowStock(response.data.message.length); 
        } catch (err) {
            console.log(err.response?.data.message || "Erreur lors de la récupération des produits à réapprovisionner");
        }
    };

    const getOutOfStock = async () => {
        try {
            const response = await axios.get("http://localhost:8000/stat/out-of-stock");
            setOutOfStock(response.data.message.length);
        } catch (err) {
            console.log(err.response?.data.message || "Erreur lors de la récupération des produits totalement épuisés");
        }
    };

    const getMostSelled = async () => {
        try {
            const response = await axios.get("http://localhost:8000/stat/most-selled");
            //console.log("Données reçues :", response.data.topProducts); 
            if (Array.isArray(response.data.topProducts)) {
                setMostSelled(response.data.topProducts);
            } else {
                console.error("Les données reçues ne sont pas un tableau :", response.data.topProducts);
            }
        } catch (err) {
            console.log(err.response?.data.message || "Erreur lors de la récupération des produits les plus vendus");
        }
    };

    const getReplenish=async()=>{
        try{
            const res=await axios.get("http://localhost:8000/stat/stock-to-replenish")
            setReplenish(res.data.message)

        }catch(err){
            console.log(err.response?.data.message);
        }
    }
    const handleCleanup = async () => {
        try {
            const response = await axios.post("http://localhost:8000/stat/cleanup");
            setStatus(response.data.message);
        } catch (err) {
            setStatus("Erreur lors du nettoyage : " + err.message);
        }
    };

    const getWeeklyStat = async () => {
        try {
            const res = await axios.get("http://localhost:8000/stat/weekly-stat");
            console.log("res=", res.data.weeklyStats);
    
          
            let weeklyTmp = res.data.weeklyStats.map((stat, index) => stat || 0);
            
        
            while (weeklyTmp.length < 7) {
                weeklyTmp.push(0);
            }
    
            setWeekly(weeklyTmp);
            console.log(weeklyTmp);
        } catch (err) {
            console.log(err.response?.data.message || "weekly stat not received");
        }
    };
    
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
                            <div className="card-header">Daily Gain</div>
                            <div className="card-body">
                                <h5 className="card-title">{gain} Ar</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Nombre de Produits</div>
                            <div className="card-body">
                                <h5 className="card-title">{prodNbr}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Produits à Réapprovisionner</div>
                            <div className="card-body">
                                <h5 className="card-title">{lowStock}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">Produits totalement épuisés</div>
                            <div className="card-body">
                                <h5 className="card-title">{outOfStock}</h5> 
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
                                    {mostSelled.length > 0 ? (
                                        mostSelled.map((product, key) => (
                                            <li key={key} className="list-group-item">
                                               {product.name.toUpperCase()}  Sold: {product.sold}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">Aucun produit trouvé</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="card mb-4 shadow">
                            <div className="card-header text-light bg-primary">Stock to Replenish</div>
                            <div className="card-body">
                                <ul className="list-group">
                                {replenish.length > 0 ? (
                                        replenish.map((product, key) => (
                                            <li key={key} className="list-group-item">
                                               {product.name.toUpperCase()}  
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">Aucun produit trouvé</li>
                                    )}
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
