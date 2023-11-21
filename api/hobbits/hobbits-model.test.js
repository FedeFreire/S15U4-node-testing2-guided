const Hobbit = require("./hobbits-model.js");
const db = require("../../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("get all", () => {
  test("get all hobbits", async () => {
    const result = await Hobbit.getAll();
    expect(result).toHaveLength(4);
    expect(result[0].name).toBe("sam");
    expect(result[1].name).toBe("frodo");
    expect(result[2].name).toBe("pippin");
    expect(result[3].name).toBe("merry");
  });

  describe("get by id", () => {
    test("get hobbit by id", async () => {
      let result = await Hobbit.getById(1);
      expect(result).toMatchObject({ name: "sam" });
      result = await Hobbit.getById(2);
      expect(result).toMatchObject({ name: "frodo" });
      result = await Hobbit.getById(3);
      expect(result).toMatchObject({ name: "pippin" });
      result = await Hobbit.getById(4);
      expect(result).toMatchObject({ name: "merry" });
    });
  });
  describe("insert", () => {
    const bilbo = { name: "bilbo" };

    test('resolve to the newly created hobbit', async () => {
        const hobbit = await Hobbit.insert(bilbo)
        expect(hobbit).toMatchObject(bilbo)
        }
    )
    test('insert the hobbit into the db', async () => {
        await Hobbit.insert(bilbo)
        const hobbits = await db('hobbits').select()
        expect(hobbits).toHaveLength(5)
        }
    )
  });
});
