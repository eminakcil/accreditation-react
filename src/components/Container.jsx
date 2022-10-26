const Container = ({ children }) => {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-full max-w-3xl rounded-xl border-solid border border-gray-200 shadow-2xl p-3">
        {children}
      </div>
    </div>
  )
}
export default Container
