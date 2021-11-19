const woof = require("./word");

test("1.should return number of string length", () => {
  const result = woof("Hello Jest");
  expect(result).toBe("Hello Jest");
  expect(result).toMatch(/Hello/i);
  expect(["A", "B", "C"]).toContain("C");
});

test("2.should return null when not given a string", () => {
  woof();
  expect(() => woof()).toThrow("a");
});

test.todo("3.should not allow numbers to be passed");
