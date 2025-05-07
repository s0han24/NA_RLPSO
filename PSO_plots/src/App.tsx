import './App.css';
import BayesianVisualisation from './Bayesian_visualisations';
import OptimizationComparison from './compare';
import PSOVisualizations from './PSO_Visualisation';
import RLPSOVisualisations from './RL_PSO_Visualisation';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
