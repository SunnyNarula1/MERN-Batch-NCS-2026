const { sayHello, fetchDataAsync } = require('../script')
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')

chai.use(chaiAsPromised)
const { assert } = chai


describe("Unit tests", () => {
    it('Should return a hello message', () => {
        let result = sayHello('John')
        assert.equal(result, 'Hello John')
    })
})

describe("Async behaviour testing", () => {
    it("resolves with the given value", async () => {
        // assert.equal(await fetchDataAsync("payload"), "payload")
        await assert.eventually.strictEqual(fetchDataAsync("payload"), "payload")
    })

    it("reject with an error", async () => {
        await assert.isRejected(fetchDataAsync(null, true), "Fetch failed")
    })
})