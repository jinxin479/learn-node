import isNull from "./isNull";
test("to be null",()=>{
    expect(isNull(null)).toBeNull()
})

test("to be false",()=>{
    expect(undefined).toBeFalsy()
})
