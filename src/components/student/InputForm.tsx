import React from 'react';
import { Bus, Users } from 'lucide-react';

interface Props {
  onSubmit: (data: MovementFormData) => void;
  editData?: MovementData;
}

interface MovementFormData {
  id?: string;
  day: string;
  busType: string;
  capacity: number;
  className: string;
  classSize: number;
  inCharge: string;
  inChargePhone: string;
}

export function InputForm({ onSubmit, editData }: Props) {
  const [formData, setFormData] = React.useState<MovementFormData>({
    day: editData?.day || '',
    busType: editData?.busType || '',
    capacity: editData?.capacity || 0,
    className: editData?.className || '',
    classSize: editData?.classSize || 0,
    inCharge: editData?.inCharge || '',
    inChargePhone: editData?.inChargePhone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editData?.id ? { ...formData, id: editData.id } : formData);
    if (!editData) {
      setFormData({
        day: '',
        busType: '',
        capacity: 0,
        className: '',
        classSize: 0,
        inCharge: '',
        inChargePhone: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Day</label>
          <select
            required
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Type</label>
          <div className="mt-1 relative">
            <select
              required
              value={formData.busType}
              onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select type</option>
              <option value="Coaster">Coaster</option>
              <option value="Minibus">Minibus</option>
              <option value="Large Bus">Large Bus</option>
            </select>
            <Bus className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Capacity</label>
          <input
            type="number"
            required
            min="1"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Class Name</label>
          <input
            type="text"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Class Size</label>
          <div className="mt-1 relative">
            <input
              type="number"
              required
              min="1"
              value={formData.classSize}
              onChange={(e) => setFormData({ ...formData, classSize: parseInt(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <Users className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teacher in Charge</label>
          <input
            type="text"
            required
            value={formData.inCharge}
            onChange={(e) => setFormData({ ...formData, inCharge: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            required
            pattern="[0-9+\s-]+"
            value={formData.inChargePhone}
            onChange={(e) => setFormData({ ...formData, inChargePhone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="+250 7XX XXX XXX"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {editData ? 'Update Movement' : 'Add Movement'}
      </button>
    </form>
  );
}