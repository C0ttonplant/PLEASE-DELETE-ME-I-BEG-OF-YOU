hljs.highlightAll();
load();

function navigateTo(targetId) {
  document.querySelector(".page.active").classList.remove("active");
  document.getElementById(targetId).classList.add("active");
  document.querySelector(".nav-item.active").classList.remove("active");
  document
    .querySelector(`.nav-item[data-target="${targetId}"]`)
    .classList.add("active");
}

document.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    navigateTo(btn.dataset.next ?? btn.dataset.prev);
  });
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => navigateTo(item.dataset.target));
});

function load() {
  document.getElementById("ex1").innerHTML = `
def mult(a: int, b: int) -> int:
  return a * b

def test(result, expected):
    if result == expected:
        print("test passed")
    else:
        print("test failed")

test(mult(1, 1), 1)  # test passed
test(mult(1, 2), 2)  # test passed
test(mult(2, 2), 4)  # test passed
test(mult(3, 2), 6)  # test passed`;

  document.getElementById("ex2").innerHTML = `
  globalvariable = True
  is_equal = False

  def impure(a: int, b: int) -> bool:
      global globalvariable, is_equal
      globalvariable = (a == b) and not globalvariable
      is_equal = a == b
      return globalvariable

  def test(result, expected):
      if result == expected:
          print("test passed")
      else:
          print("test failed")

  test(impure(1, 1), False)  # test passed
  test(impure(1, 1), False)  # test failed
  test(impure(2, 3), False)  # test passed
  test(impure(2, 3), False)  # test failed
  `;

  document.getElementById("ex3").innerHTML = `
    globalvariable = True
    is_equal = False

    def impure(a: int, b: int) -> bool:
        global globalvariable, is_equal
        globalvariable = (a == b) and not globalvariable
        is_equal = a == b
        return globalvariable

    def reset():
        global globalvariable, is_equal
        globalvariable = True
        is_equal = False

    def test(result, expected):
        if result == expected:
            print("test passed")
        else:
            print("test failed")

    reset()
    impure(1, 1)
    test(is_equal, True)   # test passed

    reset()
    impure(1, 1)
    test(is_equal, True)   # test passed

    reset()
    impure(3, 2)
    test(is_equal, False)  # test passed

    reset()
    impure(3, 2)
    test(is_equal, False)  # test passed
    `;

  document.getElementById("ex4").innerHTML = `
    import random

    def mult(a: int, b: int) -> int:
        return a * b

    def test(result, expected):
        if result == expected:
            print("test passed")
        else:
            print("test failed")

    for _ in range(1000):
        a = random.randint(-1000, 1000)
        b = random.randint(-1000, 1000)
        print(a, b)  # print inputs so the failing case can be identified
        test(mult(a, b), a * b)
    `;

  document.getElementById("ex5").innerHTML = `
    def count(c: str, s: str) -> int:
        pass  # imagine logic here

    def test(result, expected):
        if result == expected:
            print("test passed")
        else:
            print("test failed")

    # GENERATED TESTS
    test(count('r', "strawberry"), 4)
    test(count('p', "Google"), 2)
    `;
  document.getElementById("ex6").innerHTML = `
    import pytest
    # import the functions to test
    from examples import mult, count

    # create the test class, can be any name that starts with \`Test\`
    class TestClass:

        # test functions start with 'test_'. parameter \`self\` returns \`None\`
        def test_mult(self) -> None:

            # assert is used as the test, this value should always be a bool
            assert mult(1, 2) == 2

            # multiple asserts can be in the same function
            assert mult(3, 4) == 12

            # for imprecise floats, \`approx\` can be used to compare the near value
            assert mult(0.1, 0.3) == pytest.approx(0.03)

        def test_count(self) -> None:
            assert count('r', "strawberry") == 3
            assert count('a', "apple") == 1
    `;

  document.getElementById("ex7").innerHTML = `
    import pytest
    from unittest.mock import MagicMock
    from examples import query_database, process_window_data

    # seeds the database before each test, clears it after
    @pytest.fixture
    def seeded_db():
        db = create_test_database()
        db.insert({"id": 1, "value": "test"})
        yield db  # test runs here
        db.clear()

    # creates a fake window object with controlled values
    @pytest.fixture
    def mock_window():
        window = MagicMock()
        window.width = 1920
        window.height = 1080
        return window

    class TestClass:

        # fixture is passed as a parameter, pytest injects it automatically
        def test_query(self, seeded_db) -> None:
            result = query_database(seeded_db, 1)
            assert result["value"] == "test"

        def test_window(self, mock_window) -> None:
            result = process_window_data(mock_window)
            assert result == (1920, 1080)
    `;
}
