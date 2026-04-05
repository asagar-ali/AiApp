import "react"
import {useState} from "react"

export function MCQChallenge({challenge, showExplanation = false}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)

    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    const getOptionClass = (index) => {
        let baseClass = "option"

        if (selectedOption === null) return baseClass

        if (index === challenge.correct_answer_id) {
            baseClass += " correct"
        }
        if (selectedOption === index && index !== challenge.correct_answer_id) {
            baseClass += " incorrect"
        }

        return baseClass
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'var(--success)'
            case 'medium': return 'var(--warning)'
            case 'hard': return 'var(--error)'
            default: return 'var(--text)'
        }
    }

    return <div className="card challenge-display">
        <div className="challenge-header">
            <div className="challenge-meta">
                <span
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                >
                    {challenge.difficulty}
                </span>
            </div>
        </div>

        <div className="challenge-content">
            <h3 className="challenge-title">{challenge.title}</h3>

            <div className="options">
                {options.map((option, index) => (
                    <button
                        className={getOptionClass(index)}
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                    >
                        <span className="option-letter">
                            {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="option-text">{option}</span>
                        {selectedOption !== null && index === challenge.correct_answer_id && (
                            <span className="option-icon">✓</span>
                        )}
                        {selectedOption === index && index !== challenge.correct_answer_id && (
                            <span className="option-icon">✗</span>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {shouldShowExplanation && selectedOption !== null && (
            <div className="explanation">
                <h4>Explanation</h4>
                <p>{challenge.explanation}</p>
            </div>
        )}
    </div>
}