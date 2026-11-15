import React, { useState } from 'react';
import { Calendar, Plus, Users, Clock, X, Phone, Mail, AlertCircle } from 'lucide-react';
import {
  RestaurantTable,
  TableReservation,
  TableStatus,
  StaffMember,
  AdminRole
} from '../../types/admin';
import { TODAY_ISO } from '../../data/mockAdmin';

interface AdminTablesSectionProps {
  tables: RestaurantTable[];
  reservations: TableReservation[];
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  onAddReservation: (res: TableReservation) => void;
  onUpdateReservationStatus: (resId: string, status: TableReservation['status']) => void;
}

const CALENDAR_DATES = [
  { iso: '2026-11-15', label: 'Sun, Nov 15 (Today)' },
  { iso: '2026-11-16', label: 'Mon, Nov 16' },
  { iso: '2026-11-17', label: 'Tue, Nov 17' },
  { iso: '2026-11-18', label: 'Wed, Nov 18' }
];

export const AdminTablesSection: React.FC<AdminTablesSectionProps> = ({
  tables,
  reservations,
  onUpdateTableStatus,
  onAddReservation,
  onUpdateReservationStatus
}) => {
  const [selectedDate, setSelectedDate] = useState(TODAY_ISO);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Reservation State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resGuests, setResGuests] = useState('4');
  const [resTableId, setResTableId] = useState(tables[0]?.id || 'tbl-1');
  const [resDate, setResDate] = useState(TODAY_ISO);
  const [resTime, setResTime] = useState('07:00 PM');
  const [resNotes, setResNotes] = useState('');

  const dateReservations = reservations.filter((r) => r.dateISO === selectedDate);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim()) return;
    const targetTable = tables.find((t) => t.id === resTableId);
    const created: TableReservation = {
      id: `res-${Date.now()}`,
      tableId: resTableId,
      tableNumber: targetTable?.tableNumber || 'T1',
      customerName: resName.trim(),
      customerPhone: resPhone.trim() || '+1 (504) 555-0100',
      customerEmail: resEmail.trim() || 'guest@example.com',
      guests: parseInt(resGuests, 10) || 2,
      dateISO: resDate,
      timeSlot: resTime,
      notes: resNotes.trim() || undefined,
      status: 'confirmed'
    };

    onAddReservation(created);
    if (resDate === TODAY_ISO) {
      onUpdateTableStatus(resTableId, 'reserved');
    }
    setResName('');
    setResPhone('');
    setResEmail('');
    setResNotes('');
    setIsAddOpen(false);
    setSelectedDate(resDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Tables &amp; Reservations
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Manage dining room floor tables, view booking calendar slots, and track customer reservation details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Floor Table Grid */}
      <div>
        <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 mb-3">
          Dining Floor Table List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
                    Table {table.tableNumber}
                  </span>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {table.zone} · {table.seats} Seats
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                    table.status === 'available'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                      : table.status === 'occupied'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                      : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                  }`}
                >
                  {table.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-500 dark:text-stone-400 truncate">
                  {table.assignedServer || 'Unassigned'}
                </span>
                <select
                  value={table.status}
                  onChange={(e) => onUpdateTableStatus(table.id, e.target.value as TableStatus)}
                  className="px-2 py-1 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Calendar & Customer Details */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50">
              Booking Calendar &amp; Customer Details
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            {CALENDAR_DATES.map((d) => (
              <button
                key={d.iso}
                type="button"
                onClick={() => setSelectedDate(d.iso)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDate === d.iso
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {dateReservations.length === 0 ? (
          <div className="py-10 text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            No table bookings scheduled for {selectedDate}. Click “New Reservation” to add one.
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {dateReservations.map((res) => (
              <div key={res.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                      {res.timeSlot}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Table {res.tableNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-stone-600 dark:text-stone-300">
                      <Users className="w-3.5 h-3.5" />
                      {res.guests} Guests
                    </span>
                  </div>
                  <p className="font-serif font-bold text-base text-stone-900 dark:text-stone-50">
                    {res.customerName}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {res.customerPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {res.customerEmail}
                    </span>
                  </div>
                  {res.notes && (
                    <p className="text-xs italic text-stone-600 dark:text-stone-300 pt-0.5">
                      Note: {res.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={res.status}
                    onChange={(e) =>
                      onUpdateReservationStatus(res.id, e.target.value as TableReservation['status'])
                    }
                    className="px-3 py-1.5 text-xs font-semibold bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="seated">Seated</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Reservation Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Book Table Reservation
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    placeholder="+1 (504) 555-0190"
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Date
                  </label>
                  <select
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    {CALENDAR_DATES.map((d) => (
                      <option key={d.iso} value={d.iso}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Party Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Table Assignment
                  </label>
                  <select
                    value={resTableId}
                    onChange={(e) => setResTableId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        Table {t.tableNumber} ({t.zone} · {t.seats} seats)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resEmail}
                    onChange={(e) => setResEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Dietary / Seating Notes
                </label>
                <input
                  type="text"
                  value={resNotes}
                  onChange={(e) => setResNotes(e.target.value)}
                  placeholder="Optional allergies or celebration notes"
                  className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface AdminStaffSectionProps {
  staff: StaffMember[];
  userRole: AdminRole;
  onAddStaff: (member: StaffMember) => void;
  onUpdateStaffStatus: (staffId: string, status: StaffMember['status']) => void;
}

export const AdminStaffSection: React.FC<AdminStaffSectionProps> = ({
  staff,
  userRole,
  onAddStaff,
  onUpdateStaffStatus
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Server');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rate, setRate] = useState('24');

  const canManageStaff = userRole === 'owner' || userRole === 'manager';

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: StaffMember = {
      id: `st-${Date.now()}`,
      name: name.trim(),
      role,
      accessLevel: role === 'Owner' ? 'owner' : role === 'Manager' ? 'manager' : role === 'Cashier' ? 'cashier' : 'service',
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@theflavorhouse.com`,
      phone: phone.trim() || '+1 (504) 555-0155',
      status: 'scheduled',
      hourlyRate: parseFloat(rate) || 22,
      shifts: {
        Mon: '10a–6p',
        Tue: '10a–6p',
        Wed: '10a–6p',
        Thu: 'Off',
        Fri: '12p–8p',
        Sat: '12p–8p',
        Sun: 'Off'
      }
    };

    onAddStaff(newMember);
    setName('');
    setEmail('');
    setPhone('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Staff Directory &amp; Shift Schedules
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Review kitchen, service, and management roles alongside weekly shift schedules.
          </p>
        </div>

        {canManageStaff && (
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        )}
      </div>

      {!canManageStaff && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Cashier role can view active shift schedules. Switch to Owner or Manager to add staff or edit rosters.</span>
        </div>
      )}

      {/* Weekly Shift Schedule Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 text-stone-500 dark:text-stone-400">
                <th className="py-3 px-4 font-medium">Team Member &amp; Role</th>
                <th className="py-3 px-3 font-medium">Duty Status</th>
                {userRole === 'owner' && <th className="py-3 px-3 font-medium text-right">Rate</th>}
                <th className="py-3 px-2.5 font-medium">Mon</th>
                <th className="py-3 px-2.5 font-medium">Tue</th>
                <th className="py-3 px-2.5 font-medium">Wed</th>
                <th className="py-3 px-2.5 font-medium">Thu</th>
                <th className="py-3 px-2.5 font-medium">Fri</th>
                <th className="py-3 px-2.5 font-medium">Sat</th>
                <th className="py-3 px-2.5 font-medium">Sun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/30">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {member.role} · {member.phone}
                    </p>
                  </td>
                  <td className="py-3 px-3">
                    {canManageStaff ? (
                      <select
                        value={member.status}
                        onChange={(e) =>
                          onUpdateStaffStatus(member.id, e.target.value as StaffMember['status'])
                        }
                        className="px-2 py-1 rounded-lg text-xs font-semibold bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
                      >
                        <option value="on-shift">On Shift</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="off-duty">Off Duty</option>
                      </select>
                    ) : (
                      <span className="font-semibold capitalize text-stone-700 dark:text-stone-300">
                        {member.status}
                      </span>
                    )}
                  </td>
                  {userRole === 'owner' && (
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-stone-800 dark:text-stone-200">
                      {member.hourlyRate > 0 ? `$${member.hourlyRate}/hr` : 'Salary'}
                    </td>
                  )}
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map((day) => (
                    <td
                      key={day}
                      className={`py-3 px-2.5 font-mono whitespace-nowrap ${
                        member.shifts[day] === 'Off'
                          ? 'text-stone-400 dark:text-stone-600'
                          : 'text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      {member.shifts[day]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Add Staff Member</span>
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as StaffMember['role'])}
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Executive Chef">Executive Chef</option>
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Server">Server</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Delivery Courier">Delivery Courier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    min="12"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@theflavorhouse.com"
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (504) 555-0199"
                    className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-semibold text-stone-600 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer">
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
