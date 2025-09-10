import { useContext } from 'react'
import { FormContext } from './FormContext'
import { useNavigate } from 'react-router';

function Summary() {


    const context = useContext(FormContext);
    const navigate = useNavigate();

    if (!context) return null;
    const { formData } = context;


    return (
        <div className="p-4">
            <h1>Summary</h1>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Feedback:</strong> {formData.feedback}</p>

            <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-gray-500 text-white">
                Edit Feedback
            </button>
        </div>
    )
}

export default Summary
