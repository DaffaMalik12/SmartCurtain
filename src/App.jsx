import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const App = () => {
  const [curtainStatus, setCurtainStatus] = useState({
    isOpen: true,
    openTime: '06:30',
    closeTime: '18:00'
  });

  // Simulasi API call untuk mendapatkan status tirai
  const fetchCurtainStatus = async () => {
    try {
      // Ganti dengan endpoint API yang sebenarnya
      // const response = await fetch('http://localhost:5173/api/curtain/status');
      // const data = await response.json();
      // setCurtainStatus(data);
      
      // Simulasi data untuk demo
      console.log('Fetching curtain status...');
    } catch (error) {
      console.error('Error fetching curtain status:', error);
    }
  };

  // Fungsi untuk toggle tirai
  const toggleCurtain = async () => {
    try {
      // Ganti dengan endpoint API yang sebenarnya
      // const response = await fetch('http://localhost:5173/api/curtain/toggle', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ action: curtainStatus.isOpen ? 'close' : 'open' })
      // });
      
      // Simulasi toggle untuk demo
      setCurtainStatus(prev => ({
        ...prev,
        isOpen: !prev.isOpen
      }));
      
      console.log('Toggling curtain...');
    } catch (error) {
      console.error('Error toggling curtain:', error);
    }
  };

  // Fungsi untuk update jadwal
  const updateSchedule = async (type, time) => {
    try {
      // Ganti dengan endpoint API yang sebenarnya
      // const response = await fetch('http://localhost:5173/api/curtain/schedule', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, time })
      // });
      
      // Simulasi update untuk demo
      setCurtainStatus(prev => ({
        ...prev,
        [type === 'open' ? 'openTime' : 'closeTime']: time
      }));
      
      console.log(`Updating ${type} schedule to ${time}...`);
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  useEffect(() => {
    fetchCurtainStatus();
    
    // Polling untuk update status setiap 30 detik
    const interval = setInterval(fetchCurtainStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 sm:p-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Smart</h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Curtain</h1>
          <p className="text-xs sm:text-sm md:text-base opacity-90 mt-2">Panel Kontrol Otomatis</p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Status Tirai */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-gray-700 text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Status Tirai</h2>
            <button 
              onClick={toggleCurtain}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                curtainStatus.isOpen 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
              }`}
            >
              {curtainStatus.isOpen ? 'Terbuka' : 'Tertutup'}
            </button>
          </div>

          {/* Jadwal Otomatis */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-gray-700 text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-center">
              Jadwal Otomatis
            </h3>
            
            {/* Jadwal Buka */}
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 gap-2 sm:gap-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Terbuka pada:</span>
                </div>
                <input
                  type="time"
                  value={curtainStatus.openTime}
                  onChange={(e) => updateSchedule('open', e.target.value)}
                  className="bg-transparent text-green-700 font-semibold text-base sm:text-lg focus:outline-none ml-auto sm:ml-0"
                />
              </div>
            </div>

            {/* Jadwal Tutup */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 gap-2 sm:gap-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2 sm:mr-3"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Tertutup pada:</span>
                </div>
                <input
                  type="time"
                  value={curtainStatus.closeTime}
                  onChange={(e) => updateSchedule('close', e.target.value)}
                  className="bg-transparent text-orange-700 font-semibold text-base sm:text-lg focus:outline-none ml-auto sm:ml-0"
                />
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button 
              onClick={() => console.log('Previous action')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <button 
              onClick={toggleCurtain}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Tutup Tirai
            </button>
            
            <button 
              onClick={() => console.log('Next action')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Refresh Button */}
          <div className="text-center">
            <button
              onClick={fetchCurtainStatus}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              title="Refresh status"
            >
              <RotateCcw size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;