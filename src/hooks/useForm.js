import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useForm() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  function handleChange({ currentTarget }) {
    const currentUserInput = currentTarget.value;
    setUserInput(currentUserInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/movies/?query=${userInput}`);
    setUserInput("");
  }

  return [userInput, handleChange, handleSubmit];
}

export default useForm;
