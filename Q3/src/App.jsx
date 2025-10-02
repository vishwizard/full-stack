// App.jsx
import StudentCard from './StudentCard';

const students = [
  { name: 'Vishal Dey', roll: '23BCS12543', course: 'B.Tech CSE' },
  { name: 'Charu Singla', roll: '23BCS12553', course: 'B.Tech IT' },
  { name: 'Naman Luthra', roll: '23BCS11036', course: 'B.Tech ECE' },
  { name: 'Tarun Agarwal', roll: '23BCS12598', course: 'B.Tech CSE' },
];

function App() {
  return (
    <div className="flex flex-wrap justify-center mt-10 bg-gray-200">
      {students.map((student) => (
        <StudentCard
          key={student.roll}
          name={student.name}
          roll={student.roll}
          course={student.course}
        />
      ))}
    </div>
  );
}

export default App;
