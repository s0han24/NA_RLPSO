import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export default function GridSearchVisualisations() {
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

        Grid Search

        0%|          | 0/162 [00:00<?, ?it/s]
        0%|          | 0.00/9.91M [00:00<?, ?B/s]
        1%|          | 65.5k/9.91M [00:00<00:18, 540kB/s]
        2%|▏         | 229k/9.91M [00:00<00:09, 1.00MB/s]
       10%|▉         | 950k/9.91M [00:00<00:02, 3.20MB/s]
       23%|██▎       | 2.33M/9.91M [00:00<00:01, 6.28MB/s]
       42%|████▏     | 4.16M/9.91M [00:00<00:00, 9.38MB/s]
       56%|█████▌    | 5.51M/9.91M [00:00<00:00, 9.77MB/s]
       65%|██████▌   | 6.49M/9.91M [00:00<00:00, 9.17MB/s]
       75%|███████▍  | 7.41M/9.91M [00:01<00:00, 8.50MB/s]
       83%|████████▎ | 8.26M/9.91M [00:01<00:00, 6.94MB/s]
       91%|█████████ | 9.01M/9.91M [00:01<00:00, 6.73MB/s]
      100%|██████████| 9.91M/9.91M [00:01<00:00, 6.61MB/s]

      100%|██████████| 28.9k/28.9k [00:00<00:00, 483kB/s]

        0%|          | 0.00/1.65M [00:00<?, ?B/s]
        4%|▍         | 65.5k/1.65M [00:00<00:02, 541kB/s]
       20%|█▉        | 328k/1.65M [00:00<00:00, 1.47MB/s]
      100%|██████████| 1.65M/1.65M [00:00<00:00, 4.40MB/s]

      100%|██████████| 4.54k/4.54k [00:00<00:00, 8.71MB/s]

      Epoch 1/3, Train Loss: 0.5960, Test Loss: 0.3077, Test Acc: 0.9135
      Epoch 2/3, Train Loss: 0.3067, Test Loss: 0.2444, Test Acc: 0.9283

        1%|          | 1/162 [00:57<2:35:27, 57.94s/it]

      Epoch 3/3, Train Loss: 0.2530, Test Loss: 0.2071, Test Acc: 0.9402
      Epoch 1/4, Train Loss: 0.5953, Test Loss: 0.3070, Test Acc: 0.9150
      Epoch 2/4, Train Loss: 0.3122, Test Loss: 0.2456, Test Acc: 0.9288
      Epoch 3/4, Train Loss: 0.2593, Test Loss: 0.2129, Test Acc: 0.9381

        1%|          | 2/162 [02:04<2:48:48, 63.30s/it]

      Epoch 4/4, Train Loss: 0.2257, Test Loss: 0.1893, Test Acc: 0.9446
      Epoch 1/3, Train Loss: 0.7399, Test Loss: 0.3492, Test Acc: 0.9060
      Epoch 2/3, Train Loss: 0.3507, Test Loss: 0.2757, Test Acc: 0.9213

        2%|▏         | 3/162 [02:48<2:24:19, 54.47s/it]

      Epoch 3/3, Train Loss: 0.2898, Test Loss: 0.2411, Test Acc: 0.9304
      Epoch 1/4, Train Loss: 0.7366, Test Loss: 0.3514, Test Acc: 0.9043
      Epoch 2/4, Train Loss: 0.3483, Test Loss: 0.2742, Test Acc: 0.9218
      Epoch 3/4, Train Loss: 0.2881, Test Loss: 0.2373, Test Acc: 0.9321

        2%|▏         | 4/162 [03:48<2:28:28, 56.38s/it]

      Epoch 4/4, Train Loss: 0.2507, Test Loss: 0.2099, Test Acc: 0.9384
      Epoch 1/3, Train Loss: 0.9143, Test Loss: 0.4302, Test Acc: 0.8922
      Epoch 2/3, Train Loss: 0.4176, Test Loss: 0.3258, Test Acc: 0.9127

        3%|▎         | 5/162 [04:31<2:14:43, 51.48s/it]

      Epoch 3/3, Train Loss: 0.3429, Test Loss: 0.2831, Test Acc: 0.9221
      Epoch 1/4, Train Loss: 0.9087, Test Loss: 0.4276, Test Acc: 0.8943
      Epoch 2/4, Train Loss: 0.4115, Test Loss: 0.3180, Test Acc: 0.9136
      Epoch 3/4, Train Loss: 0.3360, Test Loss: 0.2745, Test Acc: 0.9220

        4%|▎         | 6/162 [05:27<2:18:01, 53.09s/it]

      Epoch 4/4, Train Loss: 0.2978, Test Loss: 0.2489, Test Acc: 0.9282
      Epoch 1/3, Train Loss: 0.2930, Test Loss: 0.1383, Test Acc: 0.9604
      Epoch 2/3, Train Loss: 0.1522, Test Loss: 0.1064, Test Acc: 0.9675

        4%|▍         | 7/162 [06:17<2:14:34, 52.09s/it]

      Epoch 3/3, Train Loss: 0.1246, Test Loss: 0.1102, Test Acc: 0.9661
      Epoch 1/4, Train Loss: 0.2941, Test Loss: 0.1463, Test Acc: 0.9565
      Epoch 2/4, Train Loss: 0.1544, Test Loss: 0.1167, Test Acc: 0.9653
      Epoch 3/4, Train Loss: 0.1201, Test Loss: 0.1006, Test Acc: 0.9678

        5%|▍         | 8/162 [07:24<2:26:21, 57.02s/it]

      Epoch 4/4, Train Loss: 0.1050, Test Loss: 0.0956, Test Acc: 0.9707
      Epoch 1/3, Train Loss: 0.3322, Test Loss: 0.1610, Test Acc: 0.9537
      Epoch 2/3, Train Loss: 0.1672, Test Loss: 0.1303, Test Acc: 0.9613

        6%|▌         | 9/162 [08:09<2:15:31, 53.15s/it]

      Epoch 3/3, Train Loss: 0.1317, Test Loss: 0.1062, Test Acc: 0.9679
      Epoch 1/4, Train Loss: 0.3241, Test Loss: 0.1710, Test Acc: 0.9472
      Epoch 2/4, Train Loss: 0.1646, Test Loss: 0.1206, Test Acc: 0.9644
      Epoch 3/4, Train Loss: 0.1293, Test Loss: 0.1063, Test Acc: 0.9686

        6%|▌         | 10/162 [09:08<2:19:03, 54.89s/it]

      Epoch 4/4, Train Loss: 0.1103, Test Loss: 0.0987, Test Acc: 0.9712
      Epoch 1/3, Train Loss: 0.3766, Test Loss: 0.1931, Test Acc: 0.9430
      Epoch 2/3, Train Loss: 0.1900, Test Loss: 0.1349, Test Acc: 0.9601

        7%|▋         | 11/162 [09:50<2:08:08, 50.91s/it]

      Epoch 3/3, Train Loss: 0.1441, Test Loss: 0.1096, Test Acc: 0.9665
      Epoch 1/4, Train Loss: 0.3795, Test Loss: 0.2012, Test Acc: 0.9385
      Epoch 2/4, Train Loss: 0.1873, Test Loss: 0.1345, Test Acc: 0.9591
      Epoch 3/4, Train Loss: 0.1438, Test Loss: 0.1117, Test Acc: 0.9644

        7%|▋         | 12/162 [10:47<2:11:47, 52.72s/it]

      Epoch 4/4, Train Loss: 0.1178, Test Loss: 0.0972, Test Acc: 0.9685
      Epoch 1/3, Train Loss: 0.4235, Test Loss: 0.2735, Test Acc: 0.9283
      Epoch 2/3, Train Loss: 0.3586, Test Loss: 0.3322, Test Acc: 0.9105

        8%|▊         | 13/162 [11:37<2:09:02, 51.96s/it]

      Epoch 3/3, Train Loss: 0.3519, Test Loss: 0.2921, Test Acc: 0.9247
      Epoch 1/4, Train Loss: 0.4153, Test Loss: 0.2715, Test Acc: 0.9222
      Epoch 2/4, Train Loss: 0.3555, Test Loss: 0.3190, Test Acc: 0.9221
      Epoch 3/4, Train Loss: 0.3448, Test Loss: 0.2754, Test Acc: 0.9223

        9%|▊         | 14/162 [12:43<2:18:37, 56.20s/it]

      Epoch 4/4, Train Loss: 0.3255, Test Loss: 0.2829, Test Acc: 0.9271
      Epoch 1/3, Train Loss: 0.3521, Test Loss: 0.2288, Test Acc: 0.9338
      Epoch 2/3, Train Loss: 0.2696, Test Loss: 0.1959, Test Acc: 0.9400

        9%|▉         | 15/162 [13:28<2:09:25, 52.83s/it]

      Epoch 3/3, Train Loss: 0.2484, Test Loss: 0.2091, Test Acc: 0.9464
      Epoch 1/4, Train Loss: 0.3450, Test Loss: 0.2042, Test Acc: 0.9355
      Epoch 2/4, Train Loss: 0.2681, Test Loss: 0.1937, Test Acc: 0.9446
      Epoch 3/4, Train Loss: 0.2507, Test Loss: 0.2032, Test Acc: 0.9463

       10%|▉         | 16/162 [14:26<2:12:42, 54.54s/it]

      Epoch 4/4, Train Loss: 0.2545, Test Loss: 0.2186, Test Acc: 0.9471
      Epoch 1/3, Train Loss: 0.3019, Test Loss: 0.1902, Test Acc: 0.9404
      Epoch 2/3, Train Loss: 0.2227, Test Loss: 0.1692, Test Acc: 0.9527

       10%|█         | 17/162 [15:08<2:02:08, 50.54s/it]

      Epoch 3/3, Train Loss: 0.1990, Test Loss: 0.1658, Test Acc: 0.9534
      Epoch 1/4, Train Loss: 0.3231, Test Loss: 0.1820, Test Acc: 0.9419
      Epoch 2/4, Train Loss: 0.2259, Test Loss: 0.1724, Test Acc: 0.9470
      Epoch 3/4, Train Loss: 0.1970, Test Loss: 0.1590, Test Acc: 0.9536

       11%|█         | 18/162 [16:03<2:04:35, 51.92s/it]

      Epoch 4/4, Train Loss: 0.1918, Test Loss: 0.1667, Test Acc: 0.9512
      Epoch 1/3, Train Loss: 0.6396, Test Loss: 0.3081, Test Acc: 0.9143
      Epoch 2/3, Train Loss: 0.3265, Test Loss: 0.2412, Test Acc: 0.9289

       12%|█▏        | 19/162 [16:52<2:01:55, 51.16s/it]

      Epoch 3/3, Train Loss: 0.2662, Test Loss: 0.2028, Test Acc: 0.9408
      Epoch 1/4, Train Loss: 0.6247, Test Loss: 0.3038, Test Acc: 0.9144
      Epoch 2/4, Train Loss: 0.3272, Test Loss: 0.2471, Test Acc: 0.9283
      Epoch 3/4, Train Loss: 0.2746, Test Loss: 0.2123, Test Acc: 0.9393

       12%|█▏        | 20/162 [18:04<2:15:48, 57.39s/it]

      Epoch 4/4, Train Loss: 0.2386, Test Loss: 0.1853, Test Acc: 0.9459
      Epoch 1/3, Train Loss: 0.7532, Test Loss: 0.3544, Test Acc: 0.9049
      Epoch 2/3, Train Loss: 0.3779, Test Loss: 0.2793, Test Acc: 0.9191

       13%|█▎        | 21/162 [18:48<2:05:14, 53.29s/it]

      Epoch 3/3, Train Loss: 0.3165, Test Loss: 0.2450, Test Acc: 0.9287
      Epoch 1/4, Train Loss: 0.7716, Test Loss: 0.3657, Test Acc: 0.9023
      Epoch 2/4, Train Loss: 0.3889, Test Loss: 0.2874, Test Acc: 0.9191
      Epoch 3/4, Train Loss: 0.3247, Test Loss: 0.2523, Test Acc: 0.9271

       14%|█▎        | 22/162 [19:47<2:08:31, 55.08s/it]

      Epoch 4/4, Train Loss: 0.2885, Test Loss: 0.2237, Test Acc: 0.9344
      Epoch 1/3, Train Loss: 0.9719, Test Loss: 0.4540, Test Acc: 0.8900
      Epoch 2/3, Train Loss: 0.4610, Test Loss: 0.3350, Test Acc: 0.9071

       14%|█▍        | 23/162 [20:30<1:59:08, 51.43s/it]

      Epoch 3/3, Train Loss: 0.3741, Test Loss: 0.2892, Test Acc: 0.9198
      Epoch 1/4, Train Loss: 0.9611, Test Loss: 0.4440, Test Acc: 0.8894
      Epoch 2/4, Train Loss: 0.4527, Test Loss: 0.3333, Test Acc: 0.9103
      Epoch 3/4, Train Loss: 0.3679, Test Loss: 0.2883, Test Acc: 0.9177

       15%|█▍        | 24/162 [21:25<2:00:42, 52.48s/it]

      Epoch 4/4, Train Loss: 0.3298, Test Loss: 0.2619, Test Acc: 0.9239
      Epoch 1/3, Train Loss: 0.3161, Test Loss: 0.1545, Test Acc: 0.9519
      Epoch 2/3, Train Loss: 0.1848, Test Loss: 0.1100, Test Acc: 0.9662

       15%|█▌        | 25/162 [22:14<1:57:15, 51.35s/it]

      Epoch 3/3, Train Loss: 0.1526, Test Loss: 0.1103, Test Acc: 0.9680
      Epoch 1/4, Train Loss: 0.3217, Test Loss: 0.1681, Test Acc: 0.9481
      Epoch 2/4, Train Loss: 0.1847, Test Loss: 0.1234, Test Acc: 0.9620
      Epoch 3/4, Train Loss: 0.1575, Test Loss: 0.1098, Test Acc: 0.9684

       16%|█▌        | 26/162 [23:20<2:06:23, 55.76s/it]

      Epoch 4/4, Train Loss: 0.1363, Test Loss: 0.1094, Test Acc: 0.9668
      Epoch 1/3, Train Loss: 0.3470, Test Loss: 0.1620, Test Acc: 0.9526
      Epoch 2/3, Train Loss: 0.1888, Test Loss: 0.1408, Test Acc: 0.9578

       17%|█▋        | 27/162 [24:03<1:57:24, 52.18s/it]

      Epoch 3/3, Train Loss: 0.1564, Test Loss: 0.1090, Test Acc: 0.9661
      Epoch 1/4, Train Loss: 0.3567, Test Loss: 0.1656, Test Acc: 0.9515
      Epoch 2/4, Train Loss: 0.1945, Test Loss: 0.1309, Test Acc: 0.9615
      Epoch 3/4, Train Loss: 0.1618, Test Loss: 0.1118, Test Acc: 0.9674

       17%|█▋        | 28/162 [25:03<2:01:21, 54.34s/it]

      Epoch 4/4, Train Loss: 0.1420, Test Loss: 0.1018, Test Acc: 0.9680
      Epoch 1/3, Train Loss: 0.4196, Test Loss: 0.2005, Test Acc: 0.9423
      Epoch 2/3, Train Loss: 0.2153, Test Loss: 0.1421, Test Acc: 0.9566

       18%|█▊        | 29/162 [25:44<1:51:31, 50.31s/it]

      Epoch 3/3, Train Loss: 0.1715, Test Loss: 0.1204, Test Acc: 0.9641
      Epoch 1/4, Train Loss: 0.4072, Test Loss: 0.1987, Test Acc: 0.9394
      Epoch 2/4, Train Loss: 0.2190, Test Loss: 0.1456, Test Acc: 0.9553
      Epoch 3/4, Train Loss: 0.1775, Test Loss: 0.1299, Test Acc: 0.9615

       19%|█▊        | 30/162 [26:39<1:54:18, 51.96s/it]

      Epoch 4/4, Train Loss: 0.1534, Test Loss: 0.1106, Test Acc: 0.9660
      Epoch 1/3, Train Loss: 0.4976, Test Loss: 0.2960, Test Acc: 0.9167
      Epoch 2/3, Train Loss: 0.4351, Test Loss: 0.2630, Test Acc: 0.9291

       19%|█▉        | 31/162 [27:29<1:52:06, 51.35s/it]

      Epoch 3/3, Train Loss: 0.4227, Test Loss: 0.2865, Test Acc: 0.9340
      Epoch 1/4, Train Loss: 0.5254, Test Loss: 0.2766, Test Acc: 0.9266
      Epoch 2/4, Train Loss: 0.4481, Test Loss: 0.3079, Test Acc: 0.9101
      Epoch 3/4, Train Loss: 0.4351, Test Loss: 0.3033, Test Acc: 0.9299

       20%|█▉        | 32/162 [28:37<2:01:51, 56.24s/it]

      Epoch 4/4, Train Loss: 0.4281, Test Loss: 0.3217, Test Acc: 0.9202
      Epoch 1/3, Train Loss: 0.4049, Test Loss: 0.2520, Test Acc: 0.9243
      Epoch 2/3, Train Loss: 0.3293, Test Loss: 0.2500, Test Acc: 0.9362

       20%|██        | 33/162 [29:22<1:53:34, 52.82s/it]

      Epoch 3/3, Train Loss: 0.3177, Test Loss: 0.2035, Test Acc: 0.9434
      Epoch 1/4, Train Loss: 0.3994, Test Loss: 0.2166, Test Acc: 0.9353
      Epoch 2/4, Train Loss: 0.3228, Test Loss: 0.2141, Test Acc: 0.9435
      Epoch 3/4, Train Loss: 0.3106, Test Loss: 0.2218, Test Acc: 0.9478

       21%|██        | 34/162 [30:21<1:56:52, 54.78s/it]

      Epoch 4/4, Train Loss: 0.3062, Test Loss: 0.2235, Test Acc: 0.9459
      Epoch 1/3, Train Loss: 0.3960, Test Loss: 0.1999, Test Acc: 0.9390
      Epoch 2/3, Train Loss: 0.2886, Test Loss: 0.1721, Test Acc: 0.9451

       22%|██▏       | 35/162 [31:02<1:47:15, 50.68s/it]

      Epoch 3/3, Train Loss: 0.2665, Test Loss: 0.1800, Test Acc: 0.9462
      Epoch 1/4, Train Loss: 0.3709, Test Loss: 0.1954, Test Acc: 0.9409
      Epoch 2/4, Train Loss: 0.2729, Test Loss: 0.1794, Test Acc: 0.9478
      Epoch 3/4, Train Loss: 0.2460, Test Loss: 0.1688, Test Acc: 0.9513

       22%|██▏       | 36/162 [31:57<1:48:36, 51.72s/it]

      Epoch 4/4, Train Loss: 0.2316, Test Loss: 0.1585, Test Acc: 0.9575
      Epoch 1/3, Train Loss: 0.7015, Test Loss: 0.3212, Test Acc: 0.9107
      Epoch 2/3, Train Loss: 0.3662, Test Loss: 0.2472, Test Acc: 0.9283

       23%|██▎       | 37/162 [32:45<1:45:36, 50.69s/it]

      Epoch 3/3, Train Loss: 0.3030, Test Loss: 0.2108, Test Acc: 0.9383
      Epoch 1/4, Train Loss: 0.6741, Test Loss: 0.3154, Test Acc: 0.9139
      Epoch 2/4, Train Loss: 0.3569, Test Loss: 0.2526, Test Acc: 0.9255
      Epoch 3/4, Train Loss: 0.2989, Test Loss: 0.2161, Test Acc: 0.9372

       23%|██▎       | 38/162 [33:50<1:53:53, 55.11s/it]

      Epoch 4/4, Train Loss: 0.2667, Test Loss: 0.1906, Test Acc: 0.9433
      Epoch 1/3, Train Loss: 0.8469, Test Loss: 0.3810, Test Acc: 0.9009
      Epoch 2/3, Train Loss: 0.4231, Test Loss: 0.2926, Test Acc: 0.9184

       24%|██▍       | 39/162 [34:33<1:45:33, 51.49s/it]

      Epoch 3/3, Train Loss: 0.3513, Test Loss: 0.2549, Test Acc: 0.9248
      Epoch 1/4, Train Loss: 0.8156, Test Loss: 0.3727, Test Acc: 0.9018
      Epoch 2/4, Train Loss: 0.4143, Test Loss: 0.2859, Test Acc: 0.9198
      Epoch 3/4, Train Loss: 0.3424, Test Loss: 0.2444, Test Acc: 0.9285

       25%|██▍       | 40/162 [35:33<1:49:33, 53.88s/it]

      Epoch 4/4, Train Loss: 0.2995, Test Loss: 0.2163, Test Acc: 0.9355
      Epoch 1/3, Train Loss: 1.0153, Test Loss: 0.4701, Test Acc: 0.8883
      Epoch 2/3, Train Loss: 0.4923, Test Loss: 0.3425, Test Acc: 0.9090

       25%|██▌       | 41/162 [36:14<1:41:06, 50.14s/it]

      Epoch 3/3, Train Loss: 0.4024, Test Loss: 0.2943, Test Acc: 0.9170
      Epoch 1/4, Train Loss: 1.0110, Test Loss: 0.4643, Test Acc: 0.8834
      Epoch 2/4, Train Loss: 0.4937, Test Loss: 0.3427, Test Acc: 0.9051
      Epoch 3/4, Train Loss: 0.4056, Test Loss: 0.2956, Test Acc: 0.9136

       26%|██▌       | 42/162 [37:09<1:43:04, 51.53s/it]

      Epoch 4/4, Train Loss: 0.3609, Test Loss: 0.2672, Test Acc: 0.9199
      Epoch 1/3, Train Loss: 0.3628, Test Loss: 0.1674, Test Acc: 0.9506
      Epoch 2/3, Train Loss: 0.2215, Test Loss: 0.1293, Test Acc: 0.9615

       27%|██▋       | 43/162 [37:58<1:40:32, 50.70s/it]

      Epoch 3/3, Train Loss: 0.1922, Test Loss: 0.1126, Test Acc: 0.9665
      Epoch 1/4, Train Loss: 0.3607, Test Loss: 0.1645, Test Acc: 0.9479
      Epoch 2/4, Train Loss: 0.2214, Test Loss: 0.1340, Test Acc: 0.9586
      Epoch 3/4, Train Loss: 0.1890, Test Loss: 0.1221, Test Acc: 0.9617

       27%|██▋       | 44/162 [39:02<1:48:01, 54.93s/it]

      Epoch 4/4, Train Loss: 0.1746, Test Loss: 0.1043, Test Acc: 0.9698
      Epoch 1/3, Train Loss: 0.3857, Test Loss: 0.1728, Test Acc: 0.9478
      Epoch 2/3, Train Loss: 0.2189, Test Loss: 0.1341, Test Acc: 0.9599

       28%|██▊       | 45/162 [39:47<1:40:49, 51.70s/it]

      Epoch 3/3, Train Loss: 0.1838, Test Loss: 0.1115, Test Acc: 0.9678
      Epoch 1/4, Train Loss: 0.3920, Test Loss: 0.1730, Test Acc: 0.9477
      Epoch 2/4, Train Loss: 0.2262, Test Loss: 0.1375, Test Acc: 0.9575
      Epoch 3/4, Train Loss: 0.1893, Test Loss: 0.1157, Test Acc: 0.9638

       28%|██▊       | 46/162 [40:46<1:44:34, 54.09s/it]

      Epoch 4/4, Train Loss: 0.1720, Test Loss: 0.1065, Test Acc: 0.9681
      Epoch 1/3, Train Loss: 0.4620, Test Loss: 0.2165, Test Acc: 0.9377
      Epoch 2/3, Train Loss: 0.2580, Test Loss: 0.1629, Test Acc: 0.9509

       29%|██▉       | 47/162 [41:28<1:36:28, 50.33s/it]

      Epoch 3/3, Train Loss: 0.2163, Test Loss: 0.1338, Test Acc: 0.9606
      Epoch 1/4, Train Loss: 0.4313, Test Loss: 0.1944, Test Acc: 0.9397
      Epoch 2/4, Train Loss: 0.2358, Test Loss: 0.1506, Test Acc: 0.9555
      Epoch 3/4, Train Loss: 0.1977, Test Loss: 0.1228, Test Acc: 0.9629

       30%|██▉       | 48/162 [42:24<1:38:53, 52.05s/it]

      Epoch 4/4, Train Loss: 0.1748, Test Loss: 0.1124, Test Acc: 0.9649
      Epoch 1/3, Train Loss: 0.5918, Test Loss: 0.3499, Test Acc: 0.8966
      Epoch 2/3, Train Loss: 0.5218, Test Loss: 0.2775, Test Acc: 0.9255

       30%|███       | 49/162 [43:13<1:36:33, 51.27s/it]

      Epoch 3/3, Train Loss: 0.5136, Test Loss: 0.3318, Test Acc: 0.9157
      Epoch 1/4, Train Loss: 0.5810, Test Loss: 0.3275, Test Acc: 0.9085
      Epoch 2/4, Train Loss: 0.5209, Test Loss: 0.3218, Test Acc: 0.9118
      Epoch 3/4, Train Loss: 0.4998, Test Loss: 0.3294, Test Acc: 0.9265

       31%|███       | 50/162 [44:21<1:44:37, 56.05s/it]

      Epoch 4/4, Train Loss: 0.4917, Test Loss: 0.3500, Test Acc: 0.9256
      Epoch 1/3, Train Loss: 0.5128, Test Loss: 0.2519, Test Acc: 0.9274
      Epoch 2/3, Train Loss: 0.4110, Test Loss: 0.2161, Test Acc: 0.9341

       31%|███▏      | 51/162 [45:06<1:37:37, 52.77s/it]

      Epoch 3/3, Train Loss: 0.4056, Test Loss: 0.2728, Test Acc: 0.9239
      Epoch 1/4, Train Loss: 0.5101, Test Loss: 0.2259, Test Acc: 0.9313
      Epoch 2/4, Train Loss: 0.4211, Test Loss: 0.2277, Test Acc: 0.9385
      Epoch 3/4, Train Loss: 0.4023, Test Loss: 0.2482, Test Acc: 0.9354

       32%|███▏      | 52/162 [46:04<1:39:41, 54.38s/it]

      Epoch 4/4, Train Loss: 0.3907, Test Loss: 0.2552, Test Acc: 0.9342
      Epoch 1/3, Train Loss: 0.4272, Test Loss: 0.2314, Test Acc: 0.9308
      Epoch 2/3, Train Loss: 0.3309, Test Loss: 0.1819, Test Acc: 0.9459

       33%|███▎      | 53/162 [46:44<1:31:19, 50.27s/it]

      Epoch 3/3, Train Loss: 0.3161, Test Loss: 0.1973, Test Acc: 0.9462
      Epoch 1/4, Train Loss: 0.4421, Test Loss: 0.1974, Test Acc: 0.9428
      Epoch 2/4, Train Loss: 0.3286, Test Loss: 0.1729, Test Acc: 0.9503
      Epoch 3/4, Train Loss: 0.3086, Test Loss: 0.1920, Test Acc: 0.9487

       33%|███▎      | 54/162 [47:40<1:33:17, 51.83s/it]

      Epoch 4/4, Train Loss: 0.3056, Test Loss: 0.1892, Test Acc: 0.9486
      Epoch 1/3, Train Loss: 0.5015, Test Loss: 0.2675, Test Acc: 0.9240
      Epoch 2/3, Train Loss: 0.2583, Test Loss: 0.2073, Test Acc: 0.9414

       34%|███▍      | 55/162 [48:29<1:30:42, 50.87s/it]

      Epoch 3/3, Train Loss: 0.2049, Test Loss: 0.1689, Test Acc: 0.9516
      Epoch 1/4, Train Loss: 0.4990, Test Loss: 0.2657, Test Acc: 0.9264
      Epoch 2/4, Train Loss: 0.2523, Test Loss: 0.2027, Test Acc: 0.9409
      Epoch 3/4, Train Loss: 0.2009, Test Loss: 0.1689, Test Acc: 0.9508

       35%|███▍      | 56/162 [49:33<1:37:14, 55.04s/it]

      Epoch 4/4, Train Loss: 0.1679, Test Loss: 0.1439, Test Acc: 0.9559
      Epoch 1/3, Train Loss: 0.6123, Test Loss: 0.3129, Test Acc: 0.9125
      Epoch 2/3, Train Loss: 0.3021, Test Loss: 0.2473, Test Acc: 0.9271

       35%|███▌      | 57/162 [50:18<1:31:05, 52.05s/it]

      Epoch 3/3, Train Loss: 0.2469, Test Loss: 0.2083, Test Acc: 0.9390
      Epoch 1/4, Train Loss: 0.6065, Test Loss: 0.3106, Test Acc: 0.9132
      Epoch 2/4, Train Loss: 0.2999, Test Loss: 0.2423, Test Acc: 0.9317
      Epoch 3/4, Train Loss: 0.2440, Test Loss: 0.2052, Test Acc: 0.9396

       36%|███▌      | 58/162 [51:17<1:33:42, 54.06s/it]

      Epoch 4/4, Train Loss: 0.2088, Test Loss: 0.1790, Test Acc: 0.9482
      Epoch 1/3, Train Loss: 0.7518, Test Loss: 0.3631, Test Acc: 0.9024
      Epoch 2/3, Train Loss: 0.3477, Test Loss: 0.2802, Test Acc: 0.9199

       36%|███▋      | 59/162 [51:58<1:26:00, 50.10s/it]

      Epoch 3/3, Train Loss: 0.2852, Test Loss: 0.2429, Test Acc: 0.9306
      Epoch 1/4, Train Loss: 0.7638, Test Loss: 0.3598, Test Acc: 0.9034
      Epoch 2/4, Train Loss: 0.3417, Test Loss: 0.2766, Test Acc: 0.9225
      Epoch 3/4, Train Loss: 0.2808, Test Loss: 0.2375, Test Acc: 0.9304

       37%|███▋      | 60/162 [52:53<1:27:48, 51.65s/it]

      Epoch 4/4, Train Loss: 0.2438, Test Loss: 0.2104, Test Acc: 0.9415
      Epoch 1/3, Train Loss: 0.2415, Test Loss: 0.1268, Test Acc: 0.9618
      Epoch 2/3, Train Loss: 0.1216, Test Loss: 0.1001, Test Acc: 0.9680

       38%|███▊      | 61/162 [53:43<1:26:04, 51.14s/it]

      Epoch 3/3, Train Loss: 0.0918, Test Loss: 0.0908, Test Acc: 0.9726
      Epoch 1/4, Train Loss: 0.2466, Test Loss: 0.1148, Test Acc: 0.9631
      Epoch 2/4, Train Loss: 0.1188, Test Loss: 0.0866, Test Acc: 0.9733
      Epoch 3/4, Train Loss: 0.0919, Test Loss: 0.0860, Test Acc: 0.9749

       38%|███▊      | 62/162 [54:50<1:33:06, 55.87s/it]

      Epoch 4/4, Train Loss: 0.0738, Test Loss: 0.0855, Test Acc: 0.9744
      Epoch 1/3, Train Loss: 0.2740, Test Loss: 0.1335, Test Acc: 0.9585
      Epoch 2/3, Train Loss: 0.1301, Test Loss: 0.1027, Test Acc: 0.9684

       39%|███▉      | 63/162 [55:35<1:26:37, 52.50s/it]

      Epoch 3/3, Train Loss: 0.0944, Test Loss: 0.0879, Test Acc: 0.9736
      Epoch 1/4, Train Loss: 0.2754, Test Loss: 0.1365, Test Acc: 0.9582
      Epoch 2/4, Train Loss: 0.1276, Test Loss: 0.1011, Test Acc: 0.9695
      Epoch 3/4, Train Loss: 0.0950, Test Loss: 0.0942, Test Acc: 0.9718

       40%|███▉      | 64/162 [56:33<1:28:45, 54.34s/it]

      Epoch 4/4, Train Loss: 0.0769, Test Loss: 0.0804, Test Acc: 0.9746
      Epoch 1/3, Train Loss: 0.3151, Test Loss: 0.1584, Test Acc: 0.9539
      Epoch 2/3, Train Loss: 0.1446, Test Loss: 0.1144, Test Acc: 0.9644

       40%|████      | 65/162 [57:15<1:21:44, 50.56s/it]

      Epoch 3/3, Train Loss: 0.1072, Test Loss: 0.0937, Test Acc: 0.9723
      Epoch 1/4, Train Loss: 0.3245, Test Loss: 0.1614, Test Acc: 0.9516
      Epoch 2/4, Train Loss: 0.1469, Test Loss: 0.1152, Test Acc: 0.9646
      Epoch 3/4, Train Loss: 0.1087, Test Loss: 0.0942, Test Acc: 0.9701

       41%|████      | 66/162 [58:11<1:23:37, 52.27s/it]

      Epoch 4/4, Train Loss: 0.0870, Test Loss: 0.0850, Test Acc: 0.9731
      Epoch 1/3, Train Loss: 0.4094, Test Loss: 0.2750, Test Acc: 0.9268
      Epoch 2/3, Train Loss: 0.3460, Test Loss: 0.2915, Test Acc: 0.9246

       41%|████▏     | 67/162 [59:02<1:21:45, 51.64s/it]

      Epoch 3/3, Train Loss: 0.3331, Test Loss: 0.2567, Test Acc: 0.9394
      Epoch 1/4, Train Loss: 0.4113, Test Loss: 0.2559, Test Acc: 0.9297
      Epoch 2/4, Train Loss: 0.3525, Test Loss: 0.2624, Test Acc: 0.9337
      Epoch 3/4, Train Loss: 0.3418, Test Loss: 0.3111, Test Acc: 0.9353

       42%|████▏     | 68/162 [1:00:09<1:28:20, 56.39s/it]

      Epoch 4/4, Train Loss: 0.3338, Test Loss: 0.2546, Test Acc: 0.9374
      Epoch 1/3, Train Loss: 0.3451, Test Loss: 0.2307, Test Acc: 0.9352
      Epoch 2/3, Train Loss: 0.2747, Test Loss: 0.2288, Test Acc: 0.9403

       43%|████▎     | 69/162 [1:00:54<1:21:52, 52.83s/it]

      Epoch 3/3, Train Loss: 0.2504, Test Loss: 0.2400, Test Acc: 0.9416
      Epoch 1/4, Train Loss: 0.3307, Test Loss: 0.2159, Test Acc: 0.9427
      Epoch 2/4, Train Loss: 0.2729, Test Loss: 0.2078, Test Acc: 0.9473
      Epoch 3/4, Train Loss: 0.2532, Test Loss: 0.2071, Test Acc: 0.9481

       43%|████▎     | 70/162 [1:01:54<1:24:21, 55.01s/it]

      Epoch 4/4, Train Loss: 0.2352, Test Loss: 0.1996, Test Acc: 0.9529
      Epoch 1/3, Train Loss: 0.2873, Test Loss: 0.1476, Test Acc: 0.9543
      Epoch 2/3, Train Loss: 0.1929, Test Loss: 0.1592, Test Acc: 0.9538

       44%|████▍     | 71/162 [1:02:35<1:17:04, 50.82s/it]

      Epoch 3/3, Train Loss: 0.1784, Test Loss: 0.1761, Test Acc: 0.9524
      Epoch 1/4, Train Loss: 0.2938, Test Loss: 0.1676, Test Acc: 0.9471
      Epoch 2/4, Train Loss: 0.1982, Test Loss: 0.1614, Test Acc: 0.9548
      Epoch 3/4, Train Loss: 0.1786, Test Loss: 0.1722, Test Acc: 0.9522

       44%|████▍     | 72/162 [1:03:30<1:18:02, 52.03s/it]

      Epoch 4/4, Train Loss: 0.1764, Test Loss: 0.1684, Test Acc: 0.9582
      Epoch 1/3, Train Loss: 0.5281, Test Loss: 0.2797, Test Acc: 0.9221
      Epoch 2/3, Train Loss: 0.2799, Test Loss: 0.2157, Test Acc: 0.9371

       45%|████▌     | 73/162 [1:04:19<1:16:10, 51.36s/it]

      Epoch 3/3, Train Loss: 0.2247, Test Loss: 0.1785, Test Acc: 0.9477
      Epoch 1/4, Train Loss: 0.5312, Test Loss: 0.2729, Test Acc: 0.9211
      Epoch 2/4, Train Loss: 0.2737, Test Loss: 0.2107, Test Acc: 0.9394
      Epoch 3/4, Train Loss: 0.2195, Test Loss: 0.1744, Test Acc: 0.9501

       46%|████▌     | 74/162 [1:05:26<1:22:15, 56.08s/it]

      Epoch 4/4, Train Loss: 0.1828, Test Loss: 0.1495, Test Acc: 0.9563
      Epoch 1/3, Train Loss: 0.6397, Test Loss: 0.3154, Test Acc: 0.9117
      Epoch 2/3, Train Loss: 0.3172, Test Loss: 0.2444, Test Acc: 0.9285

       46%|████▋     | 75/162 [1:06:09<1:15:37, 52.15s/it]

      Epoch 3/3, Train Loss: 0.2562, Test Loss: 0.2054, Test Acc: 0.9403
      Epoch 1/4, Train Loss: 0.6290, Test Loss: 0.3118, Test Acc: 0.9135
      Epoch 2/4, Train Loss: 0.3114, Test Loss: 0.2459, Test Acc: 0.9285
      Epoch 3/4, Train Loss: 0.2548, Test Loss: 0.2041, Test Acc: 0.9390

       47%|████▋     | 76/162 [1:07:07<1:17:12, 53.87s/it]

      Epoch 4/4, Train Loss: 0.2178, Test Loss: 0.1783, Test Acc: 0.9466
      Epoch 1/3, Train Loss: 0.8063, Test Loss: 0.3728, Test Acc: 0.9039
      Epoch 2/3, Train Loss: 0.3690, Test Loss: 0.2852, Test Acc: 0.9211

       48%|████▊     | 77/162 [1:07:50<1:11:21, 50.37s/it]

      Epoch 3/3, Train Loss: 0.3027, Test Loss: 0.2473, Test Acc: 0.9298
      Epoch 1/4, Train Loss: 0.7917, Test Loss: 0.3705, Test Acc: 0.9035
      Epoch 2/4, Train Loss: 0.3702, Test Loss: 0.2843, Test Acc: 0.9193
      Epoch 3/4, Train Loss: 0.3051, Test Loss: 0.2463, Test Acc: 0.9289

       48%|████▊     | 78/162 [1:08:45<1:12:37, 51.87s/it]

      Epoch 4/4, Train Loss: 0.2650, Test Loss: 0.2176, Test Acc: 0.9368
      Epoch 1/3, Train Loss: 0.2661, Test Loss: 0.1220, Test Acc: 0.9621
      Epoch 2/3, Train Loss: 0.1381, Test Loss: 0.0898, Test Acc: 0.9714

       49%|████▉     | 79/162 [1:09:35<1:11:00, 51.33s/it]

      Epoch 3/3, Train Loss: 0.1106, Test Loss: 0.0923, Test Acc: 0.9716
      Epoch 1/4, Train Loss: 0.2688, Test Loss: 0.1344, Test Acc: 0.9565
      Epoch 2/4, Train Loss: 0.1421, Test Loss: 0.0996, Test Acc: 0.9700
      Epoch 3/4, Train Loss: 0.1120, Test Loss: 0.0903, Test Acc: 0.9735

       49%|████▉     | 80/162 [1:10:42<1:16:23, 55.90s/it]

      Epoch 4/4, Train Loss: 0.0976, Test Loss: 0.0852, Test Acc: 0.9733
      Epoch 1/3, Train Loss: 0.2897, Test Loss: 0.1355, Test Acc: 0.9587
      Epoch 2/3, Train Loss: 0.1415, Test Loss: 0.0962, Test Acc: 0.9709

       50%|█████     | 81/162 [1:11:26<1:10:42, 52.37s/it]

      Epoch 3/3, Train Loss: 0.1089, Test Loss: 0.0875, Test Acc: 0.9721
      Epoch 1/4, Train Loss: 0.2866, Test Loss: 0.1448, Test Acc: 0.9577
      Epoch 2/4, Train Loss: 0.1421, Test Loss: 0.0939, Test Acc: 0.9715
      Epoch 3/4, Train Loss: 0.1076, Test Loss: 0.0888, Test Acc: 0.9711

       51%|█████     | 82/162 [1:12:25<1:12:37, 54.47s/it]

      Epoch 4/4, Train Loss: 0.0913, Test Loss: 0.0748, Test Acc: 0.9766
      Epoch 1/3, Train Loss: 0.3325, Test Loss: 0.1563, Test Acc: 0.9532
      Epoch 2/3, Train Loss: 0.1570, Test Loss: 0.1094, Test Acc: 0.9663

       51%|█████     | 83/162 [1:13:07<1:06:48, 50.74s/it]

      Epoch 3/3, Train Loss: 0.1197, Test Loss: 0.0930, Test Acc: 0.9704
      Epoch 1/4, Train Loss: 0.3368, Test Loss: 0.1609, Test Acc: 0.9512
      Epoch 2/4, Train Loss: 0.1655, Test Loss: 0.1158, Test Acc: 0.9641
      Epoch 3/4, Train Loss: 0.1262, Test Loss: 0.0895, Test Acc: 0.9730

       52%|█████▏    | 84/162 [1:14:02<1:07:24, 51.85s/it]

      Epoch 4/4, Train Loss: 0.0998, Test Loss: 0.0911, Test Acc: 0.9724
      Epoch 1/3, Train Loss: 0.4705, Test Loss: 0.3239, Test Acc: 0.9062
      Epoch 2/3, Train Loss: 0.4217, Test Loss: 0.2913, Test Acc: 0.9243

       52%|█████▏    | 85/162 [1:14:52<1:05:50, 51.31s/it]

      Epoch 3/3, Train Loss: 0.4001, Test Loss: 0.2696, Test Acc: 0.9370
      Epoch 1/4, Train Loss: 0.4855, Test Loss: 0.3278, Test Acc: 0.9091
      Epoch 2/4, Train Loss: 0.4353, Test Loss: 0.3714, Test Acc: 0.9170
      Epoch 3/4, Train Loss: 0.4110, Test Loss: 0.2916, Test Acc: 0.9296

       53%|█████▎    | 86/162 [1:15:58<1:10:32, 55.69s/it]

      Epoch 4/4, Train Loss: 0.4102, Test Loss: 0.3023, Test Acc: 0.9236
      Epoch 1/3, Train Loss: 0.3788, Test Loss: 0.2086, Test Acc: 0.9369
      Epoch 2/3, Train Loss: 0.3225, Test Loss: 0.2400, Test Acc: 0.9401

       54%|█████▎    | 87/162 [1:16:42<1:05:28, 52.38s/it]

      Epoch 3/3, Train Loss: 0.3112, Test Loss: 0.2452, Test Acc: 0.9375
      Epoch 1/4, Train Loss: 0.3860, Test Loss: 0.2301, Test Acc: 0.9389
      Epoch 2/4, Train Loss: 0.3121, Test Loss: 0.2069, Test Acc: 0.9478
      Epoch 3/4, Train Loss: 0.2984, Test Loss: 0.2667, Test Acc: 0.9339

       54%|█████▍    | 88/162 [1:17:41<1:07:08, 54.44s/it]

      Epoch 4/4, Train Loss: 0.3029, Test Loss: 0.2117, Test Acc: 0.9503
      Epoch 1/3, Train Loss: 0.3258, Test Loss: 0.1739, Test Acc: 0.9501
      Epoch 2/3, Train Loss: 0.2396, Test Loss: 0.1717, Test Acc: 0.9529

       55%|█████▍    | 89/162 [1:18:23<1:01:40, 50.70s/it]

      Epoch 3/3, Train Loss: 0.2263, Test Loss: 0.1719, Test Acc: 0.9554
      Epoch 1/4, Train Loss: 0.3289, Test Loss: 0.1664, Test Acc: 0.9505
      Epoch 2/4, Train Loss: 0.2378, Test Loss: 0.1574, Test Acc: 0.9549
      Epoch 3/4, Train Loss: 0.2302, Test Loss: 0.1631, Test Acc: 0.9565

       56%|█████▌    | 90/162 [1:19:18<1:02:21, 51.97s/it]

      Epoch 4/4, Train Loss: 0.2145, Test Loss: 0.1876, Test Acc: 0.9550
      Epoch 1/3, Train Loss: 0.5579, Test Loss: 0.2831, Test Acc: 0.9179
      Epoch 2/3, Train Loss: 0.2951, Test Loss: 0.2194, Test Acc: 0.9366

       56%|█████▌    | 91/162 [1:20:08<1:00:31, 51.15s/it]

      Epoch 3/3, Train Loss: 0.2378, Test Loss: 0.1823, Test Acc: 0.9477
      Epoch 1/4, Train Loss: 0.5728, Test Loss: 0.2801, Test Acc: 0.9210
      Epoch 2/4, Train Loss: 0.2945, Test Loss: 0.2141, Test Acc: 0.9392
      Epoch 3/4, Train Loss: 0.2361, Test Loss: 0.1761, Test Acc: 0.9501

       57%|█████▋    | 92/162 [1:21:13<1:04:46, 55.51s/it]

      Epoch 4/4, Train Loss: 0.2000, Test Loss: 0.1497, Test Acc: 0.9564
      Epoch 1/3, Train Loss: 0.6708, Test Loss: 0.3216, Test Acc: 0.9104
      Epoch 2/3, Train Loss: 0.3371, Test Loss: 0.2528, Test Acc: 0.9267

       57%|█████▋    | 93/162 [1:21:56<59:19, 51.58s/it]

      Epoch 3/3, Train Loss: 0.2768, Test Loss: 0.2134, Test Acc: 0.9377
      Epoch 1/4, Train Loss: 0.6698, Test Loss: 0.3212, Test Acc: 0.9102
      Epoch 2/4, Train Loss: 0.3348, Test Loss: 0.2458, Test Acc: 0.9301
      Epoch 3/4, Train Loss: 0.2768, Test Loss: 0.2093, Test Acc: 0.9395

       58%|█████▊    | 94/162 [1:22:54<1:00:54, 53.74s/it]

      Epoch 4/4, Train Loss: 0.2381, Test Loss: 0.1829, Test Acc: 0.9467
      Epoch 1/3, Train Loss: 0.8457, Test Loss: 0.3805, Test Acc: 0.9015
      Epoch 2/3, Train Loss: 0.3925, Test Loss: 0.2873, Test Acc: 0.9181

       59%|█████▊    | 95/162 [1:23:36<55:51, 50.03s/it]

      Epoch 3/3, Train Loss: 0.3206, Test Loss: 0.2443, Test Acc: 0.9296
      Epoch 1/4, Train Loss: 0.8402, Test Loss: 0.3827, Test Acc: 0.9035
      Epoch 2/4, Train Loss: 0.3946, Test Loss: 0.2899, Test Acc: 0.9184
      Epoch 3/4, Train Loss: 0.3220, Test Loss: 0.2479, Test Acc: 0.9291

       59%|█████▉    | 96/162 [1:24:31<56:48, 51.65s/it]

      Epoch 4/4, Train Loss: 0.2819, Test Loss: 0.2200, Test Acc: 0.9365
      Epoch 1/3, Train Loss: 0.2957, Test Loss: 0.1266, Test Acc: 0.9609
      Epoch 2/3, Train Loss: 0.1648, Test Loss: 0.1089, Test Acc: 0.9657

       60%|█████▉    | 97/162 [1:25:20<55:05, 50.85s/it]

      Epoch 3/3, Train Loss: 0.1336, Test Loss: 0.0994, Test Acc: 0.9709
      Epoch 1/4, Train Loss: 0.2948, Test Loss: 0.1275, Test Acc: 0.9600
      Epoch 2/4, Train Loss: 0.1607, Test Loss: 0.1003, Test Acc: 0.9699
      Epoch 3/4, Train Loss: 0.1321, Test Loss: 0.1006, Test Acc: 0.9697

       60%|██████    | 98/162 [1:26:26<58:53, 55.21s/it]

      Epoch 4/4, Train Loss: 0.1155, Test Loss: 0.0886, Test Acc: 0.9741
      Epoch 1/3, Train Loss: 0.3094, Test Loss: 0.1371, Test Acc: 0.9591
      Epoch 2/3, Train Loss: 0.1623, Test Loss: 0.1002, Test Acc: 0.9693

       61%|██████    | 99/162 [1:27:09<54:13, 51.65s/it]

      Epoch 3/3, Train Loss: 0.1285, Test Loss: 0.0873, Test Acc: 0.9724
      Epoch 1/4, Train Loss: 0.3159, Test Loss: 0.1450, Test Acc: 0.9566
      Epoch 2/4, Train Loss: 0.1648, Test Loss: 0.1090, Test Acc: 0.9675
      Epoch 3/4, Train Loss: 0.1310, Test Loss: 0.0926, Test Acc: 0.9714

       62%|██████▏   | 100/162 [1:28:08<55:37, 53.83s/it]

      Epoch 4/4, Train Loss: 0.1134, Test Loss: 0.0877, Test Acc: 0.9744
      Epoch 1/3, Train Loss: 0.3536, Test Loss: 0.1583, Test Acc: 0.9542
      Epoch 2/3, Train Loss: 0.1807, Test Loss: 0.1196, Test Acc: 0.9637

       62%|██████▏   | 101/162 [1:28:50<51:04, 50.24s/it]

      Epoch 3/3, Train Loss: 0.1417, Test Loss: 0.0965, Test Acc: 0.9699
      Epoch 1/4, Train Loss: 0.3569, Test Loss: 0.1776, Test Acc: 0.9475
      Epoch 2/4, Train Loss: 0.1842, Test Loss: 0.1162, Test Acc: 0.9638
      Epoch 3/4, Train Loss: 0.1413, Test Loss: 0.0974, Test Acc: 0.9699

       63%|██████▎   | 102/162 [1:29:44<51:35, 51.59s/it]

      Epoch 4/4, Train Loss: 0.1192, Test Loss: 0.0944, Test Acc: 0.9721
      Epoch 1/3, Train Loss: 0.5690, Test Loss: 0.3305, Test Acc: 0.9169
      Epoch 2/3, Train Loss: 0.5089, Test Loss: 0.3153, Test Acc: 0.9255

       64%|██████▎   | 103/162 [1:30:34<50:13, 51.07s/it]

      Epoch 3/3, Train Loss: 0.4948, Test Loss: 0.3220, Test Acc: 0.9283
      Epoch 1/4, Train Loss: 0.5594, Test Loss: 0.3253, Test Acc: 0.9167
      Epoch 2/4, Train Loss: 0.5134, Test Loss: 0.3439, Test Acc: 0.9083
      Epoch 3/4, Train Loss: 0.5046, Test Loss: 0.3083, Test Acc: 0.9210

       64%|██████▍   | 104/162 [1:31:40<53:35, 55.44s/it]

      Epoch 4/4, Train Loss: 0.4862, Test Loss: 0.3033, Test Acc: 0.9284
      Epoch 1/3, Train Loss: 0.4601, Test Loss: 0.2880, Test Acc: 0.9197
      Epoch 2/3, Train Loss: 0.3839, Test Loss: 0.2370, Test Acc: 0.9397

       65%|██████▍   | 105/162 [1:32:24<49:27, 52.06s/it]

      Epoch 3/3, Train Loss: 0.3712, Test Loss: 0.2177, Test Acc: 0.9465
      Epoch 1/4, Train Loss: 0.4468, Test Loss: 0.2606, Test Acc: 0.9282
      Epoch 2/4, Train Loss: 0.3729, Test Loss: 0.2421, Test Acc: 0.9383
      Epoch 3/4, Train Loss: 0.3727, Test Loss: 0.2293, Test Acc: 0.9414

       65%|██████▌   | 106/162 [1:33:23<50:37, 54.25s/it]

      Epoch 4/4, Train Loss: 0.3713, Test Loss: 0.2109, Test Acc: 0.9466
      Epoch 1/3, Train Loss: 0.3713, Test Loss: 0.1817, Test Acc: 0.9463
      Epoch 2/3, Train Loss: 0.2969, Test Loss: 0.1719, Test Acc: 0.9521

       66%|██████▌   | 107/162 [1:34:04<45:55, 50.10s/it]

      Epoch 3/3, Train Loss: 0.2781, Test Loss: 0.1958, Test Acc: 0.9513
      Epoch 1/4, Train Loss: 0.3726, Test Loss: 0.1741, Test Acc: 0.9505
      Epoch 2/4, Train Loss: 0.2884, Test Loss: 0.1869, Test Acc: 0.9447
      Epoch 3/4, Train Loss: 0.2863, Test Loss: 0.1638, Test Acc: 0.9520

       67%|██████▋   | 108/162 [1:34:58<46:17, 51.43s/it]

      Epoch 4/4, Train Loss: 0.2684, Test Loss: 0.1728, Test Acc: 0.9545
      Epoch 1/3, Train Loss: 0.4335, Test Loss: 0.2416, Test Acc: 0.9313
      Epoch 2/3, Train Loss: 0.2230, Test Loss: 0.1771, Test Acc: 0.9488

       67%|██████▋   | 109/162 [1:35:47<44:42, 50.62s/it]

      Epoch 3/3, Train Loss: 0.1677, Test Loss: 0.1410, Test Acc: 0.9581
      Epoch 1/4, Train Loss: 0.4303, Test Loss: 0.2432, Test Acc: 0.9296
      Epoch 2/4, Train Loss: 0.2212, Test Loss: 0.1738, Test Acc: 0.9491
      Epoch 3/4, Train Loss: 0.1658, Test Loss: 0.1377, Test Acc: 0.9588

       68%|██████▊   | 110/162 [1:36:52<47:41, 55.02s/it]

      Epoch 4/4, Train Loss: 0.1330, Test Loss: 0.1186, Test Acc: 0.9648
      Epoch 1/3, Train Loss: 0.5197, Test Loss: 0.2737, Test Acc: 0.9197
      Epoch 2/3, Train Loss: 0.2525, Test Loss: 0.2049, Test Acc: 0.9416

       69%|██████▊   | 111/162 [1:37:36<43:52, 51.62s/it]

      Epoch 3/3, Train Loss: 0.1970, Test Loss: 0.1670, Test Acc: 0.9514
      Epoch 1/4, Train Loss: 0.5195, Test Loss: 0.2744, Test Acc: 0.9240
      Epoch 2/4, Train Loss: 0.2558, Test Loss: 0.2094, Test Acc: 0.9403
      Epoch 3/4, Train Loss: 0.1998, Test Loss: 0.1695, Test Acc: 0.9489

       69%|██████▉   | 112/162 [1:38:35<44:53, 53.88s/it]

      Epoch 4/4, Train Loss: 0.1652, Test Loss: 0.1429, Test Acc: 0.9580
      Epoch 1/3, Train Loss: 0.6568, Test Loss: 0.3170, Test Acc: 0.9106
      Epoch 2/3, Train Loss: 0.3007, Test Loss: 0.2465, Test Acc: 0.9290

       70%|██████▉   | 113/162 [1:39:17<40:55, 50.10s/it]

      Epoch 3/3, Train Loss: 0.2431, Test Loss: 0.2081, Test Acc: 0.9406
      Epoch 1/4, Train Loss: 0.6550, Test Loss: 0.3214, Test Acc: 0.9099
      Epoch 2/4, Train Loss: 0.3028, Test Loss: 0.2484, Test Acc: 0.9275
      Epoch 3/4, Train Loss: 0.2410, Test Loss: 0.2054, Test Acc: 0.9393

       70%|███████   | 114/162 [1:40:11<41:11, 51.48s/it]

      Epoch 4/4, Train Loss: 0.2031, Test Loss: 0.1770, Test Acc: 0.9479
      Epoch 1/3, Train Loss: 0.2173, Test Loss: 0.1164, Test Acc: 0.9650
      Epoch 2/3, Train Loss: 0.1013, Test Loss: 0.0883, Test Acc: 0.9731

       71%|███████   | 115/162 [1:41:01<39:52, 50.91s/it]

      Epoch 3/3, Train Loss: 0.0782, Test Loss: 0.0873, Test Acc: 0.9744
      Epoch 1/4, Train Loss: 0.2198, Test Loss: 0.1131, Test Acc: 0.9659
      Epoch 2/4, Train Loss: 0.1038, Test Loss: 0.0864, Test Acc: 0.9717
      Epoch 3/4, Train Loss: 0.0769, Test Loss: 0.0841, Test Acc: 0.9725

       72%|███████▏  | 116/162 [1:42:06<42:20, 55.23s/it]

      Epoch 4/4, Train Loss: 0.0652, Test Loss: 0.0788, Test Acc: 0.9768
      Epoch 1/3, Train Loss: 0.2421, Test Loss: 0.1368, Test Acc: 0.9575
      Epoch 2/3, Train Loss: 0.1065, Test Loss: 0.0890, Test Acc: 0.9732

       72%|███████▏  | 117/162 [1:42:50<38:57, 51.95s/it]

      Epoch 3/3, Train Loss: 0.0762, Test Loss: 0.0782, Test Acc: 0.9755
      Epoch 1/4, Train Loss: 0.2364, Test Loss: 0.1251, Test Acc: 0.9618
      Epoch 2/4, Train Loss: 0.1067, Test Loss: 0.0843, Test Acc: 0.9744
      Epoch 3/4, Train Loss: 0.0749, Test Loss: 0.0801, Test Acc: 0.9754

       73%|███████▎  | 118/162 [1:43:49<39:31, 53.89s/it]

      Epoch 4/4, Train Loss: 0.0608, Test Loss: 0.0826, Test Acc: 0.9754
      Epoch 1/3, Train Loss: 0.2712, Test Loss: 0.1383, Test Acc: 0.9567
      Epoch 2/3, Train Loss: 0.1186, Test Loss: 0.0935, Test Acc: 0.9709

       73%|███████▎  | 119/162 [1:44:30<35:49, 49.98s/it]

      Epoch 3/3, Train Loss: 0.0833, Test Loss: 0.0794, Test Acc: 0.9749
      Epoch 1/4, Train Loss: 0.2756, Test Loss: 0.1365, Test Acc: 0.9595
      Epoch 2/4, Train Loss: 0.1198, Test Loss: 0.0918, Test Acc: 0.9708
      Epoch 3/4, Train Loss: 0.0814, Test Loss: 0.0812, Test Acc: 0.9746

       74%|███████▍  | 120/162 [1:45:24<35:57, 51.37s/it]

      Epoch 4/4, Train Loss: 0.0635, Test Loss: 0.0745, Test Acc: 0.9754
      Epoch 1/3, Train Loss: 0.4173, Test Loss: 0.2745, Test Acc: 0.9264
      Epoch 2/3, Train Loss: 0.3592, Test Loss: 0.2775, Test Acc: 0.9340

       75%|███████▍  | 121/162 [1:46:14<34:40, 50.74s/it]

      Epoch 3/3, Train Loss: 0.3444, Test Loss: 0.2996, Test Acc: 0.9349
      Epoch 1/4, Train Loss: 0.4141, Test Loss: 0.3041, Test Acc: 0.9188
      Epoch 2/4, Train Loss: 0.3505, Test Loss: 0.3678, Test Acc: 0.9148
      Epoch 3/4, Train Loss: 0.3347, Test Loss: 0.3032, Test Acc: 0.9288

       75%|███████▌  | 122/162 [1:47:20<37:01, 55.54s/it]

      Epoch 4/4, Train Loss: 0.3202, Test Loss: 0.2834, Test Acc: 0.9377
      Epoch 1/3, Train Loss: 0.3355, Test Loss: 0.2078, Test Acc: 0.9475
      Epoch 2/3, Train Loss: 0.2793, Test Loss: 0.2683, Test Acc: 0.9281

       76%|███████▌  | 123/162 [1:48:05<33:57, 52.24s/it]

      Epoch 3/3, Train Loss: 0.2647, Test Loss: 0.2476, Test Acc: 0.9393
      Epoch 1/4, Train Loss: 0.3290, Test Loss: 0.1968, Test Acc: 0.9431
      Epoch 2/4, Train Loss: 0.2643, Test Loss: 0.2259, Test Acc: 0.9389
      Epoch 3/4, Train Loss: 0.2448, Test Loss: 0.1956, Test Acc: 0.9501

       77%|███████▋  | 124/162 [1:49:03<34:11, 53.99s/it]

      Epoch 4/4, Train Loss: 0.2419, Test Loss: 0.2218, Test Acc: 0.9447
      Epoch 1/3, Train Loss: 0.2764, Test Loss: 0.1624, Test Acc: 0.9519
      Epoch 2/3, Train Loss: 0.2040, Test Loss: 0.1580, Test Acc: 0.9553

       77%|███████▋  | 125/162 [1:49:44<30:48, 49.95s/it]

      Epoch 3/3, Train Loss: 0.1900, Test Loss: 0.1614, Test Acc: 0.9577
      Epoch 1/4, Train Loss: 0.2868, Test Loss: 0.1585, Test Acc: 0.9518
      Epoch 2/4, Train Loss: 0.2041, Test Loss: 0.1577, Test Acc: 0.9567
      Epoch 3/4, Train Loss: 0.1822, Test Loss: 0.1460, Test Acc: 0.9606

       78%|███████▊  | 126/162 [1:50:39<30:52, 51.47s/it]

      Epoch 4/4, Train Loss: 0.1795, Test Loss: 0.1672, Test Acc: 0.9564
      Epoch 1/3, Train Loss: 0.4534, Test Loss: 0.2436, Test Acc: 0.9307
      Epoch 2/3, Train Loss: 0.2284, Test Loss: 0.1761, Test Acc: 0.9480

       78%|███████▊  | 127/162 [1:51:29<29:48, 51.11s/it]

      Epoch 3/3, Train Loss: 0.1706, Test Loss: 0.1400, Test Acc: 0.9588
      Epoch 1/4, Train Loss: 0.4554, Test Loss: 0.2411, Test Acc: 0.9293
      Epoch 2/4, Train Loss: 0.2296, Test Loss: 0.1724, Test Acc: 0.9488
      Epoch 3/4, Train Loss: 0.1732, Test Loss: 0.1398, Test Acc: 0.9593

       79%|███████▉  | 128/162 [1:52:36<31:46, 56.08s/it]

      Epoch 4/4, Train Loss: 0.1409, Test Loss: 0.1163, Test Acc: 0.9673
      Epoch 1/3, Train Loss: 0.5481, Test Loss: 0.2804, Test Acc: 0.9224
      Epoch 2/3, Train Loss: 0.2720, Test Loss: 0.2117, Test Acc: 0.9406

       80%|███████▉  | 129/162 [1:53:22<29:02, 52.81s/it]

      Epoch 3/3, Train Loss: 0.2106, Test Loss: 0.1742, Test Acc: 0.9488
      Epoch 1/4, Train Loss: 0.5429, Test Loss: 0.2788, Test Acc: 0.9193
      Epoch 2/4, Train Loss: 0.2677, Test Loss: 0.2106, Test Acc: 0.9376
      Epoch 3/4, Train Loss: 0.2101, Test Loss: 0.1702, Test Acc: 0.9503

       80%|████████  | 130/162 [1:54:23<29:33, 55.43s/it]

      Epoch 4/4, Train Loss: 0.1728, Test Loss: 0.1459, Test Acc: 0.9571
      Epoch 1/3, Train Loss: 0.6773, Test Loss: 0.3194, Test Acc: 0.9126
      Epoch 2/3, Train Loss: 0.3117, Test Loss: 0.2470, Test Acc: 0.9282

       81%|████████  | 131/162 [1:55:06<26:37, 51.52s/it]

      Epoch 3/3, Train Loss: 0.2509, Test Loss: 0.2074, Test Acc: 0.9404
      Epoch 1/4, Train Loss: 0.6734, Test Loss: 0.3207, Test Acc: 0.9106
      Epoch 2/4, Train Loss: 0.3152, Test Loss: 0.2495, Test Acc: 0.9275
      Epoch 3/4, Train Loss: 0.2541, Test Loss: 0.2081, Test Acc: 0.9393

       81%|████████▏ | 132/162 [1:56:03<26:38, 53.29s/it]

      Epoch 4/4, Train Loss: 0.2140, Test Loss: 0.1802, Test Acc: 0.9469
      Epoch 1/3, Train Loss: 0.2323, Test Loss: 0.1121, Test Acc: 0.9640
      Epoch 2/3, Train Loss: 0.1163, Test Loss: 0.1194, Test Acc: 0.9617

       82%|████████▏ | 133/162 [1:56:55<25:34, 52.92s/it]

      Epoch 3/3, Train Loss: 0.0924, Test Loss: 0.0890, Test Acc: 0.9734
      Epoch 1/4, Train Loss: 0.2332, Test Loss: 0.1054, Test Acc: 0.9682
      Epoch 2/4, Train Loss: 0.1187, Test Loss: 0.0994, Test Acc: 0.9692
      Epoch 3/4, Train Loss: 0.0911, Test Loss: 0.0820, Test Acc: 0.9736

       83%|████████▎ | 134/162 [1:58:04<26:53, 57.62s/it]

      Epoch 4/4, Train Loss: 0.0797, Test Loss: 0.1005, Test Acc: 0.9727
      Epoch 1/3, Train Loss: 0.2502, Test Loss: 0.1181, Test Acc: 0.9627
      Epoch 2/3, Train Loss: 0.1172, Test Loss: 0.0886, Test Acc: 0.9734

       83%|████████▎ | 135/162 [1:58:48<24:10, 53.72s/it]

      Epoch 3/3, Train Loss: 0.0859, Test Loss: 0.0791, Test Acc: 0.9755
      Epoch 1/4, Train Loss: 0.2515, Test Loss: 0.1227, Test Acc: 0.9603
      Epoch 2/4, Train Loss: 0.1170, Test Loss: 0.0940, Test Acc: 0.9713
      Epoch 3/4, Train Loss: 0.0866, Test Loss: 0.0822, Test Acc: 0.9720

       84%|████████▍ | 136/162 [1:59:49<24:09, 55.74s/it]

      Epoch 4/4, Train Loss: 0.0713, Test Loss: 0.0724, Test Acc: 0.9769
      Epoch 1/3, Train Loss: 0.2863, Test Loss: 0.1410, Test Acc: 0.9564
      Epoch 2/3, Train Loss: 0.1285, Test Loss: 0.0938, Test Acc: 0.9722

       85%|████████▍ | 137/162 [2:00:31<21:30, 51.60s/it]

      Epoch 3/3, Train Loss: 0.0944, Test Loss: 0.0827, Test Acc: 0.9743
      Epoch 1/4, Train Loss: 0.2807, Test Loss: 0.1342, Test Acc: 0.9592
      Epoch 2/4, Train Loss: 0.1270, Test Loss: 0.0985, Test Acc: 0.9712
      Epoch 3/4, Train Loss: 0.0909, Test Loss: 0.0776, Test Acc: 0.9774

       85%|████████▌ | 138/162 [2:01:28<21:16, 53.17s/it]

      Epoch 4/4, Train Loss: 0.0743, Test Loss: 0.0749, Test Acc: 0.9753
      Epoch 1/3, Train Loss: 0.4784, Test Loss: 0.3228, Test Acc: 0.9210
      Epoch 2/3, Train Loss: 0.4230, Test Loss: 0.2965, Test Acc: 0.9268

       86%|████████▌ | 139/162 [2:02:18<20:02, 52.26s/it]

      Epoch 3/3, Train Loss: 0.3968, Test Loss: 0.3520, Test Acc: 0.9312
      Epoch 1/4, Train Loss: 0.4790, Test Loss: 0.2894, Test Acc: 0.9256
      Epoch 2/4, Train Loss: 0.4178, Test Loss: 0.3598, Test Acc: 0.9179
      Epoch 3/4, Train Loss: 0.4040, Test Loss: 0.3798, Test Acc: 0.9238

       86%|████████▋ | 140/162 [2:03:25<20:46, 56.64s/it]

      Epoch 4/4, Train Loss: 0.4048, Test Loss: 0.2980, Test Acc: 0.9348
      Epoch 1/3, Train Loss: 0.3740, Test Loss: 0.2256, Test Acc: 0.9350
      Epoch 2/3, Train Loss: 0.3232, Test Loss: 0.2461, Test Acc: 0.9323

       87%|████████▋ | 141/162 [2:04:09<18:30, 52.90s/it]

      Epoch 3/3, Train Loss: 0.2984, Test Loss: 0.2042, Test Acc: 0.9499
      Epoch 1/4, Train Loss: 0.3817, Test Loss: 0.2170, Test Acc: 0.9387
      Epoch 2/4, Train Loss: 0.3158, Test Loss: 0.2425, Test Acc: 0.9356
      Epoch 3/4, Train Loss: 0.3051, Test Loss: 0.2156, Test Acc: 0.9475

       88%|████████▊ | 142/162 [2:05:08<18:16, 54.84s/it]

      Epoch 4/4, Train Loss: 0.3128, Test Loss: 0.2455, Test Acc: 0.9375
      Epoch 1/3, Train Loss: 0.3179, Test Loss: 0.1700, Test Acc: 0.9493
      Epoch 2/3, Train Loss: 0.2368, Test Loss: 0.2049, Test Acc: 0.9435

       88%|████████▊ | 143/162 [2:05:51<16:12, 51.17s/it]

      Epoch 3/3, Train Loss: 0.2281, Test Loss: 0.1892, Test Acc: 0.9530
      Epoch 1/4, Train Loss: 0.3119, Test Loss: 0.1919, Test Acc: 0.9411
      Epoch 2/4, Train Loss: 0.2476, Test Loss: 0.1699, Test Acc: 0.9544
      Epoch 3/4, Train Loss: 0.2230, Test Loss: 0.1765, Test Acc: 0.9556

       89%|████████▉ | 144/162 [2:06:49<15:58, 53.25s/it]

      Epoch 4/4, Train Loss: 0.2153, Test Loss: 0.1639, Test Acc: 0.9619
      Epoch 1/3, Train Loss: 0.4772, Test Loss: 0.2453, Test Acc: 0.9299
      Epoch 2/3, Train Loss: 0.2439, Test Loss: 0.1787, Test Acc: 0.9496

       90%|████████▉ | 145/162 [2:07:39<14:51, 52.43s/it]

      Epoch 3/3, Train Loss: 0.1869, Test Loss: 0.1437, Test Acc: 0.9575
      Epoch 1/4, Train Loss: 0.4783, Test Loss: 0.2482, Test Acc: 0.9286
      Epoch 2/4, Train Loss: 0.2398, Test Loss: 0.1792, Test Acc: 0.9470
      Epoch 3/4, Train Loss: 0.1833, Test Loss: 0.1417, Test Acc: 0.9569

       90%|█████████ | 146/162 [2:08:45<15:02, 56.39s/it]

      Epoch 4/4, Train Loss: 0.1505, Test Loss: 0.1209, Test Acc: 0.9645
      Epoch 1/3, Train Loss: 0.5558, Test Loss: 0.2778, Test Acc: 0.9218
      Epoch 2/3, Train Loss: 0.2770, Test Loss: 0.2103, Test Acc: 0.9396

       91%|█████████ | 147/162 [2:09:30<13:13, 52.88s/it]

      Epoch 3/3, Train Loss: 0.2192, Test Loss: 0.1761, Test Acc: 0.9478
      Epoch 1/4, Train Loss: 0.5645, Test Loss: 0.2774, Test Acc: 0.9205
      Epoch 2/4, Train Loss: 0.2737, Test Loss: 0.2089, Test Acc: 0.9389
      Epoch 3/4, Train Loss: 0.2154, Test Loss: 0.1712, Test Acc: 0.9494

       91%|█████████▏| 148/162 [2:10:31<12:56, 55.48s/it]

      Epoch 4/4, Train Loss: 0.1808, Test Loss: 0.1450, Test Acc: 0.9557
      Epoch 1/3, Train Loss: 0.6961, Test Loss: 0.3277, Test Acc: 0.9092
      Epoch 2/3, Train Loss: 0.3262, Test Loss: 0.2508, Test Acc: 0.9276

       92%|█████████▏| 149/162 [2:11:14<11:12, 51.73s/it]

      Epoch 3/3, Train Loss: 0.2647, Test Loss: 0.2125, Test Acc: 0.9387
      Epoch 1/4, Train Loss: 0.6946, Test Loss: 0.3318, Test Acc: 0.9110
      Epoch 2/4, Train Loss: 0.3281, Test Loss: 0.2549, Test Acc: 0.9264
      Epoch 3/4, Train Loss: 0.2673, Test Loss: 0.2156, Test Acc: 0.9375

       93%|█████████▎| 150/162 [2:12:11<10:37, 53.12s/it]

      Epoch 4/4, Train Loss: 0.2287, Test Loss: 0.1871, Test Acc: 0.9453
      Epoch 1/3, Train Loss: 0.2495, Test Loss: 0.1164, Test Acc: 0.9632
      Epoch 2/3, Train Loss: 0.1341, Test Loss: 0.0920, Test Acc: 0.9733

       93%|█████████▎| 151/162 [2:13:00<09:32, 52.04s/it]

      Epoch 3/3, Train Loss: 0.1085, Test Loss: 0.0791, Test Acc: 0.9769
      Epoch 1/4, Train Loss: 0.2489, Test Loss: 0.1250, Test Acc: 0.9620
      Epoch 2/4, Train Loss: 0.1344, Test Loss: 0.0979, Test Acc: 0.9692
      Epoch 3/4, Train Loss: 0.1099, Test Loss: 0.0840, Test Acc: 0.9761

       94%|█████████▍| 152/162 [2:14:07<09:25, 56.60s/it]

      Epoch 4/4, Train Loss: 0.0950, Test Loss: 0.0850, Test Acc: 0.9740
      Epoch 1/3, Train Loss: 0.2673, Test Loss: 0.1194, Test Acc: 0.9640
      Epoch 2/3, Train Loss: 0.1317, Test Loss: 0.0891, Test Acc: 0.9731

       94%|█████████▍| 153/162 [2:14:54<08:02, 53.62s/it]

      Epoch 3/3, Train Loss: 0.1023, Test Loss: 0.0782, Test Acc: 0.9750
      Epoch 1/4, Train Loss: 0.2650, Test Loss: 0.1162, Test Acc: 0.9623
      Epoch 2/4, Train Loss: 0.1315, Test Loss: 0.0895, Test Acc: 0.9723
      Epoch 3/4, Train Loss: 0.1018, Test Loss: 0.0751, Test Acc: 0.9774

       95%|█████████▌| 154/162 [2:15:53<07:22, 55.35s/it]

      Epoch 4/4, Train Loss: 0.0853, Test Loss: 0.0734, Test Acc: 0.9780
      Epoch 1/3, Train Loss: 0.2960, Test Loss: 0.1334, Test Acc: 0.9608
      Epoch 2/3, Train Loss: 0.1395, Test Loss: 0.0961, Test Acc: 0.9699

       96%|█████████▌| 155/162 [2:16:34<05:57, 51.09s/it]

      Epoch 3/3, Train Loss: 0.1042, Test Loss: 0.0896, Test Acc: 0.9725
      Epoch 1/4, Train Loss: 0.2986, Test Loss: 0.1428, Test Acc: 0.9555
      Epoch 2/4, Train Loss: 0.1429, Test Loss: 0.0981, Test Acc: 0.9714
      Epoch 3/4, Train Loss: 0.1057, Test Loss: 0.0861, Test Acc: 0.9745

       96%|█████████▋| 156/162 [2:17:32<05:17, 52.93s/it]

      Epoch 4/4, Train Loss: 0.0884, Test Loss: 0.0753, Test Acc: 0.9762
      Epoch 1/3, Train Loss: 0.5538, Test Loss: 0.2833, Test Acc: 0.9177
      Epoch 2/3, Train Loss: 0.4892, Test Loss: 0.2844, Test Acc: 0.9236

       97%|█████████▋| 157/162 [2:18:23<04:22, 52.46s/it]

      Epoch 3/3, Train Loss: 0.4938, Test Loss: 0.3243, Test Acc: 0.9244
      Epoch 1/4, Train Loss: 0.5689, Test Loss: 0.3368, Test Acc: 0.9034
      Epoch 2/4, Train Loss: 0.5011, Test Loss: 0.3364, Test Acc: 0.9174
      Epoch 3/4, Train Loss: 0.5042, Test Loss: 0.3112, Test Acc: 0.9298

       98%|█████████▊| 158/162 [2:19:32<03:49, 57.28s/it]

      Epoch 4/4, Train Loss: 0.4829, Test Loss: 0.3780, Test Acc: 0.9162
      Epoch 1/3, Train Loss: 0.4491, Test Loss: 0.2395, Test Acc: 0.9310
      Epoch 2/3, Train Loss: 0.3836, Test Loss: 0.2302, Test Acc: 0.9399

       98%|█████████▊| 159/162 [2:20:16<02:40, 53.44s/it]

      Epoch 3/3, Train Loss: 0.3576, Test Loss: 0.2165, Test Acc: 0.9451
      Epoch 1/4, Train Loss: 0.4409, Test Loss: 0.2540, Test Acc: 0.9309
      Epoch 2/4, Train Loss: 0.3846, Test Loss: 0.2859, Test Acc: 0.9284
      Epoch 3/4, Train Loss: 0.3642, Test Loss: 0.2262, Test Acc: 0.9435

       99%|█████████▉| 160/162 [2:21:16<01:50, 55.24s/it]

      Epoch 4/4, Train Loss: 0.3613, Test Loss: 0.2863, Test Acc: 0.9400
      Epoch 1/3, Train Loss: 0.3622, Test Loss: 0.1691, Test Acc: 0.9520
      Epoch 2/3, Train Loss: 0.2864, Test Loss: 0.2116, Test Acc: 0.9436

       99%|█████████▉| 161/162 [2:21:58<00:51, 51.30s/it]

      Epoch 3/3, Train Loss: 0.2773, Test Loss: 0.2146, Test Acc: 0.9428
      Epoch 1/4, Train Loss: 0.3599, Test Loss: 0.1821, Test Acc: 0.9439
      Epoch 2/4, Train Loss: 0.2823, Test Loss: 0.1683, Test Acc: 0.9540
      Epoch 3/4, Train Loss: 0.2783, Test Loss: 0.1891, Test Acc: 0.9534

      100%|██████████| 162/162 [2:22:53<00:00, 52.92s/it]

      Epoch 4/4, Train Loss: 0.2619, Test Loss: 0.1802, Test Acc: 0.9526
      Best accuracy: 0.9780
      Best parameters: {'hidden_size': 256, 'dropout_rate': 0.3, 'learning_rate': 0.001, 'batch_size': 6, 'epochs': 4}

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
            title: 'Grid Search Convergence',
            description: 'Shows min, max and average accuracy across iterations'
        },
        bestParams: {
            title: 'Best Parameters Found',
            description: 'The optimal hyperparameters discovered by Grid Search'
        }
    };

    return (
        <div className="p-4" style={{ margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>Grid Search Hyperparameter Tuning Results</h1>

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
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>256</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of neurons in hidden layer</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Dropout Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>0.3</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Probability of dropout for regularization</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Learning Rate</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>0.001</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Step size for gradient updates</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Batch Size</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>6</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>Number of samples per gradient update</td>
                                </tr>
                                <tr style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: '#111827' }}>Epochs</td>
                                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', color: '#6b7280' }}>4</td>
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
