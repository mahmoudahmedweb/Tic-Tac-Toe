import { fireEvent, render, screen, within } from "@testing-library/react";
import TicTacToe from "./TicTacToe";

describe("TicTacToe", () => {
  it("should render a 3x3 grid", () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");

    expect(cells.filter((cell) => cell.textContent === "")).toHaveLength(9);
  });

  it('should allow players to toggle between "X" and "O"', () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");

    fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe("X");

    fireEvent.click(cells[1]);
    expect(cells[1].textContent).toBe("O");
  });

  it("should not toggle state on an already selected cell", () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");

    fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe("X");

    fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe("X");
  });

  it("should declare a draw when all cells are filled with no winner", () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");

    // Simulate a draw scenario
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[7]); // X
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[8]); // X

    expect(screen.getByText("Game ended in a draw!")).toBeInTheDocument();
    expect(cells.every((cell) => cell.textContent !== "")).toBe(true);
  });

  it("should declare a winner and stop the game when winning scenario is achieved", () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");
    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X

    expect(screen.getByText("Player X wins!")).toBeInTheDocument();

    // Check if winning cells have winner class
    expect(cells[0]).toHaveClass("winner");
    expect(cells[1]).toHaveClass("winner");
    expect(cells[2]).toHaveClass("winner");
  });

  it("should reset the game when 'Reset' button is clicked", () => {
    render(<TicTacToe />);
    const grid = screen.getByRole("grid");
    const cells = within(grid).getAllByRole("button");
    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X

    expect(screen.getByText("Player X wins!")).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.queryByText("Player X wins!")).not.toBeInTheDocument();
    expect(cells.filter((cell) => cell.textContent === "")).toHaveLength(9);
  });
});
