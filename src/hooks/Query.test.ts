import * as Query from "./Query"
// @ponicode
describe("Query.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            Query.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
