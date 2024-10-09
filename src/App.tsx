import './App.css'
import {useEffect, useState} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type Task = {
  title: string;
  date: string;
};

const TASKS_STORAGE_KEY = "tasks_db";

function App() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const localStorageTasks: Task[] = JSON.parse(
        localStorage.getItem(TASKS_STORAGE_KEY) || "[]"
    );
    setTasks(localStorageTasks);
    setTasksLoaded(true);
  }, [])

  useEffect(() => {
    if (tasksLoaded) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, tasksLoaded]);

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

    const newTask = { title, date };
    setTasks((prevTasks) => [...prevTasks, newTask])

    // Réinitialiser les champs
    setTitle('');
    setDate('');

    // Afficher un message de succès
    setMessage('Tâche ajouté avec succès')
    setTimeout(() => {
      setMessage('');
    }, 3000);
    return;
  }

  const localizer = momentLocalizer(moment)

  return (
    <>
      <h1 className="text-blue-400 flex justify-center text-4xl font-bold underline decoration-wavy cursor-cell mx-auto animate-bounce">Cahier de texte</h1>
      <form className="flex flex-col space-y-2 max-w-80 border p-6 shadow-lg mx-auto mt-12 rounded-sm" onSubmit={handleSubmit}>
        <input
            type="text"
            data-cy="title-task-input"
            className="border p-2"
            placeholder="Titre de la tâche"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
        <input
            type="date"
            data-cy="date-task-input"
            className="border p-"
            onChange={(e) => setDate(e.target.value)}
            value={date}
        />
        <button
            type="submit"
            data-cy="submit-task-button"
            className="cursor-crosshair border-2 bg-blue-400 mx-lg rounded-md">
          Valider
        </button>
      </form>
      {message && (
          <div className="text-blue-400 p-2 text-center mt-2">{message}</div>
      )}

      <Calendar
          className="flex flex-col space-y-2 w-10/12 border p-6 shadow-lg mx-auto mt-12 rounded-sm"
          localizer={localizer}
          events={tasks.map((t) => ({
            title: t.title,
            start: t.date,
            end: t.date,
            allDay: true,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
      />

      {/*<pre>*/}
      {/*  <code className="animate-pulse">*/}
      {/*    {JSON.stringify(*/}
      {/*        {*/}
      {/*          title,*/}
      {/*          date,*/}
      {/*        },*/}
      {/*        null,*/}
      {/*        2*/}
      {/*    )}*/}
      {/*  </code>*/}
      {/*</pre>*/}
    </>
  )
}

export default App
