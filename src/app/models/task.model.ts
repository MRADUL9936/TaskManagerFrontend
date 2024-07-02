

export interface Task {
    _id: String,
    title: String,
    description: String,
    due_date: Date, // Convert due_date to a Date object if needed
    priority_level: String,
    status: String,
    editable: boolean,
    createdAt: Date, // Convert createdAt to a Date object if needed
    updatedAt: Date, // Convert updatedAt to a Date object if needed
    __v: number
}


