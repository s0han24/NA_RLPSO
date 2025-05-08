import './App.css';
import { useState } from 'react';
import BayesianVisualisation from './Bayesian_visualisations';
import OptimizationComparison from './compare';
import PSOVisualizations from './PSO_Visualisation';
import RLPSOVisualisations from './RL_PSO_Visualisation';
import GridSearchVisualisation from './GridSearch_visualisation';

function App() {
  const [activeTab, setActiveTab] = useState<'plots' | 'gifs'>('plots');
  // Add state for function selection in both PSO and RL-PSO
  const [selectedPsoFunction, setSelectedPsoFunction] = useState<'ackley' | 'rastrigin' | 'rosenbrock'>('ackley');
  const [selectedRLPsoFunction, setSelectedRLPsoFunction] = useState<'ackley' | 'rastrigin' | 'rosenbrock'>('ackley');

  return (
    <div className="App">
      <nav style={{
        backgroundColor: '#f0f9ff',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <button
            onClick={() => setActiveTab('plots')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'plots' ? '#2563eb' : '#e5e7eb',
              color: activeTab === 'plots' ? 'white' : '#1f2937',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === 'plots' ? 'bold' : 'normal'
            }}
          >
            Plots
          </button>
          <button
            onClick={() => setActiveTab('gifs')}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === 'gifs' ? '#2563eb' : '#e5e7eb',
              color: activeTab === 'gifs' ? 'white' : '#1f2937',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === 'gifs' ? 'bold' : 'normal'
            }}
          >
            GIFs
          </button>
        </div>
      </nav>

      {activeTab === 'plots' && (
        <>
          <div className="GridSearch-visualisation">
            <GridSearchVisualisation />
          </div>
          <div className="Bayesian-visualisation">
            <BayesianVisualisation />
          </div>
          <div className="PSO-visualisation">
            <PSOVisualizations />
          </div>
          <div className="RL-PSO-visualisation">
            <RLPSOVisualisations />
          </div>
          <div className="Compare-visualisation">
            <OptimizationComparison />
          </div>
        </>
      )}

      {activeTab === 'gifs' && (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', color: '#1f2937' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Optimization Algorithms in Action
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* PSO Section with Tabs */}
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Particle Swarm Optimization
              </h2>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {/* PSO Tabs */}
                <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  {['ackley', 'rastrigin', 'rosenbrock'].map((func) => (
                    <button
                      key={func}
                      onClick={() => setSelectedPsoFunction(func as any)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: selectedPsoFunction === func ? '#3b82f6' : '#e5e7eb',
                        color: selectedPsoFunction === func ? 'white' : '#1f2937',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: selectedPsoFunction === func ? 'bold' : 'normal',
                        textTransform: 'capitalize'
                      }}
                    >
                      {func}
                    </button>
                  ))}
                </div>

                {/* PSO GIF Content based on selection */}
                {selectedPsoFunction === 'ackley' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Ackley Function Optimization
                    </h3>
                    <img
                      src="/ackley_gifs/pso_ackley_1.gif"
                      alt="PSO optimizing Ackley function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of particles converging on the Ackley function global minimum.
                    </p>
                  </div>
                )}

                {selectedPsoFunction === 'rastrigin' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Rastrigin Function Optimization
                    </h3>
                    <img
                      src="/rastrigin_gifs/pso_rastrigin_3.gif"
                      alt="PSO optimizing Rastrigin function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of particles navigating the challenging Rastrigin function landscape.
                    </p>
                  </div>
                )}

                {selectedPsoFunction === 'rosenbrock' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Rosenbrock Function Optimization
                    </h3>
                    <img
                      src="/rosenbrock_gifs/pso_rosenbrock_1.gif"
                      alt="PSO optimizing Rosenbrock function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of particles finding the global minimum in Rosenbrock's banana-shaped valley.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RL-PSO Section with Tabs */}
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                Reinforcement Learning PSO
              </h2>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {/* RL-PSO Tabs */}
                <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                  {['ackley', 'rastrigin', 'rosenbrock'].map((func) => (
                    <button
                      key={func}
                      onClick={() => setSelectedRLPsoFunction(func as any)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: selectedRLPsoFunction === func ? '#3b82f6' : '#e5e7eb',
                        color: selectedRLPsoFunction === func ? 'white' : '#1f2937',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: selectedRLPsoFunction === func ? 'bold' : 'normal',
                        textTransform: 'capitalize'
                      }}
                    >
                      {func}
                    </button>
                  ))}
                </div>

                {/* RL-PSO GIF Content based on selection */}
                {selectedRLPsoFunction === 'ackley' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Ackley Function Optimization
                    </h3>
                    <img
                      src="/ackley_gifs/rl_pso_ackley_1.gif"
                      alt="RL-PSO optimizing Ackley function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of RL-PSO particles learning optimal strategies to find the Ackley function global minimum.
                    </p>
                  </div>
                )}

                {selectedRLPsoFunction === 'rastrigin' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Rastrigin Function Optimization
                    </h3>
                    <img
                      src="/rastrigin_gifs/rl_pso_rastrigin_3.gif"
                      alt="RL-PSO optimizing Rastrigin function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of RL-PSO efficiently navigating the many local minima of the Rastrigin function.
                    </p>
                  </div>
                )}

                {selectedRLPsoFunction === 'rosenbrock' && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      Rosenbrock Function Optimization
                    </h3>
                    <img
                      src="/rosenbrock_gifs/rl_pso_rosenbrock_1.gif"
                      alt="RL-PSO optimizing Rosenbrock function"
                      style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563' }}>
                      Visualization of RL-PSO adaptively exploring the challenging Rosenbrock valley.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
