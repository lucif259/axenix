import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";

type CellData = {
  value: string; // Отображаемое значение
};

const TableEditor: React.FC = () => {
  // Инициализация данных с большим количеством строк и столбцов
  const [data, setData] = useState<CellData[][]>([
    [{ value: "10" }, { value: "20" }, { value: "30" }, { value: "40" }, { value: "50" }],
    [{ value: "15" }, { value: "25" }, { value: "35" }, { value: "45" }, { value: "55" }],
    [{ value: "20" }, { value: "30" }, { value: "40" }, { value: "50" }, { value: "60" }],
    [{ value: "25" }, { value: "35" }, { value: "45" }, { value: "55" }, { value: "65" }],
    [{ value: "30" }, { value: "40" }, { value: "50" }, { value: "60" }, { value: "70" }],
  ]);

  // Парсинг адресов ячеек
  const getCellValue = (address: string, data: CellData[][]): number => {
    const col = address.charCodeAt(0) - 65; // 'A' => 0, 'B' => 1...
    const row = parseInt(address.slice(1), 10) - 1; // '1' => 0, '2' => 1...
    return parseFloat(data[row]?.[col]?.value || "0") || 0; // Получаем значение или 0
  };

  // Пересчет формулы
  const evaluateFormula = (formula: string, data: CellData[][]): string => {
    try {
      const parsedFormula = formula
        .substring(1) // Убираем "="
        .replace(/[A-Z]\d+/g, (match) => getCellValue(match, data).toString()); // Подставляем значения
      return eval(parsedFormula).toString(); // Вычисляем формулу
    } catch {
      return "Ошибка!"; // Если формула некорректна
    }
  };

  // Пересчет всей таблицы
  const recalculateData = (data: CellData[][]): CellData[][] => {
    return data.map((row) =>
      row.map((cell) => {
        if (cell.value.startsWith("=")) {
          return { value: evaluateFormula(cell.value, data) };
        }
        return cell;
      })
    );
  };

  // Обработка изменений в ячейке
  const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = { value: newValue };
    setData(recalculateData(updatedData)); // Пересчитываем таблицу
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Таблица с формулами
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>A</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>B</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>C</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>D</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      value={cell.value}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableEditor;
