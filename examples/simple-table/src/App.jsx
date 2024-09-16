import "./index.css";
import React from "react";
import { Alert, Button, Link } from "@trussworks/react-uswds";
import {
  Table,
  dispatchToast,
  useOfflineStatus,
  useOfflineStorage,
} from "@nmfs-radfish/react-radfish";

// mockData is used to populate the table with data, usually this would come from an API call.
const mockData = [
  {
    uuid: "1",
    isDraft: true,
    species: "Marlin",
    price: 50,
    image: "https://picsum.photos/150/75",
  },
  {
    uuid: "2",
    isDraft: false,
    species: "Mahimahi",
    price: 1000,
    image: "https://picsum.photos/150/75",
  },
  {
    uuid: "3",
    isDraft: false,
    species: "Grouper",
    price: 80,
    image: "https://picsum.photos/150/75",
  },
  {
    uuid: "4",
    isDraft: false,
    species: "Grouper",
    price: 30,
    image: "https://picsum.photos/150/75",
  },
];

function App() {
  const [data, setData] = React.useState([]);
  const { findOfflineData, updateOfflineData } = useOfflineStorage();
  const { isOffline } = useOfflineStatus();

  const seedTableData = async () => {
    await updateOfflineData("formData", mockData);
    const data = await findOfflineData("formData");
    setData(data);
  };

  const handleSubmit = async (e, draftData) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!isOffline) {
        await updateOfflineData("formData", [
          { ...draftData, uuid: draftData.uuid, isDraft: false },
        ]);
        dispatchToast({ message: "Online Form Submission", status: "success" });
      } else {
        await updateOfflineData("formData", [
          { uuid: draftData.uuid, isDraft: true, ...draftData },
        ]);
        dispatchToast({ message: "Offline Form Submission", status: "warning" });
      }
    } catch (error) {
      dispatchToast({ message: "Form Submission Error", status: "error" });
    } finally {
      const data = await findOfflineData("formData");
      setData(data);
    }
  };

  const columns = [
    {
      key: "isDraft",
      label: "Status",
      sortable: true,
      render: (row) => (
        <span>
          {row.isDraft ? "Draft" : "Submitted"}
          {row.isDraft && (
            <Button
              onClick={(e) => handleSubmit(e, row)}
              className="font-ui-3xs padding-3px margin-left-205"
            >
              Submit
            </Button>
          )}
        </span>
      ),
    },
    {
      key: "uuid",
      label: "Id",
      sortable: true,
    },
    {
      key: "species",
      label: "Species",
      sortable: true,
    },
    {
      key: "image",
      label: "Image",
      sortable: true,
      render: (row) => <img src={row.image} alt={row.species} height={75} width={150} />,
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (row) => <strong>${row.price}</strong>,
    },
  ];

  return (
    <div className="grid-container">
      <h1>Simple Table Example</h1>
      <InfoAnnotation />
      <br />
      <Button type="button" onClick={seedTableData}>
        Seed Table Data
      </Button>
      <Table data={data} columns={columns} />
      <Alert type="info" slim={true}>
        Below are examples of the different pagination components available. Each component is
        optional and can be used as needed. Components can be found in the `react-radfish`
        directory.
      </Alert>
      <div className="grid-container margin-bottom-3">
        <div className="grid-row display-flex tablet:flex-justify flex-align-center mobile-lg:display-flex flex-justify-center">
          <div className="width-mobile grid-col-auto display-flex flex-no-wrap">
            <h1>Pagination In Progress</h1>
            {/* <TablePaginationNav
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
            /> */}
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
      (localStorage or indexedDB). The table is designed to be used with the{" "}
      <code>TableWrapper</code> component, it's built with{" "}
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
      <Link
        href="https://nmfs-radfish.github.io/documentation/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">Go To Documentation</Button>
      </Link>
      <Link
        href="https://tanstack.com/table/latest/docs/introduction"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">React Table</Button>
      </Link>
    </Alert>
  );
}

export default App;
