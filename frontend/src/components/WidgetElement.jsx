export function WidgetElement({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="hover:bg-yellow-100 mt-2 h-11 text-2xl font-normal text-center flex items-center pl-5"
    >
      {label}
    </div>
  );
}
