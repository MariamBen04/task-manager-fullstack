import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <div className="input-row">
        <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="New task"
        />
        <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
