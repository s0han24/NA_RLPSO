import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, BarChart, Bar, ScatterChart,
    Scatter, ZAxis
} from 'recharts';

export default function BayesianVisualizations() {
    // Parse data from the output
    const parseData = () => {
        // Initialize containers
        const iterations = [];
        let currentIteration: any = null;

        type IterationData = {
            iteration: number;
            testAcc: number;
            trainLoss: number;
            testLoss: number;
            epochs: number;
            timeTaken: number;
            isMinimum: boolean;
            evaluationType: string;
        };

        const iterationsData: IterationData[] = [];

        // Results from the text
        const lines = `
Bayesian Optimization
Iteration No: 1 started. Evaluating function at random point.
Epoch 1/3, Train Loss: 0.2338, Test Loss: 0.1300, Test Acc: 0.9604
Epoch 2/3, Train Loss: 0.1470, Test Loss: 0.1264, Test Acc: 0.9641
Epoch 3/3, Train Loss: 0.1261, Test Loss: 0.1035, Test Acc: 0.9700
Iteration No: 1 ended. Evaluation done at random point.
Time taken: 49.3465
Function value obtained: -0.9700
Current minimum: -0.9700
Iteration No: 2 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.3520, Test Loss: 0.1728, Test Acc: 0.9473
Epoch 2/4, Train Loss: 0.1849, Test Loss: 0.1276, Test Acc: 0.9613
Epoch 3/4, Train Loss: 0.1455, Test Loss: 0.1049, Test Acc: 0.9668
Epoch 4/4, Train Loss: 0.1234, Test Loss: 0.0963, Test Acc: 0.9709
Iteration No: 2 ended. Evaluation done at random point.
Time taken: 71.4554
Function value obtained: -0.9709
Current minimum: -0.9709
Iteration No: 3 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.4466, Test Loss: 0.2436, Test Acc: 0.9297
Epoch 2/4, Train Loss: 0.3824, Test Loss: 0.2134, Test Acc: 0.9415
Epoch 3/4, Train Loss: 0.3718, Test Loss: 0.2503, Test Acc: 0.9337
Epoch 4/4, Train Loss: 0.3576, Test Loss: 0.2506, Test Acc: 0.9402
Iteration No: 3 ended. Evaluation done at random point.
Time taken: 71.6607
Function value obtained: -0.9415
Current minimum: -0.9709
Iteration No: 4 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.4831, Test Loss: 0.2562, Test Acc: 0.9262
Epoch 2/4, Train Loss: 0.2508, Test Loss: 0.1937, Test Acc: 0.9436
Epoch 3/4, Train Loss: 0.1937, Test Loss: 0.1569, Test Acc: 0.9544
Epoch 4/4, Train Loss: 0.1593, Test Loss: 0.1302, Test Acc: 0.9619
Iteration No: 4 ended. Evaluation done at random point.
Time taken: 71.1054
Function value obtained: -0.9619
Current minimum: -0.9709
Iteration No: 5 started. Evaluating function at random point.
Epoch 1/3, Train Loss: 0.3840, Test Loss: 0.2470, Test Acc: 0.9272
Epoch 2/3, Train Loss: 0.3253, Test Loss: 0.2400, Test Acc: 0.9398
Epoch 3/3, Train Loss: 0.3111, Test Loss: 0.2525, Test Acc: 0.9391
Iteration No: 5 ended. Evaluation done at random point.
Time taken: 53.1378
Function value obtained: -0.9398
Current minimum: -0.9709
Iteration No: 6 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.3511, Test Loss: 0.2108, Test Acc: 0.9378
Epoch 2/4, Train Loss: 0.2875, Test Loss: 0.2749, Test Acc: 0.9183
Epoch 3/4, Train Loss: 0.2727, Test Loss: 0.2064, Test Acc: 0.9489
Epoch 4/4, Train Loss: 0.2545, Test Loss: 0.2224, Test Acc: 0.9538
Iteration No: 6 ended. Evaluation done at random point.
Time taken: 63.8745
Function value obtained: -0.9538
Current minimum: -0.9709
Iteration No: 7 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.6991, Test Loss: 0.3319, Test Acc: 0.9076
Epoch 2/4, Train Loss: 0.3268, Test Loss: 0.2591, Test Acc: 0.9271
Epoch 3/4, Train Loss: 0.2657, Test Loss: 0.2205, Test Acc: 0.9365
Epoch 4/4, Train Loss: 0.2275, Test Loss: 0.1896, Test Acc: 0.9442
Iteration No: 7 ended. Evaluation done at random point.
Time taken: 58.2896
Function value obtained: -0.9442
Current minimum: -0.9709
Iteration No: 8 started. Evaluating function at random point.
Epoch 1/4, Train Loss: 0.3387, Test Loss: 0.1826, Test Acc: 0.9461
Epoch 2/4, Train Loss: 0.1658, Test Loss: 0.1241, Test Acc: 0.9639
Epoch 3/4, Train Loss: 0.1189, Test Loss: 0.1006, Test Acc: 0.9695
Epoch 4/4, Train Loss: 0.0936, Test Loss: 0.0874, Test Acc: 0.9728
Iteration No: 8 ended. Evaluation done at random point.
Time taken: 69.0991
Function value obtained: -0.9728
Current minimum: -0.9728
Iteration No: 9 started. Evaluating function at random point.
Epoch 1/3, Train Loss: 0.4451, Test Loss: 0.2297, Test Acc: 0.9317
Epoch 2/3, Train Loss: 0.2224, Test Loss: 0.1643, Test Acc: 0.9513
Epoch 3/3, Train Loss: 0.1708, Test Loss: 0.1314, Test Acc: 0.9607
Iteration No: 9 ended. Evaluation done at random point.
Time taken: 46.7251
Function value obtained: -0.9607
Current minimum: -0.9728
Iteration No: 10 started. Evaluating function at random point.
Epoch 1/3, Train Loss: 0.3928, Test Loss: 0.2064, Test Acc: 0.9417
Epoch 2/3, Train Loss: 0.1903, Test Loss: 0.1454, Test Acc: 0.9578
Epoch 3/3, Train Loss: 0.1388, Test Loss: 0.1106, Test Acc: 0.9679
Iteration No: 10 ended. Evaluation done at random point.
Time taken: 47.1540
Function value obtained: -0.9679
Current minimum: -0.9728
Iteration No: 11 started. Searching for the next optimal point.
Epoch 1/3, Train Loss: 0.2402, Test Loss: 0.1242, Test Acc: 0.9625
Epoch 2/3, Train Loss: 0.1102, Test Loss: 0.1058, Test Acc: 0.9674
Epoch 3/3, Train Loss: 0.0825, Test Loss: 0.0913, Test Acc: 0.9718
Iteration No: 11 ended. Search finished for the next optimal point.
Time taken: 53.7304
Function value obtained: -0.9718
Current minimum: -0.9728
Iteration No: 12 started. Searching for the next optimal point.
Epoch 1/4, Train Loss: 0.2631, Test Loss: 0.1304, Test Acc: 0.9599
Epoch 2/4, Train Loss: 0.1238, Test Loss: 0.0946, Test Acc: 0.9696
Epoch 3/4, Train Loss: 0.0949, Test Loss: 0.0924, Test Acc: 0.9717
Epoch 4/4, Train Loss: 0.0780, Test Loss: 0.0795, Test Acc: 0.9752
Iteration No: 12 ended. Search finished for the next optimal point.
Time taken: 58.7340
Function value obtained: -0.9752
Current minimum: -0.9752
Iteration No: 13 started. Searching for the next optimal point.
Epoch 1/3, Train Loss: 0.2922, Test Loss: 0.1383, Test Acc: 0.9598
Epoch 2/3, Train Loss: 0.1272, Test Loss: 0.1031, Test Acc: 0.9674
Epoch 3/3, Train Loss: 0.0890, Test Loss: 0.0785, Test Acc: 0.9758
Iteration No: 13 ended. Search finished for the next optimal point.
Time taken: 44.0198
Function value obtained: -0.9758
Current minimum: -0.9758
Iteration No: 14 started. Searching for the next optimal point.
Epoch 1/3, Train Loss: 0.2706, Test Loss: 0.1453, Test Acc: 0.9528
Epoch 2/3, Train Loss: 0.1832, Test Loss: 0.1143, Test Acc: 0.9648
Epoch 3/3, Train Loss: 0.1601, Test Loss: 0.1237, Test Acc: 0.9660
Iteration No: 14 ended. Search finished for the next optimal point.
Time taken: 42.9045
Function value obtained: -0.9660
Current minimum: -0.9758
Iteration No: 15 started. Searching for the next optimal point.
Epoch 1/4, Train Loss: 0.2250, Test Loss: 0.1134, Test Acc: 0.9658
Epoch 2/4, Train Loss: 0.1240, Test Loss: 0.1019, Test Acc: 0.9691
Epoch 3/4, Train Loss: 0.1028, Test Loss: 0.0898, Test Acc: 0.9747
Epoch 4/4, Train Loss: 0.0891, Test Loss: 0.1027, Test Acc: 0.9724
Iteration No: 15 ended. Search finished for the next optimal point.
Time taken: 68.4992
Function value obtained: -0.9747
Current minimum: -0.9758
Best accuracy: 0.9758
Best parameters: {'hidden_size': np.int64(245), 'dropout_rate': 0.10906815506053369, 'learning_rate': 0.0008393492851411112, 'batch_size': np.int64(7), 'epochs': np.int64(3)}
`.trim().split('\n');

        let epochsData: { epoch: number; trainLoss: number; testLoss: number; testAcc: number }[] = [];
        let totalEpochs = 0;
        let inIteration = false;
        let evaluationType = '';
        let iterationNumber = 0;
        let timeTaken = 0;
        let functionValue = 0;
        let currentMinimum = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Detect iteration start
            if (line.includes('Iteration No:') && line.includes('started')) {
                inIteration = true;
                const matchedLine = line.match(/Iteration No: (\d+)/);
                if (matchedLine) {
                    iterationNumber = parseInt(matchedLine[1]);
                } else {
                    console.error('Iteration number not found in line:', line);
                    iterationNumber = 0;
                }

                if (line.includes('random point')) {
                    evaluationType = 'random';
                } else if (line.includes('next optimal point')) {
                    evaluationType = 'optimal';
                }

                // Reset epochs data for this iteration
                epochsData = [];
                continue;
            }

            // Process epoch data
            if (line.startsWith('Epoch')) {
                const epochMatch = line.match(/Epoch (\d+)\/(\d+), Train Loss: ([\d.]+), Test Loss: ([\d.]+), Test Acc: ([\d.]+)/);
                if (epochMatch) {
                    const epochNum = parseInt(epochMatch[1]);
                    totalEpochs = parseInt(epochMatch[2]);
                    const trainLoss = parseFloat(epochMatch[3]);
                    const testLoss = parseFloat(epochMatch[4]);
                    const testAcc = parseFloat(epochMatch[5]);

                    epochsData.push({
                        epoch: epochNum,
                        trainLoss,
                        testLoss,
                        testAcc
                    });
                }
                continue;
            }

            // Process time taken
            if (line.startsWith('Time taken:')) {
                const timeMatch = line.match(/Time taken: ([\d.]+)/);
                if (timeMatch) {
                    timeTaken = parseFloat(timeMatch[1]);
                }
                else {
                    console.error('Time taken not found in line:', line);
                    timeTaken = 0;
                }
                continue;
            }

            // Process function value
            if (line.startsWith('Function value obtained:')) {
                const functionMatch = line.match(/Function value obtained: -([\d.]+)/);
                if (functionMatch) {
                    functionValue = -parseFloat(functionMatch[1]);
                }
                else {
                    console.error('Function value not found in line:', line);
                    functionValue = 0;
                }
                continue;
            }

            // Process current minimum
            if (line.startsWith('Current minimum:')) {
                const minMatch = line.match(/Current minimum: -([\d.]+)/);
                if (minMatch) {
                    currentMinimum = -parseFloat(minMatch[1]);
                }
                else {
                    console.error('Current minimum not found in line:', line);
                    currentMinimum = 0;
                }
                continue;
            }

            // Detect iteration end
            if (line.includes('Iteration No:') && line.includes('ended')) {
                // Add the iteration data with the last epoch's results
                if (epochsData.length > 0) {
                    const lastEpoch = epochsData[epochsData.length - 1];
                    iterationsData.push({
                        iteration: iterationNumber,
                        testAcc: lastEpoch.testAcc,
                        trainLoss: lastEpoch.trainLoss,
                        testLoss: lastEpoch.testLoss,
                        epochs: totalEpochs,
                        timeTaken,
                        isMinimum: Math.abs(functionValue - currentMinimum) < 0.0001,
                        evaluationType
                    });
                }

                inIteration = false;
            }
        }

        // Extract best parameters
        const bestParams = {
            hidden_size: 245,
            dropout_rate: 0.109,
            learning_rate: 0.00084,
            batch_size: 7,
            epochs: 3
        };

        return {
            iterationsData,
            bestParams,
            bestAccuracy: 0.9758
        };
    };

    const data = parseData();
    const [activeChart, setActiveChart] = useState<keyof typeof charts>('comparison');

    const charts = {
        comparison: {
            title: 'Random vs Optimized Search',
            description: 'Compares accuracy from random and optimized search phases'
        },
        bestParams: {
            title: 'Best Parameters Found',
            description: 'The optimal hyperparameters discovered by Bayesian Optimization'
        }
    };

    // Functions to prepare data for different charts
    const prepareAccuracyData = () => {
        return data.iterationsData.map(iter => ({
            ...iter,
            isCurrentBest: iter.isMinimum
        }));
    };

    const prepareComparisonData = () => {
        const randomPoints = data.iterationsData
            .filter(item => item.evaluationType === 'random')
            .map(item => ({
                iteration: item.iteration,
                accuracy: item.testAcc,
                type: 'Random'
            }));

        const optimalPoints = data.iterationsData
            .filter(item => item.evaluationType === 'optimal')
            .map(item => ({
                iteration: item.iteration,
                accuracy: item.testAcc,
                type: 'Optimized'
            }));

        return [...randomPoints, ...optimalPoints];
    };

    const prepareTimeData = () => {
        return data.iterationsData.map(iter => ({
            timeTaken: iter.timeTaken,
            accuracy: iter.testAcc,
            iteration: iter.iteration,
            epochs: iter.epochs
        }));
    };

    return (
        <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>
                Bayesian Optimization Hyperparameter Tuning Results
            </h1>

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
            </div>

            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {charts[activeChart].title}
                </h2>
                <p style={{ color: '#4b5563', marginBottom: '16px' }}>
                    {charts[activeChart].description}
                </p>

                {activeChart === 'comparison' && (
                    <div style={{ height: '400px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            >
                                <CartesianGrid />
                                <XAxis
                                    type="number"
                                    dataKey="iteration"
                                    name="Iteration"
                                    label={{ value: 'Iteration', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="accuracy"
                                    name="Accuracy"
                                    domain={[0.93, 0.98]}
                                    label={{ value: 'Test Accuracy', angle: -90, position: 'insideLeft' }}
                                />
                                <ZAxis range={[60, 400]} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter
                                    name="Random Search"
                                    data={prepareComparisonData().filter(item => item.type === 'Random')}
                                    fill="#8884d8"
                                    shape="circle"
                                />
                                <Scatter
                                    name="Optimized Search"
                                    data={prepareComparisonData().filter(item => item.type === 'Optimized')}
                                    fill="#82ca9d"
                                    shape="star"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {activeChart === 'bestParams' && (
                    <div style={{ color: '#374151' }}>
                        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Best Test Accuracy: {data.bestAccuracy}</h3>
                            <p>Found at Iteration 13 with 3 epochs</p>
                        </div>

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
                    </div>
                )}
            </div>
        </div>
    );
}
