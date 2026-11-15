import React, { useState } from 'react';
import { Bell, X, CheckCircle2, Truck, Sparkles, Tag, ArrowRight, Volume2, Shield } from 'lucide-react';
import { AppNotification } from '../types/meal';

interface PushNotificationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onSelectAction: (url: string) => void;
  onTriggerSimulatedNotification: (type: 'delivery' | 'order' | 'promotion') => void;
}

export const PushNotificationManager: React.FC<PushNotificationManagerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectAction,
  onTriggerSimulatedNotification
}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionPrompted, setPermissionPrompted] = useState(false);

  const handleRequestPushPermission = async () => {
    setPermissionPrompted(true);
    if ('Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setPermissionGranted(true);
          new Notification('The Flavor House Push Notifications Enabled!', {
            body: 'You will receive timely updates on chef preparation, cold-van dispatch, and exclusive weekly menu reveals.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        // Fallback for iframe restrictions
        setPermissionGranted(true);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200/80 dark:border-stone-800 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
                Push Notifications
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Timely updates on cold delivery and chef specials
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Close notifications drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Banner */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Real-Time Push Alerts
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Get notified the minute driver Marcus is 2 stops away or when our weekly menu changes.
              </p>
            </div>
            {!permissionGranted && (
              <button
                onClick={handleRequestPushPermission}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer shadow-xs"
              >
                Enable
              </button>
            )}
            {permissionGranted && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Active
              </span>
            )}
          </div>
        </div>

        {/* Interactive Push Simulator for Testing */}
        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/50 dark:border-amber-900/40">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-2">
            Interactive Push Event Simulator:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onTriggerSimulatedNotification('delivery')}
              className="p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:border-amber-600 cursor-pointer flex flex-col items-center gap-1 text-center"
            >
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>Van Dispatched</span>
            </button>

            <button
              onClick={() => onTriggerSimulatedNotification('order')}
              className="p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:border-amber-600 cursor-pointer flex flex-col items-center gap-1 text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Menu Rotation</span>
            </button>

            <button
              onClick={() => onTriggerSimulatedNotification('promotion')}
              className="p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:border-amber-600 cursor-pointer flex flex-col items-center gap-1 text-center"
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Promo Deal</span>
            </button>
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                notif.read
                  ? 'bg-stone-50/50 dark:bg-stone-800/30 border-stone-200 dark:border-stone-800 opacity-80'
                  : 'bg-white dark:bg-stone-800 border-amber-600/40 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {notif.title}
                </h4>
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                {notif.message}
              </p>
              {notif.actionUrl && (
                <button
                  onClick={() => {
                    onSelectAction(notif.actionUrl!);
                    onClose();
                  }}
                  className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200/80 dark:border-stone-800 flex justify-between items-center text-xs">
          <button
            onClick={onMarkAllAsRead}
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 font-semibold cursor-pointer"
          >
            Mark all as read
          </button>
          <span className="text-stone-400 text-[11px]">The Flavor House Alerts System</span>
        </div>

      </div>
    </div>
  );
};
