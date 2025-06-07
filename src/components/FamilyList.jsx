import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs } from '../firebase/config';

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'families'));
        const familiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFamilies(familiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching families: ', error);
        setLoading(false);
      }
    };

    fetchFamilies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Family List
      </h1>
      
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
      >
        Add New Family
      </button>
      
      {families.length === 0 ? (
        <div className="text-center text-gray-600">
          No family records found. Please add a new family.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {families.map(family => (
            <div key={family.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {family.firstName} {family.lastName}
                </h2>
                {/* Rest of the family details display */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyList;