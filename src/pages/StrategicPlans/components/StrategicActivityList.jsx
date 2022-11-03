const StrategicActivityList = ({ strategicActivities }) => {
  return strategicActivities.map((strategicActivity) => (
    <div
      key={strategicActivity._id}
      className="h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer"
    >
      {strategicActivity.title}
    </div>
  ))
}
export default StrategicActivityList
