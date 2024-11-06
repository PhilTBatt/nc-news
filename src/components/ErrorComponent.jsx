export function ErrorComponent({ msg, status }) {
  return (
    <div>
      <h1> {status}: {msg}</h1>
    </div>
  )
}