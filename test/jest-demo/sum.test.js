import sum from "./sum";
test("add 1 +2 to equals 3",()=>{
    expect(sum(1,2)).toBe(3)
})
test("add 1 +2 to not equals 4",()=>{
    expect(sum(1,2)).not.toBe(4)
})