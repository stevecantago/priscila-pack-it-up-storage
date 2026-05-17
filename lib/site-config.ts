export const siteConfig = {
  name: "Pack-It-Up Self Storage",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pack-it-up-self-storage.example",
  description:
    "Secure, convenient self storage with online rentals available 24/7.",
  phone: "(704) 349-7926",
  phoneHref: "tel:+17043497926",
  address: {
    street: "115 Bethlehem Rd",
    city: "Kings Mountain",
    region: "NC",
    postalCode: "28086",
    country: "US",
  },
  directionsUrl: "https://maps.app.goo.gl/WNqq8PP6QwVLouej6",
  tenantLoginUrl:
    "https://rental-center.storedge.com/?companyId=27aeba00-8fbb-4ecb-81b9-b45214b3e9c5&facilityId=16a49c28-9014-40d1-b6e8-ec0b1e374d63#/login",
  tenantMoveInUrl:
    "https://rental-center.storedge.com/?companyId=27aeba00-8fbb-4ecb-81b9-b45214b3e9c5&facilityId=16a49c28-9014-40d1-b6e8-ec0b1e374d63#/move-in",
  mapEmbedUrl:
    "https://www.google.com/maps?q=115%20Bethlehem%20Rd%2C%20Kings%20Mountain%2C%20NC%2028086&output=embed",
  hours: "Tues - Thurs: 9AM - 1PM | Fri: 9AM - 6PM | Sat: 9AM - 2PM\nSun - Mon: Close",
  accessHours: "Daily, between 6 AM – 10 PM",
  navItems: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  images: {
    hero: "/images/hero-storage-facility.jpg",
    corridor: "/images/facility-1.jpg",
    driveUp: "/images/facility-gallery-1.jpg",
    securityGate: "/images/facility-gallery-2.jpg",
    boxes: "/images/facility-gallery-3.jpg",
    mobileRental: "/images/placeholders/mobile-rental-flow.webp",
    map: "/images/placeholders/map-placeholder.webp",
    facilityGallery: [
      "/images/facility-gallery-1.jpg",
      "/images/facility-gallery-2.jpg",
      "/images/facility-gallery-3.jpg",
    ],
  },
  amenities: [
    "Online rentals",
    "Secure facility access",
    "Drive-up storage",
    "Flexible storage sizes",
    "Local support",
    "Move-in ready units",
  ],
  localSeo: {
    headline: "Self storage for moving, overflow, and business needs",
    whyChoose:
      "Pack-It-Up Self Storage is built for customers who want a clear rental path, practical storage options, and helpful local support without waiting for office hours.",
    facility:
      "Use the online rental page to view current unit options and complete the Storable rental workflow. Final access details, lease steps, and payments are handled securely by Storable.",
    directions:
      "Use the directions link to open the facility location in Google Maps.",
  },
  previewUnits: [
    {
      title: "5x5 Storage Unit",
      size: "5x5",
      image: "/images/facility-1.jpg",
      description: "Boxes, seasonal items, and compact personal storage.",
      tags: ["Small items", "Personal storage", "Online rental"],
    },
    {
      title: "5x10 Storage Unit",
      size: "5x10",
      image: "/images/facility-gallery-1.jpg",
      description: "Studio apartment contents, small furniture, or inventory.",
      tags: ["Furniture", "Business overflow", "Popular size"],
    },
    {
      title: "10x10 Storage Unit",
      size: "10x10",
      image: "/images/facility-gallery-2.jpg",
      description: "One-bedroom apartment contents or larger furniture pieces.",
      tags: ["Household storage", "Moving", "Check availability"],
    },
    {
      title: "10x15 Storage Unit",
      size: "10x15",
      image: "/images/facility-gallery-3.jpg",
      description: "Larger apartment storage, appliances, and extra overflow.",
      tags: ["Large items", "Appliances", "Online rental"],
    },
  ],
  socialLinks: [
    { label: "Facebook", href: "#" },
    { label: "X", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  events: {
    viewHomepage: "view_homepage",
    clickViewUnits: "click_view_units",
    viewRentalAppSection: "view_rental_app_section",
    clickMoveIn: "click_move_in",
    clickCallNow: "click_call_now",
    submitContactForm: "submit_contact_form",
    clickDirections: "click_directions",
  },
} as const;

export const unitSizes = [
  {
    size: "5x5",
    title: "5x5 Storage Unit",
    description:
      "Best for boxes, seasonal items, small furniture, and personal storage.",
  },
  {
    size: "5x10",
    title: "5x10 Storage Unit",
    description:
      "Good for a studio apartment, small bedroom furniture, and business inventory.",
  },
  {
    size: "10x10",
    title: "10x10 Storage Unit",
    description:
      "Fits the contents of a one-bedroom apartment or several large furniture pieces.",
  },
  {
    size: "10x15",
    title: "10x15 Storage Unit",
    description:
      "Useful for larger apartment storage, appliances, and business overflow.",
  },
  {
    size: "10x20",
    title: "10x20 Storage Unit",
    description:
      "Commonly used for household moves, large furniture sets, or vehicle storage if allowed.",
  },
] as const;

export const faqs = [
  {
    question: "Can I rent a storage unit online?",
    answer:
      "Yes. Pack-It-Up Self Storage supports online rentals through the Storable rental app, so you can choose a unit and start your move-in process at any time.",
  },
  {
    question: "What size storage unit do I need?",
    answer:
      "Smaller 5x5 and 5x10 units work well for boxes and small furniture, while 10x10, 10x15, and 10x20 units are better for apartment contents, larger moves, or business overflow.",
  },
  {
    question: "What happens after I rent online?",
    answer:
      "After completing the Storable rental flow, you should receive confirmation and any available access or move-in details for your selected facility.",
  },
  {
    question: "Can I call for help before renting?",
    answer:
      "Yes. If you need help choosing a size or completing the rental process, use the Call Now button or contact form.",
  },
  {
    question: "Are vehicle storage options available?",
    answer:
      "Vehicle storage availability depends on the facility and unit type. Check available units online or contact the facility for details.",
  },
] as const;
