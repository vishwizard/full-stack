const StudentCard = ({ name, roll, course }) => (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-xs w-full mx-2 my-4">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
    <p className="text-gray-700 mb-1">Roll: <span className="font-semibold">{roll}</span></p>
    <p className="text-gray-700">Course: <span className="font-semibold">{course}</span></p>
  </div>
);

export default StudentCard;
