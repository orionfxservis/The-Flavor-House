import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Thermometer, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Navigation, 
  ChevronRight, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { DeliveryTracking, OrderMilestone } from '../types/meal';
import { INITIAL_TRACKING } from '../data/mockMeals';

interface LiveDeliveryTrackerProps {
  trackingData?: DeliveryTracking;
  onSendDriverNote?: (note: string) => void;
}

export const LiveDeliveryTracker: React.FC<LiveDeliveryTrackerProps> = ({
  trackingData = INITIAL_TRACKING,
  onSendDriverNote
}) => {
  const [currentTracking, setCurrentTracking] = useState<DeliveryTracking>(trackingData);
  const [driverNote, setDriverNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(68); // percentage along the route

  // Sync if external tracking updates
  useEffect(() => {
    setCurrentTracking(trackingData);
  }, [trackingData]);

  const milestones = [
    { id: 'confirmed', title: 'Confirmed & Routed', desc: 'Batch allocated to chef' },
    { id: 'chef-prepping', title: 'Executive Chef Prepping', desc: 'Macro portioning & vacuum seal' },
    { id: 'quality-checked', title: 'Quality Inspected', desc: 'Temperature lock & cold pack' },
    { id: 'in-transit', title: 'Out for Cold Delivery', desc: 'Refrigerated van en route' },
    { id: 'delivered', title: 'Delivered', desc: 'Front doorstep dropoff' }
  ];

  const getMilestoneIndex = (status: OrderMilestone) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'chef-prepping': return 1;
      case 'quality-checked': return 2;
      case 'in-transit': return 3;
      case 'delivered': return 4;
      default: return 3;
    }
  };

  const currentIdx = getMilestoneIndex(currentTracking.status);

  // Milestone simulation helper for test interactive experience
  const handleAdvanceMilestone = () => {
    if (currentTracking.status === 'in-transit') {
      setCurrentTracking({
        ...currentTracking,
        status: 'delivered',
        estimatedDeliveryWindow: 'Delivered Just Now at Front Doorstep'
      });
      setSimulatedProgress(100);
    } else {
      setCurrentTracking({
        ...currentTracking,
        status: 'in-transit',
        estimatedDeliveryWindow: 'Today, 11:45 AM - 1:15 PM EST'
      });
      setSimulatedProgress(68);
    }
  };

  const handleSaveDriverNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverNote.trim()) return;
    setNoteSent(true);
    if (onSendDriverNote) onSendDriverNote(driverNote);
    setTimeout(() => setNoteSent(false), 3000);
  };

  return (
    <section id="tracker-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Live GPS & Cold-Chain Telematics</span>
              <span aria-hidden="true">·</span>
              <span>Order #{currentTracking.orderId}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Real-Time Delivery Tracking
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Carrier: {currentTracking.carrier} · Tracking: {currentTracking.trackingNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Simulation Button */}
            <button
              onClick={handleAdvanceMilestone}
              className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Simulate: {currentTracking.status === 'delivered' ? 'Reset to In-Transit' : 'Mark as Delivered'}
            </button>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="glass-panel p-6 rounded-3xl mb-8 shadow-lg">
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-stone-200 dark:bg-stone-800 -translate-y-1/2 z-0" />
            <div
              className="hidden md:block absolute top-1/2 left-0 h-1 bg-amber-600 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(currentIdx / (milestones.length - 1)) * 100}%` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {milestones.map((m, idx) => {
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={m.id} className="flex md:flex-col items-center md:text-center gap-3 md:gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isPassed
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border border-stone-300 dark:border-stone-700'
                      } ${isCurrent ? 'ring-4 ring-amber-500/20 scale-110' : ''}`}
                    >
                      {idx < currentIdx ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div className="text-left md:text-center">
                      <span className={`text-xs font-semibold block ${isPassed ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}>
                        {m.title}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {m.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Interactive Simulated Map & Telematics HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Route Map Graphic (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between">
            
            {/* Top map toolbar */}
            <div className="p-4 bg-stone-100/90 dark:bg-stone-800/90 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                <Navigation className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="font-semibold">Refrigerated Route USA-East #08</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold tabular-numbers">
                <Thermometer className="w-4 h-4" />
                <span>Cold-Lock: {currentTracking.transitTemperature}°F (Optimal)</span>
              </div>
            </div>

            {/* Custom SVG Stylized Map Canvas with Route & Moving Sprinter Van */}
            <div className="relative h-80 sm:h-96 w-full bg-stone-200/70 dark:bg-stone-950 p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Decorative road grids */}
              <svg className="absolute inset-0 w-full h-full stroke-stone-300/60 dark:stroke-stone-800/60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Simulated Highway Curves */}
                <path
                  d="M 50 280 C 140 260, 200 180, 320 200 S 480 120, 600 90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="stroke-stone-300 dark:stroke-stone-800"
                />
                <path
                  d="M 50 280 C 140 260, 200 180, 320 200 S 480 120, 600 90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="4"
                  strokeDasharray="6,4"
                  className="animate-pulse"
                />
              </svg>

              {/* Kitchen Origin Marker */}
              <div className="absolute left-8 bottom-10 z-10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  CC
                </div>
                <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] shadow-xs">
                  <span className="font-bold block">Executive Kitchen</span>
                  <span className="text-stone-500">Departed 7:40 AM</span>
                </div>
              </div>

              {/* Destination Dropoff Marker */}
              <div className="absolute right-8 top-10 z-10 flex items-center gap-2">
                <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] shadow-xs text-right">
                  <span className="font-bold block">Your Doorstep</span>
                  <span className="text-stone-500">{currentTracking.destination.address}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Moving Van Marker (computed based on simulated progress) */}
              <div 
                className="absolute z-20 flex flex-col items-center transition-all duration-700"
                style={{
                  left: `${simulatedProgress}%`,
                  top: `${Math.max(25, 80 - simulatedProgress * 0.65)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="bg-amber-600 text-white p-2.5 rounded-full shadow-2xl ring-4 ring-amber-500/30 animate-bounce">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="mt-1 bg-stone-950/90 text-white px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md">
                  {currentTracking.status === 'delivered' ? 'Arrived!' : '3 Stops Away'}
                </div>
              </div>

              {/* Live HUD Floating Over Map */}
              <div className="absolute bottom-4 right-4 z-10 glass-panel p-3 rounded-xl shadow-md text-xs">
                <div className="text-[11px] text-stone-500 dark:text-stone-400">Current GPS Vector</div>
                <div className="font-semibold text-stone-900 dark:text-stone-100">
                  {currentTracking.currentLocation.address}
                </div>
              </div>

            </div>

            {/* Bottom Status strip */}
            <div className="p-4 bg-white/70 dark:bg-stone-900/70 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-stone-600 dark:text-stone-400">Estimated Delivery:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{currentTracking.estimatedDeliveryWindow}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Insulated Cotton Cooler Packaging</span>
              </div>
            </div>

          </div>

          {/* Right Column: Driver Profile, Telematics & Driver Instructions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Driver Profile Card */}
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-stone-200/80 dark:border-stone-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3">
                Assigned Delivery Driver
              </span>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  MT
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    {currentTracking.driverName}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    4.9★ Certified Cold-Chain Specialist · 1,420+ Deliveries
                  </p>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                    {currentTracking.driverVehicle}
                  </p>
                </div>
              </div>

              {/* Call driver affordance */}
              <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                <a
                  href={`tel:${currentTracking.driverPhone}`}
                  className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Driver ({currentTracking.driverPhone})</span>
                </a>
                <span className="text-[11px] text-stone-400">Monitored Line</span>
              </div>
            </div>

            {/* Doorstep Delivery Notes Form */}
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                  Driver Dropoff Instructions
                </h4>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
                Specify gate codes, side-door preferences, or cooler placement.
              </p>

              <form onSubmit={handleSaveDriverNote} className="space-y-3">
                <input
                  type="text"
                  value={driverNote}
                  onChange={(e) => setDriverNote(e.target.value)}
                  placeholder="e.g. Leave behind front porch flower pot. Ring bell once."
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  {noteSent ? 'Note Sent to Driver Marcus!' : 'Send Instruction to Driver'}
                </button>
              </form>
            </div>

            {/* Delivery Timeline History */}
            <div className="glass-panel p-6 rounded-3xl shadow-xl border border-stone-200/80 dark:border-stone-800">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-4">
                Full Milestone Audit Log
              </h4>

              <div className="space-y-4">
                {currentTracking.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 ${step.completed ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'}`} />
                      {idx < currentTracking.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-stone-200 dark:bg-stone-800 my-1" />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{step.title}</span>
                        <span className="text-[11px] text-stone-400 tabular-numbers">({step.time})</span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
