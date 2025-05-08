import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export default function RLPSOVisualisations() {
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

 RL PSO
Epoch 1/3, Train Loss: 0.2806, Test Loss: 0.1394, Test Acc: 0.9559
Epoch 2/3, Train Loss: 0.1889, Test Loss: 0.1236, Test Acc: 0.9642
Epoch 3/3, Train Loss: 0.1683, Test Loss: 0.1156, Test Acc: 0.9682
Epoch 1/3, Train Loss: 0.3720, Test Loss: 0.2124, Test Acc: 0.9387
Epoch 2/3, Train Loss: 0.2967, Test Loss: 0.1910, Test Acc: 0.9456
Epoch 3/3, Train Loss: 0.2987, Test Loss: 0.1928, Test Acc: 0.9480
Epoch 1/3, Train Loss: 0.2491, Test Loss: 0.1249, Test Acc: 0.9623
Epoch 2/3, Train Loss: 0.1465, Test Loss: 0.1042, Test Acc: 0.9687
Epoch 3/3, Train Loss: 0.1214, Test Loss: 0.1104, Test Acc: 0.9685

Training progress:   0%|          | 0/5 [00:00<?, ?it/s]

Epoch 1/3, Train Loss: 0.2816, Test Loss: 0.1244, Test Acc: 0.9629
Epoch 2/3, Train Loss: 0.1850, Test Loss: 0.1228, Test Acc: 0.9647
Epoch 3/3, Train Loss: 0.1679, Test Loss: 0.1207, Test Acc: 0.9662
Epoch 1/3, Train Loss: 0.3240, Test Loss: 0.1647, Test Acc: 0.9521
Epoch 2/3, Train Loss: 0.2360, Test Loss: 0.1656, Test Acc: 0.9559
Epoch 3/3, Train Loss: 0.2165, Test Loss: 0.1372, Test Acc: 0.9645
Epoch 1/3, Train Loss: 0.2679, Test Loss: 0.1277, Test Acc: 0.9608
Epoch 2/3, Train Loss: 0.1678, Test Loss: 0.1088, Test Acc: 0.9681

Training progress:  20%|██        | 1/5 [02:33<10:13, 153.41s/it]

Epoch 3/3, Train Loss: 0.1481, Test Loss: 0.1163, Test Acc: 0.9665
Epoch 1/3, Train Loss: 0.2777, Test Loss: 0.1415, Test Acc: 0.9571
Epoch 2/3, Train Loss: 0.1876, Test Loss: 0.1299, Test Acc: 0.9624
Epoch 3/3, Train Loss: 0.1627, Test Loss: 0.1054, Test Acc: 0.9706
Epoch 1/3, Train Loss: 0.2995, Test Loss: 0.1596, Test Acc: 0.9503
Epoch 2/3, Train Loss: 0.2168, Test Loss: 0.1288, Test Acc: 0.9636
Epoch 3/3, Train Loss: 0.1960, Test Loss: 0.1266, Test Acc: 0.9667
Epoch 1/3, Train Loss: 0.2591, Test Loss: 0.1352, Test Acc: 0.9591
Epoch 2/3, Train Loss: 0.1647, Test Loss: 0.1185, Test Acc: 0.9665

Training progress:  40%|████      | 2/5 [05:08<07:42, 154.20s/it]

Epoch 3/3, Train Loss: 0.1432, Test Loss: 0.0999, Test Acc: 0.9715
Epoch 1/3, Train Loss: 0.2663, Test Loss: 0.1384, Test Acc: 0.9577
Epoch 2/3, Train Loss: 0.1762, Test Loss: 0.1357, Test Acc: 0.9614
Epoch 3/3, Train Loss: 0.1486, Test Loss: 0.1459, Test Acc: 0.9623
Epoch 1/3, Train Loss: 0.2648, Test Loss: 0.1160, Test Acc: 0.9645
Epoch 2/3, Train Loss: 0.1592, Test Loss: 0.1054, Test Acc: 0.9677
Epoch 3/3, Train Loss: 0.1387, Test Loss: 0.1037, Test Acc: 0.9695
Epoch 1/3, Train Loss: 0.2639, Test Loss: 0.1316, Test Acc: 0.9590
Epoch 2/3, Train Loss: 0.1589, Test Loss: 0.1128, Test Acc: 0.9662

Training progress:  60%|██████    | 3/5 [08:01<05:25, 162.82s/it]

Epoch 3/3, Train Loss: 0.1390, Test Loss: 0.1073, Test Acc: 0.9689
Epoch 1/3, Train Loss: 0.2661, Test Loss: 0.1329, Test Acc: 0.9597
Epoch 2/3, Train Loss: 0.1712, Test Loss: 0.1101, Test Acc: 0.9653
Epoch 3/3, Train Loss: 0.1498, Test Loss: 0.1088, Test Acc: 0.9687
Epoch 1/3, Train Loss: 0.2564, Test Loss: 0.1230, Test Acc: 0.9597
Epoch 2/3, Train Loss: 0.1422, Test Loss: 0.1004, Test Acc: 0.9691
Epoch 3/3, Train Loss: 0.1206, Test Loss: 0.0836, Test Acc: 0.9744
Epoch 1/3, Train Loss: 0.2512, Test Loss: 0.1237, Test Acc: 0.9629
Epoch 2/3, Train Loss: 0.1423, Test Loss: 0.0942, Test Acc: 0.9719

Training progress:  80%|████████  | 4/5 [10:36<02:39, 159.75s/it]

Epoch 3/3, Train Loss: 0.1188, Test Loss: 0.0894, Test Acc: 0.9723
Epoch 1/3, Train Loss: 0.2596, Test Loss: 0.1301, Test Acc: 0.9578
Epoch 2/3, Train Loss: 0.1542, Test Loss: 0.1108, Test Acc: 0.9660
Epoch 3/3, Train Loss: 0.1347, Test Loss: 0.1017, Test Acc: 0.9709
Epoch 1/3, Train Loss: 0.2508, Test Loss: 0.1155, Test Acc: 0.9637
Epoch 2/3, Train Loss: 0.1324, Test Loss: 0.0927, Test Acc: 0.9712
Epoch 3/3, Train Loss: 0.1030, Test Loss: 0.0852, Test Acc: 0.9738
Epoch 1/3, Train Loss: 0.2531, Test Loss: 0.1148, Test Acc: 0.9647
Epoch 2/3, Train Loss: 0.1356, Test Loss: 0.0996, Test Acc: 0.9692

Training progress: 100%|██████████| 5/5 [13:10<00:00, 158.17s/it]

Epoch 3/3, Train Loss: 0.1119, Test Loss: 0.0856, Test Acc: 0.9745
Best accuracy: -0.9745
Best parameters: {'hidden_size': np.float64(181.05556923646176), 'dropout_rate': np.float64(0.2524652647470446), 'learning_rate': np.float64(0.001084250702079491), 'batch_size': np.float64(5.206755104092855), 'epochs': np.float64(3.272990711862847)}



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
    const [activeChart, setActiveChart] = useState<keyof typeof charts>('convergence');

    const charts = {
        convergence: {
            title: 'RL PSO Convergence',
            description: 'Shows min, max and average accuracy across iterations'
        },
        particles: {
            title: 'Particle Performance',
            description: 'Shows individual particle accuracy across iterations'
        },
        bestParams: {
            title: 'Best Parameters Found',
            description: 'The optimal hyperparameters discovered by RL PSO'
        }
    };

    return (
        <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>RL PSO Hyperparameter Tuning Results</h1>

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

                {activeChart === 'particles' && (
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="iteration"
                                    name="Iteration"
                                    label={{ value: 'Iteration', position: 'insideBottom', offset: -5 }}
                                    ticks={data.allParticleData.map(d => d.iteration)}
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
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>181</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of neurons in hidden layer</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Dropout Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>0.25</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Probability of dropout for regularization</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Learning Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>0.001</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Step size for gradient updates</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Batch Size</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>5</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of samples per gradient update</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Epochs</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>3</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of complete passes through the dataset</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
}
