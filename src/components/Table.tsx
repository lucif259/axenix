import React, { useState } from "react";
import DataGrid from "react-data-grid";
import { columns } from "./columns";
import { Box, Card, CardContent, Typography } from "@mui/material";
const Parser = require("hot-formula-parser").Parser;

const parser = new Parser();

interface CellData {
  [key: string]: string; // Например, "A1": "10", "B1": "=A1+5"
}

const Table: React.FC = () => {
  const [data, setData] = useState<CellData>({});

  const rows = Array.from({ length: 10 }, (_, rowIndex) => {
    const row: { [key: string]: string } = {};
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const cellKey = String.fromCharCode(65 + colIndex) + (rowIndex + 1); // "A1", "B1"
      row[cellKey] = data[cellKey] || "";
    }
    return row;
  });

  // Обработка событий для формул
  parser.on("callCellValue", (cellCoord: string, done: (value: number) => void) => {
    const value = parseFloat(data[cellCoord] || "0") || 0;
    done(value);
  });

  parser.on("callRangeValue", (startCellCoord: string, endCellCoord: string, done: (values: number[]) => void) => {
    const [startCol, startRow] = [startCellCoord[0], parseInt(startCellCoord.slice(1))];
    const [endCol, endRow] = [endCellCoord[0], parseInt(endCellCoord.slice(1))];

    const rangeValues: number[] = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
        const cellKey = `${String.fromCharCode(col)}${row}`;
        const value = parseFloat(data[cellKey] || "0") || 0;
        rangeValues.push(value);
      }
    }

    done(rangeValues);
  });

  const handleRowsChange = (updatedRows: any) => {
    const updatedData = { ...data };
    updatedRows.forEach((row: any, idx: number) => {
      Object.keys(row).forEach((key) => {
        const cellKey = `${key}${idx + 1}`;
        updatedData[cellKey] = row[key];
      });
    });
    setData(updatedData);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "90%", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Таблица с формулами
          </Typography>
          <DataGrid
            columns={columns}
            rows={rows}
            onRowsChange={handleRowsChange}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
