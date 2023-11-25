"use client";
import React, { useState, useReducer } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  Row,
  SortingState,
  getExpandedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

import { RiDraggable } from "react-icons/ri";

interface TableTypeProps<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  columns: ColumnDef<unknown, any>[];
  isLoading: boolean;
}

const Table = ({
  data,
  setData,
  columns,
  isLoading,
}: TableTypeProps<unknown>) => {
  const [expandedCells, setExpandedCells] = useState<string[] | null>([]);

  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getExpandedRowModel: getExpandedRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rows = !data ? [] : table.getRowModel().rows;
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 25,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  const handleExpandCell = (cellId: string) => {
    if (expandedCells?.includes(cellId)) {
      const index = expandedCells.indexOf(cellId);
      if (index > -1) {
        expandedCells.splice(index, 1);
      }
    } else {
      expandedCells?.push(cellId);
    }
    rerender();
  };

  if (isLoading) {
    return <p>isLoading...</p>;
  }

  return data ? (
    <>
      <div
        data-testid="test-table-container"
        ref={tableContainerRef}
        className="h-[1000px] w-[80vw] overflow-auto"
      >
        <table
          data-testid="test-table"
          className="table-fixed w-full h-full text-xl font-sourcecode bg-white"
        >
          <thead className="bg-slate-200 m-0 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="relative border-slate-300 border-2 px-1 py-2 flex-nowrap text-center "
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none whitespace-nowrap text-ellipsis overflow-hidden px-4 lowercase"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                      <div
                        className="absolute px-1 py-2 right-4 top-1 w-2 h-full select-none touch-none cursor-col-resize"
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      >
                        <RiDraggable />
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<any>;
              return (
                <tr key={row.id} className="h-1 whitespace-nowrap ">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        data-testid={`${cell.id}`}
                        key={cell.id}
                        className={`${
                          expandedCells?.includes(cell.id)
                            ? "overflow-visible"
                            : "overflow-hidden"
                        } relative border-slate-300 border px-4 `}
                      >
                        {/* Content of TD */}
                        <div className="relative text-ellipsis overflow-hidden">
                          {!expandedCells?.includes(cell.id) &&
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                        </div>

                        {/* expand Button */}

                        {expandedCells?.includes(cell.id) ? (
                          <IoCloseCircle
                            className={`absolute right-1 top-1 cursor-pointer text-gray-400 ${
                              expandedCells?.includes(cell.id) && "z-30"
                            }`}
                            onClick={() => handleExpandCell(cell.id)}
                          />
                        ) : (
                          <IoIosArrowDroprightCircle
                            data-testid="test-table-cell-expand"
                            className={`absolute right-1 top-1 cursor-pointer text-gray-400 ${
                              expandedCells?.includes(cell.id) && "z-30"
                            }`}
                            onClick={() => handleExpandCell(cell.id)}
                          />
                        )}

                        {/* <p>{cell.id}</p> */}
                        {/* expanded Cell */}
                        {expandedCells?.includes(cell.id) && (
                          <div
                            className={`absolute bg-white h-fit w-full z-20 left-0 top-0 pl-4 border border-blue-700`}
                          >
                            <div
                              className="whitespace-pre-wrap mr-8"
                              style={{ overflowWrap: "anywhere" }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div> */}
    </>
  ) : (
    <></>
  );
};

export default Table;
