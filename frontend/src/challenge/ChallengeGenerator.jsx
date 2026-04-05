
import "react"
import {useState, useEffect, useCallback} from "react"
import {MCQChallenge} from "./MCQChallenge.jsx";
import {useApi} from "../utils/api.js"

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState("easy")
    const [quota, setQuota] = useState(null)
    const {makeRequest} = useApi()

    const fetchQuota = useCallback(async () => {
        try {
            const data = await makeRequest("quota")
            setQuota(data)
        } catch (err) {
            console.log(err)
        }
    }, [makeRequest])

    useEffect(() => {
        fetchQuota()
    }, [fetchQuota])

    const generateChallenge = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("generate-challenge", {
                method: "POST",
                body: JSON.stringify({difficulty})
                }
            )
            setChallenge(data)
            fetchQuota()
        } catch (err) {
            setError(err.message || "Failed to generate challenge.")
        } finally {
            setIsLoading(false)
        }
    }

    const getNextResetTime = () => {
        if (!quota?.last_reset_data) return null
        const resetDate = new Date(quota.last_reset_data)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    return <div className="challenge-container">
        <div className="challenge-header">
            <h2>Generate New Challenge</h2>
            <p>Test your coding knowledge with AI-generated multiple choice questions</p>
        </div>

        {/* Quota Display */}
        <div className="card quota-card">
            <div className="quota-info">
                <h3>Daily Quota</h3>
                <div className="quota-stats">
                    <span className="quota-remaining">
                        {quota?.quota_remaining || 0} challenges remaining
                    </span>
                    {quota?.quota_remaining === 0 && (
                        <span className="quota-reset">
                            Next reset: {getNextResetTime()?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>

        {/* Challenge Generator Form */}
        <div className="card generator-card">
            <div className="form-group">
                <label htmlFor="difficulty">Select Difficulty Level</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <button
                onClick={generateChallenge}
                disabled={isLoading || quota?.quota_remaining === 0}
                className="btn btn-primary generate-button"
            >
                {isLoading ? (
                    <>
                        <span className="loading-spinner"></span>
                        Generating Challenge...
                    </>
                ) : (
                    "Generate Challenge"
                )}
            </button>
        </div>

        {error && (
            <div className="error-message">
                <p>{error}</p>
            </div>
        )}

        {challenge && (
            <div className="challenge-result">
                <MCQChallenge challenge={challenge}/>
            </div>
        )}
    </div>
}
