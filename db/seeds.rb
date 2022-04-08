"uprooting old seeds..."
User.destroy_all
Identity.destroy_all
Service.destroy_all
Rating.destroy_all
Location.destroy_all
Listing.destroy_all
Comment.destroy_all
"old seeds uprooted"

"planting new seeds..."

# identities:
transfem = Identity.create(identity: "transfem")
transmasc = Identity.create(identity: "transmasc")
both = Identity.create(identity: "both")

# services:
hormones = Service.create(service: "hormones")

# locations:
traversecity = Location.create(location: "traverse city") # 1
lansing = Location.create(location: "lansing") # 2
kalamazoo = Location.create(location: "kalamazoo") # 1
flint = Location.create(location: "flint") # 1
detroit = Location.create(location: "detroit") # 3

# ----- LISTINGS -----

# - hormones -
hormones1 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: traversecity.id,
    name: "Milliken Medical Group - Morgan Buda, MD",
    address: "224 Circle Drive, Traverse City, MI 49684",
    description: "My training in LGBTQ medicine at the University of Minnesota has given me the experience to best serve the LGBTQ community in Northern Michigan. I am competent in HRT for transgender and gender non-binary folks as well as PrEP medication management.",
    website: "munsonhealthcare.org/find-a-doctor",
    phone: "231-935-0600",
    lat: "44.76096",
    long: "-85.64269"
)

hormones2 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: lansing.id,
    name: "Full Spectrum Family Medicine",
    address: "2025 Abbot Rd, Suite 100, East Lansing, MI 48823",
    description: "We are a privately owned primary care practice with a focus on integrative and functional medicine. We have a growing population of transgender patients and pride ourselves on providing high quality, compassionate care.",
    website: "www.fullspectrumfamilymed.com",
    phone: "517-333-3550",
    lat: "42.75778",
    long: "-84.48438"
)

hormones3 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: lansing.id,
    name: "MSU Family Medicine Clinic - Jessica Heselschwerdt",
    address: "804 Service Rd, A235, East Lansing, MI 488824",
    description: "I am a family medicine physician practicing in the Department of Family and Community Medicine at MSU. In addition to practicing most aspects of family medicine (other than delivering babies!), one of the services I provide for my patients is hormone therapy for gender transition.",
    website: "www.healthteam.msu.edu/providers",
    phone: "517-335-1300",
    lat: "42.71802",
    long: "-84.46904"
)

hormones4 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: kalamazoo.id,
    name: "Bronson Diabetes and Endocrinology Center",
    address: "7901 S 12th St Ste 200, Portage MI 49024",
    description: "We are delighted to see transgender and gender non-conforming individuals age 18 and up and to prescribe hormones. Our office staff uses preferred name and pronoun. If needed, we can help connect you with other trans friendly providers in the area including expert mental health professionals, primary care providers, gynecology, and surgeons. A letter from a mental health professional in support of your transition is helpful if available but is not required.",
    website: "",
    phone: "269-341-8585",
    lat: "42.20268",
    long: "-85.64682"
)

hormones5 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: flint.id,
    name: "Great Lakes Bay Health Centers - Craig Weeks, MD",
    address: "1522 Janes Avenue, Saginaw, MI 48601",
    description: "I am a family physician with a passion for serving the underserved. In addition to general primary care, I also provide care to people living with HIV and Hepatitis C, preexposure prophylaxis (PrEP) for HIV prevention, Suboxone for those with opiate use disorder, and gender-affirming hormone treatment for gender-diverse individuals.",
    website: "www.greatlakesbayhealthcenters.org",
    phone: "989-755-0316",
    lat: "43.42896",
    long: "-8392371"
)

hormones6 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: detroit.id,
    name: "Mott Children's Hospital - Daniel Schumer MD, MPH",
    address: "1540 E Hospital Dr, Ann Arbor, MI 48109",
    description: "The Gender Management (GEM) Program at Mott Children’s Hospital has been developed to care for transgender and gender non-conforming patients.  This program works hand-in-hand with the University of Michigan Health System Comprehensive Gender Services Program (UMHS-CGSP).  Dr. Daniel Shumer is a Pediatric Endocrinologist at GEM who is experienced at working with transgender youth.  He follows the World Professional Association of Transgender Health (WPATH) guidelines to help adolescents with transition, including puberty suppression (blockers) and cross-sex hormones (such as testosterone and estrogen).",
    website: "www.mottchildren.org",
    phone: "734-764-5175",
    lat: "42.28196",
    long: "-83.72715"
)

hormones7 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: detroit.id,
    name: "Henry Ford Hospital, Division of Endocrinology - Jessica Shill, MD",
    address: "3031 W. Grand Blvd, Suite 800, Detroit MI 48202",
    description: "I see transgender and gender non-conforming patients ages 15 and above. I also supervise the endocrinologists in training (fellows) in our division so they learn how to assist transgender and gender non-conforming people with gender-affirming therapy. We have a thriving practice, and see many transgender and gender non-conforming people each week.",
    website: "www.henryford.com",
    phone: "313-916-2141",
    lat: "42.36728",
    long: "-83.08508"
)

hormones8 = Listing.create(
    identity_id: both.id,
    service_id: hormones.id,
    location_id: detroit.id,
    name: "The Ruth Ellis Health and Wellness Center",
    address: "77 Victor St, Highland Park, MI 48203",
    description: "The Ruth Ellis Health and Wellness Center is a primary care clinic for LGBTQ adolescents and young adults ages 10-30 years old.  Services include general primary care, well visits, gender affirming hormones, PrEP for HIV prevention, HIV treatment, STD testing and treatment, birth control, mental health services, and case management.  We are able to see patients regardless of their insurance status and labs and medications are covered by our program for uninsured patients.",
    website: "www.ruthelliscenter.org",
    phone: "313-365-3338",
    lat: "42.40752",
    long: "-83.09501"
)

"finished planting"