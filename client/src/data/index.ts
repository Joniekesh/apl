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
        title: "MAP Registration Guide",
        description: "Learn all you need to know about MAP registration.",
        url: "#",
      },
      {
        id: 3,
        title: "MAP Metering Status",
        description: "Get to know of your MAP metering Status",
        url: "#",
      },
      {
        id: 4,
        title: "MAP Customer Portal",
        description: "Get answers and information on your meter usage.",
        url: "#",
      },
      {
        id: 5,
        title: "Mass Metering Program",
        description: "Learn more about the Mass Metering programme",
        url: "#",
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
        title: "Collection Agents",
        description: "Learn all you need to know about MAP registration.",
        url: "#",
      },
      {
        id: 3,
        title: "New Connection Request",
        description: "Get to know of your MAP metering Statu.",
        url: "https://abapower.com/homepage",
      },
      {
        id: 4,
        title: "Tarrif Migration Token",
        description: "Get answers and information on your meter usage.",
        url: "#",
      },
      {
        id: 5,
        title: "Outage Information",
        description: "Learn more about the Mass Metering programme.",
        url: "#",
      },
      {
        id: 6,
        title: "Outage Debt",
        description: "Get answers and information on your meter usage.",
        url: "#",
      },
      {
        id: 7,
        title: "Customer Support",
        description: "Learn more about the Mass Metering programm.",
        url: "https://admin.smartpowerbilling.com/support/ticket/submit",
      },
      {
        id: 8,
        title: "APLE FAQS",
        description: "Get answers and information on your meter usage.",
        url: "https://abapower.com/aba-power-faqs/",
      },
      {
        id: 9,
        title: "Tarrif Information",
        description: "Learn more about the Mass Metering programme.",
        url: "https://abapower.com/tarrif-plan-2",
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
    url: "https://abapower.com/about",
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
    url: "#",
  },
  {
    id: 3,
    title: "Customer Portal",
    url: "https://apleportal.smartpowerbilling.com",
  },
  {
    id: 4,
    title: "FAQ",
    url: "https://abapower.com/aba-power-faqs/",
  },
];
