import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App"


describe('Applicattion Test cases', () => {
    it('renders the app', () => {
        render(<App />)
        expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
    })
})