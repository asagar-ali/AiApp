import "react"
import {SignIn, SignUp, SignedIn, SignedOut} from "@clerk/clerk-react"

export function AuthenticationPage() {
    return <div className="auth-container">
        <div className="auth-wrapper">
            <div className="auth-header">
                <h1>Welcome to Code Challenge Generator</h1>
                <p>Sign in to start testing your coding knowledge with AI-generated challenges</p>
            </div>

            <SignedOut>
                <div className="auth-forms">
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        redirectUrl="/"
                        appearance={{
                            elements: {
                                formButtonPrimary: 'btn btn-primary',
                                card: 'auth-card',
                                headerTitle: 'auth-title',
                                headerSubtitle: 'auth-subtitle'
                            }
                        }}
                    />
                    <SignUp
                        routing="path"
                        path="/sign-up"
                        redirectUrl="/"
                        appearance={{
                            elements: {
                                formButtonPrimary: 'btn btn-primary',
                                card: 'auth-card',
                                headerTitle: 'auth-title',
                                headerSubtitle: 'auth-subtitle'
                            }
                        }}
                    />
                </div>
            </SignedOut>

            <SignedIn>
                <div className="redirect-message">
                    <h2>You are already signed in!</h2>
                    <p>Redirecting you to your dashboard...</p>
                </div>
            </SignedIn>
        </div>
    </div>
}