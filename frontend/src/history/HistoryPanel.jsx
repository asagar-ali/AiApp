
import "react"
import {useState, useEffect, useCallback} from "react"
import {MCQChallenge} from "../challenge/MCQChallenge.jsx";
import {useApi} from "../utils/api.js";

export function HistoryPanel() {
    const {makeRequest} = useApi()
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchHistory = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("my-history")
            console.log(data)
            setHistory(data.challenges)
        } catch (err) {
            setError("Failed to load history.")
        } finally {
            setIsLoading(false)
        }
    }, [makeRequest])

    useEffect(() => {
        fetchHistory()
    }, [fetchHistory])

    if (isLoading) {
        return (
            <div className="loading">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p>Loading your challenge history...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchHistory} className="btn btn-secondary">
                    Try Again
                </button>
            </div>
        )
    }

    return <div className="history-panel">
        <div className="history-header">
            <h2>Your Challenge History</h2>
            <p>Review your past coding challenges and explanations</p>
        </div>

        {history.length === 0 ? (
            <div className="empty-state">
                <div className="empty-state-content">
                    <h3>No challenges yet</h3>
                    <p>Start generating challenges to build your history!</p>
                </div>
            </div>
        ) : (
            <div className="history-list">
                {history.map((challenge) => (
                    <div key={challenge.id} className="history-item">
                        <MCQChallenge
                            challenge={challenge}
                            showExplanation={true}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
}
