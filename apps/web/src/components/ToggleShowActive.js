const ToggleShowActive = (props) => (
  <div>
    <br />
    <label htmlFor="showActive" className="toggle-show-active">
      <p>Show active tenders only </p>
      <input
        type="checkbox"
        checked={props.onlyShowActive}
        onChange={props.toggleOnlyShowActive}
        id="showActive"
      />
      <p>click to toggle (clears results and selections)</p>
    </label>
    <br />
  </div>
);

export default ToggleShowActive;
