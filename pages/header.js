import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
    </div>
  );
}
