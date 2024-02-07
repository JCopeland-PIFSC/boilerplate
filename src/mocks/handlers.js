import { http, HttpResponse } from "msw";

export const MSW_ENDPOINT = {
  SPECIES: "/species",
  TABLE: "/table",
};

export const handlers = [
  // Returns an array of fish species. This is currently being used to demonstrate populating a dropdown form component with "data" from a server
  // Note that this implementation can/should change depending on your needs
  http.get(MSW_ENDPOINT.SPECIES, () => {
    return HttpResponse.json({ data: ["grouper", "salmon"] }, { status: 200 });
  }),
  // This endpoint simply returns the data that is submitted to from a form
  // In a full stack implementation, there will likely be some logic on the server to handle/store persistent data
  http.post(MSW_ENDPOINT.SPECIES, async ({ request }) => {
    const response = await request.json();
    return HttpResponse.json({ data: response }, { status: 201 });
  }),
  // this endpoint is meant to return data to populate a RadfishForm state.
  // ReactTable expects an array of objects, where the key of each object represent a column header value
  // Each object also represent a row in the table.
  // The values of each object represents the cell value of the corresponding column in the row
  http.get(MSW_ENDPOINT.TABLE, ({ request }) => {
    const url = new URL(request.url);
    const minAmount = url.searchParams.get("amount");

    const data = [
      {
        id: 1,
        species: "Grouper",
        count: 10,
      },
      {
        id: 2,
        species: "Salmon",
        count: 5,
      },
      {
        id: 3,
        species: "Marlin",
        count: 1,
      },
      {
        id: 4,
        species: "Mahimahi",
        count: 15,
      },
    ];

    let returnData = data;

    // leverage the URL query param `?amount=<number>` to mock sever side logic and only returned filtered data to client
    // note that this is an implementation that is expected to be implemented server side, not on the client
    if (minAmount) {
      returnData = data.filter((data) => data.count > minAmount);
    }

    return HttpResponse.json(
      {
        data: returnData,
      },
      { status: 200 },
    );
  }),
];
