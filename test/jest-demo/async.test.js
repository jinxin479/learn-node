import fetchUser from "./async";
test('User fetched userId should be 1', async () => {
    expect.assertions(1)
    const data = await fetchUser()
    expect(data.userId).toEqual(1)
  })
  