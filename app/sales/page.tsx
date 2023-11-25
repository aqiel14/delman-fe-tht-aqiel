"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { getAllSales } from "@/lib/api";
import { SaleType } from "@/lib/types";
import ContentHeader from "@/components/ContentHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const Sales = () => {
  const { data, isLoading } = useQuery("sales", getAllSales);

  const [salesData, setSalesData] = useState(data?.data);

  useEffect(() => {
    if (!isLoading) {
      setSalesData(data?.data);
    }
  }, [data, isLoading]);

  const columnHelper = createColumnHelper<SaleType>();

  const columns: any = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
      size: 150,
      enableResizing: true,
    }),
    columnHelper.accessor("name", {
      header: "name",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("sales_id", {
      header: "sales_id",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("item_id", {
      header: "item_id",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("qty", {
      header: "qty",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("consumen_name", {
      header: "consumen_name",
      cell: (info) => info.getValue(),
      size: 150,
    }),
    columnHelper.accessor("transaction_date", {
      header: "transaction_date",
      cell: (info) => info.getValue(),
      size: 150,
    }),
  ];

  return (
    <section className="p-2">
      <ContentHeader
        title={"Sales Dashboard"}
        subTitle={"List of Sales Data"}
      />
      <div className="h-2" />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          data={salesData}
          setData={setSalesData}
          columns={columns}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default Sales;
