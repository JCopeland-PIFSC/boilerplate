import "./index.css";
import React, { useEffect } from "react";
import { Alert, Button } from "@trussworks/react-uswds";
import {
  TableBody,
  TableBodyRow,
  TableHeaderCell,
  TableHeader,
  TableHeaderRow,
  TableBodyCell,
  TablePaginationNav,
  TablePaginationPageCount,
  TablePaginationGoToPage,
  TablePaginationSelectRowCount,
} from "@nmfs-radfish/react-radfish";
import { Table } from "@nmfs-radfish/react-radfish";
import { useTableState } from "./packages/contexts/TableWrapper";
import { useOfflineStorage } from "./packages/contexts/OfflineStorageWrapper";

// mockData is used to populate the table with data, usually this would come from an API call.
const mockData = [
  {
    uuid: "uuid-123",
    isDraft: true,
    fullName: "Samwise Gamgee",
    species: "Marlin",
    computedPrice: 50,
    numberOfFish: 5,
  },
  {
    uuid: "uuid-456",
    isDraft: false,
    fullName: "Galadriel",
    species: "Mahimahi",
    computedPrice: 1000,
    numberOfFish: 20,
  },
  {
    uuid: "uuid-789",
    isDraft: false,
    fullName: "Frodo Baggins",
    species: "Grouper",
    computedPrice: 80,
    numberOfFish: 8,
  },
];

function App() {
  const { table, headerNames, rowModel, setData } = useTableState();
  const { findOfflineData } = useOfflineStorage();

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await findOfflineData("formData");
      setData([...mockData, ...data]);
    };
    fetchTableData();
  }, []);

  return (
    <div className="grid-container">
      <h1>Simple Table Example</h1>
      <InfoAnnotation />
      <Table bordered fullWidth fixed>
        <TableHeader table={table}>
          <TableHeaderRow table={table}>
            {headerNames.map((header) => {
              return <TableHeaderCell key={header.id} header={header} />;
            })}
          </TableHeaderRow>
        </TableHeader>
        <TableBody table={table}>
          {rowModel.rows.map((row) => {
            const isOfflineData = row.original.isDraft;
            return (
              <TableBodyRow
                row={row}
                className={isOfflineData && "bg-gray-10"}
                key={row.original.uuid}
                data-testid="table-body-row"
              >
                {row.getVisibleCells().map((cell) => {
                  const isStatusColumn = cell.column.id === "isDraft";
                  return (
                    <TableBodyCell className="radfish-table-body-cell" key={cell.id} cell={cell}>
                      {isStatusColumn && isOfflineData && (
                        <Button
                          onClick={() => console.log("send to server")}
                          className="font-ui-3xs padding-3px margin-left-205"
                        >
                          Submit
                        </Button>
                      )}
                    </TableBodyCell>
                  );
                })}
              </TableBodyRow>
            );
          })}
        </TableBody>
      </Table>
      <Alert type="info" slim={true}>
        Below are examples of the different pagination components available. Each component is
        optional and can be used as needed. Components can be found in the `react-radfish`
        directory.
      </Alert>
      <div className="grid-container margin-bottom-3">
        <div className="grid-row display-flex tablet:flex-justify flex-align-center mobile-lg:display-flex flex-justify-center">
          <div className="width-mobile grid-col-auto display-flex flex-no-wrap">
            <TablePaginationNav
              setPageIndex={table.setPageIndex}
              previousPage={table.previousPage}
              nextPage={table.nextPage}
              getCanPreviousPage={table.getCanPreviousPage}
              getCanNextPage={table.getCanNextPage}
              getPageCount={table.getPageCount}
            />
          </div>
          <div className="grid-col-auto display-flex flex-wrap flex-align-center margin-y-1">
            <TablePaginationPageCount
              pageIndex={table.getState().pagination.pageIndex + 1}
              getPageCount={table.getPageCount}
            />
            <TablePaginationGoToPage
              pageIndex={table.getState().pagination.pageIndex + 1}
              setPageIndex={table.setPageIndex}
              getPageCount={table.getPageCount}
            />
            <TablePaginationSelectRowCount
              pageSize={table.getState().pagination.pageSize}
              setPageSize={table.setPageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoAnnotation() {
  return (
    <Alert type="info" headingLevel={"h2"} heading="Information">
      Below is an example of a table that's populated by server and locally stored data
      (localStorage or indexedDB). The table is designed to be used with the `TableWrapper`
      component, it's built with{" "}
      <a
        href="https://tanstack.com/table/latest/docs/introduction"
        target="_blank"
        rel="noopener noreferrer"
      >
        react-table
      </a>
      .
      <br />
      <br />
      Offline form data entries or "drafts" are highlighted in grey, and can be submitted to the
      server using the "submit" button in the "status" column when the application is connected to
      the internet.
      <br />
      <br />
      <strong>Note:</strong> Annotations are for informational purposes only. In production, you
      would remove the annotations. Components with annotations above them are optional. You can
      choose whether or not to use them in your application.
      <br />
      <br />
      <a
        href="https://nmfs-radfish.github.io/documentation/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">Go To Documentation</Button>
      </a>
      <a
        href="https://tanstack.com/table/latest/docs/introduction"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">React Table</Button>
      </a>
    </Alert>
  );
}

export default App;
