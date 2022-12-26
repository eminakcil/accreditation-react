const SurveyForm = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-gray-700">Input (text)</span>
          <input
            type="text"
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (email)</span>
          <input
            type="email"
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (email, multiple)</span>
          <input
            type="email"
            multiple
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (password)</span>
          <input
            type="password"
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (date)</span>
          <input
            type="date"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (datetime-local)</span>
          <input
            type="datetime-local"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (month)</span>
          <input
            type="month"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (number)</span>
          <input
            type="number"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (search)</span>
          <input
            type="search"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (time)</span>
          <input
            type="time"
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (week)</span>
          <input
            type="week"
            className="form-input mt-1 block w-full"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-gray-700">Input (tel)</span>
          <input
            type="tel"
            multiple
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Input (url)</span>
          <input
            type="url"
            multiple
            className="form-input mt-1 block w-full"
            placeholder="john@example.com"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Select</span>
          <select className="form-select block w-full mt-1">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Select (multiple)</span>
          <select
            className="form-multiselect block w-full mt-1"
            multiple
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Textarea</span>
          <textarea
            className="form-textarea mt-1 block w-full h-24"
            rows="3"
            placeholder="Enter some long form content."
          ></textarea>
        </label>
        <fieldset className="block">
          <legend className="text-gray-700">Checkboxes</legend>
          <div className="mt-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-checkbox"
                  type="checkbox"
                  checked
                />
                <span className="ml-2">Option 1</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-checkbox"
                  type="checkbox"
                />
                <span className="ml-2">Option 2</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-checkbox"
                  type="checkbox"
                />
                <span className="ml-2">Option 3</span>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="block">
          <legend className="text-gray-700">Radio Buttons</legend>
          <div className="mt-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-radio"
                  type="radio"
                  checked
                  name="radio-direct"
                  value="1"
                />
                <span className="ml-2">Option 1</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-radio"
                  type="radio"
                  name="radio-direct"
                  value="2"
                />
                <span className="ml-2">Option 2</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  className="form-radio"
                  type="radio"
                  name="radio-direct"
                  value="3"
                />
                <span className="ml-2">Option 3</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  )
}
export default SurveyForm
