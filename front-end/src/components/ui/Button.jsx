export function Button({ onClick, children }) {
  return (
    <button
      className="bg-red-500 px-4 py-1 rounded-md my-2 disabled:bg-gray-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
