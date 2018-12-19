
import createUser from "./toEqual";
test('User should be Brad Traversy object', () => {
    expect(createUser()).toEqual({
      firstName: 'Brad',
      lastName: 'Traversy'
    });
    // 数值对比
expect(8).toBeGreaterThan(7)
expect(7).toBeGreaterThanOrEqual(7)
expect(6).toBeLessThan(7)
expect(6).toBeLessThanOrEqual(6)

// Regex 正则匹配
expect('team').not.toMatch(/I/i)

// Arrays
expect(['john', 'karen', 'admin']).toContain('admin');

  });
  