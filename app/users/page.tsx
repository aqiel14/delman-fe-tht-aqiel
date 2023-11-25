"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import { ApiType, UserType } from "@/lib/types";
import { getAllUsers } from "@/lib/api";
import ContentHeader from "@/components/ContentHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const Users = () => {
  const { data, isLoading } = useQuery<ApiType, boolean>("users", getAllUsers);

  const [usersData, setUsersData] = useState<UserType[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setUsersData(data?.data ?? []);
    }
  }, [data, isLoading]);

  const columnHelper = createColumnHelper<UserType>();

  const columns: any = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
      enableResizing: true,
    }),
    columnHelper.accessor("active_device_mac", {
      header: "Active Device Mac",
      cell: (info) => info.getValue(),
      size: 250,
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("app_version", {
      header: "App Version",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("avatar", {
      header: "Avatar",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bitcoin_address", {
      header: "Bitcoin Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("country_name", {
      header: "Country Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("device_id", {
      header: "Device ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("favorite_animal", {
      header: "Favorite Animal",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("favorite_music", {
      header: "Favorite Music",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("favorite_quote", {
      header: "Favorite Quote",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("hmac_secret", {
      header: "HMAC Secret",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("invoice_email_address", {
      header: "Invoice Email Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("job", {
      header: "Job",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("latitude", {
      header: "Latitude",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("locale", {
      header: "Locale",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("login_ip", {
      header: "Login IP",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("longitude", {
      header: "Longitude",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("material", {
      header: "Material",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("primary_color", {
      header: "Primary Color",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("referral_id", {
      header: "Referral ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("secondary_color", {
      header: "Secondary Color",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("shipping_address", {
      header: "Shipping Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("timezone", {
      header: "Timezone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("twitter_username", {
      header: "Twitter Username",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("zip_code", {
      header: "Zip Code",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="p-2">
      <ContentHeader title={"Users Data"} subTitle={"List of Users Data"} />
      <div className="h-2" />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          data={usersData}
          setData={setUsersData}
          columns={columns}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Users;
