describe("연습용", () => {
  it("1) 2+2 = 4", () => {
    expect(2 + 2).toBe(4);
  });
  it("2) 1+2 = 4가 아니어야 맞음", () => {
    expect(1 + 2).not.toBe(4);
  });
});
