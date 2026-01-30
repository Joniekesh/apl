export interface IData {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface ILink {
  id: number;
  name: string;
  url: string;
  data?: IData[];
}

export interface IQuick {
  id: number;
  title: string;
  url: string;
}

export interface IQuickLink {
  id: number;
  title: string;
  url: string;
}

export const links: ILink[] = [
  {
    id: 1,
    name: "Metering",
    url: "#",
    data: [
      {
        id: 1,
        title: "MAP Application",
        description: "Begin your application to getting Metered",
        url: "https://aple.meterrequest.smartpowerbilling.com/#/about",
      },
      {
        id: 2,
        title: "MAP Customer Portal",
        description: "Get answers and information on your meter usage.",
        url: "#",
      },
      {
        id: 3,
        title: "Meter Prices",
        description: "Get answers and information on the meter prices.",
        url: "/metering-prices",
      },
      {
        id: 4,
        title: "Meter Specifications",
        description: "Get answers and information on the meter specifications.",
        url: "/metering-specs-for-map",
      },
      {
        id: 5,
        title: "Meter Initialization",
        description: "Get answers and information on the meter initialization.",
        url: "/meter-initialization",
      },
      {
        id: 6,
        title: "MAP Refund Summary",
        description: "Get the refund summary.",
        url: "/refund-summary",
      },
      {
        id: 7,
        title: "Request New Connection",
        description: "Place your request for a new connection.",
        url: "/new-connection",
      },
    ],
  },
  {
    id: 2,
    name: "Media",
    url: "#",
    data: [
      {
        id: 1,
        title: "News Room",
        description: "Begin your application to getting Metered",
        url: "https://apl1.netlify.app/all-posts",
      },
      {
        id: 2,
        title: "Gallery",
        description: "Learn all you need to know about MAP registration.",
        url: "https://apl1.netlify.app/all-posts",
      },
    ],
  },
  {
    id: 3,
    name: "Customer Service",
    url: "#",
    data: [
      {
        id: 1,
        title: "E Billing",
        description: "Begin your application to getting Metered",
        url: "https://admin.smartpowerbilling.com",
      },
      {
        id: 2,
        title: "New Connection Request",
        description: "Get to know of your MAP metering Statu.",
        url: "/new-connection",
      },
      {
        id: 3,
        title: "Customer Support",
        description: "Learn more about the Mass Metering programm.",
        url: "https://admin.smartpowerbilling.com/support/ticket/submit",
      },
      {
        id: 4,
        title: "APLE FAQS",
        description: "Get answers and information on your meter usage.",
        url: "faqs/",
      },
      {
        id: 5,
        title: "Tarrif Information",
        description: "Learn more about the Mass Metering programme.",
        url: "/tarrif-plan",
      },
    ],
  },
  {
    id: 4,
    name: "Nkeanyi Web",
    url: "https://nkeanyi.abapower.com/",
  },
  {
    id: 5,
    name: "Careers",
    url: "https://geometricpower.com/careers-2/",
  },
  {
    id: 6,
    name: "About Us",
    url: "/about",
  },
];

export const services: IQuickLink[] = [
  {
    id: 1,
    title: "Metering",
    url: "#",
  },
  {
    id: 2,
    title: "Customer Service",
    url: "https://admin.smartpowerbilling.com/support/ticket/submit",
  },
  {
    id: 3,
    title: "Careers",
    url: "https://geometricpower.com/careers-2/",
  },
];

export const quickLinks: IQuickLink[] = [
  {
    id: 1,
    title: "Risk Policy Statement",
    url: "#",
  },
  {
    id: 2,
    title: "Request New Connection",
    url: "/new-connection",
  },
  {
    id: 3,
    title: "Customer Portal",
    url: "customer-details",
  },
  {
    id: 4,
    title: "FAQ",
    url: "/faqs",
  },
];
