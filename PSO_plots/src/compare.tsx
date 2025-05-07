import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, ScatterChart, Scatter,
    ComposedChart, Area, Bar, Cell
} from 'recharts';

// Define types for our data
type OptimizationDataPoint = {
    iteration: number;
    modelTrainings: number;
    accuracy: number;
    algorithm: string;
    timeTaken: number;
};

export default function OptimizationComparison() {
    // Prepare our comparison data
    const comparisonData: OptimizationDataPoint[] = [
        // PSO Data - Each particle counts as a model training
        { iteration: 1, modelTrainings: 3, accuracy: 0.9648, algorithm: 'PSO', timeTaken: 45.2 },
        { iteration: 2, modelTrainings: 6, accuracy: 0.9663, algorithm: 'PSO', timeTaken: 43.8 },
        { iteration: 3, modelTrainings: 9, accuracy: 0.9663, algorithm: 'PSO', timeTaken: 44.5 },
        { iteration: 4, modelTrainings: 12, accuracy: 0.9663, algorithm: 'PSO', timeTaken: 46.1 },
        { iteration: 5, modelTrainings: 15, accuracy: 0.9666, algorithm: 'PSO', timeTaken: 45.3 },

        // RLPSO Data - Each particle counts as a model training
        { iteration: 1, modelTrainings: 3, accuracy: 0.9681, algorithm: 'RLPSO', timeTaken: 45.2 },
        { iteration: 2, modelTrainings: 6, accuracy: 0.9706, algorithm: 'RLPSO', timeTaken: 43.8 },
        { iteration: 3, modelTrainings: 9, accuracy: 0.9715, algorithm: 'RLPSO', timeTaken: 44.5 },
        { iteration: 4, modelTrainings: 12, accuracy: 0.9744, algorithm: 'RLPSO', timeTaken: 46.1 },
        { iteration: 5, modelTrainings: 15, accuracy: 0.9745, algorithm: 'RLPSO', timeTaken: 45.3 },

        // Bayesian Optimization Data
        { iteration: 1, modelTrainings: 1, accuracy: 0.9700, algorithm: 'Bayesian', timeTaken: 49.3 },
        { iteration: 2, modelTrainings: 2, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 71.5 },
        { iteration: 3, modelTrainings: 3, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 71.7 },
        { iteration: 4, modelTrainings: 4, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 71.1 },
        { iteration: 5, modelTrainings: 5, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 53.1 },
        { iteration: 6, modelTrainings: 6, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 63.9 },
        { iteration: 7, modelTrainings: 7, accuracy: 0.9709, algorithm: 'Bayesian', timeTaken: 58.3 },
        { iteration: 8, modelTrainings: 8, accuracy: 0.9728, algorithm: 'Bayesian', timeTaken: 69.1 },
        { iteration: 9, modelTrainings: 9, accuracy: 0.9728, algorithm: 'Bayesian', timeTaken: 46.7 },
        { iteration: 10, modelTrainings: 10, accuracy: 0.9728, algorithm: 'Bayesian', timeTaken: 47.2 },
        { iteration: 11, modelTrainings: 11, accuracy: 0.9728, algorithm: 'Bayesian', timeTaken: 53.7 },
        { iteration: 12, modelTrainings: 12, accuracy: 0.9752, algorithm: 'Bayesian', timeTaken: 58.7 },
        { iteration: 13, modelTrainings: 13, accuracy: 0.9758, algorithm: 'Bayesian', timeTaken: 44.0 },
        { iteration: 14, modelTrainings: 14, accuracy: 0.9758, algorithm: 'Bayesian', timeTaken: 42.9 },
        { iteration: 15, modelTrainings: 15, accuracy: 0.9758, algorithm: 'Bayesian', timeTaken: 68.5 },
    ];

    // Best accuracy for each algorithm at each model training count
    const getBestAccuracies = () => {
        const bestAccuracies: Record<string, Record<number, number>> = {
            'PSO': {},
            'Bayesian': {},
            'RLPSO': {}
        };

        comparisonData.forEach(point => {
            const algo = point.algorithm;
            const trainings = point.modelTrainings;
            const acc = point.accuracy;

            if (!bestAccuracies[algo][trainings] || bestAccuracies[algo][trainings] < acc) {
                bestAccuracies[algo][trainings] = acc;
            }
        });

        // Convert to array format for charts
        const result: OptimizationDataPoint[] = [];

        Object.keys(bestAccuracies).forEach(algo => {
            Object.keys(bestAccuracies[algo]).forEach(trainCount => {
                result.push({
                    algorithm: algo,
                    modelTrainings: parseInt(trainCount),
                    accuracy: bestAccuracies[algo][parseInt(trainCount)],
                    iteration: 0, // Not relevant for this view
                    timeTaken: 0  // Not relevant for this view
                });
            });
        });

        return result;
    };

    // Calculate cumulative best accuracy for each algorithm
    const getCumulativeBestAccuracies = () => {
        const cumulativeBest: Record<string, OptimizationDataPoint[]> = {
            'PSO': [],
            'Bayesian': [],
            'RLPSO': []
        };

        Object.keys(cumulativeBest).forEach(algo => {
            let bestSoFar = 0;

            // Get only points for this algorithm and sort by model trainings
            const algoPoints = comparisonData
                .filter(p => p.algorithm === algo)
                .sort((a, b) => a.modelTrainings - b.modelTrainings);

            algoPoints.forEach(point => {
                bestSoFar = Math.max(bestSoFar, point.accuracy);
                cumulativeBest[algo].push({
                    ...point,
                    accuracy: bestSoFar
                });
            });
        });

        // Flatten for the chart
        return Object.values(cumulativeBest).flat();
    };

    const cumulativeData = getCumulativeBestAccuracies();

    // Calculate each algorithm's efficiency (accuracy gain per model training)
    const getAlgorithmStatistics = () => {
        const stats: Record<string, {
            maxAccuracy: number;
            avgAccuracy: number;
            trainsToMax: number;
            efficiency: number;
        }> = {};

        // Group by algorithm
        const byAlgo: Record<string, OptimizationDataPoint[]> = {};
        comparisonData.forEach(point => {
            if (!byAlgo[point.algorithm]) {
                byAlgo[point.algorithm] = [];
            }
            byAlgo[point.algorithm].push(point);
        });

        // Calculate stats for each algorithm
        Object.keys(byAlgo).forEach(algo => {
            const points = byAlgo[algo];
            const maxAcc = Math.max(...points.map(p => p.accuracy));
            const avgAcc = points.reduce((sum, p) => sum + p.accuracy, 0) / points.length;

            // Find point with max accuracy
            const maxPoint = points.find(p => p.accuracy === maxAcc);
            const trainsToMax = maxPoint?.modelTrainings || 0;

            // Efficiency is max accuracy divided by number of trainings needed
            const efficiency = maxAcc / trainsToMax;

            stats[algo] = {
                maxAccuracy: maxAcc,
                avgAccuracy: avgAcc,
                trainsToMax,
                efficiency
            };
        });

        return stats;
    };

    const [chartType, setChartType] = useState<'scatter' | 'line' | 'cumulative' | 'stats'>('line');
    const algorithmColors = {
        'PSO': '#8884d8',
        'Bayesian': '#82ca9d',
        'RLPSO': '#ffc658'
    };

    const stats = getAlgorithmStatistics();

    return (
        <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'left', color: '#374151' }}>
                Comparison of Optimization Algorithms
            </h1>

            <div style={{ display: 'flex', justifyContent: 'left', gap: '16px', marginBottom: '24px' }}>
                <button
                    onClick={() => setChartType('scatter')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        backgroundColor: chartType === 'scatter' ? '#2563eb' : '#e5e7eb',
                        color: chartType === 'scatter' ? 'white' : '#1f2937',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Scatter Plot
                </button>
                <button
                    onClick={() => setChartType('line')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        backgroundColor: chartType === 'line' ? '#2563eb' : '#e5e7eb',
                        color: chartType === 'line' ? 'white' : '#1f2937',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Line Chart
                </button>
                <button
                    onClick={() => setChartType('stats')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        backgroundColor: chartType === 'stats' ? '#2563eb' : '#e5e7eb',
                        color: chartType === 'stats' ? 'white' : '#1f2937',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Statistics
                </button>
            </div>

            {chartType === 'scatter' && (
                <div style={{ height: '500px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                        Accuracy vs Model Trainings
                    </h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="modelTrainings"
                                name="Model Trainings"
                                label={{ value: 'Number of Model Trainings', position: 'insideBottomRight', offset: -5 }}
                            />
                            <YAxis
                                type="number"
                                dataKey="accuracy"
                                name="Accuracy"
                                domain={[0.92, 0.98]}
                                label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value, name) => [value, name === 'accuracy' ? 'Accuracy' : 'Model Trainings']}
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                                                <p style={{ fontWeight: 'bold' }}>{payload[0].payload.algorithm}</p>
                                                <p>{`Model Trainings: ${payload[0].payload.modelTrainings}`}</p>
                                                <p>{`Accuracy: ${payload[0].payload.accuracy.toFixed(4)}`}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            {Object.keys(algorithmColors).map(algorithm => (
                                <Scatter
                                    key={algorithm}
                                    name={algorithm}
                                    data={comparisonData.filter(d => d.algorithm === algorithm)}
                                    fill={algorithmColors[algorithm as keyof typeof algorithmColors]}
                                    shape="circle"
                                />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            )}

            {chartType === 'line' && (
                <div style={{ height: '500px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                        Best Accuracy per Model Training Count
                    </h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="modelTrainings"
                                label={{ value: 'Number of Model Trainings', position: 'insideBottomRight', offset: -5 }}
                            />
                            <YAxis
                                domain={[0.92, 0.98]}
                                label={{ value: 'Best Accuracy', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value, name) => [value, name === 'accuracy' ? 'Accuracy' : 'Model Trainings']}
                            />
                            <Legend />
                            {Object.keys(algorithmColors).map(algorithm => (
                                <Line
                                    key={algorithm}
                                    type="monotone"
                                    dataKey="accuracy"
                                    data={getBestAccuracies().filter(d => d.algorithm === algorithm).sort((a, b) => a.modelTrainings - b.modelTrainings)}
                                    name={algorithm}
                                    stroke={algorithmColors[algorithm as keyof typeof algorithmColors]}
                                    activeDot={{ r: 8 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {chartType === 'stats' && (
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', color: '#374151' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
                        Algorithm Performance Statistics
                    </h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
                        {Object.keys(stats).map(algorithm => (
                            <div
                                key={algorithm}
                                style={{
                                    padding: '15px',
                                    borderRadius: '8px',
                                    backgroundColor: '#f8fafc',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    flex: '1',
                                    minWidth: '250px',
                                    border: `2px solid ${algorithmColors[algorithm as keyof typeof algorithmColors]}`
                                }}
                            >
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                                    {algorithm}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Max Accuracy:</span> {stats[algorithm].maxAccuracy.toFixed(4)}
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Avg Accuracy:</span> {stats[algorithm].avgAccuracy.toFixed(4)}
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Trainings to Max:</span> {stats[algorithm].trainsToMax}
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Efficiency Score:</span> {stats[algorithm].efficiency.toFixed(5)}
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                            (Max Accuracy / Trainings)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                        Accuracy Improvement by Training Count
                    </h3>


                    <div style={{ marginTop: '30px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                            Summary and Recommendations
                        </h3>

                        <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', lineHeight: '1.6' }}>
                            <p style={{ marginBottom: '10px' }}>
                                <strong>Best Overall Algorithm:</strong> {
                                    Object.keys(stats).reduce((a, b) => stats[a].maxAccuracy > stats[b].maxAccuracy ? a : b)
                                } with a maximum accuracy of {
                                    stats[Object.keys(stats).reduce((a, b) => stats[a].maxAccuracy > stats[b].maxAccuracy ? a : b)].maxAccuracy.toFixed(4)
                                }
                            </p>

                            <p style={{ marginBottom: '10px' }}>
                                <strong>Most Efficient Algorithm:</strong> {
                                    Object.keys(stats).reduce((a, b) => stats[a].efficiency > stats[b].efficiency ? a : b)
                                } with an efficiency score of {
                                    stats[Object.keys(stats).reduce((a, b) => stats[a].efficiency > stats[b].efficiency ? a : b)].efficiency.toFixed(5)
                                }
                            </p>

                            <p>
                                <strong>Recommendation:</strong> {
                                    stats['Bayesian'].efficiency > stats['PSO'].efficiency && stats['Bayesian'].efficiency > stats['RLPSO'].efficiency
                                        ? "Bayesian Optimization is most efficient for this problem, finding high-quality solutions with minimal model trainings."
                                        : stats['PSO'].efficiency > stats['RLPSO'].efficiency
                                            ? "PSO Search is surprisingly effective for this problem space, suggesting the hyperparameter landscape may be relatively smooth."
                                            : "RLPSO shows the best balance between exploration and exploitation, efficiently finding good solutions with parallel particle evaluations."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
