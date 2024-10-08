import './App.css'
import {useState} from "react";

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

    // TODO enregistrer la tâche dans le local storage

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
      <h1 className="text-blue-400 flex justify-center text-4xl font-bold underline animate-spin">Cahier de texte</h1>
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
        <button type="submit">
          Valider
        </button>
        {message && (
            <div className="text-blue-400 p-2 text-center mt-2">{message}</div>
        )}
      </form>
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
