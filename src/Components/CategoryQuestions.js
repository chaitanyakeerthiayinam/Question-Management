import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryQuestions() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionsByCategory();
  }, [category]);

  const fetchQuestionsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/questions?category=${category}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions by category', error);
    }
  };

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this question?");
    if (confirmed) {
      axios.delete(`http://localhost:5000/questions/${id}`)
        .then(() => {
          fetchQuestionsByCategory();
        })
        .catch(error => {
          console.log('There was an error deleting the question data!', error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="border-bottom pb-2 mb-0" style={{ fontWeight: 600, fontFamily: 'monospace', marginTop: 40 }}>
        Questions in {category}
      </h2>
      <div className="my-5 p-3 bg-body rounded shadow-sm">
        {questions.map((question) => (
          <div className="d-flex text-body-secondary pt-3" key={question.id}>
            <div className="pb-4 mb-0 small lh-sm border-bottom w-100">
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark" style={{ fontSize: 18, fontFamily: 'monospace' }}>
                  {question.id}: {question.questiontext}
                </strong>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => { navigate(`/readquestion/${question.id}`) }} style={{ float: "inline-end", width: 350 }}>View</button>
                <button className="btn btn-warning" onClick={() => { navigate(`/updatequestion/${question.id}`) }} style={{ float: "inline-end", width: 350 }}>Update</button>
                <button className="btn btn-danger" onClick={() => { handleDelete(question.id) }} style={{ float: "inline-end", width: 350 }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryQuestions;