import getDateTimeString from "./getDateTimeString.js";
import sortEducationTenders from "./sortEducationTenders.js";
import { CrawlerQueueModel } from "../mongoose/schemasModels.js";

const tenders = [
  {
    ocid: "ocds-h6vhtk-03a68d",
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
  {
    ocid: "ocds-h6vhtk-03a688",
    id: "004913-2023",
    date: "2023-02-17T14:46:34Z",
    tag: ["award", "contract"],
    initiationType: "tender",
    tender: {
      id: "ocds-h6vhtk-03a688",
      legalBasis: {
        id: "32014L0024",
        scheme: "CELEX",
      },
      title:
        "Project - 7780 - DfE - HGV Bootcamp System Group Remediation (Multiple Contracts)",
      status: "complete",
      classification: {
        scheme: "CPV",
        id: "80000000",
        description: "Education and training services",
      },
      mainProcurementCategory: "services",
      description:
        "The delivery of HGV Skills Bootcamps to allow continuation in training for learners who were previously under System Group.",
      lots: [
        {
          id: "1",
          description:
            "The delivery of HGV Skills Bootcamps to allow continuation in training for learners who were previously under System Group.",
          awardCriteria: {
            criteria: [
              {
                type: "price",
              },
            ],
          },
          hasOptions: false,
          status: "cancelled",
        },
      ],
      items: [
        {
          id: "1",
          deliveryAddresses: [
            {
              region: "UK",
            },
          ],
          relatedLot: "1",
        },
      ],
      procurementMethod: "limited",
      procurementMethodDetails:
        "Award procedure without prior publication of a call for competition",
      procurementMethodRationaleClassifications: [
        {
          scheme: "TED_PT_AWARD_CONTRACT_WITHOUT_CALL",
          id: "D_TECHNICAL",
          description:
            "The works, supplies or services can be provided only by a particular economic operator due to absence of competition for technical reasons",
        },
      ],
      procurementMethodRationale:
        "Reg 32 (2) (a) (ii) This was to ensure continuity of training for distressed learners with contractors and sub-contractors with prior experience of the service requirement.",
    },
    awards: [
      {
        id: "004913-2023-1",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75596",
            name: "Apex Training Centres (UK) Ltd",
          },
        ],
      },
      {
        id: "004913-2023-2",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75597",
            name: "Automotive Transport Training Limited",
          },
        ],
      },
      {
        id: "004913-2023-3",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75598",
            name: "BCTG Limited",
          },
        ],
      },
      {
        id: "004913-2023-4",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75599",
            name: "Dulson Training Ltd",
          },
        ],
      },
      {
        id: "004913-2023-5",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-38840",
            name: "GTG Training Limited",
          },
        ],
      },
      {
        id: "004913-2023-6",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75600",
            name: "Hughes Driver Training Ltd",
          },
        ],
      },
      {
        id: "004913-2023-7",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75601",
            name: "Logistics Skills & Consultancy Ltd",
          },
        ],
      },
      {
        id: "004913-2023-8",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75602",
            name: "Merlin Supply Chain Solutions Limited",
          },
        ],
      },
      {
        id: "004913-2023-9",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75603",
            name: "Commercial Driver Training Ltd T/A National Driving Centre",
          },
        ],
      },
      {
        id: "004913-2023-10",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75604",
            name: "Pertemps Recruitment Partnership t/a PDT Fleet Training Solutions",
          },
        ],
      },
      {
        id: "004913-2023-11",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75605",
            name: "System People Ltd t/a SP Training",
          },
        ],
      },
      {
        id: "004913-2023-12",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-38855",
            name: "TRS Training Limited",
          },
        ],
      },
      {
        id: "004913-2023-13",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-38856",
            name: "Ultima Skills Ltd",
          },
        ],
      },
      {
        id: "004913-2023-14",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75606",
            name: "Wetherby Training Ltd",
          },
        ],
      },
      {
        id: "004913-2023-15",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75607",
            name: "Wiltshire Transport Training Ltd",
          },
        ],
      },
    ],
    parties: [
      {
        name: "Department for Education",
        id: "GB-FTS-165",
        identifier: {
          legalName: "Department for Education",
        },
        address: {
          streetAddress: "Sanctuary Buildings, 20, Great Smith Street",
          locality: "London",
          region: "UK",
          postalCode: "SW1P 3BT",
          countryName: "United Kingdom",
        },
        contactPoint: {
          email: "wave2.skillsbootcamps@education.gov.uk",
        },
        roles: ["buyer"],
        details: {
          url: "https://www.gov.uk/government/organisations/department-for-education",
          classifications: [
            {
              scheme: "TED_CA_TYPE",
              id: "MINISTRY",
              description:
                "Ministry or any other national or federal authority, including their regional or local subdivisions",
            },
            {
              scheme: "COFOG",
              id: "09",
              description: "Education",
            },
          ],
        },
      },
      {
        name: "Apex Training Centres (UK) Ltd",
        id: "GB-FTS-75596",
        identifier: {
          legalName: "Apex Training Centres (UK) Ltd",
        },
        address: {
          locality: "Peterborough",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Automotive Transport Training Limited",
        id: "GB-FTS-75597",
        identifier: {
          legalName: "Automotive Transport Training Limited",
        },
        address: {
          locality: "Hinckley",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "BCTG Limited",
        id: "GB-FTS-75598",
        identifier: {
          legalName: "BCTG Limited",
        },
        address: {
          locality: "Oldbury",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "large",
        },
      },
      {
        name: "Dulson Training Ltd",
        id: "GB-FTS-75599",
        identifier: {
          legalName: "Dulson Training Ltd",
        },
        address: {
          locality: "Shrewsbury",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "GTG Training Limited",
        id: "GB-FTS-38840",
        identifier: {
          legalName: "GTG Training Limited",
        },
        address: {
          locality: "Glasgow",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Hughes Driver Training Ltd",
        id: "GB-FTS-75600",
        identifier: {
          legalName: "Hughes Driver Training Ltd",
        },
        address: {
          locality: "Leicester",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Logistics Skills & Consultancy Ltd",
        id: "GB-FTS-75601",
        identifier: {
          legalName: "Logistics Skills & Consultancy Ltd",
        },
        address: {
          locality: "North Shields",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Merlin Supply Chain Solutions Limited",
        id: "GB-FTS-75602",
        identifier: {
          legalName: "Merlin Supply Chain Solutions Limited",
        },
        address: {
          locality: "Kettering",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Commercial Driver Training Ltd T/A National Driving Centre",
        id: "GB-FTS-75603",
        identifier: {
          legalName:
            "Commercial Driver Training Ltd T/A National Driving Centre",
        },
        address: {
          locality: "Surrey",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Pertemps Recruitment Partnership t/a PDT Fleet Training Solutions",
        id: "GB-FTS-75604",
        identifier: {
          legalName:
            "Pertemps Recruitment Partnership t/a PDT Fleet Training Solutions",
        },
        address: {
          locality: "Meriden",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "large",
        },
      },
      {
        name: "System People Ltd t/a SP Training",
        id: "GB-FTS-75605",
        identifier: {
          legalName: "System People Ltd t/a SP Training",
        },
        address: {
          locality: "Carlisle",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "TRS Training Limited",
        id: "GB-FTS-38855",
        identifier: {
          legalName: "TRS Training Limited",
        },
        address: {
          locality: "St Helens",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Ultima Skills Ltd",
        id: "GB-FTS-38856",
        identifier: {
          legalName: "Ultima Skills Ltd",
        },
        address: {
          locality: "Wigan",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Wetherby Training Ltd",
        id: "GB-FTS-75606",
        identifier: {
          legalName: "Wetherby Training Ltd",
        },
        address: {
          locality: "Tockwith",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Wiltshire Transport Training Ltd",
        id: "GB-FTS-75607",
        identifier: {
          legalName: "Wiltshire Transport Training Ltd",
        },
        address: {
          locality: "Wiltshire",
          region: "UK",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "High Court",
        id: "GB-FTS-584",
        identifier: {
          legalName: "High Court",
        },
        address: {
          streetAddress: "Royal Court of Justice, The Strand",
          locality: "London",
          countryName: "United Kingdom",
        },
        roles: ["reviewBody"],
      },
    ],
    buyer: {
      id: "GB-FTS-165",
      name: "Department for Education",
    },
    contracts: [
      {
        id: "004913-2023-1",
        awardID: "004913-2023-1",
        status: "active",
        value: {
          amount: 138030,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-2",
        awardID: "004913-2023-2",
        status: "active",
        value: {
          amount: 105264,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-3",
        awardID: "004913-2023-3",
        status: "active",
        value: {
          amount: 191520,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-4",
        awardID: "004913-2023-4",
        status: "active",
        value: {
          amount: 256630,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-5",
        awardID: "004913-2023-5",
        status: "active",
        value: {
          amount: 57095,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-6",
        awardID: "004913-2023-6",
        status: "active",
        value: {
          amount: 761160,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-7",
        awardID: "004913-2023-7",
        status: "active",
        value: {
          amount: 104017,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-8",
        awardID: "004913-2023-8",
        status: "active",
        value: {
          amount: 1020169.2,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-9",
        awardID: "004913-2023-9",
        status: "active",
        value: {
          amount: 399800,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-10",
        awardID: "004913-2023-10",
        status: "active",
        value: {
          amount: 965137,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-11",
        awardID: "004913-2023-11",
        status: "active",
        value: {
          amount: 485144.08,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-12",
        awardID: "004913-2023-12",
        status: "active",
        value: {
          amount: 340155.3,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-13",
        awardID: "004913-2023-13",
        status: "active",
        value: {
          amount: 161380,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-14",
        awardID: "004913-2023-14",
        status: "active",
        value: {
          amount: 158980,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
      {
        id: "004913-2023-15",
        awardID: "004913-2023-15",
        status: "active",
        value: {
          amount: 127959,
          currency: "GBP",
        },
        dateSigned: "2023-01-19T00:00:00Z",
      },
    ],
    bids: {
      statistics: [
        {
          id: "1",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "2",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "3",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "4",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "5",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "6",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "7",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "8",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "9",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "10",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "11",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "12",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "13",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "14",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
        {
          id: "15",
          measure: "bids",
          relatedLot: "1",
          value: 26,
        },
      ],
    },
    language: "en",
  },
  {
    ocid: "ocds-h6vhtk-038a40",
    id: "004877-2023",
    date: "2023-02-17T12:12:27Z",
    tag: ["award", "contract"],
    initiationType: "tender",
    tender: {
      id: "ocds-h6vhtk-038a40",
      legalBasis: {
        id: "32014L0024",
        scheme: "CELEX",
      },
      title: "£77730",
      status: "complete",
      classification: {
        scheme: "CPV",
        id: "80500000",
        description: "Training services",
      },
      mainProcurementCategory: "services",
      description:
        "BFPO Provision of Aviation (Cargo) Security Training for Regulated Agents 2023-2027",
      lots: [
        {
          id: "1",
          description:
            "BFPO Provision of Aviation (Cargo) Security Training for Regulated Agents 2023-2027",
          awardCriteria: {
            criteria: [
              {
                type: "price",
              },
            ],
          },
          hasOptions: false,
          status: "cancelled",
        },
      ],
      items: [
        {
          id: "1",
          deliveryAddresses: [
            {
              region: "UK",
            },
          ],
          deliveryLocation: {
            description: "BFPO HA4 6DQ",
          },
          relatedLot: "1",
        },
      ],
      procurementMethod: "open",
      procurementMethodDetails: "Open procedure",
    },
    awards: [
      {
        id: "004877-2023-704734451-1",
        relatedLots: ["1"],
        title:
          "BFPO - Provision of Training Aviation (Cargo) Security for Regulated Agents 2023 - 2027",
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75581",
            name: "The Training & Compliance Hub Limited",
          },
        ],
      },
    ],
    parties: [
      {
        name: "Ministry of Defence - British Forces Post Office",
        id: "GB-FTS-75580",
        identifier: {
          legalName: "Ministry of Defence - British Forces Post Office",
        },
        address: {
          locality: "London",
          region: "UK",
          postalCode: "HA4 6DQ",
          countryName: "United Kingdom",
        },
        contactPoint: {
          email: "mike.mcgovern521@mod.gov.uk",
        },
        roles: ["buyer"],
        details: {
          url: "https://www.gov.uk/bfpo",
          classifications: [
            {
              scheme: "TED_CA_TYPE",
              id: "MINISTRY",
              description:
                "Ministry or any other national or federal authority, including their regional or local subdivisions",
            },
            {
              scheme: "COFOG",
              id: "02",
              description: "Defence",
            },
          ],
        },
      },
      {
        name: "The Training & Compliance Hub Limited",
        id: "GB-FTS-75581",
        identifier: {
          legalName: "The Training & Compliance Hub Limited",
        },
        address: {
          streetAddress: "15 Church Street",
          locality: "Weybridge",
          region: "UK",
          postalCode: "KT13 8NA",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          scale: "sme",
        },
      },
      {
        name: "Ministry of Defence - British Forces Post Office",
        id: "GB-FTS-75582",
        identifier: {
          legalName: "Ministry of Defence - British Forces Post Office",
        },
        address: {
          locality: "London",
          countryName: "United Kingdom",
        },
        roles: ["reviewBody"],
      },
    ],
    buyer: {
      id: "GB-FTS-75580",
      name: "Ministry of Defence - British Forces Post Office",
    },
    contracts: [
      {
        id: "004877-2023-704734451-1",
        awardID: "004877-2023-704734451-1",
        title:
          "BFPO - Provision of Training Aviation (Cargo) Security for Regulated Agents 2023 - 2027",
        status: "active",
        value: {
          amount: 77730,
          currency: "GBP",
        },
        dateSigned: "2023-02-17T00:00:00Z",
      },
    ],
    bids: {
      statistics: [
        {
          id: "1",
          measure: "bids",
          relatedLot: "1",
          value: 3,
        },
      ],
    },
    language: "en",
  },
  {
    ocid: "ocds-h6vhtk-03a66f",
    id: "004865-2023",
    date: "2023-02-17T11:24:43Z",
    tag: ["award", "contract"],
    initiationType: "tender",
    tender: {
      id: "ocds-h6vhtk-03a66f",
      legalBasis: {
        id: "32014L0024",
        scheme: "CELEX",
      },
      title: "Elizabeth Garrett Anderson Programme",
      status: "complete",
      classification: {
        scheme: "CPV",
        id: "80511000",
        description: "Staff training services",
      },
      mainProcurementCategory: "services",
      description:
        "For the delivery of the Elizabeth Garrett Anderson Programme - L7 Senior Leader Apprenticeship Pilot",
      lots: [
        {
          id: "1",
          description:
            "To support the delivery of a pilot of the Anderson Programme as a L7 Senior Leader Apprenticeship (‘Programme’) leading to the award of a Postgraduate Diploma.",
          awardCriteria: {
            criteria: [
              {
                type: "price",
              },
            ],
          },
          hasOptions: false,
          status: "cancelled",
        },
      ],
      items: [
        {
          id: "1",
          deliveryAddresses: [
            {
              region: "UK",
            },
          ],
          relatedLot: "1",
        },
      ],
      procurementMethod: "limited",
      procurementMethodDetails:
        "Award procedure without prior publication of a call for competition",
      coveredBy: ["GPA"],
      procurementMethodRationaleClassifications: [
        {
          scheme: "TED_PT_AWARD_CONTRACT_WITHOUT_CALL",
          id: "D_OUTSIDE_SCOPE",
          description:
            "The procurement falls outside the scope of application of the directive",
        },
      ],
      procurementMethodRationale:
        "One economic operator as competition is absent for technical reasons",
    },
    awards: [
      {
        id: "004865-2023-1",
        relatedLots: ["1"],
        status: "active",
        suppliers: [
          {
            id: "GB-FTS-75573",
            name: "University of Birmingham",
          },
        ],
      },
    ],
    parties: [
      {
        name: "NHS England",
        id: "GB-FTS-3022",
        identifier: {
          legalName: "NHS England",
        },
        address: {
          streetAddress: "Quarry House, Quarry Hill",
          locality: "Leeds",
          region: "UK",
          postalCode: "LS2 7UE",
          countryName: "United Kingdom",
        },
        contactPoint: {
          name: "Jonathan Richards",
          email: "jonathan.powell-richards@nhs.net",
        },
        roles: ["buyer"],
        details: {
          url: "https://www.england.nhs.uk/",
          buyerProfile: "https://www.england.nhs.uk/",
          classifications: [
            {
              scheme: "TED_CA_TYPE",
              id: "MINISTRY",
              description:
                "Ministry or any other national or federal authority, including their regional or local subdivisions",
            },
            {
              scheme: "COFOG",
              id: "07",
              description: "Health",
            },
          ],
        },
      },
      {
        name: "University of Birmingham",
        id: "GB-FTS-75573",
        identifier: {
          legalName: "University of Birmingham",
          id: "RC000645",
        },
        address: {
          streetAddress: "Aston Webb, Edgbaston,",
          locality: "Birmingham",
          region: "UK",
          postalCode: "B15 2TT",
          countryName: "United Kingdom",
        },
        roles: ["supplier"],
        details: {
          url: "https://www.birmingham.ac.uk/index.aspx",
          scale: "large",
        },
      },
      {
        name: "The High Court",
        id: "GB-FTS-497",
        identifier: {
          legalName: "The High Court",
        },
        address: {
          streetAddress: "Strand",
          locality: "London",
          postalCode: "WC2A 2LL",
          countryName: "United Kingdom",
        },
        contactPoint: {
          email: "generaloffice@administrativecourtoffice.justice.gov.uk",
        },
        roles: ["reviewBody"],
        details: {
          url: "https://www.gov.uk/courts-tribunals",
        },
      },
    ],
    buyer: {
      id: "GB-FTS-3022",
      name: "NHS England",
    },
    contracts: [
      {
        id: "004865-2023-1",
        awardID: "004865-2023-1",
        status: "active",
        dateSigned: "2023-02-17T00:00:00Z",
      },
    ],
    bids: {
      statistics: [
        {
          id: "3",
          measure: "bids",
          relatedLot: "1",
          value: 2,
        },
        {
          id: "1",
          measure: "lowestValidBidValue",
          relatedLot: "1",
          value: 384000,
          currency: "GBP",
        },
        {
          id: "2",
          measure: "highestValidBidValue",
          relatedLot: "1",
          value: 384000,
          currency: "GBP",
        },
      ],
    },
    language: "en",
  },
];

async function getTenders(url) {
  // return tenders;

  let urlToUse = url;
  if (!urlToUse) {
    urlToUse = `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?updatedFrom=${getDateTimeString(-0.22)}&updatedTo=${getDateTimeString()}`
  }
  let response;
  try {
    response = await fetch(urlToUse);
    const data = await response.json();
    if (data.links) {
      const queue = await CrawlerQueueModel.findOneAndUpdate({ ID: "CrawlerQueue" }, { $set: { URL: data.links.next } }).setOptions({ returnDocument: 'after' });
      console.log('Updated crawler queue. queue = ', queue);
      console.log('Updated crawler queue. Next URL: ', queue.URL);
    } else {
      console.log('No links in response. Clearing crawler queue.');
      await CrawlerQueueModel.findOneAndUpdate({ ID: "CrawlerQueue" }, { $set: { URL: null } }).setOptions({ returnDocument: 'after' });
    }
    const educationTenders = this.sortEducationTenders(data);
    console.log(`${getDateTimeString()} - got ${educationTenders.length} tenders.`);
    return educationTenders;
  } catch (error) {
    console.error(`${getDateTimeString()} - Error getting tenders: `, error.message);
  }
};

export default getTenders;
