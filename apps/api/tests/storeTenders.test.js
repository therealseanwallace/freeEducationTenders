import hexGen from "hex-generator";
import storeTenders from "../services/storeTenders";

const genHex = () => hexGen(256);

const mockTender = [
  {
    ocid: `test-ocid-${genHex()}`,
    id: "004918-2023",
    date: "2023-02-17T15:16:09Z",
    tag: ["planning"],
    initiationType: "tender",
    tender: {
      id: "DN656986",
      legalBasis: {
        id: "32014L0024",
        scheme: "CELEX",
      },
      title: "NCC1101 Alternative Education",
      status: "planned",
      classification: {
        scheme: "CPV",
        id: "80100000",
        description: "Primary education services",
      },
      mainProcurementCategory: "services",
      description:
        "Northumberland County Council seek to establish a Flexible Purchasing System (FPS) to support the provision of Alternative Education for children of statutory school age.  Alternative Education refers to the operation of programmes of learning and skills development in non-school settings with the aim of supporting the progression of students who have become disengaged or are at risk of being disengaged from school-based education. There will be an emphasis on students being provided with the opportunity to achieve academic accreditation, particularly in English and maths.\nAll lots relate to pre 16 statutory education unless otherwise stated.\nDuring summer 2022 the DfE launched a call for evidence into understanding the use of unregistered alternative provision across England. This was announced as one of the commitments published in the SEND and Alternative Provision green paper which committed to strengthening protections for children in unregistered alternative provision. At the same time the impact of COVID is now starting to show within Northumberland resulting in a rise in both permanent exclusions and fixed term exclusions/suspensions. A FPS will create a more flexible solution providing the Council with improved access to suppliers in order to meet need.\nA provider information and engagement event is scheduled to be held as follows:\nThursday 9th March 2.30 - 4.00 pm\nRoom CR1, Northumberland County Council, Morpeth, Northumberland, NE61 2EF\nPlease register your place at this event by contacting Karen Davison on telephone number 01670 623960 or email: Karen.Davison01@northumberland.gov.uk",
      lots: [
        {
          id: "1",
          title: "Ofsted Registered Provision - Full Time or Part Time Places",
          description:
            "Tier 1 – Leading to Accredited Qualifications\nLot 1: Ofsted Registered Provision - Full Time or Part Time Places",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
        {
          id: "2",
          title: "Unregistered Providers – Part Time Placements",
          description:
            "Tier 1 – Leading to Accredited Qualifications\nLot 2: Unregistered Providers – Part Time Placements",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
        {
          id: "3",
          title:
            "Unregistered Providers – Part Time Placements for Post 16 Students",
          description:
            "Tier 1 – Leading to Accredited Qualifications\nLot 3: Unregistered Providers – Part Time Placements for Post 16 Students",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
        {
          id: "4",
          title: "Unregistered Providers – Part Time Enrichment",
          description:
            "Tier 2 – Supplementary Support: To be used by exception\nLot 4: Unregistered Providers – Part Time Enrichment",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
        {
          id: "5",
          title: "Unregistered Providers – Tuition",
          description:
            "Tier 2 – Supplementary Support: To be used by exception\nLot 5: Unregistered Providers – Tuition",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
        {
          id: "6",
          title: "Unregistered Providers – Virtual Learning",
          description:
            "Tier 2 – Supplementary Support: To be used by exception\nLot 6: Unregistered Providers – Virtual Learning",
          hasRenewal: true,
          renewal: {
            description: "On expiry",
          },
          status: "planned",
        },
      ],
      items: [
        {
          id: "1",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "1",
        },
        {
          id: "2",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "2",
        },
        {
          id: "3",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "3",
        },
        {
          id: "4",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "4",
        },
        {
          id: "5",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "5",
        },
        {
          id: "6",
          additionalClassifications: [
            {
              scheme: "CPV",
              id: "80000000",
              description: "Education and training services",
            },
          ],
          deliveryAddresses: [
            {
              region: "UKC21",
            },
          ],
          relatedLot: "6",
        },
      ],
      communication: {
        futureNoticeDate: "2023-04-17T00:00:00+01:00",
      },
      coveredBy: ["GPA"],
    },
    parties: [
      {
        name: "Northumberland County Council",
        id: "GB-FTS-2386",
        identifier: {
          legalName: "Northumberland County Council",
        },
        address: {
          streetAddress: "County Hall",
          locality: "Morpeth",
          region: "UKC21",
          postalCode: "NE61 2EF",
          countryName: "United Kingdom",
        },
        contactPoint: {
          name: "Mrs Leanne Stewart",
          email: "leanne.stewart@northumberland.gov.uk",
        },
        roles: ["buyer"],
        details: {
          url: "https://procontract.due-north.com/",
          buyerProfile: "https://procontract.due-north.com/",
          classifications: [
            {
              scheme: "TED_CA_TYPE",
              id: "REGIONAL_AUTHORITY",
              description: "Regional or local authority",
            },
            {
              scheme: "COFOG",
              id: "01",
              description: "General public services",
            },
          ],
        },
      },
    ],
    buyer: {
      id: "GB-FTS-2386",
      name: "Northumberland County Council",
    },
    language: "en",
  },
];

describe("storeTenders", () => {
  it("should return an array of stored tenders", async () => {
    expect(await storeTenders(mockTender)).toEqual(true);
  });
});
