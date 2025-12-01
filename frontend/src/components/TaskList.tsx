type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  tasks: Task[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id, !task.completed)}
          />
          {task.title}
          <button className="delete-btn" onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
