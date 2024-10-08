import './App.css'
import {useState} from "react";

type Task = {
  title: string;
  date: string;
};

const TASKS_STORAGE_KEY = "tasks_db";

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("title : ", title);
    console.log("date : ", date);

    if (!title || !date) {
      setMessage('Veuillez remplir tous les champs !')
      setTimeout(() => {
        setMessage('');
      }, 3000)
      return;
    }

    // Enregistrer la tâche dans le local storage

    const tasks: Task[] = JSON.parse(
        localStorage.getItem(TASKS_STORAGE_KEY) || "[]"
    );
    tasks.push({ title, date });
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

    // Réinitialiser les champs
    setTitle('');
    setDate('');

    // Afficher un message de succès
    setMessage('Message ajouté avec succès')
    setTimeout(() => {
      setMessage('');
    }, 3000);
    return;
  }

  return (
    <>
      <h1 className="text-blue-400 flex justify-center text-4xl font-bold underline decoration-wavy animate-spin cursor-cell">Cahier de texte</h1>
      <form className="flex flex-col space-y-2 max-w-80 border p-6 shadow-lg mx-auto mt-12 rounded-sm animate-bounce" onSubmit={handleSubmit}>
        <input
            type="text"
            className="border p-2"
            placeholder="Titre de la tâche"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
        <input
            type="date"
            className="border p-2"
            onChange={(e) => setDate(e.target.value)}
            value={date}
        />
        <button type="submit" className="cursor-crosshair">
          Valider
        </button>
      </form>
      {message && (
          <div className="text-blue-400 p-2 text-center mt-2">{message}</div>
      )}
      <pre>
        <code className="animate-pulse">
          {JSON.stringify(
              {
                title,
                date,
              },
              null,
              2
          )}
        </code>
      </pre>
    </>
  )
}

export default App