import React, { useReducer, useState } from "react";

// Initial form state
const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: { latitude: "", longitude: "" }
  },
  courses_offered: []
};

// Reducer function
function formReducer(state, action) {
  switch (action.type) {
    case "update_field":
      return {
        ...state,
        [action.field]: action.value
      };

    case "update_nested_field":
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value
        }
      };

    case "update_deep_nested_field":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value
            }
          }
        }
      };

    case "update_city":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            name: action.value,
            locality: { ...state.address.city.locality }
          }
        }
      };

    case "update_coordinates":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.field]: action.value
          }
        }
      };

    case "update_courses":
      return {
        ...state,
        courses_offered: action.value.split(",").map((c) => c.trim())
      };

    case "reset":
      return initialState;

    default:
      throw new Error("invalid action type");
  }
}
const handleSubmit = (e) => {
  e.preventDefault();
  setSubmittedData(state);
};
export default function CollegeForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
    setError("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", border: "1px solid gray", borderRadius: "10px" }}>
      <h2>College Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          College Name:
          <input
            type="text"
            value={formState.name}
            onChange={(e) =>
              dispatch({ type: "update_field", field: "name", value: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Establishment Year:
          <input
            type="text"
            value={formState.establishment_year}
            onChange={(e) =>
              dispatch({ type: "update_field", field: "establishment_year", value: e.target.value })
            }
          />
        </label>
        <br />

        <h3>Address Details</h3>
        <label>
          Building:
          <input
            type="text"
            value={formState.address.building}
            onChange={(e) =>
              dispatch({
                type: "update_nested_field",
                parent: "address",
                field: "building",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          Street:
          <input
            type="text"
            value={formState.address.street}
            onChange={(e) =>
              dispatch({
                type: "update_nested_field",
                parent: "address",
                field: "street",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          City:
          <input
            type="text"
            value={formState.address.city.name}
            onChange={(e) =>
              dispatch({ type: "update_city", value: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Pincode:
          <input
            type="text"
            value={formState.address.city.locality.pinCode}
            onChange={(e) =>
              dispatch({
                type: "update_deep_nested_field",
                field: "pinCode",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          Landmark:
          <input
            type="text"
            value={formState.address.city.locality.landmark}
            onChange={(e) =>
              dispatch({
                type: "update_deep_nested_field",
                field: "landmark",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          State:
          <input
            type="text"
            value={formState.address.state}
            onChange={(e) =>
              dispatch({
                type: "update_nested_field",
                parent: "address",
                field: "state",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          Latitude:
          <input
            type="text"
            value={formState.address.coordinates.latitude}
            onChange={(e) =>
              dispatch({
                type: "update_coordinates",
                field: "latitude",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          Longitude:
          <input
            type="text"
            value={formState.address.coordinates.longitude}
            onChange={(e) =>
              dispatch({
                type: "update_coordinates",
                field: "longitude",
                value: e.target.value
              })
            }
          />
        </label>
        <br />

        <label>
          Courses Offered (comma separated):
          <input
            type="text"
            value={formState.courses_offered.join(", ")}
            onChange={(e) =>
              dispatch({ type: "update_courses", value: e.target.value })
            }
          />
        </label>
        <br />

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {submitted && (
        <div style={{ marginTop: "20px", padding: "1rem", border: "1px solid green" }}>
          <h3>Submitted College Data</h3>
          <pre>{JSON.stringify(formState, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
