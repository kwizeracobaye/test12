import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { InputForm } from '../components/student/InputForm';
import { InfoDisplay } from '../components/student/InfoDisplay';
import { MovementData } from '../types/movement';

export function StudentMovement() {
  const [movements, setMovements] = React.useState<MovementData[]>(() => {
    const saved = localStorage.getItem('movements');
    return saved ? JSON.parse(saved) : [];
  });
  const [editData, setEditData] = React.useState<MovementData>();

  React.useEffect(() => {
    localStorage.setItem('movements', JSON.stringify(movements));
  }, [movements]);

  const handleSubmit = (data: Omit<MovementData, 'id'> & { id?: string }) => {
    if (data.id) {
      setMovements(movements.map(item => 
        item.id === data.id ? { ...data, id: data.id } as MovementData : item
      ));
      setEditData(undefined);
    } else {
      setMovements([...movements, { ...data, id: crypto.randomUUID() } as MovementData]);
    }
  };

  const handleEdit = (data: MovementData) => {
    setEditData(data);
  };

  const handleDelete = (id: string) => {
    setMovements(movements.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-4 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Movement Plan</h1>
          <div className="text-right text-xs">
            <p>Created by Kwizera</p>
            <p>0781845528</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {editData ? 'Edit Movement' : 'Add New Movement'}
            </h2>
            <InputForm 
              onSubmit={handleSubmit}
              editData={editData}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <InfoDisplay
              info={movements}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}