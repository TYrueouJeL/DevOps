const now = new Date();

export default [
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2024, 10, 9),
        end: new Date(2024, 10, 12),
    },
    {
        id: 2,
        title: 'Some Event',
        start: new Date(2024, 10, 9, 12, 0, 0),
        end: new Date(2024, 10, 9, 15, 30, 0),
    },
    {
        id: 3,
        title: "Aujourd'hui",
        start: now,
        end: now,
    }
]