import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export default function PSOVisualizations() {
    // Parse data from the output
    const parseData = () => {
        // Initialize containers
        const iterations = [];
        const bestAccuracies = [];
        let currentIteration = 0;
        let bestAccSoFar = 0;

        // Extract data for each particle across iterations
        type ParticleData = {
            iteration: number;
            particle: number;
            epoch: number;
            trainLoss: number;
            testLoss: number;
            testAcc: number;
        };

        type IterationData = {
            iteration: number;
            particles: {
                particle: number;
                trainLoss: number;
                testLoss: number;
                testAcc: number;
            }[];
        };

        let iterationData: IterationData = {
            iteration: currentIteration,
            particles: []
        };

        const particles: ParticleData[][] = [[], [], []];
        let particleIndex = 0;

        // Results from the text
        const lines = `
    PSO
    Epoch 1/3, Train Loss: 0.3206, Test Loss: 0.1477, Test Acc: 0.9561
    Epoch 2/3, Train Loss: 0.2182, Test Loss: 0.1405, Test Acc: 0.9567
    Epoch 3/3, Train Loss: 0.1957, Test Loss: 0.1340, Test Acc: 0.9620
    Epoch 1/3, Train Loss: 0.2922, Test Loss: 0.1779, Test Acc: 0.9512
    Epoch 2/3, Train Loss: 0.2182, Test Loss: 0.1557, Test Acc: 0.9621
    Epoch 3/3, Train Loss: 0.2074, Test Loss: 0.1511, Test Acc: 0.9591
    Epoch 1/3, Train Loss: 0.3601, Test Loss: 0.1671, Test Acc: 0.9503
    Epoch 2/3, Train Loss: 0.1952, Test Loss: 0.1206, Test Acc: 0.9619
    Epoch 3/3, Train Loss: 0.1572, Test Loss: 0.1043, Test Acc: 0.9677
    number of particles:  3
    Epoch 1/3, Train Loss: 0.3181, Test Loss: 0.1617, Test Acc: 0.9508
    Epoch 2/3, Train Loss: 0.2188, Test Loss: 0.1830, Test Acc: 0.9459
    Epoch 3/3, Train Loss: 0.1929, Test Loss: 0.1308, Test Acc: 0.9606
    Epoch 1/3, Train Loss: 0.3106, Test Loss: 0.1600, Test Acc: 0.9513
    Epoch 2/3, Train Loss: 0.2284, Test Loss: 0.1559, Test Acc: 0.9536
    Epoch 3/3, Train Loss: 0.2132, Test Loss: 0.1519, Test Acc: 0.9589
    Epoch 1/3, Train Loss: 0.3133, Test Loss: 0.1575, Test Acc: 0.9504
    Epoch 2/3, Train Loss: 0.2006, Test Loss: 0.1210, Test Acc: 0.9640
    Epoch 3/3, Train Loss: 0.1757, Test Loss: 0.1143, Test Acc: 0.9648
    best value:  0.9648
    Epoch 1/3, Train Loss: 0.3235, Test Loss: 0.1719, Test Acc: 0.9491
    Epoch 2/3, Train Loss: 0.2124, Test Loss: 0.1251, Test Acc: 0.9612
    Epoch 3/3, Train Loss: 0.1830, Test Loss: 0.1320, Test Acc: 0.9594
    Epoch 1/3, Train Loss: 0.3048, Test Loss: 0.1277, Test Acc: 0.9583
    Epoch 2/3, Train Loss: 0.1891, Test Loss: 0.1139, Test Acc: 0.9652
    Epoch 3/3, Train Loss: 0.1699, Test Loss: 0.1204, Test Acc: 0.9633
    Epoch 1/3, Train Loss: 0.3095, Test Loss: 0.1521, Test Acc: 0.9544
    Epoch 2/3, Train Loss: 0.1975, Test Loss: 0.1268, Test Acc: 0.9628
    Epoch 3/3, Train Loss: 0.1691, Test Loss: 0.1132, Test Acc: 0.9663
    best value:  0.9663
    Epoch 1/3, Train Loss: 0.3360, Test Loss: 0.1579, Test Acc: 0.9516
    Epoch 2/3, Train Loss: 0.2246, Test Loss: 0.1906, Test Acc: 0.9466
    Epoch 3/3, Train Loss: 0.2077, Test Loss: 0.1313, Test Acc: 0.9603
    Epoch 1/3, Train Loss: 0.3488, Test Loss: 0.1567, Test Acc: 0.9542
    Epoch 2/3, Train Loss: 0.2239, Test Loss: 0.1271, Test Acc: 0.9612
    Epoch 3/3, Train Loss: 0.1955, Test Loss: 0.1221, Test Acc: 0.9622
    Epoch 1/3, Train Loss: 0.3957, Test Loss: 0.1817, Test Acc: 0.9461
    Epoch 2/3, Train Loss: 0.2059, Test Loss: 0.1328, Test Acc: 0.9591
    Epoch 3/3, Train Loss: 0.1655, Test Loss: 0.1149, Test Acc: 0.9643
    best value:  0.9663
    Epoch 1/3, Train Loss: 0.3362, Test Loss: 0.1723, Test Acc: 0.9457
    Epoch 2/3, Train Loss: 0.2312, Test Loss: 0.1436, Test Acc: 0.9558
    Epoch 3/3, Train Loss: 0.2080, Test Loss: 0.1298, Test Acc: 0.9608
    Epoch 1/3, Train Loss: 0.3285, Test Loss: 0.1554, Test Acc: 0.9527
    Epoch 2/3, Train Loss: 0.2092, Test Loss: 0.1415, Test Acc: 0.9562
    Epoch 3/3, Train Loss: 0.1898, Test Loss: 0.1217, Test Acc: 0.9644
    Epoch 1/3, Train Loss: 0.5845, Test Loss: 0.2834, Test Acc: 0.9200
    Epoch 2/3, Train Loss: 0.3025, Test Loss: 0.2161, Test Acc: 0.9372
    Epoch 3/3, Train Loss: 0.2463, Test Loss: 0.1794, Test Acc: 0.9485
    best value:  0.9663
    Epoch 1/3, Train Loss: 0.3044, Test Loss: 0.1331, Test Acc: 0.9586
    Epoch 2/3, Train Loss: 0.1978, Test Loss: 0.1261, Test Acc: 0.9634
    Epoch 3/3, Train Loss: 0.1829, Test Loss: 0.1158, Test Acc: 0.9666
    Epoch 1/3, Train Loss: 0.3038, Test Loss: 0.1451, Test Acc: 0.9567
    Epoch 2/3, Train Loss: 0.1967, Test Loss: 0.1190, Test Acc: 0.9647
    best value:  0.9666
    Best accuracy: -0.9666
    Best parameters: {'hidden_size': np.float64(77.84668354330827), 'dropout_rate': np.float64(0.2546615060267475), 'learning_rate': np.float64(0.0032184889008123998), 'batch_size': np.float64(6.421159019541096), 'epochs': np.float64(3.3653467626964515)}
    `.trim().split('\n');


        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Check if this is an epoch line
            if (line.startsWith('Epoch')) {
                const epochMatch = line.match(/Epoch (\d+)\/(\d+), Train Loss: ([\d.]+), Test Loss: ([\d.]+), Test Acc: ([\d.]+)/);
                if (epochMatch) {
                    const epochNum = parseInt(epochMatch[1]);
                    const totalEpochs = parseInt(epochMatch[2]);
                    const trainLoss = parseFloat(epochMatch[3]);
                    const testLoss = parseFloat(epochMatch[4]);
                    const testAcc = parseFloat(epochMatch[5]);

                    // Track data for this particle
                    if (!particles[particleIndex]) {
                        particles[particleIndex] = [];
                    }

                    particles[particleIndex].push({
                        iteration: currentIteration,
                        particle: particleIndex,
                        epoch: epochNum,
                        trainLoss,
                        testLoss,
                        testAcc
                    });

                    // If we've reached the last epoch for this particle
                    if (epochNum === totalEpochs) {
                        // Add this particle's final results to the iteration data
                        iterationData.particles.push({
                            particle: particleIndex,
                            trainLoss,
                            testLoss,
                            testAcc
                        });

                        // Move to next particle
                        particleIndex = (particleIndex + 1) % 3;

                        // If we've processed all 3 particles for this iteration
                        if (particleIndex === 0) {
                            // Save the iteration data
                            iterations.push({ ...iterationData });

                            // Start a new iteration
                            currentIteration++;
                            iterationData = {
                                iteration: currentIteration,
                                particles: []
                            };
                        }
                    }
                }
            } else if (line.startsWith('best value:')) {
                const bestAccMatch = line.match(/best value:\s+([\d.]+)/);
                if (bestAccMatch) {
                    const bestAcc = parseFloat(bestAccMatch[1]);
                    if (bestAcc > bestAccSoFar) {
                        bestAccSoFar = bestAcc;
                    }
                    bestAccuracies.push({
                        iteration: currentIteration - 1,
                        bestAccuracy: bestAcc,
                        globalBestAccuracy: bestAccSoFar
                    });
                }
            }
        }

        // Create a flattened view of all particle test accuracies for each iteration
        const allParticleData = iterations.flatMap(iteration =>
            iteration.particles.map(particle => ({
                iteration: iteration.iteration,
                particle: particle.particle,
                testAcc: particle.testAcc
            }))
        );

        // Combine all test accuracies by iteration
        const accByIteration: { iteration: number; maxAcc: number; minAcc: number; avgAcc: number }[] = [];
        iterations.forEach(iteration => {
            const iterAccs = iteration.particles.map(p => p.testAcc);
            accByIteration.push({
                iteration: iteration.iteration,
                maxAcc: Math.max(...iterAccs),
                minAcc: Math.min(...iterAccs),
                avgAcc: iterAccs.reduce((sum, acc) => sum + acc, 0) / iterAccs.length
            });
        });

        // Extract best parameters for display
        const bestParams = {
            hidden_size: 77.85,
            dropout_rate: 0.25,
            learning_rate: 0.0032,
            batch_size: 6,
            epochs: 3
        };

        return {
            iterations,
            bestAccuracies,
            allParticleData,
            accByIteration,
            bestParams
        };
    };

    const data = parseData();
    const [activeChart, setActiveChart] = useState<keyof typeof charts>('accuracy');

    const charts = {
        accuracy: {
            title: 'PSO Accuracy Evolution',
            description: 'Shows how test accuracy improves over iterations'
        },
        particles: {
            title: 'Particle Performance',
            description: 'Shows individual particle accuracy across iterations'
        },
        convergence: {
            title: 'PSO Convergence',
            description: 'Shows min, max and average accuracy across iterations'
        },
        bestParams: {
            title: 'Best Parameters Found',
            description: 'The optimal hyperparameters discovered by PSO'
        }
    };

    return (
        <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>PSO Hyperparameter Tuning Results</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                {Object.keys(charts).map(chartType => (
                    <button
                        key={chartType}
                        onClick={() => setActiveChart(chartType as keyof typeof charts)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: activeChart === chartType ? '#2563eb' : '#e5e7eb',
                            color: activeChart === chartType ? 'white' : '#1f2937',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {charts[chartType as keyof typeof charts].title}
                    </button>
                ))}
                {/* {Object.keys(charts).map(chartType => (
                    <button
                        key={chartType}
                        onClick={() => setActiveChart(chartType)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: activeChart === chartType ? '#2563eb' : '#e5e7eb',
                            color: activeChart === chartType ? 'white' : '#1f2937',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                    </button>
                ))} */}
            </div>

            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{charts[activeChart].title}</h2>
                <p style={{ color: '#4b5563', marginBottom: '16px' }}>{charts[activeChart].description}</p>

                {activeChart === 'accuracy' && (
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.bestAccuracies}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }} />
                                <YAxis domain={[0.94, 0.97]} label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => (typeof value === 'number' ? value.toFixed(4) : value)} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="bestAccuracy"
                                    stroke="#8884d8"
                                    name="Current Best"
                                    dot={{ r: 6 }}
                                    isAnimationActive={true}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="globalBestAccuracy"
                                    stroke="#82ca9d"
                                    name="Global Best"
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {activeChart === 'particles' && (
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="iteration"
                                    name="Iteration"
                                    label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }}
                                />
                                <YAxis
                                    dataKey="testAcc"
                                    name="Test Accuracy"
                                    domain={[0.92, 0.97]}
                                    label={{ value: 'Test Accuracy', angle: -90, position: 'insideLeft' }}
                                />
                                <ZAxis range={[60, 60]} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => typeof value === 'number' ? value.toFixed(4) : value} />
                                <Legend />
                                <Scatter
                                    name="Particle 0"
                                    data={data.allParticleData.filter(d => d.particle === 0)}
                                    fill="#8884d8"
                                />
                                <Scatter
                                    name="Particle 1"
                                    data={data.allParticleData.filter(d => d.particle === 1)}
                                    fill="#82ca9d"
                                />
                                <Scatter
                                    name="Particle 2"
                                    data={data.allParticleData.filter(d => d.particle === 2)}
                                    fill="#ff7300"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {activeChart === 'convergence' && (
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.accByIteration}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }} />
                                <YAxis domain={[0.93, 0.97]} label={{ value: 'Test Accuracy', angle: -90, position: 'insideLeft' }} />
                                <Tooltip formatter={(value) => (typeof value === 'number' ? value.toFixed(4) : value)} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="maxAcc"
                                    stroke="#8884d8"
                                    name="Max Accuracy"
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="avgAcc"
                                    stroke="#82ca9d"
                                    name="Avg Accuracy"
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="minAcc"
                                    stroke="#ff7300"
                                    name="Min Accuracy"
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {activeChart === 'bestParams' && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ minWidth: '100%', backgroundColor: 'white' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f3f4f6' }}>
                                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parameter</th>
                                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</th>
                                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Hidden Size</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>{data.bestParams.hidden_size}</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of neurons in hidden layer</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Dropout Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>{data.bestParams.dropout_rate}</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Probability of dropout for regularization</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Learning Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>{data.bestParams.learning_rate}</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Step size for gradient updates</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Batch Size</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>{data.bestParams.batch_size}</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of samples per gradient update</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Epochs</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>{data.bestParams.epochs}</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of complete passes through the dataset</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Summary</h2>
                <p style={{ marginBottom: '8px' }}>The PSO algorithm converged to a best test accuracy of <strong>{Math.max(...data.bestAccuracies.map(b => b.globalBestAccuracy)).toFixed(4)}</strong>.</p>
                <p style={{ marginBottom: '8px' }}>The best parameters found were:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '8px' }}>
                    <li>Hidden Size: {data.bestParams.hidden_size}</li>
                    <li>Dropout Rate: {data.bestParams.dropout_rate}</li>
                    <li>Learning Rate: {data.bestParams.learning_rate}</li>
                    <li>Batch Size: {Math.round(data.bestParams.batch_size)}</li>
                    <li>Epochs: {Math.round(data.bestParams.epochs)}</li>
                </ul>
                <p>These parameters achieved a high test accuracy while properly optimizing the model architecture and training process.</p>
            </div>
        </div >
    );
}
