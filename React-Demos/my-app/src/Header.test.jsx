import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import Header from "./Header"


describe('Header Test cases', () => {
    let element
    beforeEach(() => {
        element = document.createElement("div")
        document.body.appendChild(element)
    })

    it('renders the app', () => {
        render(<Header />)
        expect(screen.getByText(/React Testing/i)).toBeInTheDocument()
    })

    it('Header component should have navbar-brand css class', () => {
        render(<Header />)
        expect(screen.getByTestId("brand")).toHaveClass('navbar-brand')
    })

    it('Header component should have navbar with 8 hyperlinks', () => {
        act(() => {
            createRoot(element).render(<Header />)
        })
        const count = element.querySelectorAll("a").length
        expect(count).toBe(8)
    })

})