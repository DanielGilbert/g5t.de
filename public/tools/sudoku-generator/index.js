import { registerWebsiteHeader } from "../../components/website-header/website-header.js";
import { registerWebsiteFooter } from "../../components/website-footer/website-footer.js";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 15;
const LABEL_HEIGHT = 8;
const GRID_GAP = 8;

const LAYOUTS = {
    1: { rows: 1, cols: 1 },
    2: { rows: 2, cols: 1 },
    4: { rows: 2, cols: 2 },
};

const chunk = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

const drawSudokuGrid = (doc, board, x, y, size) => {
    const cell = size / 9;

    for (let i = 0; i <= 9; i++) {
        doc.setLineWidth(i % 3 === 0 ? 0.6 : 0.2);
        const offset = i * cell;
        doc.line(x + offset, y, x + offset, y + size);
        doc.line(x, y + offset, x + size, y + offset);
    }

    doc.setFontSize(cell * 2.83465 * 0.55);
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board[row * 9 + col];
            if (value === window.sudoku.BLANK_CHAR) {
                continue;
            }
            doc.text(value, x + col * cell + cell / 2, y + row * cell + cell * 0.68, { align: "center" });
        }
    }
};

const drawPage = (doc, boards, perPage, labelPrefix, startIndex) => {
    const { rows, cols } = LAYOUTS[perPage];
    const cellWidth = (PAGE_WIDTH - 2 * MARGIN) / cols;
    const cellHeight = (PAGE_HEIGHT - 2 * MARGIN) / rows;
    const gridSize = Math.min(cellWidth, cellHeight - LABEL_HEIGHT) - GRID_GAP;

    boards.forEach((board, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const areaX = MARGIN + col * cellWidth;
        const areaY = MARGIN + row * cellHeight;
        const gridX = areaX + (cellWidth - gridSize) / 2;
        const gridY = areaY + LABEL_HEIGHT + (cellHeight - LABEL_HEIGHT - gridSize) / 2;

        doc.setFontSize(11);
        doc.text(`${labelPrefix} ${startIndex + index + 1}`, areaX + cellWidth / 2, areaY + 6, { align: "center" });
        drawSudokuGrid(doc, board, gridX, gridY, gridSize);
    });
};

const generatePdf = ({ count, difficulty, perPage, includeSolutions }) => {
    const puzzles = [];
    for (let i = 0; i < count; i++) {
        const board = window.sudoku.generate(difficulty);
        puzzles.push({
            board,
            solution: includeSolutions ? window.sudoku.solve(board) : null,
        });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    chunk(puzzles.map((puzzle) => puzzle.board), perPage).forEach((page, pageIndex) => {
        if (pageIndex > 0) {
            doc.addPage();
        }
        drawPage(doc, page, perPage, "Puzzle", pageIndex * perPage);
    });

    if (includeSolutions) {
        chunk(puzzles.map((puzzle) => puzzle.solution), perPage).forEach((page, pageIndex) => {
            doc.addPage();
            drawPage(doc, page, perPage, "Solution", pageIndex * perPage);
        });
    }

    doc.save("sudoku-puzzles.pdf");
};

const app = async () => {
    registerWebsiteHeader();
    registerWebsiteFooter();

    const form = document.getElementById("sudoku-form");
    const status = document.getElementById("status");
    const button = form.querySelector("button[type=submit]");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const options = {
            count: Number(document.getElementById("count").value),
            difficulty: document.getElementById("difficulty").value,
            perPage: Number(document.getElementById("perPage").value),
            includeSolutions: document.getElementById("includeSolutions").checked,
        };

        button.setAttribute("aria-busy", "true");
        button.disabled = true;
        status.textContent = "Generating puzzles...";

        // Defer so the browser can paint the busy state before the
        // synchronous, CPU-heavy puzzle generation blocks the main thread.
        setTimeout(() => {
            try {
                generatePdf(options);
                status.textContent = `Done - generated ${options.count} puzzle${options.count === 1 ? "" : "s"}.`;
            } catch (error) {
                console.error(error);
                status.textContent = "Something went wrong while generating the PDF.";
            } finally {
                button.removeAttribute("aria-busy");
                button.disabled = false;
            }
        }, 10);
    });
};

document.addEventListener("DOMContentLoaded", app);
