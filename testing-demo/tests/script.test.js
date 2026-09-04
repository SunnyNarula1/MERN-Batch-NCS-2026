const { add, capitalize, getUser } = require('../script')

describe("Arithmetic", () => {
    test("adds two positive numbers", () => {
        let result = add(2, 3)
        // Assertion
        expect(result).toBe(5)
    })

    test("throw TypeError for non-numeric input", () => {
        expect(() => add("2", 3)).toThrow(TypeError)
        expect(() => add("2", 3)).toThrow("Both arguments must be numbers")
    })
})

describe("Strings", () => {
    test.each([
        ["hello", "Hello"],
        ["WORLD", "World"],
        ["jAvAsCRIPT", "Javascript"]
    ])("capitalize(%s) -> (%s)", (input, expected) => {
        expect(capitalize(input)).toBe(expected)
    })
})

describe("Objects & Arrays", () => {
    test("getUser returns full user object", () => {
        const user = getUser(101)
        expect(user).toEqual({ id: 101, name: "Dhiraj", roles: ["admin", "trainer"] })
        expect(user).toHaveProperty("roles.0", "admin")
    })
})


