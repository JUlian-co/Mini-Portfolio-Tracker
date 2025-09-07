import React, { useState } from 'react';

export default function App() {
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  
  // Verbesserte Mapping-Struktur: 'all' wird direkt auf ein Array mit allen Netzwerken gemappt
  const networkMapping = {
    ethereum: ['eth-mainnet'],
    base: ['base-mainnet'],
    arbitrum: ['arb-mainnet'],
    polygon: ['polygon-mainnet'],
    all: ['eth-mainnet', 'base-mainnet', 'arb-mainnet', 'polygon-mainnet'] // Direkt als Array
  };

  // Erklärung: handleNetworkChange nimmt ein Event-Objekt entgegen, 
  // weil es als onChange-Handler für das <select>-Element verwendet wird.
  // Wenn der Benutzer eine Option auswählt, ruft der Browser automatisch
  // diese Funktion auf und übergibt ein Event-Objekt, das Informationen 
  // über das auslösende Element enthält.
  // event.target.value enthält den Wert des ausgewählten <option>-Elements.
  const handleNetworkChange = (event) => {
    // Hier setzen wir den State auf den Wert, den der Benutzer ausgewählt hat
    // (z.B. "ethereum", "base", etc., wie in den value-Attributen der <option>-Tags definiert)
    setSelectedNetwork(event.target.value);
  };

  // Vereinfachte Funktion: Gibt direkt das Array zurück, das für die API benötigt wird
  // Keine zusätzliche Logik mehr nötig, da 'all' bereits im Mapping als Array definiert ist
  const getApiNetworkValue = () => {
    return networkMapping[selectedNetwork];
  };

  // Beispiel-Funktion, die zeigt, wie du die API-Anfrage senden würdest
  const sendApiRequest = (address) => {
    const apiNetworks = getApiNetworkValue();
    const body = {
      addresses: [
        {
          address: address,
          networks: apiNetworks // Hier wird der/die API-Wert(e) verwendet
        }
      ]
    };
    
    console.log('API Request Body:', JSON.stringify(body));
    // Hier würdest du deine tatsächliche API-Anfrage an Alchemy senden
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Network Selection</h2>
        
        <div className="space-y-4">
          <label htmlFor="network-select" className="block text-sm font-medium text-white/80">
            Select Network
          </label>
          
          <select
            id="network-select"
            value={selectedNetwork}
            onChange={handleNetworkChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="ethereum">Ethereum</option>
            <option value="base">Base</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="polygon">Polygon</option>
            <option value="all">All Networks</option>
          </select>
          
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-sm font-medium text-white/80 mb-2">Selected Network Info</h3>
            <p className="text-white text-sm">
              <span className="font-semibold">Display Name:</span> {selectedNetwork === 'all' ? 'All Networks' : selectedNetwork.charAt(0).toUpperCase() + selectedNetwork.slice(1)}
            </p>
            <p className="text-white text-sm">
              <span className="font-semibold">API Value:</span> {JSON.stringify(getApiNetworkValue())}
            </p>
            <div className="mt-3 p-3 bg-green-900/30 rounded text-xs text-green-200">
              <strong>Verbesserte Version:</strong> Jetzt ist die <code>getApiNetworkValue()</code>-Funktion 
              viel einfacher! Das Mapping für 'all' enthält direkt das Array mit allen Netzwerken, 
              sodass keine zusätzliche Filter-Logik mehr benötigt wird.
            </div>
          </div>
          
          <button
            onClick={() => sendApiRequest('0xYourAddressHere')}
            className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Send API Request (Demo)
          </button>
          
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-yellow-200 text-sm">
            <strong>Warum ist diese Version besser?</strong><br />
            1. Einfachere Logik: Keine if-Bedingung mehr in <code>getApiNetworkValue()</code><br />
            2. Weniger Fehleranfällig: Keine Filter-Logik, die schiefgehen könnte<br />
            3. Bessere Performance: Direkter Zugriff statt Array-Filterung<br />
            4. Leichter zu erweitern: Neue Netzwerke können einfach im 'all'-Array hinzugefügt werden
          </div>
        </div>
      </div>
    </div>
  );
}