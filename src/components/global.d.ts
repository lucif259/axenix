declare module "hot-formula-parser" {
    interface Coordinate {
      index: number;
    }
    interface CellCoord {
      row: Coordinate;
      column: Coordinate;
      label: string;
    }
    interface Parser {
      on(event: "callRangeValue", callback: (start: CellCoord, end: CellCoord, done: (values: number[]) => void) => void): void;
    }
  }
  