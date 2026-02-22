import { useState, useEffect } from "react";

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_USERS = [
  { id: "admin1", username: "admin", password: "admin123", role: "admin", name: "Mrs. Reyes" },
  { id: "t1",  username: "teacher1",  password: "teacher123", role: "teacher", name: "Mr. Santos" },
  { id: "t2",  username: "teacher2",  password: "teacher123", role: "teacher", name: "Ms. Cruz" },
  { id: "t3",  username: "teacher3",  password: "teacher123", role: "teacher", name: "Mr. Dela Torre" },
  { id: "t4",  username: "teacher4",  password: "teacher123", role: "teacher", name: "Ms. Villanueva" },
  { id: "t5",  username: "teacher5",  password: "teacher123", role: "teacher", name: "Mr. Manalo" },
  { id: "t6",  username: "teacher6",  password: "teacher123", role: "teacher", name: "Ms. Tolentino" },
  { id: "t7",  username: "teacher7",  password: "teacher123", role: "teacher", name: "Mr. Aquino" },
  { id: "t8",  username: "teacher8",  password: "teacher123", role: "teacher", name: "Ms. Delos Reyes" },
  { id: "t9",  username: "teacher9",  password: "teacher123", role: "teacher", name: "Mr. Vergara" },
  { id: "t10", username: "teacher10", password: "teacher123", role: "teacher", name: "Ms. Padilla" },
  { id: "t11", username: "teacher11", password: "teacher123", role: "teacher", name: "Mr. Ocampo" },
  { id: "t12", username: "teacher12", password: "teacher123", role: "teacher", name: "Ms. Lim" },
  { id: "t13", username: "teacher13", password: "teacher123", role: "teacher", name: "Mr. Fernandez" },
  { id: "t14", username: "teacher14", password: "teacher123", role: "teacher", name: "Ms. Castillo" },
  { id: "t15", username: "teacher15", password: "teacher123", role: "teacher", name: "Mr. Bautista" },
  { id: "t16", username: "teacher16", password: "teacher123", role: "teacher", name: "Ms. Miranda" },
  { id: "t17", username: "teacher17", password: "teacher123", role: "teacher", name: "Mr. Reyes" },
  // STEM
  { id: "stu1",  username: "student1",  password: "student123", role: "student", name: "dela Cruz, Juan",    lrn: "202411001", strand: "STEM",                          gradeLevel: 11, section: "sec1",  enrolled: true },
  { id: "stu2",  username: "student2",  password: "student123", role: "student", name: "Santos, Ana",        lrn: "202411002", strand: "STEM",                          gradeLevel: 11, section: "sec1",  enrolled: true },
  { id: "stu3",  username: "student3",  password: "student123", role: "student", name: "Bautista, Carlo",    lrn: "202412001", strand: "STEM",                          gradeLevel: 12, section: "sec2",  enrolled: true },
  { id: "stu4",  username: "student4",  password: "student123", role: "student", name: "Flores, Leia",       lrn: "202412002", strand: "STEM",                          gradeLevel: 12, section: "sec2",  enrolled: true },
  // Business & Entrepreneurship
  { id: "stu5",  username: "student5",  password: "student123", role: "student", name: "Reyes, Maria",       lrn: "202411003", strand: "Business and Entrepreneurship", gradeLevel: 11, section: "sec3",  enrolled: true },
  { id: "stu6",  username: "student6",  password: "student123", role: "student", name: "Garcia, Jose",       lrn: "202411004", strand: "Business and Entrepreneurship", gradeLevel: 11, section: "sec3",  enrolled: true },
  { id: "stu7",  username: "student7",  password: "student123", role: "student", name: "Torres, Bianca",     lrn: "202412003", strand: "Business and Entrepreneurship", gradeLevel: 12, section: "sec4",  enrolled: true },
  // ASSH
  { id: "stu8",  username: "student8",  password: "student123", role: "student", name: "Lopez, Marco",       lrn: "202411005", strand: "Arts Social Science and Humanities", gradeLevel: 11, section: "sec5",  enrolled: true },
  { id: "stu9",  username: "student9",  password: "student123", role: "student", name: "Mendoza, Clara",     lrn: "202412004", strand: "Arts Social Science and Humanities", gradeLevel: 12, section: "sec6",  enrolled: true },
  // ICT
  { id: "stu10", username: "student10", password: "student123", role: "student", name: "Ramos, Kevin",        lrn: "202411006", strand: "ICT Programming",               gradeLevel: 11, section: "sec7",  enrolled: true },
  { id: "stu11", username: "student11", password: "student123", role: "student", name: "Castillo, Nina",     lrn: "202412005", strand: "ICT Programming",               gradeLevel: 12, section: "sec8",  enrolled: true },
  // Hospitality
  { id: "stu12", username: "student12", password: "student123", role: "student", name: "Aguilar, Rose",      lrn: "202411007", strand: "Hospitality and Food Services",  gradeLevel: 11, section: "sec9",  enrolled: true },
  { id: "stu13", username: "student13", password: "student123", role: "student", name: "Navarro, Dan",       lrn: "202412006", strand: "Hospitality and Food Services",  gradeLevel: 12, section: "sec10", enrolled: true },
  // Automotive
  { id: "stu14", username: "student14", password: "student123", role: "student", name: "Cruz, Miguel",       lrn: "202411008", strand: "Automotive and Small Engine",    gradeLevel: 11, section: "sec11", enrolled: true },
  { id: "stu15", username: "student15", password: "student123", role: "student", name: "Jimenez, Paolo",     lrn: "202412007", strand: "Automotive and Small Engine",    gradeLevel: 12, section: "sec12", enrolled: true },
  // Welding
  { id: "stu16", username: "student16", password: "student123", role: "student", name: "Pascual, Ben",       lrn: "202411009", strand: "Welding",                       gradeLevel: 11, section: "sec13", enrolled: true },
  // Electrical
  { id: "stu17", username: "student17", password: "student123", role: "student", name: "Lim, Aaron",         lrn: "202411010", strand: "Electrical and Electronics",     gradeLevel: 11, section: "sec14", enrolled: true },
  // Garments
  { id: "stu18", username: "student18", password: "student123", role: "student", name: "Dela Rosa, Cathy",   lrn: "202411011", strand: "Garments Artisanry",             gradeLevel: 11, section: "sec15", enrolled: true },
  // Aesthetic Caregiving
  { id: "stu19", username: "student19", password: "student123", role: "student", name: "Aquino, Pia",        lrn: "202411012", strand: "Aesthetic and Caregiving",       gradeLevel: 11, section: "sec16", enrolled: false,
    email: "pia.aquino@email.com", contact: "09171234567",
    lastName: "Aquino", firstName: "Pia", middleName: "Santos", maidenName: "", dob: "2007-03-12", pob: "Manila", sex: "Female", civil: "Single", religion: "Roman Catholic", citizenship: "Filipino",
    region: "NCR", province: "Metro Manila", city: "Manila", barangay: "Barangay 1", zip: "1000", houseNo: "12", street: "Rizal St.",
    fatherName: "Roberto Aquino", fatherOccupation: "Driver", fatherContact: "09181234567",
    motherName: "Lourdes Aquino", motherOccupation: "Vendor", motherContact: "09191234567",
    guardianName: "Roberto Aquino", guardianRelationship: "Father", guardianAddress: "12 Rizal St., Manila", guardianContact: "09181234567"
  },
  // NEW unenrolled student for enrollment testing
  { id: "stu20", username: "newstudent", password: "newstudent123", role: "student", name: "Villanueva, Mark",  lrn: "202511001", strand: "STEM",  gradeLevel: 11, section: "sec1",  enrolled: false,
    email: "mark.villanueva@email.com", contact: "09201234567",
    lastName: "Villanueva", firstName: "Mark", middleName: "Cruz", maidenName: "", dob: "2008-06-20", pob: "Quezon City", sex: "Male", civil: "Single", religion: "Roman Catholic", citizenship: "Filipino",
    region: "NCR", province: "Metro Manila", city: "Quezon City", barangay: "Batasan Hills", zip: "1126", houseNo: "45", street: "Commonwealth Ave.",
    fatherName: "Eduardo Villanueva", fatherOccupation: "Engineer", fatherContact: "09211234567",
    motherName: "Carmen Villanueva", motherOccupation: "Teacher", motherContact: "09221234567",
    guardianName: "Eduardo Villanueva", guardianRelationship: "Father", guardianAddress: "45 Commonwealth Ave., Quezon City", guardianContact: "09211234567"
  },
];

const MOCK_SUBJECTS = (() => {
  const list = [
    // CORE Gr11
    ["sc1","Oral Communication","ALL",11,"Core",null],
    ["sc2","Reading and Writing","ALL",11,"Core",null],
    ["sc3","Komunikasyon at Pananaliksik sa Wika","ALL",11,"Core",null],
    ["sc4","Pagbasa at Pagsusuri ng Teksto","ALL",11,"Core",null],
    ["sc5","General Mathematics","ALL",11,"Core","t1"],
    ["sc6","Statistics and Probability","ALL",11,"Core","t1"],
    ["sc7","Earth and Life Science","ALL",11,"Core","t2"],
    ["sc8","Personal Development","ALL",11,"Core",null],
    ["sc9","PE and Health 1","ALL",11,"Core",null],
    // CORE Gr12
    ["sc10","21st Century Literature","ALL",12,"Core",null],
    ["sc11","Contemporary Philippine Arts","ALL",12,"Core",null],
    ["sc12","Media and Information Literacy","ALL",12,"Core",null],
    ["sc13","Physical Science","ALL",12,"Core","t2"],
    ["sc14","Understanding Culture Society and Politics","ALL",12,"Core",null],
    ["sc15","PE and Health 2","ALL",12,"Core",null],
    // Business & Entrepreneurship Gr11
    ["sb1","Business Mathematics","Business and Entrepreneurship",11,"Academic","t1"],
    ["sb2","Fundamentals of Accountancy 1","Business and Entrepreneurship",11,"Academic","t1"],
    ["sb3","Principles of Marketing","Business and Entrepreneurship",11,"Academic","t3"],
    ["sb4","Organization and Management","Business and Entrepreneurship",11,"Academic","t3"],
    // Business & Entrepreneurship Gr12
    ["sb5","Fundamentals of Accountancy 2","Business and Entrepreneurship",12,"Academic","t1"],
    ["sb6","Business Finance","Business and Entrepreneurship",12,"Academic","t3"],
    ["sb7","Applied Economics","Business and Entrepreneurship",12,"Academic","t3"],
    ["sb8","Business Enterprise","Business and Entrepreneurship",12,"Academic",null],
    ["sb9","Work Immersion","Business and Entrepreneurship",12,"Academic",null],
    // ASSH Gr11
    ["sa1","Trends and Critical Thinking","Arts Social Science and Humanities",11,"Academic","t4"],
    ["sa2","Philippine Politics and Governance","Arts Social Science and Humanities",11,"Academic","t4"],
    ["sa3","Disciplines in Social Sciences","Arts Social Science and Humanities",11,"Academic","t4"],
    ["sa4","Creative Writing","Arts Social Science and Humanities",11,"Academic",null],
    // ASSH Gr12
    ["sa5","Community Engagement","Arts Social Science and Humanities",12,"Academic","t4"],
    ["sa6","Applied Social Sciences","Arts Social Science and Humanities",12,"Academic","t4"],
    ["sa7","Humanities Research","Arts Social Science and Humanities",12,"Academic",null],
    ["sa8","Work Immersion","Arts Social Science and Humanities",12,"Academic",null],
    // STEM Gr11
    ["ss1","Pre Calculus","STEM",11,"Academic","t1"],
    ["ss2","General Biology 1","STEM",11,"Academic","t2"],
    ["ss3","General Chemistry 1","STEM",11,"Academic","t2"],
    ["ss4","General Physics 1","STEM",11,"Academic","t5"],
    // STEM Gr12
    ["ss5","Basic Calculus","STEM",12,"Academic","t1"],
    ["ss6","General Biology 2","STEM",12,"Academic","t2"],
    ["ss7","General Chemistry 2","STEM",12,"Academic","t2"],
    ["ss8","General Physics 2","STEM",12,"Academic","t5"],
    ["ss9","STEM Research","STEM",12,"Academic",null],
    ["ss10","Work Immersion","STEM",12,"Academic",null],
    // Aesthetic & Caregiving Gr11
    ["sac1","Intro to Caregiving and Beauty Care","Aesthetic and Caregiving",11,"TechPro",null],
    ["sac2","Basic Health Care Skills","Aesthetic and Caregiving",11,"TechPro",null],
    ["sac3","Safety and Hygiene","Aesthetic and Caregiving",11,"TechPro",null],
    ["sac4","Client Care Fundamentals","Aesthetic and Caregiving",11,"TechPro",null],
    // Aesthetic & Caregiving Gr12
    ["sac5","Advanced Caregiving and Beauty Procedures","Aesthetic and Caregiving",12,"TechPro",null],
    ["sac6","Clinical Practice","Aesthetic and Caregiving",12,"TechPro",null],
    ["sac7","Work Immersion","Aesthetic and Caregiving",12,"TechPro",null],
    ["sac8","NC II Assessment","Aesthetic and Caregiving",12,"TechPro",null],
    // Garments Artisanry Gr11
    ["sg1","Basic Sewing","Garments Artisanry",11,"TechPro",null],
    ["sg2","Textile and Fabric","Garments Artisanry",11,"TechPro",null],
    ["sg3","Pattern Making","Garments Artisanry",11,"TechPro",null],
    ["sg4","Garment Construction","Garments Artisanry",11,"TechPro",null],
    // Garments Artisanry Gr12
    ["sg5","Advanced Garment Production","Garments Artisanry",12,"TechPro",null],
    ["sg6","Fashion Product Development","Garments Artisanry",12,"TechPro",null],
    ["sg7","Work Immersion","Garments Artisanry",12,"TechPro",null],
    ["sg8","NC II","Garments Artisanry",12,"TechPro",null],
    // Automotive Gr11
    ["sau1","Engine Fundamentals","Automotive and Small Engine",11,"TechPro","t5"],
    ["sau2","Tools and Equipment","Automotive and Small Engine",11,"TechPro","t5"],
    ["sau3","Basic Maintenance","Automotive and Small Engine",11,"TechPro","t5"],
    ["sau4","Chassis Basics","Automotive and Small Engine",11,"TechPro","t5"],
    // Automotive Gr12
    ["sau5","Engine Repair","Automotive and Small Engine",12,"TechPro","t5"],
    ["sau6","Electrical Systems","Automotive and Small Engine",12,"TechPro","t5"],
    ["sau7","Troubleshooting","Automotive and Small Engine",12,"TechPro","t5"],
    ["sau8","Work Immersion","Automotive and Small Engine",12,"TechPro",null],
    ["sau9","NC Assessment","Automotive and Small Engine",12,"TechPro",null],
    // Welding Gr11
    ["sw1","Welding Safety","Welding",11,"TechPro",null],
    ["sw2","Tools and Materials","Welding",11,"TechPro",null],
    ["sw3","Basic Welding","Welding",11,"TechPro",null],
    ["sw4","Metal Preparation","Welding",11,"TechPro",null],
    // Welding Gr12
    ["sw5","Advanced Welding","Welding",12,"TechPro",null],
    ["sw6","Fabrication","Welding",12,"TechPro",null],
    ["sw7","Structural Welding","Welding",12,"TechPro",null],
    ["sw8","NC Assessment","Welding",12,"TechPro",null],
    // Hospitality Gr11
    ["sh1","Food Safety","Hospitality and Food Services",11,"TechPro","t3"],
    ["sh2","Kitchen Tools and Equipment","Hospitality and Food Services",11,"TechPro","t3"],
    ["sh3","Basic Cooking and Baking","Hospitality and Food Services",11,"TechPro","t3"],
    ["sh4","Service Fundamentals","Hospitality and Food Services",11,"TechPro","t3"],
    // Hospitality Gr12
    ["sh5","Advanced Kitchen Operations","Hospitality and Food Services",12,"TechPro","t3"],
    ["sh6","Food and Beverage Service","Hospitality and Food Services",12,"TechPro","t3"],
    ["sh7","Hotel Operations","Hospitality and Food Services",12,"TechPro",null],
    ["sh8","Work Immersion","Hospitality and Food Services",12,"TechPro",null],
    ["sh9","NC Assessment","Hospitality and Food Services",12,"TechPro",null],
    // ICT Programming Gr11
    ["si1","Computer Fundamentals","ICT Programming",11,"TechPro","t4"],
    ["si2","Programming Logic","ICT Programming",11,"TechPro","t4"],
    ["si3","Intro to Programming","ICT Programming",11,"TechPro","t4"],
    ["si4","Hardware and Networking Basics","ICT Programming",11,"TechPro",null],
    // ICT Programming Gr12
    ["si5","Java Programming","ICT Programming",12,"TechPro","t4"],
    ["si6",".NET Programming","ICT Programming",12,"TechPro","t4"],
    ["si7","Oracle Database","ICT Programming",12,"TechPro",null],
    ["si8","Systems Development","ICT Programming",12,"TechPro",null],
    ["si9","Work Immersion","ICT Programming",12,"TechPro",null],
    ["si10","NC II","ICT Programming",12,"TechPro",null],
    // Electrical & Electronics Gr11
    ["se1","Electrical Fundamentals","Electrical and Electronics",11,"TechPro","t5"],
    ["se2","Tools and Safety","Electrical and Electronics",11,"TechPro","t5"],
    ["se3","Wiring Basics","Electrical and Electronics",11,"TechPro","t5"],
    ["se4","Electronic Components","Electrical and Electronics",11,"TechPro","t5"],
    // Electrical & Electronics Gr12
    ["se5","Electrical Installation","Electrical and Electronics",12,"TechPro","t5"],
    ["se6","Circuit Troubleshooting","Electrical and Electronics",12,"TechPro","t5"],
    ["se7","Equipment Servicing","Electrical and Electronics",12,"TechPro",null],
    ["se8","Work Immersion","Electrical and Electronics",12,"TechPro",null],
    ["se9","NC Assessment","Electrical and Electronics",12,"TechPro",null],
  ];
  return list.map(([id, name, strand, gradeLevel, track, teacherId]) => ({ id, name, strand, gradeLevel, track, teacherId, units: 3 }));
})()

// Semester map: subjectId -> 1 or 2
const SUBJECT_SEM = {"sc1": 1, "sc2": 1, "sc3": 1, "sc4": 1, "sc5": 1, "sc6": 2, "sc7": 2, "sc8": 2, "sc9": 2, "sc10": 1, "sc11": 1, "sc12": 1, "sc13": 2, "sc14": 2, "sc15": 2, "sb1": 1, "sb2": 1, "sb3": 2, "sb4": 2, "sb5": 1, "sb6": 1, "sb7": 1, "sb8": 2, "sb9": 2, "sa1": 1, "sa2": 1, "sa3": 2, "sa4": 2, "sa5": 1, "sa6": 1, "sa7": 2, "sa8": 2, "ss1": 1, "ss2": 1, "ss3": 2, "ss4": 2, "ss5": 1, "ss6": 1, "ss7": 1, "ss8": 2, "ss9": 2, "ss10": 2, "sac1": 1, "sac2": 1, "sac3": 2, "sac4": 2, "sac5": 1, "sac6": 1, "sac7": 2, "sac8": 2, "sg1": 1, "sg2": 1, "sg3": 2, "sg4": 2, "sg5": 1, "sg6": 1, "sg7": 2, "sg8": 2, "sau1": 1, "sau2": 1, "sau3": 2, "sau4": 2, "sau5": 1, "sau6": 1, "sau7": 1, "sau8": 2, "sau9": 2, "sw1": 1, "sw2": 1, "sw3": 2, "sw4": 2, "sw5": 1, "sw6": 1, "sw7": 2, "sw8": 2, "sh1": 1, "sh2": 1, "sh3": 2, "sh4": 2, "sh5": 1, "sh6": 1, "sh7": 1, "sh8": 2, "sh9": 2, "si1": 1, "si2": 1, "si3": 2, "si4": 2, "si5": 1, "si6": 1, "si7": 1, "si8": 2, "si9": 2, "si10": 2, "se1": 1, "se2": 1, "se3": 2, "se4": 2, "se5": 1, "se6": 1, "se7": 1, "se8": 2, "se9": 2};

const MOCK_SECTIONS = [
  { id: "sec1",  name: "STEM 11-A",        gradeLevel: 11, strand: "STEM" },
  { id: "sec2",  name: "STEM 12-A",        gradeLevel: 12, strand: "STEM" },
  { id: "sec3",  name: "BusEnt 11-A",      gradeLevel: 11, strand: "Business and Entrepreneurship" },
  { id: "sec4",  name: "BusEnt 12-A",      gradeLevel: 12, strand: "Business and Entrepreneurship" },
  { id: "sec5",  name: "ASSH 11-A",        gradeLevel: 11, strand: "Arts Social Science and Humanities" },
  { id: "sec6",  name: "ASSH 12-A",        gradeLevel: 12, strand: "Arts Social Science and Humanities" },
  { id: "sec7",  name: "ICT 11-A",         gradeLevel: 11, strand: "ICT Programming" },
  { id: "sec8",  name: "ICT 12-A",         gradeLevel: 12, strand: "ICT Programming" },
  { id: "sec9",  name: "Hosp 11-A",        gradeLevel: 11, strand: "Hospitality and Food Services" },
  { id: "sec10", name: "Hosp 12-A",        gradeLevel: 12, strand: "Hospitality and Food Services" },
  { id: "sec11", name: "Auto 11-A",        gradeLevel: 11, strand: "Automotive and Small Engine" },
  { id: "sec12", name: "Auto 12-A",        gradeLevel: 12, strand: "Automotive and Small Engine" },
  { id: "sec13", name: "Weld 11-A",        gradeLevel: 11, strand: "Welding" },
  { id: "sec14", name: "Elec 11-A",        gradeLevel: 11, strand: "Electrical and Electronics" },
  { id: "sec15", name: "Garm 11-A",        gradeLevel: 11, strand: "Garments Artisanry" },
  { id: "sec16", name: "AesCare 11-A",     gradeLevel: 11, strand: "Aesthetic and Caregiving" },
];

const MOCK_GRADES = [
  { id: "g1", studentId: "stu1", subjectId: "sc1", sem: 1, q1: 89, q2: 86, status: "approved" },
  { id: "g2", studentId: "stu1", subjectId: "sc2", sem: 1, q1: 86, q2: 86, status: "approved" },
  { id: "g3", studentId: "stu1", subjectId: "sc3", sem: 1, q1: 91, q2: 85, status: "approved" },
  { id: "g4", studentId: "stu1", subjectId: "sc4", sem: 1, q1: 90, q2: 92, status: "approved" },
  { id: "g5", studentId: "stu1", subjectId: "sc5", sem: 1, q1: 90, q2: 89, status: "approved" },
  { id: "g6", studentId: "stu1", subjectId: "sc6", sem: 2, q1: 88, q2: 90, status: "approved" },
  { id: "g7", studentId: "stu1", subjectId: "sc7", sem: 2, q1: 91, q2: 91, status: "approved" },
  { id: "g8", studentId: "stu1", subjectId: "sc8", sem: 2, q1: 90, q2: 87, status: "approved" },
  { id: "g9", studentId: "stu1", subjectId: "sc9", sem: 2, q1: 88, q2: 90, status: "approved" },
  { id: "g10", studentId: "stu1", subjectId: "ss1", sem: 1, q1: 91, q2: 89, status: "approved" },
  { id: "g11", studentId: "stu1", subjectId: "ss2", sem: 1, q1: 85, q2: 92, status: "approved" },
  { id: "g12", studentId: "stu1", subjectId: "ss3", sem: 2, q1: 89, q2: 88, status: "approved" },
  { id: "g13", studentId: "stu1", subjectId: "ss4", sem: 2, q1: 83, q2: 87, status: "approved" },
  { id: "g14", studentId: "stu2", subjectId: "sc1", sem: 1, q1: 83, q2: 81, status: "approved" },
  { id: "g15", studentId: "stu2", subjectId: "sc2", sem: 1, q1: 86, q2: 79, status: "approved" },
  { id: "g16", studentId: "stu2", subjectId: "sc3", sem: 1, q1: 85, q2: 80, status: "approved" },
  { id: "g17", studentId: "stu2", subjectId: "sc4", sem: 1, q1: 77, q2: 82, status: "approved" },
  { id: "g18", studentId: "stu2", subjectId: "sc5", sem: 1, q1: 80, q2: 84, status: "approved" },
  { id: "g19", studentId: "stu2", subjectId: "sc6", sem: 2, q1: 84, q2: 85, status: "approved" },
  { id: "g20", studentId: "stu2", subjectId: "sc7", sem: 2, q1: 86, q2: 79, status: "approved" },
  { id: "g21", studentId: "stu2", subjectId: "sc8", sem: 2, q1: 79, q2: 79, status: "approved" },
  { id: "g22", studentId: "stu2", subjectId: "sc9", sem: 2, q1: 81, q2: 83, status: "approved" },
  { id: "g23", studentId: "stu2", subjectId: "ss1", sem: 1, q1: 78, q2: 83, status: "approved" },
  { id: "g24", studentId: "stu2", subjectId: "ss2", sem: 1, q1: 81, q2: 82, status: "approved" },
  { id: "g25", studentId: "stu2", subjectId: "ss3", sem: 2, q1: 83, q2: 82, status: "approved" },
  { id: "g26", studentId: "stu2", subjectId: "ss4", sem: 2, q1: 83, q2: 82, status: "approved" },
  { id: "g27", studentId: "stu3", subjectId: "sc10", sem: 1, q1: 90, q2: 84, status: "approved" },
  { id: "g28", studentId: "stu3", subjectId: "sc11", sem: 1, q1: 87, q2: 86, status: "approved" },
  { id: "g29", studentId: "stu3", subjectId: "sc12", sem: 1, q1: 84, q2: 87, status: "approved" },
  { id: "g30", studentId: "stu3", subjectId: "sc13", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g31", studentId: "stu3", subjectId: "sc14", sem: 2, q1: 88, q2: 87, status: "approved" },
  { id: "g32", studentId: "stu3", subjectId: "sc15", sem: 2, q1: 85, q2: 85, status: "approved" },
  { id: "g33", studentId: "stu3", subjectId: "ss5", sem: 1, q1: 86, q2: 85, status: "approved" },
  { id: "g34", studentId: "stu3", subjectId: "ss6", sem: 1, q1: 87, q2: 85, status: "approved" },
  { id: "g35", studentId: "stu3", subjectId: "ss7", sem: 1, q1: 88, q2: 86, status: "approved" },
  { id: "g36", studentId: "stu3", subjectId: "ss8", sem: 2, q1: 85, q2: 86, status: "approved" },
  { id: "g37", studentId: "stu3", subjectId: "ss9", sem: 2, q1: 87, q2: 86, status: "approved" },
  { id: "g38", studentId: "stu3", subjectId: "ss10", sem: 2, q1: 89, q2: 87, status: "approved" },
  { id: "g39", studentId: "stu4", subjectId: "sc10", sem: 1, q1: 86, q2: 82, status: "approved" },
  { id: "g40", studentId: "stu4", subjectId: "sc11", sem: 1, q1: 83, q2: 86, status: "approved" },
  { id: "g41", studentId: "stu4", subjectId: "sc12", sem: 1, q1: 84, q2: 85, status: "approved" },
  { id: "g42", studentId: "stu4", subjectId: "sc13", sem: 2, q1: 85, q2: 84, status: "approved" },
  { id: "g43", studentId: "stu4", subjectId: "sc14", sem: 2, q1: 83, q2: 82, status: "approved" },
  { id: "g44", studentId: "stu4", subjectId: "sc15", sem: 2, q1: 86, q2: 87, status: "approved" },
  { id: "g45", studentId: "stu4", subjectId: "ss5", sem: 1, q1: 83, q2: 87, status: "approved" },
  { id: "g46", studentId: "stu4", subjectId: "ss6", sem: 1, q1: 86, q2: 86, status: "approved" },
  { id: "g47", studentId: "stu4", subjectId: "ss7", sem: 1, q1: 81, q2: 85, status: "approved" },
  { id: "g48", studentId: "stu4", subjectId: "ss8", sem: 2, q1: 60, q2: 63, status: "approved" },
  { id: "g49", studentId: "stu4", subjectId: "ss9", sem: 2, q1: 87, q2: 81, status: "approved" },
  { id: "g50", studentId: "stu4", subjectId: "ss10", sem: 2, q1: 85, q2: 83, status: "approved" },
  { id: "g51", studentId: "stu5", subjectId: "sc1", sem: 1, q1: 81, q2: 79, status: "approved" },
  { id: "g52", studentId: "stu5", subjectId: "sc2", sem: 1, q1: 82, q2: 83, status: "approved" },
  { id: "g53", studentId: "stu5", subjectId: "sc3", sem: 1, q1: 78, q2: 79, status: "approved" },
  { id: "g54", studentId: "stu5", subjectId: "sc4", sem: 1, q1: 81, q2: 77, status: "approved" },
  { id: "g55", studentId: "stu5", subjectId: "sc5", sem: 1, q1: 81, q2: 82, status: "approved" },
  { id: "g56", studentId: "stu5", subjectId: "sc6", sem: 2, q1: 79, q2: 78, status: "approved" },
  { id: "g57", studentId: "stu5", subjectId: "sc7", sem: 2, q1: 78, q2: 76, status: "approved" },
  { id: "g58", studentId: "stu5", subjectId: "sc8", sem: 2, q1: 79, q2: 78, status: "approved" },
  { id: "g59", studentId: "stu5", subjectId: "sc9", sem: 2, q1: 82, q2: 81, status: "approved" },
  { id: "g60", studentId: "stu5", subjectId: "sb1", sem: 1, q1: 81, q2: 78, status: "approved" },
  { id: "g61", studentId: "stu5", subjectId: "sb2", sem: 1, q1: 65, q2: 66, status: "approved" },
  { id: "g62", studentId: "stu5", subjectId: "sb3", sem: 2, q1: 77, q2: 81, status: "approved" },
  { id: "g63", studentId: "stu5", subjectId: "sb4", sem: 2, q1: 76, q2: 80, status: "approved" },
  { id: "g64", studentId: "stu6", subjectId: "sc1", sem: 1, q1: 78, q2: 84, status: "approved" },
  { id: "g65", studentId: "stu6", subjectId: "sc2", sem: 1, q1: 78, q2: 79, status: "approved" },
  { id: "g66", studentId: "stu6", subjectId: "sc3", sem: 1, q1: 82, q2: 83, status: "approved" },
  { id: "g67", studentId: "stu6", subjectId: "sc4", sem: 1, q1: 79, q2: 76, status: "approved" },
  { id: "g68", studentId: "stu6", subjectId: "sc5", sem: 1, q1: 80, q2: 78, status: "approved" },
  { id: "g69", studentId: "stu6", subjectId: "sc6", sem: 2, q1: 78, q2: 81, status: "approved" },
  { id: "g70", studentId: "stu6", subjectId: "sc7", sem: 2, q1: 81, q2: 84, status: "approved" },
  { id: "g71", studentId: "stu6", subjectId: "sc8", sem: 2, q1: 79, q2: 77, status: "approved" },
  { id: "g72", studentId: "stu6", subjectId: "sc9", sem: 2, q1: 81, q2: 77, status: "approved" },
  { id: "g73", studentId: "stu6", subjectId: "sb1", sem: 1, q1: 83, q2: 81, status: "approved" },
  { id: "g74", studentId: "stu6", subjectId: "sb2", sem: 1, q1: 78, q2: 80, status: "approved" },
  { id: "g75", studentId: "stu6", subjectId: "sb3", sem: 2, q1: 81, q2: 83, status: "approved" },
  { id: "g76", studentId: "stu6", subjectId: "sb4", sem: 2, q1: 79, q2: 79, status: "approved" },
  { id: "g77", studentId: "stu7", subjectId: "sc10", sem: 1, q1: 84, q2: 85, status: "approved" },
  { id: "g78", studentId: "stu7", subjectId: "sc11", sem: 1, q1: 82, q2: 87, status: "approved" },
  { id: "g79", studentId: "stu7", subjectId: "sc12", sem: 1, q1: 90, q2: 82, status: "approved" },
  { id: "g80", studentId: "stu7", subjectId: "sc13", sem: 2, q1: 87, q2: 84, status: "approved" },
  { id: "g81", studentId: "stu7", subjectId: "sc14", sem: 2, q1: 88, q2: 80, status: "approved" },
  { id: "g82", studentId: "stu7", subjectId: "sc15", sem: 2, q1: 85, q2: 86, status: "approved" },
  { id: "g83", studentId: "stu7", subjectId: "sb5", sem: 1, q1: 85, q2: 83, status: "approved" },
  { id: "g84", studentId: "stu7", subjectId: "sb6", sem: 1, q1: 81, q2: 86, status: "approved" },
  { id: "g85", studentId: "stu7", subjectId: "sb7", sem: 1, q1: 84, q2: 82, status: "approved" },
  { id: "g86", studentId: "stu7", subjectId: "sb8", sem: 2, q1: 86, q2: 82, status: "approved" },
  { id: "g87", studentId: "stu7", subjectId: "sb9", sem: 2, q1: 80, q2: 80, status: "approved" },
  { id: "g88", studentId: "stu8", subjectId: "sc1", sem: 1, q1: 96, q2: 91, status: "approved" },
  { id: "g89", studentId: "stu8", subjectId: "sc2", sem: 1, q1: 90, q2: 95, status: "approved" },
  { id: "g90", studentId: "stu8", subjectId: "sc3", sem: 1, q1: 93, q2: 91, status: "approved" },
  { id: "g91", studentId: "stu8", subjectId: "sc4", sem: 1, q1: 89, q2: 92, status: "approved" },
  { id: "g92", studentId: "stu8", subjectId: "sc5", sem: 1, q1: 91, q2: 91, status: "approved" },
  { id: "g93", studentId: "stu8", subjectId: "sc6", sem: 2, q1: 89, q2: 96, status: "approved" },
  { id: "g94", studentId: "stu8", subjectId: "sc7", sem: 2, q1: 95, q2: 93, status: "approved" },
  { id: "g95", studentId: "stu8", subjectId: "sc8", sem: 2, q1: 94, q2: 91, status: "approved" },
  { id: "g96", studentId: "stu8", subjectId: "sc9", sem: 2, q1: 90, q2: 91, status: "approved" },
  { id: "g97", studentId: "stu8", subjectId: "sa1", sem: 1, q1: 90, q2: 93, status: "approved" },
  { id: "g98", studentId: "stu8", subjectId: "sa2", sem: 1, q1: 90, q2: 94, status: "approved" },
  { id: "g99", studentId: "stu8", subjectId: "sa3", sem: 2, q1: 89, q2: 92, status: "approved" },
  { id: "g100", studentId: "stu8", subjectId: "sa4", sem: 2, q1: 93, q2: 93, status: "approved" },
  { id: "g101", studentId: "stu9", subjectId: "sc10", sem: 1, q1: 82, q2: 86, status: "approved" },
  { id: "g102", studentId: "stu9", subjectId: "sc11", sem: 1, q1: 83, q2: 84, status: "approved" },
  { id: "g103", studentId: "stu9", subjectId: "sc12", sem: 1, q1: 82, q2: 81, status: "approved" },
  { id: "g104", studentId: "stu9", subjectId: "sc13", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g105", studentId: "stu9", subjectId: "sc14", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g106", studentId: "stu9", subjectId: "sc15", sem: 2, q1: 82, q2: 85, status: "approved" },
  { id: "g107", studentId: "stu9", subjectId: "sa5", sem: 1, q1: 87, q2: 79, status: "approved" },
  { id: "g108", studentId: "stu9", subjectId: "sa6", sem: 1, q1: 86, q2: 81, status: "approved" },
  { id: "g109", studentId: "stu9", subjectId: "sa7", sem: 2, q1: 83, q2: 82, status: "approved" },
  { id: "g110", studentId: "stu9", subjectId: "sa8", sem: 2, q1: 79, q2: 85, status: "approved" },
  { id: "g111", studentId: "stu10", subjectId: "sc1", sem: 1, q1: 94, q2: 93, status: "approved" },
  { id: "g112", studentId: "stu10", subjectId: "sc2", sem: 1, q1: 91, q2: 93, status: "approved" },
  { id: "g113", studentId: "stu10", subjectId: "sc3", sem: 1, q1: 94, q2: 91, status: "approved" },
  { id: "g114", studentId: "stu10", subjectId: "sc4", sem: 1, q1: 95, q2: 90, status: "approved" },
  { id: "g115", studentId: "stu10", subjectId: "sc5", sem: 1, q1: 94, q2: 93, status: "approved" },
  { id: "g116", studentId: "stu10", subjectId: "sc6", sem: 2, q1: 95, q2: 95, status: "approved" },
  { id: "g117", studentId: "stu10", subjectId: "sc7", sem: 2, q1: 95, q2: 94, status: "approved" },
  { id: "g118", studentId: "stu10", subjectId: "sc8", sem: 2, q1: 95, q2: 92, status: "approved" },
  { id: "g119", studentId: "stu10", subjectId: "sc9", sem: 2, q1: 94, q2: 95, status: "approved" },
  { id: "g120", studentId: "stu10", subjectId: "si1", sem: 1, q1: 97, q2: 92, status: "approved" },
  { id: "g121", studentId: "stu10", subjectId: "si2", sem: 1, q1: 95, q2: 94, status: "approved" },
  { id: "g122", studentId: "stu10", subjectId: "si3", sem: 2, q1: 93, q2: 93, status: "approved" },
  { id: "g123", studentId: "stu10", subjectId: "si4", sem: 2, q1: 92, q2: 91, status: "approved" },
  { id: "g124", studentId: "stu11", subjectId: "sc10", sem: 1, q1: 81, q2: 90, status: "approved" },
  { id: "g125", studentId: "stu11", subjectId: "sc11", sem: 1, q1: 85, q2: 85, status: "approved" },
  { id: "g126", studentId: "stu11", subjectId: "sc12", sem: 1, q1: 88, q2: 85, status: "approved" },
  { id: "g127", studentId: "stu11", subjectId: "sc13", sem: 2, q1: 86, q2: 85, status: "approved" },
  { id: "g128", studentId: "stu11", subjectId: "sc14", sem: 2, q1: 83, q2: 81, status: "approved" },
  { id: "g129", studentId: "stu11", subjectId: "sc15", sem: 2, q1: 88, q2: 87, status: "approved" },
  { id: "g130", studentId: "stu11", subjectId: "si5", sem: 1, q1: 82, q2: 83, status: "approved" },
  { id: "g131", studentId: "stu11", subjectId: "si6", sem: 1, q1: 85, q2: 86, status: "approved" },
  { id: "g132", studentId: "stu11", subjectId: "si7", sem: 1, q1: 63, q2: 57, status: "approved" },
  { id: "g133", studentId: "stu11", subjectId: "si8", sem: 2, q1: 90, q2: 84, status: "approved" },
  { id: "g134", studentId: "stu11", subjectId: "si9", sem: 2, q1: 88, q2: 87, status: "approved" },
  { id: "g135", studentId: "stu11", subjectId: "si10", sem: 2, q1: 84, q2: 82, status: "approved" },
  { id: "g136", studentId: "stu12", subjectId: "sc1", sem: 1, q1: 85, q2: 79, status: "approved" },
  { id: "g137", studentId: "stu12", subjectId: "sc2", sem: 1, q1: 79, q2: 81, status: "approved" },
  { id: "g138", studentId: "stu12", subjectId: "sc3", sem: 1, q1: 79, q2: 84, status: "approved" },
  { id: "g139", studentId: "stu12", subjectId: "sc4", sem: 1, q1: 79, q2: 85, status: "approved" },
  { id: "g140", studentId: "stu12", subjectId: "sc5", sem: 1, q1: 80, q2: 80, status: "approved" },
  { id: "g141", studentId: "stu12", subjectId: "sc6", sem: 2, q1: 83, q2: 83, status: "approved" },
  { id: "g142", studentId: "stu12", subjectId: "sc7", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g143", studentId: "stu12", subjectId: "sc8", sem: 2, q1: 80, q2: 81, status: "approved" },
  { id: "g144", studentId: "stu12", subjectId: "sc9", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g145", studentId: "stu12", subjectId: "sh1", sem: 1, q1: 78, q2: 84, status: "approved" },
  { id: "g146", studentId: "stu12", subjectId: "sh2", sem: 1, q1: 79, q2: 82, status: "approved" },
  { id: "g147", studentId: "stu12", subjectId: "sh3", sem: 2, q1: 81, q2: 80, status: "approved" },
  { id: "g148", studentId: "stu12", subjectId: "sh4", sem: 2, q1: 81, q2: 80, status: "approved" },
  { id: "g149", studentId: "stu13", subjectId: "sc10", sem: 1, q1: 88, q2: 84, status: "approved" },
  { id: "g150", studentId: "stu13", subjectId: "sc11", sem: 1, q1: 87, q2: 89, status: "approved" },
  { id: "g151", studentId: "stu13", subjectId: "sc12", sem: 1, q1: 87, q2: 88, status: "approved" },
  { id: "g152", studentId: "stu13", subjectId: "sc13", sem: 2, q1: 85, q2: 87, status: "approved" },
  { id: "g153", studentId: "stu13", subjectId: "sc14", sem: 2, q1: 87, q2: 91, status: "approved" },
  { id: "g154", studentId: "stu13", subjectId: "sc15", sem: 2, q1: 86, q2: 88, status: "approved" },
  { id: "g155", studentId: "stu13", subjectId: "sh5", sem: 1, q1: 86, q2: 89, status: "approved" },
  { id: "g156", studentId: "stu13", subjectId: "sh6", sem: 1, q1: 89, q2: 86, status: "approved" },
  { id: "g157", studentId: "stu13", subjectId: "sh7", sem: 1, q1: 89, q2: 90, status: "approved" },
  { id: "g158", studentId: "stu13", subjectId: "sh8", sem: 2, q1: 89, q2: 86, status: "approved" },
  { id: "g159", studentId: "stu13", subjectId: "sh9", sem: 2, q1: 86, q2: 86, status: "approved" },
  { id: "g160", studentId: "stu14", subjectId: "sc1", sem: 1, q1: 80, q2: 80, status: "approved" },
  { id: "g161", studentId: "stu14", subjectId: "sc2", sem: 1, q1: 82, q2: 79, status: "approved" },
  { id: "g162", studentId: "stu14", subjectId: "sc3", sem: 1, q1: 83, q2: 80, status: "approved" },
  { id: "g163", studentId: "stu14", subjectId: "sc4", sem: 1, q1: 78, q2: 82, status: "approved" },
  { id: "g164", studentId: "stu14", subjectId: "sc5", sem: 1, q1: 83, q2: 85, status: "approved" },
  { id: "g165", studentId: "stu14", subjectId: "sc6", sem: 2, q1: 85, q2: 87, status: "approved" },
  { id: "g166", studentId: "stu14", subjectId: "sc7", sem: 2, q1: 83, q2: 83, status: "approved" },
  { id: "g167", studentId: "stu14", subjectId: "sc8", sem: 2, q1: 82, q2: 84, status: "approved" },
  { id: "g168", studentId: "stu14", subjectId: "sc9", sem: 2, q1: 79, q2: 79, status: "approved" },
  { id: "g169", studentId: "stu14", subjectId: "sau1", sem: 1, q1: 81, q2: 81, status: "approved" },
  { id: "g170", studentId: "stu14", subjectId: "sau2", sem: 1, q1: 82, q2: 82, status: "approved" },
  { id: "g171", studentId: "stu14", subjectId: "sau3", sem: 2, q1: 80, q2: 82, status: "approved" },
  { id: "g172", studentId: "stu14", subjectId: "sau4", sem: 2, q1: 85, q2: 77, status: "approved" },
  { id: "g173", studentId: "stu15", subjectId: "sc10", sem: 1, q1: 82, q2: 87, status: "approved" },
  { id: "g174", studentId: "stu15", subjectId: "sc11", sem: 1, q1: 83, q2: 85, status: "approved" },
  { id: "g175", studentId: "stu15", subjectId: "sc12", sem: 1, q1: 87, q2: 86, status: "approved" },
  { id: "g176", studentId: "stu15", subjectId: "sc13", sem: 2, q1: 89, q2: 84, status: "approved" },
  { id: "g177", studentId: "stu15", subjectId: "sc14", sem: 2, q1: 85, q2: 86, status: "approved" },
  { id: "g178", studentId: "stu15", subjectId: "sc15", sem: 2, q1: 82, q2: 86, status: "approved" },
  { id: "g179", studentId: "stu15", subjectId: "sau5", sem: 1, q1: 88, q2: 88, status: "approved" },
  { id: "g180", studentId: "stu15", subjectId: "sau6", sem: 1, q1: 82, q2: 81, status: "approved" },
  { id: "g181", studentId: "stu15", subjectId: "sau7", sem: 1, q1: 87, q2: 83, status: "approved" },
  { id: "g182", studentId: "stu15", subjectId: "sau8", sem: 2, q1: 88, q2: 85, status: "approved" },
  { id: "g183", studentId: "stu15", subjectId: "sau9", sem: 2, q1: 63, q2: 57, status: "approved" },
  { id: "g184", studentId: "stu16", subjectId: "sc1", sem: 1, q1: 76, q2: 78, status: "approved" },
  { id: "g185", studentId: "stu16", subjectId: "sc2", sem: 1, q1: 76, q2: 80, status: "approved" },
  { id: "g186", studentId: "stu16", subjectId: "sc3", sem: 1, q1: 76, q2: 79, status: "approved" },
  { id: "g187", studentId: "stu16", subjectId: "sc4", sem: 1, q1: 76, q2: 76, status: "approved" },
  { id: "g188", studentId: "stu16", subjectId: "sc5", sem: 1, q1: 76, q2: 80, status: "approved" },
  { id: "g189", studentId: "stu16", subjectId: "sc6", sem: 2, q1: 78, q2: 77, status: "approved" },
  { id: "g190", studentId: "stu16", subjectId: "sc7", sem: 2, q1: 79, q2: 83, status: "approved" },
  { id: "g191", studentId: "stu16", subjectId: "sc8", sem: 2, q1: 76, q2: 78, status: "approved" },
  { id: "g192", studentId: "stu16", subjectId: "sc9", sem: 2, q1: 78, q2: 76, status: "approved" },
  { id: "g193", studentId: "stu16", subjectId: "sw1", sem: 1, q1: 75, q2: 75, status: "approved" },
  { id: "g194", studentId: "stu16", subjectId: "sw2", sem: 1, q1: 78, q2: 79, status: "approved" },
  { id: "g195", studentId: "stu16", subjectId: "sw3", sem: 2, q1: 75, q2: 77, status: "approved" },
  { id: "g196", studentId: "stu16", subjectId: "sw4", sem: 2, q1: 76, q2: 81, status: "approved" },
  { id: "g197", studentId: "stu17", subjectId: "sc1", sem: 1, q1: 83, q2: 80, status: "approved" },
  { id: "g198", studentId: "stu17", subjectId: "sc2", sem: 1, q1: 78, q2: 83, status: "approved" },
  { id: "g199", studentId: "stu17", subjectId: "sc3", sem: 1, q1: 78, q2: 79, status: "approved" },
  { id: "g200", studentId: "stu17", subjectId: "sc4", sem: 1, q1: 84, q2: 78, status: "approved" },
  { id: "g201", studentId: "stu17", subjectId: "sc5", sem: 1, q1: 81, q2: 79, status: "approved" },
  { id: "g202", studentId: "stu17", subjectId: "sc6", sem: 2, q1: 79, q2: 82, status: "approved" },
  { id: "g203", studentId: "stu17", subjectId: "sc7", sem: 2, q1: 77, q2: 84, status: "approved" },
  { id: "g204", studentId: "stu17", subjectId: "sc8", sem: 2, q1: 80, q2: 81, status: "approved" },
  { id: "g205", studentId: "stu17", subjectId: "sc9", sem: 2, q1: 78, q2: 81, status: "approved" },
  { id: "g206", studentId: "stu17", subjectId: "se1", sem: 1, q1: 81, q2: 81, status: "approved" },
  { id: "g207", studentId: "stu17", subjectId: "se2", sem: 1, q1: 78, q2: 78, status: "approved" },
  { id: "g208", studentId: "stu17", subjectId: "se3", sem: 2, q1: 83, q2: 77, status: "approved" },
  { id: "g209", studentId: "stu17", subjectId: "se4", sem: 2, q1: 79, q2: 78, status: "approved" },
  { id: "g210", studentId: "stu18", subjectId: "sc1", sem: 1, q1: 83, q2: 84, status: "approved" },
  { id: "g211", studentId: "stu18", subjectId: "sc2", sem: 1, q1: 82, q2: 88, status: "approved" },
  { id: "g212", studentId: "stu18", subjectId: "sc3", sem: 1, q1: 81, q2: 85, status: "approved" },
  { id: "g213", studentId: "stu18", subjectId: "sc4", sem: 1, q1: 84, q2: 82, status: "approved" },
  { id: "g214", studentId: "stu18", subjectId: "sc5", sem: 1, q1: 83, q2: 84, status: "approved" },
  { id: "g215", studentId: "stu18", subjectId: "sc6", sem: 2, q1: 88, q2: 80, status: "approved" },
  { id: "g216", studentId: "stu18", subjectId: "sc7", sem: 2, q1: 89, q2: 83, status: "approved" },
  { id: "g217", studentId: "stu18", subjectId: "sc8", sem: 2, q1: 87, q2: 88, status: "approved" },
  { id: "g218", studentId: "stu18", subjectId: "sc9", sem: 2, q1: 83, q2: 85, status: "approved" },
  { id: "g219", studentId: "stu18", subjectId: "sg1", sem: 1, q1: 81, q2: 86, status: "approved" },
  { id: "g220", studentId: "stu18", subjectId: "sg2", sem: 1, q1: 88, q2: 83, status: "approved" },
  { id: "g221", studentId: "stu18", subjectId: "sg3", sem: 2, q1: 87, q2: 87, status: "approved" },
  { id: "g222", studentId: "stu18", subjectId: "sg4", sem: 2, q1: 86, q2: 81, status: "approved" },
  { id: "g223", studentId: "stu19", subjectId: "sc1", sem: 1, q1: 81, q2: 75, status: "approved" },
  { id: "g224", studentId: "stu19", subjectId: "sc2", sem: 1, q1: 75, q2: 75, status: "approved" },
  { id: "g225", studentId: "stu19", subjectId: "sc3", sem: 1, q1: 75, q2: 75, status: "approved" },
  { id: "g226", studentId: "stu19", subjectId: "sc4", sem: 1, q1: 75, q2: 75, status: "approved" },
  { id: "g227", studentId: "stu19", subjectId: "sc5", sem: 1, q1: 81, q2: 77, status: "approved" },
  { id: "g228", studentId: "stu19", subjectId: "sc6", sem: 2, q1: 72, q2: 69, status: "approved" },
  { id: "g229", studentId: "stu19", subjectId: "sc7", sem: 2, q1: 75, q2: 81, status: "approved" },
  { id: "g230", studentId: "stu19", subjectId: "sc8", sem: 2, q1: 75, q2: 78, status: "approved" },
  { id: "g231", studentId: "stu19", subjectId: "sc9", sem: 2, q1: 75, q2: 82, status: "approved" },
  { id: "g232", studentId: "stu19", subjectId: "sac1", sem: 1, q1: 75, q2: 75, status: "approved" },
  { id: "g233", studentId: "stu19", subjectId: "sac2", sem: 1, q1: 78, q2: 78, status: "approved" },
  { id: "g234", studentId: "stu19", subjectId: "sac3", sem: 2, q1: 80, q2: 80, status: "approved" },
  { id: "g235", studentId: "stu19", subjectId: "sac4", sem: 2, q1: 77, q2: 81, status: "approved" }
];
const MOCK_SCHEDULE = [
  { id: "sch1", subjectId: "sc1", teacherId: "t6", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch2", subjectId: "sc2", teacherId: "t7", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch3", subjectId: "sc3", teacherId: "t8", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch4", subjectId: "sc4", teacherId: "t9", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch5", subjectId: "sc5", teacherId: "t1", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch6", subjectId: "sc6", teacherId: "t2", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch7", subjectId: "sc7", teacherId: "t3", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch8", subjectId: "sc8", teacherId: "t10", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch9", subjectId: "sc9", teacherId: "t11", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch10", subjectId: "ss1", teacherId: "t12", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch11", subjectId: "ss2", teacherId: "t12", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch12", subjectId: "ss3", teacherId: "t12", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 101", section: "sec1" },
  { id: "sch13", subjectId: "ss4", teacherId: "t12", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 101", section: "sec1" },
  { id: "sch14", subjectId: "sc10", teacherId: "t6", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 102", section: "sec2" },
  { id: "sch15", subjectId: "sc11", teacherId: "t7", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 102", section: "sec2" },
  { id: "sch16", subjectId: "sc12", teacherId: "t8", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 102", section: "sec2" },
  { id: "sch17", subjectId: "sc13", teacherId: "t3", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 102", section: "sec2" },
  { id: "sch18", subjectId: "sc14", teacherId: "t9", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 102", section: "sec2" },
  { id: "sch19", subjectId: "sc15", teacherId: "t11", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 102", section: "sec2" },
  { id: "sch20", subjectId: "ss5", teacherId: "t12", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 102", section: "sec2" },
  { id: "sch21", subjectId: "ss6", teacherId: "t12", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 102", section: "sec2" },
  { id: "sch22", subjectId: "ss7", teacherId: "t12", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 102", section: "sec2" },
  { id: "sch23", subjectId: "ss8", teacherId: "t12", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 102", section: "sec2" },
  { id: "sch24", subjectId: "sc1", teacherId: "t6", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch25", subjectId: "sc2", teacherId: "t7", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch26", subjectId: "sc3", teacherId: "t8", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 103", section: "sec3" },
  { id: "sch27", subjectId: "sc4", teacherId: "t9", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch28", subjectId: "sc5", teacherId: "t1", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch29", subjectId: "sc6", teacherId: "t2", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 103", section: "sec3" },
  { id: "sch30", subjectId: "sc7", teacherId: "t3", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 103", section: "sec3" },
  { id: "sch31", subjectId: "sc8", teacherId: "t10", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch32", subjectId: "sc9", teacherId: "t11", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch33", subjectId: "sb1", teacherId: "t13", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 103", section: "sec3" },
  { id: "sch34", subjectId: "sb2", teacherId: "t13", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 103", section: "sec3" },
  { id: "sch35", subjectId: "sb3", teacherId: "t13", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch36", subjectId: "sb4", teacherId: "t13", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 103", section: "sec3" },
  { id: "sch37", subjectId: "sc10", teacherId: "t6", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 104", section: "sec4" },
  { id: "sch38", subjectId: "sc11", teacherId: "t7", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch39", subjectId: "sc12", teacherId: "t8", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch40", subjectId: "sc13", teacherId: "t3", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 104", section: "sec4" },
  { id: "sch41", subjectId: "sc14", teacherId: "t9", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch42", subjectId: "sc15", teacherId: "t11", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch43", subjectId: "sb5", teacherId: "t13", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 104", section: "sec4" },
  { id: "sch44", subjectId: "sb6", teacherId: "t13", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 104", section: "sec4" },
  { id: "sch45", subjectId: "sb7", teacherId: "t13", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch46", subjectId: "sb8", teacherId: "t13", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 104", section: "sec4" },
  { id: "sch47", subjectId: "sc1", teacherId: "t6", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch48", subjectId: "sc2", teacherId: "t7", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch49", subjectId: "sc3", teacherId: "t8", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch50", subjectId: "sc4", teacherId: "t9", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch51", subjectId: "sc5", teacherId: "t1", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch52", subjectId: "sc6", teacherId: "t2", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch53", subjectId: "sc7", teacherId: "t3", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch54", subjectId: "sc8", teacherId: "t10", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch55", subjectId: "sc9", teacherId: "t11", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch56", subjectId: "sa1", teacherId: "t14", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch57", subjectId: "sa2", teacherId: "t14", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch58", subjectId: "sa3", teacherId: "t14", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 105", section: "sec5" },
  { id: "sch59", subjectId: "sa4", teacherId: "t14", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 105", section: "sec5" },
  { id: "sch60", subjectId: "sc10", teacherId: "t6", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 106", section: "sec6" },
  { id: "sch61", subjectId: "sc11", teacherId: "t7", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 106", section: "sec6" },
  { id: "sch62", subjectId: "sc12", teacherId: "t8", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 106", section: "sec6" },
  { id: "sch63", subjectId: "sc13", teacherId: "t3", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 106", section: "sec6" },
  { id: "sch64", subjectId: "sc14", teacherId: "t9", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 106", section: "sec6" },
  { id: "sch65", subjectId: "sc15", teacherId: "t11", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 106", section: "sec6" },
  { id: "sch66", subjectId: "sa5", teacherId: "t14", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Room 106", section: "sec6" },
  { id: "sch67", subjectId: "sa6", teacherId: "t14", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Room 106", section: "sec6" },
  { id: "sch68", subjectId: "sa7", teacherId: "t14", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Room 106", section: "sec6" },
  { id: "sch69", subjectId: "sa8", teacherId: "t14", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Room 106", section: "sec6" },
  { id: "sch70", subjectId: "sc1", teacherId: "t6", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch71", subjectId: "sc2", teacherId: "t7", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch72", subjectId: "sc3", teacherId: "t8", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch73", subjectId: "sc4", teacherId: "t9", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch74", subjectId: "sc5", teacherId: "t1", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch75", subjectId: "sc6", teacherId: "t2", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch76", subjectId: "sc7", teacherId: "t3", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch77", subjectId: "sc8", teacherId: "t10", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch78", subjectId: "sc9", teacherId: "t11", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch79", subjectId: "si1", teacherId: "t4", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch80", subjectId: "si2", teacherId: "t4", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch81", subjectId: "si3", teacherId: "t4", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch82", subjectId: "si4", teacherId: "t4", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 1", section: "sec7" },
  { id: "sch83", subjectId: "sc10", teacherId: "t6", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch84", subjectId: "sc11", teacherId: "t7", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch85", subjectId: "sc12", teacherId: "t8", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch86", subjectId: "sc13", teacherId: "t3", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch87", subjectId: "sc14", teacherId: "t9", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch88", subjectId: "sc15", teacherId: "t11", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch89", subjectId: "si5", teacherId: "t4", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch90", subjectId: "si6", teacherId: "t4", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch91", subjectId: "si7", teacherId: "t4", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch92", subjectId: "si8", teacherId: "t4", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "ICT Lab 2", section: "sec8" },
  { id: "sch93", subjectId: "sc1", teacherId: "t6", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch94", subjectId: "sc2", teacherId: "t7", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch95", subjectId: "sc3", teacherId: "t8", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab", section: "sec9" },
  { id: "sch96", subjectId: "sc4", teacherId: "t9", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "HRM Lab", section: "sec9" },
  { id: "sch97", subjectId: "sc5", teacherId: "t1", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch98", subjectId: "sc6", teacherId: "t2", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch99", subjectId: "sc7", teacherId: "t3", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab", section: "sec9" },
  { id: "sch100", subjectId: "sc8", teacherId: "t10", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "HRM Lab", section: "sec9" },
  { id: "sch101", subjectId: "sc9", teacherId: "t11", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch102", subjectId: "sh1", teacherId: "t15", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch103", subjectId: "sh2", teacherId: "t15", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab", section: "sec9" },
  { id: "sch104", subjectId: "sh3", teacherId: "t15", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch105", subjectId: "sh4", teacherId: "t15", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab", section: "sec9" },
  { id: "sch106", subjectId: "sc10", teacherId: "t6", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch107", subjectId: "sc11", teacherId: "t7", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch108", subjectId: "sc12", teacherId: "t8", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch109", subjectId: "sc13", teacherId: "t3", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch110", subjectId: "sc14", teacherId: "t9", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch111", subjectId: "sc15", teacherId: "t11", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch112", subjectId: "sh5", teacherId: "t15", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch113", subjectId: "sh6", teacherId: "t15", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch114", subjectId: "sh7", teacherId: "t15", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch115", subjectId: "sh8", teacherId: "t15", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "HRM Lab 2", section: "sec10" },
  { id: "sch116", subjectId: "sc1", teacherId: "t6", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch117", subjectId: "sc2", teacherId: "t7", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch118", subjectId: "sc3", teacherId: "t8", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch119", subjectId: "sc4", teacherId: "t9", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch120", subjectId: "sc5", teacherId: "t1", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch121", subjectId: "sc6", teacherId: "t2", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch122", subjectId: "sc7", teacherId: "t3", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch123", subjectId: "sc8", teacherId: "t10", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch124", subjectId: "sc9", teacherId: "t11", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch125", subjectId: "sau1", teacherId: "t16", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch126", subjectId: "sau2", teacherId: "t16", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch127", subjectId: "sau3", teacherId: "t16", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Auto Shop", section: "sec11" },
  { id: "sch128", subjectId: "sau4", teacherId: "t16", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop", section: "sec11" },
  { id: "sch129", subjectId: "sc10", teacherId: "t6", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch130", subjectId: "sc11", teacherId: "t7", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch131", subjectId: "sc12", teacherId: "t8", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch132", subjectId: "sc13", teacherId: "t3", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch133", subjectId: "sc14", teacherId: "t9", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch134", subjectId: "sc15", teacherId: "t11", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch135", subjectId: "sau5", teacherId: "t16", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch136", subjectId: "sau6", teacherId: "t16", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch137", subjectId: "sau7", teacherId: "t16", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch138", subjectId: "sau8", teacherId: "t16", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Auto Shop 2", section: "sec12" },
  { id: "sch139", subjectId: "sc1", teacherId: "t6", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch140", subjectId: "sc2", teacherId: "t7", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch141", subjectId: "sc3", teacherId: "t8", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Weld Shop", section: "sec13" },
  { id: "sch142", subjectId: "sc4", teacherId: "t9", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Weld Shop", section: "sec13" },
  { id: "sch143", subjectId: "sc5", teacherId: "t1", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch144", subjectId: "sc6", teacherId: "t2", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch145", subjectId: "sc7", teacherId: "t3", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Weld Shop", section: "sec13" },
  { id: "sch146", subjectId: "sc8", teacherId: "t10", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch147", subjectId: "sc9", teacherId: "t11", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch148", subjectId: "sw1", teacherId: "t17", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Weld Shop", section: "sec13" },
  { id: "sch149", subjectId: "sw2", teacherId: "t17", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Weld Shop", section: "sec13" },
  { id: "sch150", subjectId: "sw3", teacherId: "t17", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch151", subjectId: "sw4", teacherId: "t17", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Weld Shop", section: "sec13" },
  { id: "sch152", subjectId: "sc1", teacherId: "t6", day: "Thursday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch153", subjectId: "sc2", teacherId: "t7", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch154", subjectId: "sc3", teacherId: "t8", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch155", subjectId: "sc4", teacherId: "t9", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch156", subjectId: "sc5", teacherId: "t1", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch157", subjectId: "sc6", teacherId: "t2", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch158", subjectId: "sc7", teacherId: "t3", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch159", subjectId: "sc8", teacherId: "t10", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch160", subjectId: "sc9", teacherId: "t11", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch161", subjectId: "se1", teacherId: "t5", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch162", subjectId: "se2", teacherId: "t5", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Elec Lab", section: "sec14" },
  { id: "sch163", subjectId: "se3", teacherId: "t5", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch164", subjectId: "se4", teacherId: "t5", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Elec Lab", section: "sec14" },
  { id: "sch165", subjectId: "sc1", teacherId: "t6", day: "Thursday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch166", subjectId: "sc2", teacherId: "t7", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch167", subjectId: "sc3", teacherId: "t8", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch168", subjectId: "sc4", teacherId: "t9", day: "Friday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch169", subjectId: "sc5", teacherId: "t1", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch170", subjectId: "sc6", teacherId: "t2", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch171", subjectId: "sc7", teacherId: "t3", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch172", subjectId: "sc8", teacherId: "t10", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch173", subjectId: "sc9", teacherId: "t11", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch174", subjectId: "sg1", teacherId: "t15", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch175", subjectId: "sg2", teacherId: "t15", day: "Tuesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch176", subjectId: "sg3", teacherId: "t15", day: "Tuesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Garments Room", section: "sec15" },
  { id: "sch177", subjectId: "sg4", teacherId: "t15", day: "Wednesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Garments Room", section: "sec15" },
  { id: "sch178", subjectId: "sc1", teacherId: "t6", day: "Thursday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Care Lab", section: "sec16" },
  { id: "sch179", subjectId: "sc2", teacherId: "t7", day: "Friday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch180", subjectId: "sc3", teacherId: "t8", day: "Friday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch181", subjectId: "sc4", teacherId: "t9", day: "Monday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch182", subjectId: "sc5", teacherId: "t1", day: "Monday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch183", subjectId: "sc6", teacherId: "t2", day: "Monday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Care Lab", section: "sec16" },
  { id: "sch184", subjectId: "sc7", teacherId: "t3", day: "Monday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Care Lab", section: "sec16" },
  { id: "sch185", subjectId: "sc8", teacherId: "t10", day: "Tuesday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch186", subjectId: "sc9", teacherId: "t11", day: "Tuesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch187", subjectId: "sac1", teacherId: "t15", day: "Wednesday", startTime: "9:30 AM", endTime: "11:30 AM", room: "Care Lab", section: "sec16" },
  { id: "sch188", subjectId: "sac2", teacherId: "t15", day: "Wednesday", startTime: "12:30 PM", endTime: "2:30 PM", room: "Care Lab", section: "sec16" },
  { id: "sch189", subjectId: "sac3", teacherId: "t15", day: "Wednesday", startTime: "2:30 PM", endTime: "4:30 PM", room: "Care Lab", section: "sec16" },
  { id: "sch190", subjectId: "sac4", teacherId: "t15", day: "Thursday", startTime: "7:30 AM", endTime: "9:30 AM", room: "Care Lab", section: "sec16" },
];


const MOCK_ENROLLMENTS = [
  { id: "en1", studentId: "stu19", schoolYear: "2025-2026", gradeLevel: 12, strand: "Aesthetic and Caregiving", status: "pending", submittedAt: "2025-01-15", requirements: { reportCard: true, goodMoral: true, form137: true, birthCert: false, id: true } },
];

// ============================================================
// STYLES
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; font-family: 'Nunito', sans-serif; background: #f0f4f8; }

  :root {
    --teal-dark: #0a6e7a;
    --teal: #0d8a99;
    --teal-light: #14b8cc;
    --teal-pale: #e0f7fa;
    --navy: #0d3d4f;
    --gold: #f5a623;
    --green: #2ecc71;
    --orange: #e67e22;
    --red: #e74c3c;
    --gray-50: #f8fafc;
    --gray-100: #f0f4f8;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1e293b;
    --white: #ffffff;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow: 0 2px 8px rgba(0,0,0,0.10);
    --shadow-lg: 0 4px 20px rgba(0,0,0,0.12);
    --radius: 12px;
    --radius-sm: 8px;
    --radius-lg: 20px;
    --sidebar-w: 240px;
    --topbar-h: 56px;
    --content-max: 1200px;
  }

  /* ── RESPONSIVE BREAKPOINTS ──
     Mobile:  < 640px  → phone layout (bottom nav, no sidebar)
     Tablet:  640–1023px → tablet layout (collapsible sidebar + bottom nav)
     Desktop: ≥ 1024px → desktop layout (persistent sidebar, no bottom nav)
  */

  /* ── APP SHELL ── */
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--gray-100);
    overflow: hidden;
  }
  /* On mobile/tablet: centered phone-width column */
  @media (max-width: 1023px) {
    .app-shell {
      max-width: 480px;
      margin: 0 auto;
      box-shadow: 0 0 60px rgba(0,0,0,0.18);
    }
  }

  /* ── LAYOUT WRAPPER (desktop: sidebar + content) ── */
  .layout-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* ── SIDEBAR (desktop only) ── */
  .sidebar {
    display: none;
  }
  @media (min-width: 1024px) {
    .sidebar {
      display: flex;
      flex-direction: column;
      width: var(--sidebar-w);
      background: var(--navy);
      flex-shrink: 0;
      height: 100%;
      overflow-y: auto;
      z-index: 50;
    }
    .sidebar-brand {
      padding: 24px 20px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .sidebar-brand-icon {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--teal), var(--teal-dark));
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .sidebar-brand-name {
      font-size: 12px; font-weight: 900; color: white;
      line-height: 1.3; letter-spacing: 0.3px;
    }
    .sidebar-user {
      padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .sidebar-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: var(--gold);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 900; color: var(--navy);
      flex-shrink: 0;
    }
    .sidebar-user-info { flex: 1; min-width: 0; }
    .sidebar-user-name { font-size: 13px; font-weight: 800; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sidebar-user-role { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px; }
    .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
    .sidebar-nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 12px; border-radius: var(--radius-sm);
      cursor: pointer; border: none; background: none;
      font-family: 'Nunito', sans-serif;
      font-size: 13px; font-weight: 700;
      color: rgba(255,255,255,0.6);
      width: 100%; text-align: left;
      transition: all 0.15s;
    }
    .sidebar-nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
    .sidebar-nav-item.active {
      background: linear-gradient(135deg, var(--teal-dark), var(--teal));
      color: white;
      box-shadow: 0 2px 8px rgba(13,138,153,0.35);
    }
    .sidebar-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .sidebar-logout {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 12px; border-radius: var(--radius-sm);
      border: none; background: none; cursor: pointer;
      font-family: 'Nunito',sans-serif; font-size: 13px; font-weight: 700;
      color: rgba(255,255,255,0.5);
    }
    .sidebar-logout:hover { background: rgba(231,76,60,0.15); color: #fca5a5; }
  }

  /* ── TOPBAR ── */
  .topbar {
    background: linear-gradient(135deg, var(--navy), var(--teal-dark));
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: var(--topbar-h);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .topbar-left { display: flex; align-items: center; gap: 10px; }
  .hamburger { background: none; border: none; cursor: pointer; padding: 4px; color: var(--white); display: flex; align-items: center; }
  .hamburger svg { width: 22px; height: 22px; }
  .topbar-title { font-size: 14px; font-weight: 800; letter-spacing: 0.3px; }
  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .user-chip { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 10px 4px 4px; cursor: pointer; }
  .user-avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: var(--navy); flex-shrink: 0; }
  .user-chip-name { font-size: 12px; font-weight: 700; }
  /* Hide hamburger on desktop */
  @media (min-width: 1024px) {
    .hamburger { display: none; }
    .topbar-title { font-size: 15px; }
    .topbar { padding: 0 24px; }
  }

  /* ── MAIN CONTENT AREA ── */
  .main-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 80px;
    scroll-behavior: smooth;
  }
  @media (min-width: 1024px) {
    .main-content {
      padding-bottom: 24px;
    }
  }

  /* ── PAGE CONTENT ── */
  .page-content { padding: 0 16px 16px; }
  @media (min-width: 640px) {
    .page-content { padding: 0 24px 24px; }
  }
  @media (min-width: 1024px) {
    .page-content { padding: 0 32px 32px; max-width: var(--content-max); }
  }

  /* ── BOTTOM NAV (mobile/tablet only) ── */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px;
    background: var(--white);
    border-top: 1.5px solid var(--gray-200);
    display: flex;
    z-index: 200;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
  }
  @media (min-width: 1024px) {
    .bottom-nav { display: none; }
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    padding: 10px 4px 8px; cursor: pointer; border: none; background: none;
    font-family: 'Nunito', sans-serif; transition: color 0.2s; color: var(--gray-400);
  }
  .nav-item.active { color: var(--teal); }
  .nav-item svg { width: 22px; height: 22px; margin-bottom: 2px; }
  .nav-item span { font-size: 10px; font-weight: 700; }

  /* ── LOGIN PAGE ── */
  .login-outer {
    min-height: 100vh;
    background: linear-gradient(180deg, var(--navy) 0%, var(--teal-dark) 40%, var(--teal-light) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
  }
  .login-inner {
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    gap: 48px;
  }
  .login-branding {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-logo { width: 100px; height: 100px; border-radius: 50%; background: var(--white); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 6px 30px rgba(0,0,0,0.3); overflow: hidden; }
  .login-logo-text { font-size: 9px; font-weight: 900; color: var(--teal-dark); text-align: center; padding: 8px; line-height: 1.3; }
  .login-school-name { color: var(--white); font-size: 15px; font-weight: 900; text-align: center; letter-spacing: 0.5px; line-height: 1.5; }
  .login-sub { color: rgba(255,255,255,0.75); font-size: 12px; text-align: center; margin-top: 4px; }
  .login-tagline { color: rgba(255,255,255,0.5); font-size: 11px; text-align: center; margin-top: 20px; max-width: 280px; line-height: 1.6; }
  .login-card {
    background: var(--white); border-radius: var(--radius-lg);
    padding: 32px 28px; width: 100%; max-width: 380px;
    box-shadow: var(--shadow-lg); flex-shrink: 0;
  }
  .login-card h3 { font-size: 13px; color: var(--gray-500); font-weight: 500; margin-bottom: 20px; text-align: center; }
  /* On small screens, hide branding side panel, stack vertically */
  @media (max-width: 767px) {
    .login-inner { flex-direction: column; gap: 24px; }
    .login-branding { width: 100%; }
    .login-tagline { display: none; }
    .login-card { max-width: 100%; }
    .login-logo { width: 80px; height: 80px; }
    .login-school-name { font-size: 13px; }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .login-inner { gap: 36px; }
  }

  /* ── FORMS ── */
  .form-group { margin-bottom: 14px; }
  .form-label { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--gray-600); margin-bottom: 6px; }
  .form-label svg { width: 14px; height: 14px; }
  .form-input {
    width: 100%; border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm);
    padding: 10px 12px; font-size: 13px; font-family: 'Nunito', sans-serif;
    color: var(--gray-700); outline: none; transition: border-color 0.2s;
    background: var(--gray-50);
  }
  .form-input:focus { border-color: var(--teal); }
  .form-input::placeholder { color: var(--gray-300); }
  .password-wrap { position: relative; }
  .password-wrap .form-input { padding-right: 36px; }
  .password-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 4px; display: flex; align-items: center; }
  .btn-primary {
    width: 100%; background: linear-gradient(135deg, var(--teal), var(--teal-dark));
    color: var(--white); border: none; border-radius: var(--radius-sm);
    padding: 13px; font-size: 14px; font-weight: 800; font-family: 'Nunito', sans-serif;
    cursor: pointer; letter-spacing: 0.5px; transition: opacity 0.2s, transform 0.1s;
    box-shadow: 0 3px 12px rgba(13,138,153,0.35);
  }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .login-links { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 12px; }
  .link-btn { background: none; border: none; cursor: pointer; font-size: 12px; color: var(--teal); font-family: 'Nunito', sans-serif; font-weight: 600; }
  .login-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 8px 12px; font-size: 12px; color: var(--red); margin-bottom: 12px; text-align: center; }

  /* ── CARDS ── */
  .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (min-width: 768px) { .dashboard-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (min-width: 1024px) { .dashboard-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }
  .dash-card {
    background: var(--white); border-radius: var(--radius); padding: 16px;
    box-shadow: var(--shadow-sm); cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    border: 1.5px solid transparent;
  }
  .dash-card:hover { box-shadow: var(--shadow); transform: translateY(-1px); }
  .dash-card:active { transform: scale(0.97); }
  .dash-card-icon { width: 32px; height: 32px; margin-bottom: 8px; }
  .dash-card h3 { font-size: 13px; font-weight: 700; color: var(--gray-700); }
  .dash-card .badge { font-size: 22px; font-weight: 900; color: var(--gray-800); margin: 4px 0; }
  .dash-card p { font-size: 11px; color: var(--gray-400); font-weight: 600; }

  /* ── SECTION HEADER ── */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; margin-top: 20px; }
  .section-title { font-size: 15px; font-weight: 800; color: var(--gray-800); }
  @media (min-width: 1024px) { .section-title { font-size: 16px; } .section-header { margin-top: 28px; } }
  .btn-small { background: var(--teal); color: var(--white); border: none; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 700; font-family: 'Nunito', sans-serif; cursor: pointer; }
  .btn-outline-small { background: none; color: var(--teal); border: 1.5px solid var(--teal); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 700; font-family: 'Nunito', sans-serif; cursor: pointer; }
  .btn-danger-small { background: var(--red); color: var(--white); border: none; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 700; font-family: 'Nunito', sans-serif; cursor: pointer; }
  .btn-success-small { background: var(--green); color: var(--white); border: none; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 700; font-family: 'Nunito', sans-serif; cursor: pointer; }

  /* ── LIST CARDS ── */
  .list-card {
    background: var(--white); border-radius: var(--radius); padding: 14px;
    margin-bottom: 10px; box-shadow: var(--shadow-sm);
    display: flex; align-items: center; gap: 12px;
    transition: box-shadow 0.15s;
  }
  .list-card:hover { box-shadow: var(--shadow); }
  .list-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .list-card-info { flex: 1; min-width: 0; }
  .list-card-info h4 { font-size: 13px; font-weight: 800; color: var(--gray-800); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .list-card-info p { font-size: 11px; color: var(--gray-400); font-weight: 600; margin-top: 2px; }
  /* Tablet+ responsive list */
  @media (min-width: 640px) {
    .list-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .list-grid .list-card { margin-bottom: 0; }
  }
  @media (min-width: 1024px) {
    .list-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── PILLS ── */
  .pill { display: inline-block; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 700; }
  .pill-green { background: #d1fae5; color: #065f46; }
  .pill-yellow { background: #fef3c7; color: #92400e; }
  .pill-red { background: #fee2e2; color: #991b1b; }
  .pill-blue { background: #dbeafe; color: #1e40af; }
  .pill-gray { background: var(--gray-200); color: var(--gray-600); }

  /* ── GRADES TABLE ── */
  .grades-table { width: 100%; border-collapse: collapse; background: var(--white); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); }
  .grades-table thead tr { background: linear-gradient(135deg, var(--navy), var(--teal-dark)); color: var(--white); }
  .grades-table th { padding: 10px 8px; font-size: 11px; font-weight: 700; text-align: center; }
  .grades-table th:first-child { text-align: left; padding-left: 14px; }
  .grades-table td { padding: 10px 8px; font-size: 12px; text-align: center; border-bottom: 1px solid var(--gray-100); color: var(--gray-700); }
  .grades-table td:first-child { text-align: left; padding-left: 14px; font-weight: 700; color: var(--gray-800); }
  .grades-table tbody tr:last-child td { border-bottom: none; }
  .grade-pass { color: var(--teal); font-weight: 800; }
  .grade-fail { color: var(--red); font-weight: 800; }

  /* ── SCHEDULE ── */
  .schedule-day { background: var(--white); border-radius: var(--radius); margin-bottom: 12px; overflow: hidden; box-shadow: var(--shadow-sm); }
  .schedule-day-header { background: linear-gradient(135deg, var(--navy), var(--teal-dark)); color: var(--white); padding: 10px 14px; font-size: 13px; font-weight: 800; }
  .schedule-item { padding: 12px 14px; border-bottom: 1px solid var(--gray-100); display: flex; align-items: center; gap: 12px; }
  .schedule-item:last-child { border-bottom: none; }
  .schedule-time { font-size: 11px; font-weight: 700; color: var(--teal); min-width: 86px; }
  .schedule-info h4 { font-size: 13px; font-weight: 700; color: var(--gray-800); }
  .schedule-info p { font-size: 11px; color: var(--gray-400); }

  /* Schedule matrix (grid view) */
  .sched-matrix { overflow-x: auto; }
  .sched-matrix table { border-collapse: collapse; width: 100%; min-width: 600px; }
  .sched-matrix th { background: linear-gradient(135deg,var(--navy),var(--teal-dark)); color:white; padding: 8px 10px; font-size: 12px; font-weight: 800; text-align: center; border: 1px solid rgba(255,255,255,0.1); }
  .sched-matrix th:first-child { width: 90px; }
  .sched-matrix td { border: 1px solid var(--gray-200); padding: 6px 8px; vertical-align: top; font-size: 11px; min-height: 56px; background: var(--white); }
  .sched-matrix td:first-child { font-size: 11px; font-weight: 800; color: var(--teal); text-align: center; background: var(--teal-pale); }
  .sched-cell { background: linear-gradient(135deg,var(--teal-pale),#b2ebf2); border-radius: 6px; padding: 6px 8px; margin-bottom: 4px; border-left: 3px solid var(--teal); }
  .sched-cell-sub { font-weight: 800; color: var(--navy); font-size: 11px; line-height: 1.3; }
  .sched-cell-meta { color: var(--gray-500); font-size: 10px; font-weight: 600; margin-top: 2px; }

  /* ── MODALS ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 500; display: flex; align-items: flex-end; backdrop-filter: blur(2px); }
  .modal-sheet {
    background: var(--white);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: 24px 20px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    max-height: 92vh;
    overflow-y: auto;
  }
  @media (min-width: 640px) {
    .modal-overlay { align-items: center; justify-content: center; }
    .modal-sheet { border-radius: var(--radius-lg); max-width: 560px; max-height: 88vh; }
  }
  @media (min-width: 1024px) {
    .modal-sheet { max-width: 620px; padding: 32px 28px; }
  }
  .modal-handle { width: 40px; height: 4px; border-radius: 2px; background: var(--gray-200); margin: 0 auto 20px; }
  @media (min-width: 640px) { .modal-handle { display: none; } }
  .modal-title { font-size: 16px; font-weight: 900; color: var(--gray-800); margin-bottom: 16px; }
  @media (min-width: 1024px) { .modal-title { font-size: 18px; margin-bottom: 20px; } }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .form-select { width: 100%; border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 13px; font-family: 'Nunito', sans-serif; color: var(--gray-700); outline: none; background: var(--gray-50); }
  .form-select:focus { border-color: var(--teal); }
  .btn-block { width: 100%; background: linear-gradient(135deg, var(--teal), var(--teal-dark)); color: var(--white); border: none; border-radius: var(--radius-sm); padding: 13px; font-size: 14px; font-weight: 800; font-family: 'Nunito', sans-serif; cursor: pointer; margin-top: 16px; transition: opacity 0.2s; }
  .btn-block:hover { opacity: 0.9; }
  .btn-block-outline { width: 100%; background: none; color: var(--gray-500); border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); padding: 12px; font-size: 14px; font-weight: 700; font-family: 'Nunito', sans-serif; cursor: pointer; margin-top: 8px; }

  /* ── FILTER BAR ── */
  .filter-bar { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; scrollbar-width: none; flex-wrap: wrap; }
  .filter-bar::-webkit-scrollbar { display: none; }
  .filter-chip { flex-shrink: 0; border-radius: 20px; padding: 6px 14px; font-size: 12px; font-weight: 700; border: 1.5px solid var(--gray-200); background: var(--white); color: var(--gray-500); cursor: pointer; font-family: 'Nunito', sans-serif; transition: all 0.15s; }
  .filter-chip:hover { border-color: var(--teal); color: var(--teal); }
  .filter-chip.active { background: var(--teal); color: var(--white); border-color: var(--teal); }

  /* ── INFO ROW ── */
  .info-row { display: flex; align-items: flex-start; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--gray-100); }
  .info-row:last-child { border-bottom: none; }
  .info-row label { font-size: 11px; font-weight: 700; color: var(--gray-400); min-width: 120px; }
  .info-row span { font-size: 13px; font-weight: 600; color: var(--gray-700); flex: 1; }

  /* ── ALERTS ── */
  .alert { border-radius: var(--radius-sm); padding: 12px 14px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
  .alert-info { background: #dbeafe; color: #1e40af; }
  .alert-success { background: #d1fae5; color: #065f46; }
  .alert-warning { background: #fef3c7; color: #92400e; }

  /* ── ENROLLMENT ── */
  .req-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--gray-100); }
  .req-check { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--gray-200); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: all 0.15s; }
  .req-check.checked { background: var(--teal); border-color: var(--teal); }
  .req-item span { font-size: 13px; font-weight: 600; color: var(--gray-700); }

  /* ── EMPTY STATE ── */
  .empty-state { text-align: center; padding: 48px 20px; color: var(--gray-400); }
  .empty-state svg { margin: 0 auto 12px; width: 40px; height: 40px; }
  .empty-state h3 { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--gray-500); }
  .empty-state p { font-size: 12px; }

  /* ── HERO SECTIONS ── */
  .hero-wrap { background: linear-gradient(160deg, var(--navy) 0%, var(--teal-dark) 60%, var(--teal) 100%); padding: 28px 20px 24px; position: relative; overflow: hidden; }
  @media (min-width: 640px) { .hero-wrap { padding: 32px 28px 28px; } }
  @media (min-width: 1024px) { .hero-wrap { padding: 36px 36px 32px; } }

  /* ── SIDEBAR OVERLAY (tablet hamburger) ── */
  .sidebar-overlay {
    display: none;
  }
  @media (max-width: 1023px) {
    .sidebar-drawer {
      position: fixed;
      left: 0; top: 0; bottom: 0;
      width: 260px;
      background: var(--navy);
      z-index: 400;
      display: flex;
      flex-direction: column;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      overflow-y: auto;
    }
    .sidebar-drawer.open {
      transform: translateX(0);
    }
    .sidebar-overlay {
      display: block;
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.4);
      z-index: 399;
    }
  }

  /* ── SECTION CARD ── */
  .section-card { background: var(--white); border-radius: var(--radius); padding: 14px 16px; margin-bottom: 14px; box-shadow: var(--shadow-sm); }

  /* ── RESPONSIVE GRID ── */
  .resp-grid-2 { display: grid; grid-template-columns: 1fr; gap: 12px; }
  @media (min-width: 640px) { .resp-grid-2 { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1024px) { .resp-grid-2 { grid-template-columns: repeat(3, 1fr); gap: 16px; } }

  .scroll-x { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .scroll-x::-webkit-scrollbar { display: none; }

  /* ── SAFE AREA (iOS notch support) ── */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    .bottom-nav { padding-bottom: calc(8px + env(safe-area-inset-bottom)); }
  }
`

// ============================================================
// HELPERS
// ============================================================
const computeFinalGrade = (g) => g ? Math.round((g.q1 + g.q2) / 2) : null;
const isPassing = (grade) => grade >= 75;
const getInitials = (name) => name.split(/[, ]+/).filter(Boolean).map(n => n[0]).slice(0, 2).join("").toUpperCase();
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = {
  Menu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Grade: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="16" x2="12" y2="16"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevronLeft: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Lock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Mail: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Clipboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  ClipboardList: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
};

// ============================================================
// SHARED COMPONENTS
// ============================================================
// ── useBreakpoint hook ──
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

function TopBar({ user, onMenu, title, isDesktop }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {!isDesktop && <button className="hamburger" onClick={onMenu}><Icon.Menu /></button>}
        <span className="topbar-title">{title || "CDL SHS"}</span>
      </div>
      <div className="topbar-right">
        <div className="user-chip">
          <div className="user-avatar">{getInitials(user.name)}</div>
          <span className="user-chip-name">{user.name.split(",")[0]}</span>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ items, active, onChange }) {
  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button key={item.id} className={`nav-item${active === item.id ? " active" : ""}`} onClick={() => onChange(item.id)}>
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// Desktop sidebar (persistent)
function DesktopSidebar({ items, active, onChange, user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🏫</div>
        <div className="sidebar-brand-name">CDL SENIOR HIGH SCHOOL</div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-avatar">{getInitials(user.name)}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user.name}</div>
          <div className="sidebar-user-role">{user.role}</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map(item => (
          <button key={item.id} className={`sidebar-nav-item${active===item.id?" active":""}`} onClick={() => onChange(item.id)}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={onLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18,flexShrink:0}}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// Mobile drawer sidebar (overlay)
function DrawerSidebar({ items, active, onChange, user, onLogout, open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <div className={`sidebar-drawer${open?" open":""}`}>
        <div style={{ background:"linear-gradient(135deg,var(--navy),var(--teal-dark))", padding:"44px 20px 20px", flexShrink:0 }}>
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:16 }}>
            <button onClick={onClose} style={{ background:"none", border:"none", color:"white", cursor:"pointer", display:"flex" }}><Icon.X /></button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900, color:"var(--navy)", flexShrink:0 }}>{getInitials(user.name)}</div>
            <div>
              <div style={{ fontWeight:800, fontSize:14, color:"white" }}>{user.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", textTransform:"capitalize" }}>{user.role}</div>
            </div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"16px 12px", display:"flex", flexDirection:"column", gap:4 }}>
          {items.map(item => (
            <button key={item.id} className={`sidebar-nav-item${active===item.id?" active":""}`}
              onClick={() => { onChange(item.id); onClose(); }}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", border:"none", borderRadius:10, cursor:"pointer", fontFamily:"Nunito,sans-serif", fontWeight:700, fontSize:13,
                background:active===item.id?"linear-gradient(135deg,var(--teal-dark),var(--teal))":"none",
                color:active===item.id?"white":"rgba(255,255,255,0.65)", width:"100%", textAlign:"left" }}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px 16px 32px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={onLogout} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"11px 14px", border:"none", borderRadius:10, cursor:"pointer", fontFamily:"Nunito,sans-serif", fontWeight:700, fontSize:13, color:"#fca5a5", background:"rgba(231,76,60,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

// Responsive App Shell wrapper
function AppShell({ user, navItems, activeTab, setTab, onLogout, title, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDesktop } = useBreakpoint();
  return (
    <div className="app-shell">
      <style>{globalStyles}</style>
      <TopBar user={user} onMenu={() => setDrawerOpen(true)} title={title} isDesktop={isDesktop} />
      <div className="layout-wrapper">
        {isDesktop && <DesktopSidebar items={navItems} active={activeTab} onChange={setTab} user={user} onLogout={onLogout} />}
        {!isDesktop && <DrawerSidebar items={navItems} active={activeTab} onChange={setTab} user={user} onLogout={onLogout} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
        <div className="main-content">
          {children}
        </div>
      </div>
      {!isDesktop && <BottomNav items={navItems} active={activeTab} onChange={setTab} />}
    </div>
  );
}

function SideMenu({ user, onClose, onLogout }) {
  return null; // replaced by DrawerSidebar
}

// ============================================================
// LOGIN
// ============================================================
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) { setError(""); onLogin(user); }
    else setError("Invalid username or password.");
  };

  return (
    <div className="login-outer">
      <div className="login-inner">
        {/* Branding panel — hidden on small screens */}
        <div className="login-branding">
          <div className="login-logo">
            <div className="login-logo-text">CDL<br/>SHS<br/>🏫</div>
          </div>
          <div className="login-school-name">CRECENCIA DRUCILA LOPEZ<br/>SENIOR HIGH SCHOOL</div>
          <div className="login-sub">Student & Staff Portal</div>
          <div className="login-tagline">
            Your complete school management platform — grades, schedules, enrollment, and records all in one place.
          </div>
          {/* Feature pills (desktop only) */}
          <div style={{ marginTop:24, display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
            {["📊 Grades","📅 Schedules","📋 Enrollment","👥 Records","🏫 Sections"].map(f => (
              <span key={f} style={{ background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.85)", borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:700 }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Login card */}
        <div className="login-card">
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:28, marginBottom:6 }}>👋</div>
            <div style={{ fontSize:18, fontWeight:900, color:"var(--gray-800)", marginBottom:4 }}>Welcome Back</div>
            <div className="login-card" style={{ boxShadow:"none", padding:0 }}><h3>Sign in to your account to continue</h3></div>
          </div>
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <div className="form-label"><Icon.Mail /> Username</div>
            <input className="form-input" placeholder="your.username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <div className="form-label"><Icon.Lock /> Password</div>
            <div className="password-wrap">
              <input className="form-input" type={showPw ? "text" : "password"} placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <button className="password-toggle" onClick={() => setShowPw(!showPw)}>{showPw ? <Icon.EyeOff /> : <Icon.Eye />}</button>
            </div>
          </div>
          <button className="btn-primary" onClick={handleLogin}>Sign In →</button>
          <div className="login-links">
            <button className="link-btn">Forgot Password?</button>
          </div>
          <div style={{ marginTop:16, padding:"12px 14px", background:"var(--teal-pale)", borderRadius:8, fontSize:11, color:"var(--teal-dark)", fontWeight:600, lineHeight:1.8 }}>
            <strong>Demo accounts:</strong><br/>
            admin / admin123 — Administrator<br/>
            teacher1 / teacher123 — Teacher (Mr. Santos)<br/>
            student1 / student123 — Enrolled Student<br/>
            newstudent / newstudent123 — New (unenrolled)
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// STUDENT APP
// ============================================================
function StudentApp({ user, onLogout }) {
  const [tab, setTab] = useState("home");
  const [users, setUsers] = useState(MOCK_USERS);
  const [grades, setGrades] = useState(MOCK_GRADES);
  const [enrollments, setEnrollments] = useState(MOCK_ENROLLMENTS);
  const [subjects] = useState(MOCK_SUBJECTS);
  const [schedule] = useState(MOCK_SCHEDULE);
  const [sections] = useState(MOCK_SECTIONS);

  const currentUser = users.find(u => u.id === user.id) || user;
  const myGrades = grades.filter(g => g.studentId === user.id);
  const mySubjects = subjects.filter(s => (s.strand === currentUser.strand || s.strand === "ALL") && s.gradeLevel === currentUser.gradeLevel);
  const mySection = sections.find(s => s.id === currentUser.section);
  const mySchedule = schedule.filter(s => s.section === currentUser.section);
  const myEnrollment = enrollments.find(e => e.studentId === user.id);

  const navItems = [
    { id: "home", label: "Home", icon: <Icon.Home /> },
    { id: "subjects", label: "Subjects", icon: <Icon.Book /> },
    { id: "grades", label: "Grades", icon: <Icon.Grade /> },
    { id: "schedule", label: "Schedule", icon: <Icon.Calendar /> },
    { id: "profile", label: "Profile", icon: <Icon.User /> },
  ];

  return (
    <AppShell user={currentUser} navItems={navItems} activeTab={tab} setTab={setTab} onLogout={onLogout} title="CDL SHS Portal">
      {tab === "home" && <StudentHome user={currentUser} myGrades={myGrades} mySubjects={mySubjects} mySection={mySection} myEnrollment={myEnrollment} enrollments={enrollments} setEnrollments={setEnrollments} setTab={setTab} subjects={subjects} />}
      {tab === "subjects" && <StudentSubjects subjects={mySubjects} grades={myGrades} />}
      {tab === "grades" && <StudentGrades subjects={subjects} grades={myGrades} />}
      {tab === "schedule" && <StudentSchedule schedule={mySchedule} subjects={subjects} users={users} />}
      {tab === "profile" && <StudentProfile user={currentUser} users={users} setUsers={setUsers} onLogout={onLogout} />}
    </AppShell>
  );
}

function StudentHome({ user, myGrades, mySubjects, mySection, myEnrollment, enrollments, setEnrollments, setTab, subjects }) {
  const [showEnroll, setShowEnroll] = useState(false);
  const [showSummer, setShowSummer] = useState(false);
  const [requirements, setRequirements] = useState({
    reportCard: { checked: false, file: null, preview: null },
    goodMoral:  { checked: false, file: null, preview: null },
    form137:    { checked: false, file: null, preview: null },
    birthCert:  { checked: false, file: null, preview: null },
    id:         { checked: false, file: null, preview: null },
  });
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [enrollMode, setEnrollMode] = useState("online");

  const approvedGrades = myGrades.filter(g => g.status === "approved");
  const sem1Grades = approvedGrades.filter(g => g.sem === 1);
  const sem2Grades = approvedGrades.filter(g => g.sem === 2);
  const sem1Final = sem1Grades.length ? Math.round(sem1Grades.reduce((a,g) => a + computeFinalGrade(g), 0) / sem1Grades.length) : null;
  const sem2Final = sem2Grades.length ? Math.round(sem2Grades.reduce((a,g) => a + computeFinalGrade(g), 0) / sem2Grades.length) : null;
  const gwa = (sem1Final && sem2Final) ? Math.round((sem1Final + sem2Final) / 2) : (sem1Final || sem2Final);

  const nextGrade = user.gradeLevel === 11 ? 12 : null;
  const nextYear = "2025-2026";
  const alreadyEnrolled = enrollments.some(e => e.studentId === user.id && (e.status === "pending" || e.status === "approved"));
  const failedGrades = approvedGrades.filter(g => computeFinalGrade(g) < 75);
  const hasFailures = failedGrades.length > 0;
  const canEnroll = nextGrade && !alreadyEnrolled && !hasFailures;

  const REQ_LABELS = { reportCard: "Report Card (Form 138)", goodMoral: "Certificate of Good Moral", form137: "Form 137", birthCert: "Birth Certificate (PSA)", id: "Valid ID / School ID" };

  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setRequirements(prev => ({ ...prev, [key]: { checked: true, file, preview: ev.target.result } }));
    reader.readAsDataURL(file);
  };

  const allUploaded = Object.values(requirements).every(r => r.checked);  // only used for online mode

  const handleEnroll = () => {
    if (!allUploaded) return;
    const reqData = {};
    Object.entries(requirements).forEach(([k,v]) => { reqData[k] = { submitted: true, preview: v.preview }; });
    setEnrollments(prev => [...prev, { id: "en" + Date.now(), studentId: user.id, schoolYear: nextYear, gradeLevel: nextGrade, strand: user.strand, status: "pending", submittedAt: new Date().toISOString().split("T")[0], requirements: reqData }]);
    setEnrollSuccess(true);
    setShowEnroll(false);
  };

  const handleEnrollOnsite = () => {
    const reqData = {};
    Object.keys(REQ_LABELS).forEach(k => { reqData[k] = { submitted: false, preview: null, onsite: true }; });
    setEnrollments(prev => [...prev, { id: "en" + Date.now(), studentId: user.id, schoolYear: nextYear, gradeLevel: nextGrade, strand: user.strand, status: "pending", submittedAt: new Date().toISOString().split("T")[0], requirements: reqData, submitType: "onsite" }]);
    setEnrollSuccess(true);
    setShowEnroll(false);
  };

  const enrollCardLabel = () => {
    if (alreadyEnrolled) return "Submitted";
    if (hasFailures) return "Blocked";
    if (!nextGrade) return "Complete";
    return "Enroll";
  };

  const sy = "SY 2024–2025";

  return (
    <div>
      {/* ── HERO HEADER ── */}
      <div style={{ background: "linear-gradient(160deg, var(--navy) 0%, var(--teal-dark) 60%, var(--teal) 100%)", padding: "28px 20px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>CRECENCIA DRUCILA LOPEZ SHS</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "2.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "white", flexShrink: 0 }}>{getInitials(user.name)}</div>
          <div>
            <div style={{ color: "white", fontWeight: 900, fontSize: 17, lineHeight: 1.2 }}>{user.firstName ? `${user.firstName} ${user.lastName}` : user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, marginTop: 3 }}>Grade {user.gradeLevel} · {user.strand} · {mySection?.name || "—"}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 600 }}>LRN: {user.lrn} · {sy}</div>
          </div>
        </div>
        {/* GWA row */}
        <div style={{ display: "flex", gap: 8 }}>
          {[{l:"1st Sem", v: sem1Final},{l:"2nd Sem", v: sem2Final},{l:"GWA", v: gwa, accent:true}].map(({l,v,accent}) => (
            <div key={l} style={{ flex:1, background: accent?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.09)", borderRadius:10, padding:"10px 6px", textAlign:"center", border: accent?"1.5px solid rgba(255,255,255,0.3)":"none" }}>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", fontWeight:700, marginBottom:2 }}>{l}</div>
              <div style={{ fontSize: accent?22:18, fontWeight:900, color: v&&v<75?"#fca5a5":accent?"white":"rgba(255,255,255,0.9)" }}>{v||"—"}</div>
              {v && <div style={{ fontSize:8, color: v>=75?"#86efac":"#fca5a5", fontWeight:700 }}>{v>=75?"PASSED":"FAILED"}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="page-content">
        {enrollSuccess && <div className="alert alert-success">✅ Enrollment submitted! Waiting for admin approval.</div>}
        {myEnrollment && <div className="alert alert-warning" style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{fontSize:18}}>📋</span>
          <div><div style={{fontWeight:800}}>Enrollment {myEnrollment.status}</div><div style={{fontSize:11}}>SY {myEnrollment.schoolYear} — Grade {myEnrollment.gradeLevel}</div></div>
        </div>}

        {/* Summer warning */}
        {hasFailures && !alreadyEnrolled && (
          <div onClick={() => setShowSummer(true)} style={{ background:"#fff7ed", border:"1.5px solid #f97316", borderRadius:"var(--radius)", padding:"14px 16px", marginBottom:14, cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{fontSize:20}}>⚠️</span>
              <div style={{ fontWeight:800, fontSize:13, color:"#c2410c" }}>Enrollment Blocked — {failedGrades.length} Failed Subject{failedGrades.length>1?"s":""}</div>
            </div>
            <div style={{ fontSize:12, color:"#9a3412", fontWeight:600 }}>Complete summer class{failedGrades.length>1?"es":""} before enrolling. Tap for details →</div>
          </div>
        )}

        {/* Quick stat cards */}
        <div className="dashboard-grid">
          <div className="dash-card" onClick={() => setTab("subjects")}>
            <div className="dash-card-icon" style={{color:"#2563eb"}}><Icon.Book /></div>
            <div className="badge">{mySubjects.length}</div>
            <h3>Subjects</h3>
          </div>
          <div className="dash-card" onClick={() => setTab("grades")}>
            <div className="dash-card-icon" style={{color:"#d97706"}}><Icon.Grade /></div>
            <div className="badge" style={{color:gwa&&gwa<75?"var(--red)":"inherit"}}>{gwa||"—"}</div>
            <h3>GWA</h3>
          </div>
          <div className="dash-card" onClick={() => setTab("schedule")}>
            <div className="dash-card-icon" style={{color:"#059669"}}><Icon.Calendar /></div>
            <div className="badge">{mySubjects.length}</div>
            <h3>Schedule</h3>
          </div>
          <div className="dash-card"
            onClick={() => { if(hasFailures) setShowSummer(true); else if(canEnroll) setShowEnroll(true); }}
            style={{ borderColor: hasFailures?"#f97316":canEnroll?"var(--teal)":"var(--gray-200)", opacity: (nextGrade||hasFailures)?1:0.5, cursor:(hasFailures||canEnroll)?"pointer":"default" }}>
            <div className="dash-card-icon" style={{color:hasFailures?"#f97316":"var(--teal)"}}>
              {hasFailures?<span style={{fontSize:22}}>🚫</span>:<Icon.Clipboard />}
            </div>
            <div className="badge" style={{fontSize:13,fontWeight:700,color:hasFailures?"#f97316":alreadyEnrolled?"var(--gray-400)":"var(--teal)"}}>{enrollCardLabel()}</div>
            <h3>Enrollment</h3>
          </div>
        </div>

        {/* School info strip */}
        <div style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:"14px 16px", boxShadow:"var(--shadow-sm)", display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ fontSize:32 }}>🏫</div>
          <div>
            <div style={{ fontWeight:800, fontSize:13, color:"var(--gray-800)" }}>CDL Senior High School</div>
            <div style={{ fontSize:11, color:"var(--gray-400)", fontWeight:600 }}>School Year 2024–2025 · {user.enrolled?"Currently Enrolled":"Not Enrolled"}</div>
          </div>
          <span className={`pill ${user.enrolled?"pill-green":"pill-yellow"}`} style={{marginLeft:"auto",flexShrink:0}}>{user.enrolled?"Enrolled":"Unenrolled"}</span>
        </div>

        {/* Summer Class Modal */}
        {showSummer && (
          <div className="modal-overlay" onClick={() => setShowSummer(false)}>
            <div className="modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div style={{ textAlign:"center", paddingBottom:12 }}><div style={{fontSize:44,marginBottom:6}}>☀️</div><div className="modal-title" style={{textAlign:"center"}}>Summer Class Required</div></div>
              {failedGrades.map(g => {
                const sub = subjects.find(s => s.id === g.subjectId);
                const final = computeFinalGrade(g);
                return (
                  <div key={g.id} style={{ background:"#fff7ed", border:"1.5px solid #fed7aa", borderRadius:"var(--radius-sm)", padding:"12px 14px", marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <div style={{ fontWeight:800, fontSize:13, color:"#c2410c" }}>{sub?.name}</div>
                      <span className="pill pill-red">Final: {final}</span>
                    </div>
                    <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                      {[["Midterm",g.q1],["Finals",g.q2],["Final",final]].map(([label,val]) => (
                        <div key={label} style={{ flex:1, textAlign:"center", background:label==="Final"?"#fee2e2":"white", borderRadius:6, padding:"4px 0", border:"1px solid #fed7aa" }}>
                          <div style={{ fontSize:9, color:"#9a3412", fontWeight:700 }}>{label}</div>
                          <div style={{ fontSize:12, fontWeight:800, color:"#c2410c" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"8px 10px", background:"#fef3c7", borderRadius:6, fontSize:11, color:"#92400e", fontWeight:600 }}>📋 Re-take <em>{sub?.name}</em> during summer. Pass with at least 75 to proceed to Grade {nextGrade}.</div>
                  </div>
                );
              })}
              <div style={{ background:"#dbeafe", borderRadius:"var(--radius-sm)", padding:"12px 14px", marginBottom:8, fontSize:12, color:"#1e40af", fontWeight:600 }}>ℹ️ Once you pass your summer class, your enrollment block will be lifted.</div>
              <button className="btn-block-outline" onClick={() => setShowSummer(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {previewImg && (
          <div className="modal-overlay" onClick={() => setPreviewImg(null)} style={{ alignItems:"center", justifyContent:"center" }}>
            <div onClick={e => e.stopPropagation()} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:12, maxWidth:380, width:"90%", position:"relative" }}>
              <button onClick={() => setPreviewImg(null)} style={{ position:"absolute", top:8, right:8, background:"var(--gray-200)", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon.X /></button>
              <img src={previewImg} alt="preview" style={{ width:"100%", borderRadius:8, marginTop:8 }} />
            </div>
          </div>
        )}

        {/* Enrollment Modal */}
        {showEnroll && (
          <div className="modal-overlay" onClick={() => setShowEnroll(false)}>
            <div className="modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div className="modal-title">Enrollment for Grade {nextGrade}</div>
              <div className="alert alert-info">School Year: <strong>{nextYear}</strong> · Strand: <strong>{user.strand}</strong></div>

              {/* Submission mode toggle */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:800, color:"var(--gray-700)", marginBottom:8 }}>How will you submit your requirements?</div>
                <div style={{ display:"flex", gap:0, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
                  {[["online","📤 Upload Online"],["onsite","🏫 Submit On-Site"]].map(([m,lbl]) => (
                    <button key={m} onClick={() => setEnrollMode(m)} style={{ flex:1, padding:"9px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:12, cursor:"pointer", transition:"all 0.15s",
                      background:enrollMode===m?"var(--white)":"transparent", color:enrollMode===m?"var(--teal)":"var(--gray-500)", boxShadow:enrollMode===m?"var(--shadow-sm)":"none" }}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {enrollMode === "online" && <>
                <div style={{ fontWeight:800, fontSize:13, color:"var(--gray-700)", marginBottom:4 }}>Upload Required Documents</div>
                <div style={{ fontSize:11, color:"var(--gray-400)", fontWeight:600, marginBottom:12 }}>Tap each item to upload a photo or scanned copy</div>
                {Object.entries(REQ_LABELS).map(([key, label]) => {
                  const req = requirements[key];
                  return (
                    <div key={key} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid var(--gray-100)" }}>
                      <div style={{ width:38, height:38, borderRadius:8, overflow:"hidden", background:req.preview?"var(--teal-pale)":"var(--gray-100)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", cursor: req.preview?"pointer":"default" }}
                        onClick={() => req.preview && setPreviewImg(req.preview)}>
                        {req.preview ? <img src={req.preview} alt={label} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <span style={{fontSize:18}}>📄</span>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:800, color:"var(--gray-800)" }}>{label}</div>
                        {req.file && <div style={{ fontSize:10, color:"var(--teal)", fontWeight:700, marginTop:1 }}>✓ {req.file.name}</div>}
                      </div>
                      <label style={{ background:req.checked?"var(--teal)":"var(--gray-200)", color:req.checked?"white":"var(--gray-600)", borderRadius:20, padding:"5px 12px", fontSize:11, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
                        {req.checked?"✓ Done":"Upload"}
                        <input type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e => handleFileChange(key, e)} />
                      </label>
                    </div>
                  );
                })}
                <button className="btn-block" disabled={!allUploaded} onClick={handleEnroll} style={{ opacity:allUploaded?1:0.5 }}>Submit Online Enrollment</button>
                {!allUploaded && <div style={{ fontSize:11, color:"var(--gray-400)", textAlign:"center", marginTop:8 }}>Upload all {Object.values(requirements).filter(r=>!r.checked).length} remaining document(s) to proceed</div>}
              </>}

              {enrollMode === "onsite" && <>
                <div style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:"var(--radius-sm)", padding:"14px 16px", marginBottom:14 }}>
                  <div style={{ fontWeight:800, fontSize:13, color:"#15803d", marginBottom:6 }}>🏫 On-Site Submission Instructions</div>
                  <div style={{ fontSize:12, color:"#166534", fontWeight:600, lineHeight:1.7 }}>
                    Bring the original and photocopies of all required documents to the Registrar's Office. The admin will verify and approve your enrollment upon receipt.
                  </div>
                </div>
                <div style={{ fontWeight:800, fontSize:12, color:"var(--gray-700)", marginBottom:10 }}>Checklist — bring ALL of the following:</div>
                {Object.entries(REQ_LABELS).map(([key, label]) => (
                  <div key={key} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid var(--gray-100)" }}>
                    <div style={{ width:22, height:22, borderRadius:6, background:"var(--teal-pale)", border:"1.5px solid var(--teal)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:14, color:"var(--teal)" }}>✓</span>
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:"var(--gray-700)" }}>{label}</div>
                  </div>
                ))}
                <div style={{ background:"#fff7ed", border:"1.5px solid #fed7aa", borderRadius:"var(--radius-sm)", padding:"12px 14px", margin:"14px 0", fontSize:12, color:"#92400e", fontWeight:600 }}>
                  ⚠️ Your enrollment will remain <strong>pending</strong> until the Registrar verifies your documents in person.
                </div>
                <button className="btn-block" onClick={handleEnrollOnsite}>Submit On-Site Request</button>
              </>}
              {!allUploaded && <div style={{ fontSize:11, color:"var(--gray-400)", textAlign:"center", marginTop:8 }}>Upload all {Object.values(requirements).filter(r=>!r.checked).length} remaining document(s) to proceed</div>}
              <button className="btn-block-outline" onClick={() => setShowEnroll(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentSubjects({ subjects, grades }) {
  const [sem, setSem] = useState(1);

  const semSubjects = subjects.filter(s => SUBJECT_SEM[s.id] === sem);
  const semGrades   = grades.filter(g => g.status === "approved" && g.sem === sem);

  // Sem final for banner
  const semFinal = semGrades.length
    ? Math.round(semGrades.reduce((a,g) => a+computeFinalGrade(g),0)/semGrades.length)
    : null;

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">My Subjects</div></div>

      {/* Semester switcher */}
      <div style={{ display:"flex", gap:0, marginBottom:14, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
        {[1,2].map(s=>(
          <button key={s} onClick={()=>setSem(s)} style={{ flex:1, padding:"8px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", transition:"all 0.15s",
            background:sem===s?"var(--white)":"transparent", color:sem===s?"var(--teal)":"var(--gray-500)", boxShadow:sem===s?"var(--shadow-sm)":"none" }}>
            {s===1?"1st Semester":"2nd Semester"}
          </button>
        ))}
      </div>

      <div style={{ fontSize:11, fontWeight:700, color:"var(--gray-400)", marginBottom:10 }}>
        {semSubjects.length} subject{semSubjects.length!==1?"s":""} · {sem===1?"1st":"2nd"} Semester
      </div>

      {semSubjects.map(s => {
        const g = semGrades.find(gr => gr.subjectId === s.id);
        const final = g ? computeFinalGrade(g) : null;
        const failed = final !== null && !isPassing(final);
        return (
          <div key={s.id} className="list-card" style={failed?{borderLeft:"3px solid #f97316",background:"#fffbf7"}:{}}>
            <div className="list-card-icon" style={{ background:failed?"#fff7ed":"var(--teal-pale)", color:failed?"#f97316":"var(--teal)" }}>
              {failed ? <span style={{fontSize:18}}>☀️</span> : <Icon.Book />}
            </div>
            <div className="list-card-info">
              <h4 style={failed?{color:"#c2410c"}:{}}>{s.name}</h4>
              <p>Grade {s.gradeLevel} · {s.track} · {s.strand}</p>
              {failed && <p style={{ color:"#f97316", fontWeight:700, fontSize:10, marginTop:2 }}>Summer class required</p>}
            </div>
            <div className="list-card-right">
              {final !== null
                ? <span className={`pill ${isPassing(final)?"pill-green":"pill-red"}`}>{final}</span>
                : <span className="pill pill-gray">No grade</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function StudentGrades({ subjects, grades }) {
  const [gradeLevel, setGradeLevel] = useState(11);
  const [sem, setSem] = useState(1);

  const approvedGrades = grades.filter(g => g.status === "approved");

  // Get grades for this grade level + semester
  const filtered = approvedGrades.filter(g => {
    const sub = subjects.find(s => s.id === g.subjectId);
    return sub?.gradeLevel === gradeLevel && g.sem === sem;
  });

  // Compute semester final average
  const semFinal = filtered.length
    ? Math.round(filtered.reduce((a, g) => a + computeFinalGrade(g), 0) / filtered.length)
    : null;

  // Compute GWA across both sems for this grade level
  const allForLevel = approvedGrades.filter(g => {
    const sub = subjects.find(s => s.id === g.subjectId);
    return sub?.gradeLevel === gradeLevel;
  });
  const s1 = allForLevel.filter(g => g.sem===1);
  const s2 = allForLevel.filter(g => g.sem===2);
  const sf1 = s1.length ? Math.round(s1.reduce((a,g)=>a+computeFinalGrade(g),0)/s1.length) : null;
  const sf2 = s2.length ? Math.round(s2.reduce((a,g)=>a+computeFinalGrade(g),0)/s2.length) : null;
  const gwa  = (sf1&&sf2) ? Math.round((sf1+sf2)/2) : (sf1||sf2);

  const failedCount = filtered.filter(g => !isPassing(computeFinalGrade(g))).length;

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">My Grades</div></div>

      {/* Grade Level filter */}
      <div className="filter-bar">
        {[11,12].map(gl => (
          <button key={gl} className={`filter-chip${gradeLevel===gl?" active":""}`} onClick={()=>{setGradeLevel(gl);setSem(1);}}>Grade {gl}</button>
        ))}
      </div>

      {/* GWA + Sem Finals summary */}
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        {[{label:"1st Sem",val:sf1},{label:"2nd Sem",val:sf2},{label:"GWA",val:gwa,big:true}].map(({label,val,big})=>(
          <div key={label} style={{ flex:1, background:big?"linear-gradient(135deg,var(--navy),var(--teal-dark))":"var(--white)", borderRadius:"var(--radius-sm)", padding:"10px 8px", textAlign:"center", boxShadow:"var(--shadow-sm)" }}>
            <div style={{ fontSize:10, fontWeight:700, color:big?"rgba(255,255,255,0.7)":"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:big?22:18, fontWeight:900, color:val&&!isPassing(val)?"var(--red)":big?"var(--white)":"var(--gray-800)" }}>
              {val||"—"}
            </div>
            {val && <div style={{ fontSize:9, fontWeight:700, color:big?"rgba(255,255,255,0.6)":isPassing(val)?"var(--teal)":"var(--red)" }}>{val?(isPassing(val)?"PASSED":"FAILED"):""}</div>}
          </div>
        ))}
      </div>

      {/* Semester tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:14, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
        {[1,2].map(s=>(
          <button key={s} onClick={()=>setSem(s)} style={{ flex:1, padding:"8px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", transition:"all 0.15s",
            background:sem===s?"var(--white)":"transparent", color:sem===s?"var(--teal)":"var(--gray-500)", boxShadow:sem===s?"var(--shadow-sm)":"none" }}>
            {s === 1 ? "1st Semester" : "2nd Semester"}
          </button>
        ))}
      </div>

      {failedCount>0 && (
        <div style={{ background:"#fff7ed", border:"1.5px solid #f97316", borderRadius:"var(--radius-sm)", padding:"10px 14px", marginBottom:12, fontSize:12, color:"#c2410c", fontWeight:700 }}>
          ☀️ {failedCount} failed subject{failedCount>1?"s":""} this semester — Summer class required
        </div>
      )}

      {/* Sem Final banner */}
      {semFinal && (
        <div style={{ background:isPassing(semFinal)?"linear-gradient(135deg,#059669,#047857)":"linear-gradient(135deg,#dc2626,#b91c1c)", borderRadius:"var(--radius-sm)", padding:"10px 14px", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ color:"white", fontWeight:700, fontSize:12 }}>{sem===1?"1st":"2nd"} Semester Final</span>
          <span style={{ color:"white", fontWeight:900, fontSize:20 }}>{semFinal}</span>
        </div>
      )}

      {filtered.length === 0
        ? <div className="empty-state"><Icon.Grade /><h3>No grades yet</h3><p>Grades will appear once posted</p></div>
        : (
        <table className="grades-table">
          <thead><tr><th>Subject</th><th>Midterm</th><th>Finals</th><th>Final</th></tr></thead>
          <tbody>
            {filtered.map(g => {
              const sub = subjects.find(s => s.id === g.subjectId);
              const final = computeFinalGrade(g);
              const failed = !isPassing(final);
              return (
                <tr key={g.id} style={failed?{background:"#fff7ed"}:{}}>
                  <td style={failed?{color:"#c2410c"}:{}}>
                    {sub?.name}
                    {failed && <span style={{display:"block",fontSize:9,color:"#f97316",fontWeight:800,marginTop:1}}>☀️ SUMMER CLASS</span>}
                  </td>
                  <td className="grade-val" style={failed?{color:"#c2410c"}:{}}>{g.q1}</td>
                  <td className="grade-val" style={failed?{color:"#c2410c"}:{}}>{g.q2}</td>
                  <td className={`grade-val ${isPassing(final)?"grade-pass":"grade-fail"}`}>
                    {final}
                    {failed && <div style={{fontSize:9,color:"#f97316",fontWeight:800}}>FAILED</div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
function StudentSchedule({ schedule, subjects, users }) {
  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">My Schedule</div></div>
      {DAYS.map(day => {
        const items = [...schedule.filter(s => s.day === day)].sort((a,b) => {
          const toMin = t => { const [h,m] = t.replace(/AM|PM/,'').trim().split(':').map(Number); return (t.includes('PM') && h!==12 ? h+12 : h)*60+m; };
          return toMin(a.startTime) - toMin(b.startTime);
        });
        if (!items.length) return null;
        return (
          <div key={day} className="schedule-day">
            <div className="schedule-day-header">{day}</div>
            {items.map(item => {
              const sub = subjects.find(s => s.id === item.subjectId);
              const teacher = users?.find(u => u.id === item.teacherId);
              return (
                <div key={item.id} className="schedule-item">
                  <div className="schedule-time">{item.startTime}<br />{item.endTime}</div>
                  <div className="schedule-info">
                    <h4>{sub?.name}</h4>
                    <p>{item.room}{teacher ? ` · ${teacher.name}` : ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function StudentProfile({ user, users, setUsers, onLogout }) {
  const [changePw, setChangePw] = useState(false);
  const [oldPw, setOldPw] = useState(""); const [newPw, setNewPw] = useState(""); const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [section, setSection] = useState("personal");

  const handleChangePw = () => {
    const u = users.find(u2 => u2.id === user.id);
    if (u.password !== oldPw) { setPwMsg("Incorrect current password."); return; }
    if (newPw !== confirmPw) { setPwMsg("Passwords don't match."); return; }
    if (newPw.length < 6) { setPwMsg("Password must be at least 6 characters."); return; }
    setUsers(prev => prev.map(u2 => u2.id === user.id ? { ...u2, password: newPw } : u2));
    setPwMsg("✅ Password changed successfully!"); setOldPw(""); setNewPw(""); setConfirmPw("");
  };

  const InfoField = ({ label, value }) => (
    <div className="info-row"><label>{label}</label><span>{value || <span style={{color:"var(--gray-300)"}}>—</span>}</span></div>
  );

  const SectionCard = ({ title, children }) => (
    <div style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:"14px 16px", marginBottom:12, boxShadow:"var(--shadow-sm)" }}>
      <div style={{ fontSize:11, fontWeight:800, color:"var(--teal)", marginBottom:10, textTransform:"uppercase", letterSpacing:0.5 }}>{title}</div>
      {children}
    </div>
  );

  const SECTIONS = ["personal","address","family","school"];

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">My Profile</div></div>
      <div style={{ fontSize:12, color:"var(--gray-400)", fontWeight:600, marginBottom:12 }}>ℹ️ Personal info is managed by the admin based on your enrollment documents.</div>

      {/* Avatar card */}
      <div style={{ background:"linear-gradient(135deg,var(--navy),var(--teal-dark))", borderRadius:"var(--radius)", padding:"20px 16px", marginBottom:14, display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(255,255,255,0.18)", border:"2.5px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"white", flexShrink:0 }}>{getInitials(user.name)}</div>
        <div>
          <div style={{ color:"white", fontWeight:900, fontSize:16 }}>{user.firstName ? `${user.firstName} ${user.middleName||""} ${user.lastName}` : user.name}</div>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, marginTop:3 }}>LRN: {user.lrn}</div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, fontWeight:600 }}>{user.strand} · Grade {user.gradeLevel}</div>
        </div>
        <span className={`pill ${user.enrolled?"pill-green":"pill-yellow"}`} style={{marginLeft:"auto",flexShrink:0}}>{user.enrolled?"Enrolled":"Not Enrolled"}</span>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:4 }}>
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setSection(s)} style={{ flexShrink:0, borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700, border:"1.5px solid", cursor:"pointer", fontFamily:"Nunito,sans-serif", transition:"all 0.15s", background:section===s?"var(--teal)":"var(--white)", color:section===s?"white":"var(--gray-500)", borderColor:section===s?"var(--teal)":"var(--gray-200)" }}>
            {s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>

      {section === "personal" && (
        <SectionCard title="Personal Information">
          <InfoField label="Last Name" value={user.lastName} />
          <InfoField label="First Name" value={user.firstName} />
          <InfoField label="Middle Name" value={user.middleName} />
          {user.sex === "Female" && <InfoField label="Maiden Name" value={user.maidenName} />}
          <InfoField label="Date of Birth" value={user.dob} />
          <InfoField label="Place of Birth" value={user.pob} />
          <InfoField label="Sex" value={user.sex} />
          <InfoField label="Civil Status" value={user.civil} />
          <InfoField label="Religion" value={user.religion} />
          <InfoField label="Citizenship" value={user.citizenship} />
          <InfoField label="Email" value={user.email} />
          <InfoField label="Contact No." value={user.contact} />
        </SectionCard>
      )}

      {section === "address" && (
        <SectionCard title="Address">
          <InfoField label="Region" value={user.region} />
          <InfoField label="Province" value={user.province} />
          <InfoField label="City / Municipality" value={user.city} />
          <InfoField label="Barangay" value={user.barangay} />
          <InfoField label="ZIP Code" value={user.zip} />
          <InfoField label="House No." value={user.houseNo} />
          <InfoField label="Street / Purok" value={user.street} />
        </SectionCard>
      )}

      {section === "family" && (
        <>
          <SectionCard title="Father">
            <InfoField label="Name" value={user.fatherName} />
            <InfoField label="Occupation" value={user.fatherOccupation} />
            <InfoField label="Contact No." value={user.fatherContact} />
          </SectionCard>
          <SectionCard title="Mother">
            <InfoField label="Name" value={user.motherName} />
            <InfoField label="Occupation" value={user.motherOccupation} />
            <InfoField label="Contact No." value={user.motherContact} />
          </SectionCard>
          <SectionCard title="Guardian">
            <InfoField label="Name" value={user.guardianName} />
            <InfoField label="Relationship" value={user.guardianRelationship} />
            <InfoField label="Address" value={user.guardianAddress} />
            <InfoField label="Contact No." value={user.guardianContact} />
          </SectionCard>
        </>
      )}

      {section === "school" && (
        <SectionCard title="School Information">
          <InfoField label="LRN" value={user.lrn} />
          <InfoField label="Grade Level" value={`Grade ${user.gradeLevel}`} />
          <InfoField label="Strand" value={user.strand} />
          <InfoField label="Username" value={user.username} />
          <InfoField label="Enrollment Status" value={user.enrolled ? "Enrolled" : "Not Enrolled"} />
        </SectionCard>
      )}

      {/* Change Password */}
      <button className="btn-outline-small" style={{ width:"100%", marginBottom:12, padding:12, fontSize:13, borderRadius:"var(--radius-sm)" }} onClick={() => setChangePw(!changePw)}>
        🔑 Change Password
      </button>
      {changePw && (
        <div style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:16, marginBottom:12, boxShadow:"var(--shadow-sm)" }}>
          {pwMsg && <div className={`alert ${pwMsg.startsWith("✅")?"alert-success":"alert-warning"}`}>{pwMsg}</div>}
          {[["Current Password",oldPw,setOldPw],["New Password",newPw,setNewPw],["Confirm New Password",confirmPw,setConfirmPw]].map(([label,val,setter]) => (
            <div key={label} className="form-group"><div className="form-label">{label}</div><input type="password" className="form-input" value={val} onChange={e => setter(e.target.value)} /></div>
          ))}
          <button className="btn-block" onClick={handleChangePw}>Update Password</button>
        </div>
      )}

      {/* Logout */}
      <button onClick={onLogout} style={{ width:"100%", background:"none", border:"1.5px solid var(--red)", color:"var(--red)", borderRadius:"var(--radius-sm)", padding:"12px", fontSize:14, fontWeight:700, fontFamily:"Nunito,sans-serif", cursor:"pointer", marginTop:4, marginBottom:24 }}>
        🚪 Sign Out
      </button>
    </div>
  );
}

// ── StaffProfile (shared for teacher + admin) ──
function StaffProfile({ user, users, setUsers, onLogout, role }) {
  const [changePw, setChangePw] = useState(false);
  const [oldPw, setOldPw] = useState(""); const [newPw, setNewPw] = useState(""); const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const handleChangePw = () => {
    const u = users.find(u2 => u2.id === user.id);
    if (u.password !== oldPw) { setPwMsg("Incorrect current password."); return; }
    if (newPw !== confirmPw) { setPwMsg("Passwords don't match."); return; }
    if (newPw.length < 6) { setPwMsg("Password must be at least 6 characters."); return; }
    setUsers(prev => prev.map(u2 => u2.id === user.id ? { ...u2, password: newPw } : u2));
    setPwMsg("✅ Password changed successfully!"); setOldPw(""); setNewPw(""); setConfirmPw("");
  };

  const InfoField = ({ label, value }) => (
    <div className="info-row"><label>{label}</label><span>{value||<span style={{color:"var(--gray-300)"}}>—</span>}</span></div>
  );

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">My Profile</div></div>

      {/* Avatar card */}
      <div style={{ background:"linear-gradient(135deg,var(--navy),var(--teal-dark))", borderRadius:"var(--radius)", padding:"20px 16px", marginBottom:14, display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(255,255,255,0.18)", border:"2.5px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"white", flexShrink:0 }}>{getInitials(user.name)}</div>
        <div>
          <div style={{ color:"white", fontWeight:900, fontSize:16 }}>{user.name}</div>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, marginTop:3, textTransform:"capitalize" }}>{role} · CDL SHS</div>
          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11, fontWeight:600 }}>SY 2024–2025</div>
        </div>
      </div>

      <div style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:"14px 16px", marginBottom:14, boxShadow:"var(--shadow-sm)" }}>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--teal)", marginBottom:10, textTransform:"uppercase" }}>Account Info</div>
        <InfoField label="Full Name" value={user.name} />
        <InfoField label="Username" value={user.username} />
        <InfoField label="Role" value={role.charAt(0).toUpperCase()+role.slice(1)} />
      </div>

      {/* Change Password */}
      <button className="btn-outline-small" style={{ width:"100%", marginBottom:12, padding:12, fontSize:13, borderRadius:"var(--radius-sm)" }} onClick={() => setChangePw(!changePw)}>
        🔑 Change Password
      </button>
      {changePw && (
        <div style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:16, marginBottom:12, boxShadow:"var(--shadow-sm)" }}>
          {pwMsg && <div className={`alert ${pwMsg.startsWith("✅")?"alert-success":"alert-warning"}`}>{pwMsg}</div>}
          {[["Current Password",oldPw,setOldPw],["New Password",newPw,setNewPw],["Confirm New Password",confirmPw,setConfirmPw]].map(([label,val,setter]) => (
            <div key={label} className="form-group"><div className="form-label">{label}</div><input type="password" className="form-input" value={val} onChange={e => setter(e.target.value)} /></div>
          ))}
          <button className="btn-block" onClick={handleChangePw}>Update Password</button>
        </div>
      )}

      {/* Logout */}
      <button onClick={onLogout} style={{ width:"100%", background:"none", border:"1.5px solid var(--red)", color:"var(--red)", borderRadius:"var(--radius-sm)", padding:"12px", fontSize:14, fontWeight:700, fontFamily:"Nunito,sans-serif", cursor:"pointer", marginTop:4, marginBottom:24 }}>
        🚪 Sign Out
      </button>
    </div>
  );
}


// ============================================================
// TEACHER APP
// ============================================================
function TeacherApp({ user, onLogout }) {
  const [tab, setTab] = useState("home");
  const [grades, setGrades] = useState(MOCK_GRADES);
  const [students] = useState(MOCK_USERS.filter(u => u.role === "student" && !u.archived));
  const [subjects] = useState(MOCK_SUBJECTS);
  const [schedule] = useState(MOCK_SCHEDULE);
  const [sections] = useState(MOCK_SECTIONS);
  const [users, setUsers] = useState(MOCK_USERS);

  const myScheduleEntries = schedule.filter(s => s.teacherId === user.id);
  const mySubjectIds = [...new Set(myScheduleEntries.map(s => s.subjectId))];
  const mySubjects = subjects.filter(s => mySubjectIds.includes(s.id));
  const mySectionIds = [...new Set(myScheduleEntries.map(s => s.section))];
  const mySections = sections.filter(s => mySectionIds.includes(s.id));
  const myStudents = students.filter(s => mySectionIds.includes(s.section));

  const navItems = [
    { id: "home", label: "Home", icon: <Icon.Home /> },
    { id: "students", label: "Students", icon: <Icon.Users /> },
    { id: "grades", label: "Grades", icon: <Icon.Grade /> },
    { id: "schedule", label: "Schedule", icon: <Icon.Calendar /> },
    { id: "profile", label: "Profile", icon: <Icon.User /> },
  ];

  return (
    <AppShell user={user} navItems={navItems} activeTab={tab} setTab={setTab} onLogout={onLogout} title="Teacher Portal">
      {tab === "home" && <TeacherHome user={user} mySubjects={mySubjects} myStudents={myStudents} mySections={mySections} myScheduleEntries={myScheduleEntries} grades={grades} setTab={setTab} />}
      {tab === "students" && <TeacherStudents myStudents={myStudents} mySubjects={mySubjects} subjects={subjects} mySections={mySections} schedule={myScheduleEntries} teacherId={user.id} sections={sections} />}
      {tab === "grades" && <TeacherGrades myStudents={myStudents} mySubjects={mySubjects} subjects={subjects} grades={grades} setGrades={setGrades} schedule={schedule} teacherId={user.id} sections={sections} />}
      {tab === "schedule" && <TeacherSchedule teacherId={user.id} schedule={schedule} subjects={subjects} sections={sections} />}
      {tab === "profile" && <StaffProfile user={user} users={users} setUsers={setUsers} onLogout={onLogout} role="teacher" />}
    </AppShell>
  );
}

function TeacherHome({ user, mySubjects, myStudents, mySections, myScheduleEntries, grades, setTab }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(160deg,var(--navy) 0%,var(--teal-dark) 60%,var(--teal) 100%)", padding:"28px 20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:700, marginBottom:6, letterSpacing:1 }}>FACULTY PORTAL · CDL SHS</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"2.5px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"white", flexShrink:0 }}>{getInitials(user.name)}</div>
          <div>
            <div style={{ color:"white", fontWeight:900, fontSize:17 }}>{user.name}</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, marginTop:3 }}>Faculty Member · SY 2024–2025</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[{l:"Subjects", v:mySubjects.length, t:"grades"},{l:"Sections", v:mySections.length, t:"students"},{l:"Students", v:myStudents.length, t:"students"}].map(({l,v,t}) => (
            <div key={l} onClick={() => setTab(t)} style={{ flex:1, background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 6px", textAlign:"center", cursor:"pointer" }}>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", fontWeight:700, marginBottom:2 }}>{l}</div>
              <div style={{ fontSize:22, fontWeight:900, color:"white" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-content">
        <div className="section-header"><div className="section-title">My Sections</div></div>
        {mySections.map(sec => {
          const secStudents = myStudents.filter(s => s.section === sec.id);
          const secSchedule = myScheduleEntries.filter(s => s.section === sec.id);
          const secSubjectIds = [...new Set(secSchedule.map(s => s.subjectId))];
          return (
            <div key={sec.id} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:"14px 16px", marginBottom:10, boxShadow:"var(--shadow-sm)", borderLeft:"4px solid var(--teal)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div>
                  <div style={{ fontWeight:900, fontSize:14, color:"var(--gray-800)" }}>{sec.name}</div>
                  <div style={{ fontSize:11, color:"var(--gray-400)", fontWeight:600 }}>Grade {sec.gradeLevel} · {sec.strand}</div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <span className="pill pill-blue">{secStudents.length} students</span>
                  <span className="pill pill-green">{secSubjectIds.length} subjects</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {secSchedule.slice(0,3).map(sch => {
                  const subName = mySubjects.find(s => s.id === sch.subjectId)?.name || sch.subjectId;
                  return <span key={sch.id} style={{ background:"var(--teal-pale)", color:"var(--teal)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{subName.split(" ").slice(0,3).join(" ")}</span>;
                })}
                {secSchedule.length > 3 && <span style={{ background:"var(--gray-100)", color:"var(--gray-500)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700 }}>+{secSchedule.length-3} more</span>}
              </div>
            </div>
          );
        })}

        <div className="section-header"><div className="section-title">My Subjects</div></div>
        {mySubjects.map(s => (
          <div key={s.id} className="list-card">
            <div className="list-card-icon" style={{ background:"var(--teal-pale)", color:"var(--teal)" }}><Icon.Book /></div>
            <div className="list-card-info">
              <h4>{s.name}</h4>
              <p>Grade {s.gradeLevel} · {s.strand} · Sem {SUBJECT_SEM[s.id]||"?"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherStudents({ myStudents, mySubjects, subjects, mySections, schedule, teacherId, sections }) {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [strandFilter, setStrandFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const strands = ["all", ...new Set(myStudents.map(s => s.strand))];
  const sectionIds = [...new Set(schedule.map(s => s.section))];

  // Students eligible per subject = those in sections where teacher teaches that subject
  const studentsForSubject = (subjectId) => {
    const secs = schedule.filter(s => s.subjectId === subjectId && s.teacherId === teacherId).map(s => s.section);
    return myStudents.filter(s => secs.includes(s.section));
  };

  let filtered = myStudents;
  if (gradeFilter !== "all") filtered = filtered.filter(s => s.gradeLevel === parseInt(gradeFilter));
  if (sectionFilter !== "all") filtered = filtered.filter(s => s.section === sectionFilter);
  if (strandFilter !== "all") filtered = filtered.filter(s => s.strand === strandFilter);
  if (subjectFilter !== "all") {
    const eligible = studentsForSubject(subjectFilter).map(s => s.id);
    filtered = filtered.filter(s => eligible.includes(s.id));
  }

  const ChipRow = ({ label, options, active, setActive, labelFn }) => (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:10, fontWeight:800, color:"var(--gray-400)", marginBottom:5, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</div>
      <div className="filter-bar" style={{ marginBottom:0 }}>
        {options.map(o => (
          <button key={o.val} className={`filter-chip${active===o.val?" active":""}`} onClick={() => setActive(o.val)}>{o.label}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="section-header">
        <div className="section-title">My Students</div>
        <span className="pill pill-blue">{filtered.length} shown</span>
      </div>

      <ChipRow label="Grade Level" active={gradeFilter} setActive={setGradeFilter}
        options={[{val:"all",label:"All"},{val:"11",label:"Grade 11"},{val:"12",label:"Grade 12"}]} />
      <ChipRow label="Section" active={sectionFilter} setActive={setSectionFilter}
        options={[{val:"all",label:"All"}, ...mySections.map(s => ({val:s.id, label:s.name}))]} />
      <ChipRow label="Strand" active={strandFilter} setActive={setStrandFilter}
        options={[{val:"all",label:"All"}, ...strands.filter(s=>s!=="all").map(s=>({val:s,label:s}))]} />
      <ChipRow label="By Subject" active={subjectFilter} setActive={setSubjectFilter}
        options={[{val:"all",label:"All"}, ...mySubjects.map(s=>({val:s.id,label:s.name}))]} />

      {filtered.length === 0
        ? <div className="empty-state"><Icon.Users /><h3>No students match</h3><p>Try adjusting the filters above</p></div>
        : filtered.map(s => {
          const sec = sections.find(sec => sec.id === s.section);
          return (
            <div key={s.id} className="list-card">
              <div className="list-card-icon" style={{ background:"#dbeafe", color:"#1d4ed8", fontWeight:900, fontSize:15 }}>{getInitials(s.name)}</div>
              <div className="list-card-info">
                <h4>{s.name}</h4>
                <p>LRN: {s.lrn} · Gr.{s.gradeLevel} · {sec?.name||s.section}</p>
                <p style={{marginTop:2}}>{s.strand}</p>
              </div>
              <span className={`pill ${s.enrolled?"pill-green":"pill-yellow"}`}>{s.enrolled?"Enrolled":"Not Enrolled"}</span>
            </div>
          );
        })
      }
    </div>
  );
}

function TeacherGrades({ myStudents, mySubjects, subjects, grades, setGrades, schedule, teacherId, sections }) {
  const [semFilter, setSemFilter] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [strandFilter, setStrandFilter] = useState("all");
  const [showFailed, setShowFailed] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [form, setForm] = useState({ q1: "", q2: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const semSubjects = mySubjects.filter(s => (SUBJECT_SEM[s.id] || 1) === semFilter);
  const activeSubject = selectedSubject && (SUBJECT_SEM[selectedSubject]||1) === semFilter ? selectedSubject : (semSubjects[0]?.id || null);
  const sub = mySubjects.find(s => s.id === activeSubject);

  const mySections = schedule.filter(s => s.subjectId === activeSubject && s.teacherId === teacherId).map(s => s.section);
  let eligibleStudents = myStudents.filter(s => mySections.includes(s.section));
  if (gradeFilter !== "all") eligibleStudents = eligibleStudents.filter(s => s.gradeLevel === parseInt(gradeFilter));
  if (sectionFilter !== "all") eligibleStudents = eligibleStudents.filter(s => s.section === sectionFilter);
  if (strandFilter !== "all") eligibleStudents = eligibleStudents.filter(s => s.strand === strandFilter);

  const displayStudents = showFailed
    ? eligibleStudents.filter(s => {
        const g = grades.find(gr => gr.studentId === s.id && gr.subjectId === activeSubject && gr.status === "approved");
        return g && !isPassing(computeFinalGrade(g));
      })
    : eligibleStudents;

  const mySectionObjs = [...new Set(mySections)].map(sid => sections.find(s => s.id === sid)).filter(Boolean);
  const strands = [...new Set(eligibleStudents.map(s => s.strand))];

  const openEdit = (studentId) => {
    const existing = grades.find(g => g.studentId === studentId && g.subjectId === activeSubject);
    setForm(existing ? { q1: existing.q1, q2: existing.q2 } : { q1: "", q2: "" });
    setEditingGrade({ studentId, existing });
  };

  const handleSave = () => {
    if (!form.q1 || !form.q2) return;
    const newGrade = { id: editingGrade.existing?.id || "g" + Date.now(), studentId: editingGrade.studentId, subjectId: activeSubject, sem: SUBJECT_SEM[activeSubject] || 1, q1: +form.q1, q2: +form.q2, status: "pending" };
    setGrades(prev => editingGrade.existing ? prev.map(g => g.id === newGrade.id ? newGrade : g) : [...prev, newGrade]);
    setEditingGrade(null);
  };

  const handleDelete = (gradeId) => {
    setGrades(prev => prev.filter(g => g.id !== gradeId));
    setConfirmDelete(null);
  };

  const failedCount = eligibleStudents.filter(s => {
    const g = grades.find(gr => gr.studentId === s.id && gr.subjectId === activeSubject && gr.status === "approved");
    return g && !isPassing(computeFinalGrade(g));
  }).length;

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">Manage Grades</div></div>

      {/* Semester tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:12, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
        {[1,2].map(s=>(
          <button key={s} onClick={()=>{ setSemFilter(s); setSelectedSubject(null); }} style={{ flex:1, padding:"8px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:13, cursor:"pointer", transition:"all 0.15s",
            background:semFilter===s?"var(--white)":"transparent", color:semFilter===s?"var(--teal)":"var(--gray-500)", boxShadow:semFilter===s?"var(--shadow-sm)":"none" }}>
            {s===1?"1st Semester":"2nd Semester"}
          </button>
        ))}
      </div>

      {/* Subject selector */}
      <div className="filter-bar">
        {semSubjects.map(s => <button key={s.id} className={`filter-chip${activeSubject===s.id?" active":""}`} onClick={()=>setSelectedSubject(s.id)}>{s.name}</button>)}
      </div>

      {/* Filters */}
      <div style={{ background:"var(--white)", borderRadius:"var(--radius-sm)", padding:"10px 12px", marginBottom:12, boxShadow:"var(--shadow-sm)" }}>
        <div style={{ fontSize:10, fontWeight:800, color:"var(--gray-400)", marginBottom:8, textTransform:"uppercase" }}>Filter Students</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <select className="form-select" style={{ flex:1, minWidth:90, fontSize:11, padding:"6px 8px" }} value={gradeFilter} onChange={e=>setGradeFilter(e.target.value)}>
            <option value="all">All Grades</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <select className="form-select" style={{ flex:1, minWidth:90, fontSize:11, padding:"6px 8px" }} value={sectionFilter} onChange={e=>setSectionFilter(e.target.value)}>
            <option value="all">All Sections</option>
            {mySectionObjs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="form-select" style={{ flex:1, minWidth:90, fontSize:11, padding:"6px 8px" }} value={strandFilter} onChange={e=>setStrandFilter(e.target.value)}>
            <option value="all">All Strands</option>
            {strands.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {failedCount > 0 && (
          <button onClick={()=>setShowFailed(!showFailed)} style={{ marginTop:8, width:"100%", background:showFailed?"#fee2e2":"var(--gray-100)", color:showFailed?"#991b1b":"var(--gray-600)", border:"none", borderRadius:8, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Nunito,sans-serif" }}>
            {showFailed ? "Show All Students" : `⚠️ Show Failed Only (${failedCount})`}
          </button>
        )}
      </div>

      {displayStudents.length === 0
        ? <div className="empty-state"><Icon.Users /><h3>No students</h3><p>No students match filters for this subject</p></div>
        : (
        <div style={{ background:"var(--white)", borderRadius:"var(--radius)", boxShadow:"var(--shadow-sm)", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(135deg,var(--navy),var(--teal-dark))", color:"white", padding:"10px 14px", display:"grid", gridTemplateColumns:"1fr 60px 60px 60px 64px", gap:4 }}>
            {["Student","Midterm","Finals","Final","Action"].map(h => <div key={h} style={{ fontSize:10, fontWeight:700, textAlign:h==="Student"?"left":"center" }}>{h}</div>)}
          </div>
          {displayStudents.map(s => {
            const g = grades.find(gr => gr.studentId === s.id && gr.subjectId === activeSubject);
            const final = g ? computeFinalGrade(g) : null;
            const sec = sections.find(sec2 => sec2.id === s.section);
            const isPend = g?.status === "pending";
            const rowFail = final !== null && !isPassing(final) && !isPend;
            return (
              <div key={s.id} style={{ display:"grid", gridTemplateColumns:"1fr 60px 60px 60px 64px", gap:4, padding:"10px 14px", borderBottom:"1px solid var(--gray-100)", background:rowFail?"#fff7ed":isPend?"#fffbeb":"var(--white)", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color:rowFail?"#c2410c":"var(--gray-800)" }}>{s.name.split(",")[0]}</div>
                  <div style={{ fontSize:10, color:"var(--gray-400)", fontWeight:600 }}>{sec?.name}</div>
                  {isPend && <span style={{ fontSize:9, color:"#d97706", fontWeight:800 }}>PENDING APPROVAL</span>}
                  {rowFail && <span style={{ fontSize:9, color:"#dc2626", fontWeight:800 }}>☀️ FAILED</span>}
                </div>
                <div style={{ textAlign:"center", fontSize:12, fontWeight:700 }}>{g?.q1 ?? "—"}</div>
                <div style={{ textAlign:"center", fontSize:12, fontWeight:700 }}>{g?.q2 ?? "—"}</div>
                <div style={{ textAlign:"center" }}>
                  {final !== null ? <span style={{ fontSize:13, fontWeight:900, color:!isPassing(final)?"var(--red)":isPend?"#d97706":"var(--teal)" }}>{final}</span> : <span style={{ color:"var(--gray-400)" }}>—</span>}
                </div>
                <div style={{ display:"flex", gap:3, justifyContent:"center" }}>
                  <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--teal)", padding:3 }} onClick={() => openEdit(s.id)} title="Edit"><Icon.Edit /></button>
                  {g && isPend && (
                    <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--red)", padding:3 }} onClick={() => setConfirmDelete(g)} title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit/Add Modal */}
      {editingGrade && (
        <div className="modal-overlay" onClick={() => setEditingGrade(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">{editingGrade.existing ? "Edit" : "Add"} Grade</div>
            <div style={{ background:"var(--teal-pale)", borderRadius:"var(--radius-sm)", padding:"8px 12px", marginBottom:12, fontSize:12, color:"var(--teal-dark)", fontWeight:700 }}>
              {semFilter===1?"1st":"2nd"} Semester · {sub?.name}
            </div>
            <div className="alert alert-warning">⚠️ Grades are <strong>pending</strong> until approved by admin. Students cannot see pending grades.</div>
            <div className="form-row">
              {[["q1","Midterm"],["q2","Finals"]].map(([q,label]) => (
                <div key={q} className="form-group">
                  <div className="form-label">{label}</div>
                  <input type="number" className="form-input" min="0" max="100" value={form[q]} onChange={e => setForm(p => ({ ...p, [q]: e.target.value }))} />
                </div>
              ))}
            </div>
            {form.q1 && form.q2 && (
              <div style={{ textAlign:"center", padding:"8px", background:"var(--gray-100)", borderRadius:"var(--radius-sm)", marginBottom:8, fontSize:13, fontWeight:800, color:"var(--gray-700)" }}>
                Preview Final: <span style={{ color:isPassing(Math.round((+form.q1+ +form.q2)/2))?"var(--teal)":"var(--red)" }}>{Math.round((+form.q1+ +form.q2)/2)}</span>
              </div>
            )}
            <button className="btn-block" onClick={handleSave}>Submit for Approval</button>
            <button className="btn-block-outline" onClick={() => setEditingGrade(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Delete Grade?</div>
            <div className="alert alert-warning">This will remove the pending grade submission. This action cannot be undone.</div>
            <button className="btn-block" style={{ background:"var(--red)" }} onClick={() => handleDelete(confirmDelete.id)}>Yes, Delete Grade</button>
            <button className="btn-block-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TeacherSchedule({ teacherId, schedule, subjects, sections }) {
  const [viewMode, setViewMode] = useState("list"); // "list" | "matrix"
  const mySchedule = schedule.filter(s => s.teacherId === teacherId);

  const toMin = t => {
    const clean = t.replace(/\s/g,"");
    const isPM = clean.includes("PM"), isAM = clean.includes("AM");
    const [h,m] = clean.replace(/AM|PM/,"").split(":").map(Number);
    return ((isPM && h!==12)?h+12:(isAM&&h===12?0:h))*60+(m||0);
  };

  // Unique time slots across teacher's schedule
  const timeSlots = [...new Map(
    mySchedule.map(e => [`${e.startTime}|${e.endTime}`, {start:e.startTime, end:e.endTime}])
  ).values()].sort((a,b) => toMin(a.start)-toMin(b.start));

  // Matrix cell lookup: day+timeSlot -> entry
  const matrixCell = (day, slot) => mySchedule.filter(e =>
    e.day === day && e.startTime === slot.start && e.endTime === slot.end
  );

  return (
    <div className="page-content">
      <div className="section-header">
        <div className="section-title">My Schedule</div>
        <div style={{ display:"flex", gap:0, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
          {[["list","📋 List"],["matrix","⊞ Matrix"]].map(([m,l]) => (
            <button key={m} onClick={()=>setViewMode(m)} style={{ padding:"6px 14px", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:12, cursor:"pointer",
              background:viewMode===m?"var(--white)":"transparent", color:viewMode===m?"var(--teal)":"var(--gray-500)", boxShadow:viewMode===m?"var(--shadow-sm)":"none" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {mySchedule.length === 0 && <div className="empty-state"><Icon.Calendar /><h3>No classes assigned yet</h3><p>Contact admin to be assigned to a section</p></div>}

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && mySchedule.length > 0 && (
        DAYS.map(day => {
          const items = [...mySchedule.filter(s => s.day === day)].sort((a,b) => toMin(a.startTime)-toMin(b.startTime));
          if (!items.length) return null;
          return (
            <div key={day} className="schedule-day">
              <div className="schedule-day-header">📅 {day}</div>
              {items.map(item => {
                const sub = subjects.find(s => s.id === item.subjectId);
                const sec = sections?.find(s => s.id === item.section);
                return (
                  <div key={item.id} className="schedule-item">
                    <div className="schedule-time">{item.startTime}<br/>{item.endTime}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, fontSize:13, color:"var(--gray-800)" }}>{sub?.name || item.subjectId}</div>
                      <div style={{ fontSize:11, color:"var(--gray-400)", fontWeight:600, marginTop:2 }}>{item.room} · {sec?.name || item.section}</div>
                    </div>
                    <span className="pill pill-blue" style={{fontSize:10}}>{sec?.strand||""}</span>
                  </div>
                );
              })}
            </div>
          );
        })
      )}

      {/* ── MATRIX VIEW ── */}
      {viewMode === "matrix" && mySchedule.length > 0 && (
        <div className="sched-matrix">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                {DAYS.map(d => <th key={d}>{d.slice(0,3)}</th>)}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot.start}>
                  <td>{slot.start}<br/><span style={{fontSize:9,opacity:0.7}}>{slot.end}</span></td>
                  {DAYS.map(day => {
                    const entries = matrixCell(day, slot);
                    return (
                      <td key={day}>
                        {entries.map(e => {
                          const sub = subjects.find(s => s.id === e.subjectId);
                          const sec = sections?.find(s => s.id === e.section);
                          return (
                            <div key={e.id} className="sched-cell">
                              <div className="sched-cell-sub">{sub?.name?.split(" ").slice(0,3).join(" ") || e.subjectId}</div>
                              <div className="sched-cell-meta">{sec?.name || e.section} · {e.room}</div>
                            </div>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


// ============================================================
// ADMIN APP
// ============================================================
function AdminApp({ user, onLogout }) {
  const [tab, setTab] = useState("home");
  const [users, setUsers] = useState(MOCK_USERS);
  const [grades, setGrades] = useState(MOCK_GRADES);
  const [enrollments, setEnrollments] = useState(MOCK_ENROLLMENTS);
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [sections, setSections] = useState(MOCK_SECTIONS);
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);

  const navItems = [
    { id: "home", label: "Home", icon: <Icon.Home /> },
    { id: "students", label: "Students", icon: <Icon.Users /> },
    { id: "grades", label: "Grades", icon: <Icon.Grade /> },
    { id: "manage", label: "Manage", icon: <Icon.Settings /> },
    { id: "enroll", label: "Enroll", icon: <Icon.Clipboard /> },
    { id: "profile", label: "Profile", icon: <Icon.User /> },
  ];

  const allStudents = users.filter(u => u.role === "student");
  const allTeachers = users.filter(u => u.role === "teacher");

  return (
    <AppShell user={user} navItems={navItems} activeTab={tab} setTab={setTab} onLogout={onLogout} title="Admin Portal">
      {tab === "home" && <AdminHome user={user} grades={grades} enrollments={enrollments} students={allStudents} teachers={allTeachers} setTab={setTab} sections={sections} />}
      {tab === "students" && <AdminStudents users={users} setUsers={setUsers} sections={sections} subjects={subjects} grades={grades} schedule={schedule} />}
      {tab === "grades" && <AdminGrades grades={grades} setGrades={setGrades} users={users} subjects={subjects} sections={sections} />}
      {tab === "manage" && <AdminManage users={users} setUsers={setUsers} subjects={subjects} setSubjects={setSubjects} sections={sections} setSections={setSections} schedule={schedule} setSchedule={setSchedule} />}
      {tab === "enroll" && <AdminEnrollments enrollments={enrollments} setEnrollments={setEnrollments} users={users} setUsers={setUsers} />}
      {tab === "profile" && <StaffProfile user={user} users={users} setUsers={setUsers} onLogout={onLogout} role="admin" />}
    </AppShell>
  );
}

function AdminHome({ user, grades, enrollments, students, teachers, setTab, sections }) {
  const pending = grades.filter(g => g.status === "pending");
  const pendingEnroll = enrollments.filter(e => e.status === "pending");
  const enrolledCount = students.filter(s => s.enrolled).length;
  const activeStudents = students.filter(s => !s.archived);
  const today = new Date().toLocaleDateString("en-PH", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  const [statsView, setStatsView] = useState("grade");

  const byGrade = [11,12].map(gl => ({ label:`Grade ${gl}`, count: activeStudents.filter(s=>s.gradeLevel===gl).length }));
  const byStrand = [...new Set(activeStudents.map(s=>s.strand))].sort().map(st => ({ label:st, count:activeStudents.filter(s=>s.strand===st).length }));
  const bySection = sections.map(sec => ({ label:sec.name, count:activeStudents.filter(s=>s.section===sec.id).length })).filter(s=>s.count>0);

  const statsData = statsView==="grade" ? byGrade : statsView==="strand" ? byStrand : bySection;

  return (
    <div>
      <div style={{ background:"linear-gradient(160deg,var(--navy) 0%,var(--teal-dark) 55%,var(--teal) 100%)", padding:"28px 20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ position:"absolute", bottom:-40, left:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", fontWeight:700, marginBottom:6, letterSpacing:1 }}>ADMINISTRATOR · CDL SHS</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.18)", border:"2.5px solid rgba(255,255,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"white", flexShrink:0 }}>{getInitials(user.name)}</div>
          <div>
            <div style={{ color:"white", fontWeight:900, fontSize:17 }}>{user.name}</div>
            <div style={{ color:"rgba(255,255,255,0.65)", fontSize:11, fontWeight:600, marginTop:3 }}>School Administrator</div>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10, fontWeight:600, marginTop:2 }}>{today}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[{l:"Students", v:activeStudents.length},{l:"Enrolled", v:enrolledCount},{l:"Teachers", v:teachers.length},{l:"Pending", v:pending.length+pendingEnroll.length}].map(({l,v}) => (
            <div key={l} style={{ flex:1, background:"rgba(255,255,255,0.11)", borderRadius:10, padding:"8px 4px", textAlign:"center" }}>
              <div style={{ fontSize:8, color:"rgba(255,255,255,0.55)", fontWeight:700, marginBottom:2 }}>{l}</div>
              <div style={{ fontSize:18, fontWeight:900, color: l==="Pending"&&v>0?"#fca5a5":"white" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-content">
        {(pending.length > 0 || pendingEnroll.length > 0) && (
          <div style={{ background:"#fff7ed", border:"1.5px solid #f97316", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:14 }}>
            <div style={{ fontWeight:800, fontSize:13, color:"#c2410c", marginBottom:6 }}>⚠️ Action Required</div>
            {pending.length > 0 && <div onClick={() => setTab("grades")} style={{ fontSize:12, color:"#9a3412", fontWeight:600, cursor:"pointer", marginBottom:2 }}>📝 {pending.length} grade submission(s) pending approval →</div>}
            {pendingEnroll.length > 0 && <div onClick={() => setTab("enroll")} style={{ fontSize:12, color:"#9a3412", fontWeight:600, cursor:"pointer" }}>📋 {pendingEnroll.length} enrollment request(s) pending review →</div>}
          </div>
        )}

        <div className="section-header"><div className="section-title">Quick Actions</div></div>
        <div className="dashboard-grid">
          <div className="dash-card" onClick={() => setTab("students")}>
            <div className="dash-card-icon" style={{color:"#2563eb"}}><Icon.Users /></div>
            <div className="badge">{activeStudents.length}</div>
            <h3>Students</h3>
          </div>
          <div className="dash-card" onClick={() => setTab("manage")}>
            <div className="dash-card-icon" style={{color:"#059669"}}><Icon.User /></div>
            <div className="badge">{teachers.length}</div>
            <h3>Teachers</h3>
          </div>
          <div className="dash-card" onClick={() => setTab("grades")}>
            <div className="dash-card-icon" style={{color:"#d97706"}}><Icon.Grade /></div>
            <div className="badge" style={{color:pending.length>0?"var(--red)":"inherit"}}>{pending.length}</div>
            <h3>Grades</h3>
            <p>Pending approvals</p>
          </div>
          <div className="dash-card" onClick={() => setTab("enroll")}>
            <div className="dash-card-icon" style={{color:"var(--teal)"}}><Icon.Clipboard /></div>
            <div className="badge" style={{color:pendingEnroll.length>0?"#f97316":"inherit"}}>{pendingEnroll.length}</div>
            <h3>Enrollment</h3>
            <p>Pending reviews</p>
          </div>
        </div>

        {/* Student Distribution Stats */}
        <div className="section-header"><div className="section-title">Student Distribution</div></div>
        <div style={{ display:"flex", gap:0, marginBottom:12, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
          {[["grade","By Grade"],["strand","By Strand"],["section","By Section"]].map(([v,l]) => (
            <button key={v} onClick={()=>setStatsView(v)} style={{ flex:1, padding:"7px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:12, cursor:"pointer",
              background:statsView===v?"var(--white)":"transparent", color:statsView===v?"var(--teal)":"var(--gray-500)", boxShadow:statsView===v?"var(--shadow-sm)":"none" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ background:"var(--white)", borderRadius:"var(--radius)", boxShadow:"var(--shadow-sm)", overflow:"hidden" }}>
          {statsData.map(({label,count},i,arr) => {
            const pct = activeStudents.length ? Math.round(count/activeStudents.length*100) : 0;
            return (
              <div key={label} style={{ padding:"12px 16px", borderBottom:i<arr.length-1?"1px solid var(--gray-100)":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"var(--gray-700)", flex:1, marginRight:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</div>
                  <div style={{ fontSize:13, fontWeight:900, color:"var(--gray-800)", flexShrink:0 }}>{count} <span style={{ fontSize:10, color:"var(--gray-400)", fontWeight:600 }}>({pct}%)</span></div>
                </div>
                <div style={{ height:6, background:"var(--gray-100)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--teal),var(--teal-light))", borderRadius:3, transition:"width 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdminStudents({ users, setUsers, sections, subjects, grades, schedule }) {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [strandFilter, setStrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});
  const [detailStudent, setDetailStudent] = useState(null);
  const [detailSection, setDetailSection] = useState("personal");
  const [archiveConfirm, setArchiveConfirm] = useState(null);

  const allStudents = users.filter(u => u.role === "student");
  const strands = ["all", ...new Set(allStudents.map(s => s.strand))];

  let filtered = allStudents;
  if (statusFilter === "active") filtered = filtered.filter(s => !s.archived);
  else if (statusFilter === "archived") filtered = filtered.filter(s => s.archived);
  if (gradeFilter !== "all") filtered = filtered.filter(s => s.gradeLevel === parseInt(gradeFilter));
  if (sectionFilter !== "all") filtered = filtered.filter(s => s.section === sectionFilter);
  if (strandFilter !== "all") filtered = filtered.filter(s => s.strand === strandFilter);

  const openEdit = (student) => { setEditingUser(student); setForm({ ...student }); };
  const handleSave = () => {
    if (editingUser.id) setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...form, gradeLevel: +form.gradeLevel } : u));
    else setUsers(prev => [...prev, { ...form, id: "stu" + Date.now(), role: "student", gradeLevel: +form.gradeLevel, enrolled: false, archived: false }]);
    setEditingUser(null);
  };
  const openAdd = () => {
    setEditingUser({ id: null });
    setForm({ name:"", lrn:"", strand:"STEM", gradeLevel:11, section:sections[0]?.id||"", enrolled:false, role:"student", username:"", password:"",
      email:"", contact:"", lastName:"", firstName:"", middleName:"", maidenName:"", dob:"", pob:"", sex:"Male", civil:"Single", religion:"Roman Catholic", citizenship:"Filipino",
      region:"", province:"", city:"", barangay:"", zip:"", houseNo:"", street:"",
      fatherName:"", fatherOccupation:"", fatherContact:"",
      motherName:"", motherOccupation:"", motherContact:"",
      guardianName:"", guardianRelationship:"", guardianAddress:"", guardianContact:""
    });
  };
  const handleArchive = (studentId, archive) => {
    setUsers(prev => prev.map(u => u.id === studentId ? { ...u, archived: archive } : u));
    setArchiveConfirm(null);
    setDetailStudent(null);
  };

  const InfoField = ({ label, value }) => (
    <div className="info-row"><label>{label}</label><span>{value||<span style={{color:"var(--gray-300)"}}>—</span>}</span></div>
  );
  const FF = ({ label, k, type="text", children }) => (
    <div className="form-group">
      <div className="form-label">{label}</div>
      {children || <input type={type} className="form-input" value={form[k]||""} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} />}
    </div>
  );

  const ChipRow = ({ label, options, active, setActive }) => (
    <div style={{ marginBottom:8 }}>
      <div style={{ fontSize:10, fontWeight:800, color:"var(--gray-400)", marginBottom:4, textTransform:"uppercase" }}>{label}</div>
      <div className="filter-bar" style={{ marginBottom:0 }}>
        {options.map(o => <button key={o.val} className={`filter-chip${active===o.val?" active":""}`} onClick={() => setActive(o.val)}>{o.label}</button>)}
      </div>
    </div>
  );

  const DETAIL_SECS = ["personal","address","family","school"];

  return (
    <div className="page-content">
      <div className="section-header">
        <div className="section-title">Students</div>
        <div style={{ display:"flex", gap:6 }}>
          <span className="pill pill-blue">{filtered.length}</span>
          <button className="btn-small" onClick={openAdd}>+ Add</button>
        </div>
      </div>

      <ChipRow label="Status" active={statusFilter} setActive={setStatusFilter}
        options={[{val:"active",label:"Active"},{val:"archived",label:"Archived"},{val:"all",label:"All"}]} />
      <ChipRow label="Grade" active={gradeFilter} setActive={setGradeFilter}
        options={[{val:"all",label:"All"},{val:"11",label:"Grade 11"},{val:"12",label:"Grade 12"}]} />
      <ChipRow label="Section" active={sectionFilter} setActive={setSectionFilter}
        options={[{val:"all",label:"All"}, ...sections.map(s=>({val:s.id,label:s.name}))]} />
      <ChipRow label="Strand" active={strandFilter} setActive={setStrandFilter}
        options={[{val:"all",label:"All"}, ...strands.filter(s=>s!=="all").map(s=>({val:s,label:s}))]} />

      {filtered.length === 0
        ? <div className="empty-state"><Icon.Users /><h3>No students found</h3><p>Try adjusting the filters</p></div>
        : filtered.map(s => (
        <div key={s.id} className="list-card" style={s.archived?{opacity:0.6,background:"var(--gray-100)"}:{}}>
          <div className="list-card-icon" style={{ background:s.archived?"var(--gray-200)":"#dbeafe", color:s.archived?"var(--gray-400)":"#1d4ed8", fontWeight:900, fontSize:15 }}>{getInitials(s.name)}</div>
          <div className="list-card-info" onClick={() => { setDetailStudent(s); setDetailSection("personal"); }} style={{ cursor:"pointer" }}>
            <h4>{s.name}{s.archived && <span style={{ marginLeft:6, fontSize:10, color:"var(--gray-400)", fontWeight:600 }}>(Archived)</span>}</h4>
            <p>LRN: {s.lrn} · Gr.{s.gradeLevel} · {sections.find(sec=>sec.id===s.section)?.name||s.section}</p>
            <p style={{marginTop:2}}>{s.strand}</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end", flexShrink:0 }}>
            <span className={`pill ${s.enrolled?"pill-green":"pill-yellow"}`}>{s.enrolled?"Enrolled":"Not Enrolled"}</span>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--teal)", padding:2 }} onClick={() => openEdit(s)}><Icon.Edit /></button>
          </div>
        </div>
      ))}

      {/* DETAIL MODAL */}
      {detailStudent && (
        <div className="modal-overlay" onClick={() => setDetailStudent(null)}>
          <div className="modal-sheet" style={{ maxHeight:"92vh" }} onClick={e => e.stopPropagation()}>
            <div className="modal-handle"/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div className="modal-title" style={{ marginBottom:0 }}>{detailStudent.firstName||detailStudent.name.split(",")[0]}</div>
              <button onClick={() => openEdit(detailStudent)} style={{ background:"var(--teal)", color:"white", border:"none", borderRadius:20, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Nunito,sans-serif" }}>✏️ Edit</button>
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto" }}>
              {DETAIL_SECS.map(s => (
                <button key={s} onClick={() => setDetailSection(s)} style={{ flexShrink:0, borderRadius:20, padding:"5px 12px", fontSize:11, fontWeight:700, border:"1.5px solid", cursor:"pointer", fontFamily:"Nunito,sans-serif",
                  background:detailSection===s?"var(--teal)":"var(--white)", color:detailSection===s?"white":"var(--gray-500)", borderColor:detailSection===s?"var(--teal)":"var(--gray-200)" }}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            {detailSection === "personal" && <>
              <InfoField label="Last Name" value={detailStudent.lastName} />
              <InfoField label="First Name" value={detailStudent.firstName} />
              <InfoField label="Middle Name" value={detailStudent.middleName} />
              {detailStudent.sex==="Female" && <InfoField label="Maiden Name" value={detailStudent.maidenName} />}
              <InfoField label="Date of Birth" value={detailStudent.dob} />
              <InfoField label="Place of Birth" value={detailStudent.pob} />
              <InfoField label="Sex" value={detailStudent.sex} />
              <InfoField label="Civil Status" value={detailStudent.civil} />
              <InfoField label="Religion" value={detailStudent.religion} />
              <InfoField label="Citizenship" value={detailStudent.citizenship} />
              <InfoField label="Email" value={detailStudent.email} />
              <InfoField label="Contact No." value={detailStudent.contact} />
            </>}
            {detailSection === "address" && <>
              <InfoField label="Region" value={detailStudent.region} />
              <InfoField label="Province" value={detailStudent.province} />
              <InfoField label="City" value={detailStudent.city} />
              <InfoField label="Barangay" value={detailStudent.barangay} />
              <InfoField label="ZIP Code" value={detailStudent.zip} />
              <InfoField label="House No." value={detailStudent.houseNo} />
              <InfoField label="Street / Purok" value={detailStudent.street} />
            </>}
            {detailSection === "family" && <>
              <div style={{ fontWeight:800, fontSize:12, color:"var(--teal)", marginBottom:6 }}>FATHER</div>
              <InfoField label="Name" value={detailStudent.fatherName} />
              <InfoField label="Occupation" value={detailStudent.fatherOccupation} />
              <InfoField label="Contact" value={detailStudent.fatherContact} />
              <div style={{ fontWeight:800, fontSize:12, color:"var(--teal)", margin:"12px 0 6px" }}>MOTHER</div>
              <InfoField label="Name" value={detailStudent.motherName} />
              <InfoField label="Occupation" value={detailStudent.motherOccupation} />
              <InfoField label="Contact" value={detailStudent.motherContact} />
              <div style={{ fontWeight:800, fontSize:12, color:"var(--teal)", margin:"12px 0 6px" }}>GUARDIAN</div>
              <InfoField label="Name" value={detailStudent.guardianName} />
              <InfoField label="Relationship" value={detailStudent.guardianRelationship} />
              <InfoField label="Address" value={detailStudent.guardianAddress} />
              <InfoField label="Contact" value={detailStudent.guardianContact} />
            </>}
            {detailSection === "school" && <>
              <InfoField label="LRN" value={detailStudent.lrn} />
              <InfoField label="Grade Level" value={`Grade ${detailStudent.gradeLevel}`} />
              <InfoField label="Strand" value={detailStudent.strand} />
              <InfoField label="Section" value={sections.find(s=>s.id===detailStudent.section)?.name || detailStudent.section} />
              <InfoField label="Username" value={detailStudent.username} />
              <InfoField label="Enrolled" value={detailStudent.enrolled?"Yes":"No"} />
              <InfoField label="Status" value={detailStudent.archived?"Archived":"Active"} />
            </>}

            {/* Archive/Unarchive */}
            <div style={{ marginTop:16 }}>
              {detailStudent.archived
                ? <button onClick={() => handleArchive(detailStudent.id, false)} style={{ width:"100%", background:"var(--teal)", color:"white", border:"none", borderRadius:"var(--radius-sm)", padding:12, fontSize:13, fontWeight:700, fontFamily:"Nunito,sans-serif", cursor:"pointer", marginBottom:8 }}>
                    🔄 Restore Student
                  </button>
                : <button onClick={() => setArchiveConfirm(detailStudent)} style={{ width:"100%", background:"none", border:"1.5px solid #f97316", color:"#f97316", borderRadius:"var(--radius-sm)", padding:12, fontSize:13, fontWeight:700, fontFamily:"Nunito,sans-serif", cursor:"pointer", marginBottom:8 }}>
                    📦 Archive Student
                  </button>
              }
            </div>
            <button className="btn-block-outline" onClick={() => setDetailStudent(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Archive Confirm */}
      {archiveConfirm && (
        <div className="modal-overlay" onClick={() => setArchiveConfirm(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="modal-title">Archive Student?</div>
            <div className="alert alert-warning">Archiving <strong>{archiveConfirm.name}</strong> will hide them from active lists. You can restore them later.</div>
            <button className="btn-block" style={{ background:"#f97316" }} onClick={() => handleArchive(archiveConfirm.id, true)}>📦 Yes, Archive</button>
            <button className="btn-block-outline" onClick={() => setArchiveConfirm(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* EDIT/ADD MODAL */}
      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-sheet" style={{ maxHeight:"92vh" }} onClick={e => e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="modal-title">{editingUser.id?"Edit Student":"Add Student"}</div>

            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", marginBottom:8, textTransform:"uppercase" }}>School Info</div>
            <div className="form-row"><FF label="LRN" k="lrn" /><FF label="Username" k="username" /></div>
            <div className="form-row"><FF label="Password" k="password" type="password" /><div className="form-group"><div className="form-label">Grade Level</div><select className="form-select" value={form.gradeLevel} onChange={e => setForm(p=>({...p,gradeLevel:e.target.value}))}><option value={11}>Grade 11</option><option value={12}>Grade 12</option></select></div></div>
            <div className="form-group"><div className="form-label">Strand</div><select className="form-select" value={form.strand} onChange={e => setForm(p=>({...p,strand:e.target.value}))}>{["STEM","Business and Entrepreneurship","Arts Social Science and Humanities","ICT Programming","Hospitality and Food Services","Automotive and Small Engine","Welding","Electrical and Electronics","Garments Artisanry","Aesthetic and Caregiving"].map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="form-group"><div className="form-label">Section</div><select className="form-select" value={form.section} onChange={e => setForm(p=>({...p,section:e.target.value}))}>{sections.map(sec=><option key={sec.id} value={sec.id}>{sec.name}</option>)}</select></div>
            <div className="form-group"><div className="form-label">Enrollment Status</div><select className="form-select" value={form.enrolled?"yes":"no"} onChange={e => setForm(p=>({...p,enrolled:e.target.value==="yes"}))}><option value="yes">Enrolled</option><option value="no">Not Enrolled</option></select></div>

            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", margin:"12px 0 8px", textTransform:"uppercase" }}>Personal Info</div>
            <div className="form-row"><FF label="Last Name" k="lastName" /><FF label="First Name" k="firstName" /></div>
            <div className="form-row"><FF label="Middle Name" k="middleName" /><FF label="Maiden Name" k="maidenName" /></div>
            <div className="form-row"><FF label="Date of Birth" k="dob" type="date" /><div className="form-group"><div className="form-label">Sex</div><select className="form-select" value={form.sex||"Male"} onChange={e => setForm(p=>({...p,sex:e.target.value}))}><option>Male</option><option>Female</option></select></div></div>
            <div className="form-row"><FF label="Place of Birth" k="pob" /><div className="form-group"><div className="form-label">Civil Status</div><select className="form-select" value={form.civil||"Single"} onChange={e => setForm(p=>({...p,civil:e.target.value}))}><option>Single</option><option>Married</option><option>Widowed</option></select></div></div>
            <div className="form-row"><FF label="Religion" k="religion" /><FF label="Citizenship" k="citizenship" /></div>
            <div className="form-row"><FF label="Email" k="email" type="email" /><FF label="Contact No." k="contact" /></div>

            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", margin:"12px 0 8px", textTransform:"uppercase" }}>Address</div>
            <div className="form-row"><FF label="Region" k="region" /><FF label="Province" k="province" /></div>
            <div className="form-row"><FF label="City" k="city" /><FF label="Barangay" k="barangay" /></div>
            <div className="form-row"><FF label="ZIP Code" k="zip" /><FF label="House No." k="houseNo" /></div>
            <FF label="Street / Purok" k="street" />

            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", margin:"12px 0 8px", textTransform:"uppercase" }}>Father</div>
            <div className="form-row"><FF label="Name" k="fatherName" /><FF label="Occupation" k="fatherOccupation" /></div>
            <FF label="Contact No." k="fatherContact" />
            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", margin:"12px 0 8px", textTransform:"uppercase" }}>Mother</div>
            <div className="form-row"><FF label="Name" k="motherName" /><FF label="Occupation" k="motherOccupation" /></div>
            <FF label="Contact No." k="motherContact" />
            <div style={{ fontWeight:800, fontSize:11, color:"var(--teal)", margin:"12px 0 8px", textTransform:"uppercase" }}>Guardian</div>
            <div className="form-row"><FF label="Name" k="guardianName" /><FF label="Relationship" k="guardianRelationship" /></div>
            <FF label="Address" k="guardianAddress" />
            <FF label="Contact No." k="guardianContact" />

            <button className="btn-block" onClick={handleSave}>Save Student</button>
            <button className="btn-block-outline" onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminGrades({ grades, setGrades, users, subjects, sections }) {
  const [viewTab, setViewTab] = useState("pending");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [strandFilter, setStrandFilter] = useState("all");
  const [semFilter, setSemFilter] = useState("all");
  const [showFailed, setShowFailed] = useState(false);

  const approve = (id) => setGrades(prev => prev.map(g => g.id === id ? { ...g, status: "approved" } : g));
  const reject  = (id) => setGrades(prev => prev.filter(g => g.id !== id));

  const activeStudents = users.filter(u => u.role === "student" && !u.archived);

  const applyFilters = (list) => {
    let r = list;
    if (gradeFilter !== "all") r = r.filter(g => {
      const s = activeStudents.find(u => u.id === g.studentId);
      return s && s.gradeLevel === parseInt(gradeFilter);
    });
    if (sectionFilter !== "all") r = r.filter(g => {
      const s = activeStudents.find(u => u.id === g.studentId);
      return s && s.section === sectionFilter;
    });
    if (strandFilter !== "all") r = r.filter(g => {
      const s = activeStudents.find(u => u.id === g.studentId);
      return s && s.strand === strandFilter;
    });
    if (semFilter !== "all") r = r.filter(g => g.sem === parseInt(semFilter));
    if (showFailed) r = r.filter(g => !isPassing(computeFinalGrade(g)));
    return r;
  };

  const pending  = applyFilters(grades.filter(g => g.status === "pending"));
  const approved = applyFilters(grades.filter(g => g.status === "approved"));
  const displayed = viewTab === "pending" ? pending : approved;

  const strands = [...new Set(activeStudents.map(s => s.strand))];
  const failedApproved = grades.filter(g => g.status === "approved" && !isPassing(computeFinalGrade(g)));

  const ChipRow = ({ label, options, active, setActive }) => (
    <div style={{ marginBottom:8 }}>
      <div style={{ fontSize:10, fontWeight:800, color:"var(--gray-400)", marginBottom:4, textTransform:"uppercase" }}>{label}</div>
      <div className="filter-bar" style={{ marginBottom:0 }}>
        {options.map(o => <button key={o.val} className={`filter-chip${active===o.val?" active":""}`} onClick={() => setActive(o.val)}>{o.label}</button>)}
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">Grade Management</div></div>

      {/* View toggle */}
      <div style={{ display:"flex", gap:0, marginBottom:14, background:"var(--gray-200)", borderRadius:10, padding:3 }}>
        {[["pending",`Pending (${grades.filter(g=>g.status==="pending").length})`],["approved",`Approved (${grades.filter(g=>g.status==="approved").length})`]].map(([v,l]) => (
          <button key={v} onClick={()=>setViewTab(v)} style={{ flex:1, padding:"8px 0", border:"none", borderRadius:8, fontFamily:"Nunito,sans-serif", fontWeight:800, fontSize:13, cursor:"pointer",
            background:viewTab===v?"var(--white)":"transparent", color:viewTab===v?"var(--teal)":"var(--gray-500)", boxShadow:viewTab===v?"var(--shadow-sm)":"none" }}>
            {l}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background:"var(--white)", borderRadius:"var(--radius-sm)", padding:"12px 14px", marginBottom:14, boxShadow:"var(--shadow-sm)" }}>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--teal)", marginBottom:10, textTransform:"uppercase" }}>🔍 Filter Grades</div>
        <ChipRow label="Grade Level" active={gradeFilter} setActive={setGradeFilter}
          options={[{val:"all",label:"All"},{val:"11",label:"Grade 11"},{val:"12",label:"Grade 12"}]} />
        <ChipRow label="Semester" active={semFilter} setActive={setSemFilter}
          options={[{val:"all",label:"All"},{val:"1",label:"1st Sem"},{val:"2",label:"2nd Sem"}]} />
        <ChipRow label="Section" active={sectionFilter} setActive={setSectionFilter}
          options={[{val:"all",label:"All"}, ...sections.map(s=>({val:s.id,label:s.name}))]} />
        <ChipRow label="Strand" active={strandFilter} setActive={setStrandFilter}
          options={[{val:"all",label:"All"}, ...strands.map(s=>({val:s,label:s}))]} />

        {viewTab === "approved" && (
          <button onClick={()=>setShowFailed(!showFailed)}
            style={{ width:"100%", marginTop:6, background:showFailed?"#fee2e2":"var(--gray-100)", color:showFailed?"#991b1b":"var(--gray-600)", border:"none", borderRadius:8, padding:"7px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Nunito,sans-serif" }}>
            {showFailed ? "Show All" : `⚠️ Show Failed Only (${failedApproved.length})`}
          </button>
        )}
      </div>

      {/* Summary count */}
      <div style={{ fontSize:12, fontWeight:700, color:"var(--gray-500)", marginBottom:10 }}>
        Showing {displayed.length} grade record{displayed.length!==1?"s":""}
      </div>

      {/* Pending grades — need approval */}
      {viewTab === "pending" && (
        pending.length === 0
          ? <div className="alert alert-success">✅ No pending grade approvals matching filters!</div>
          : pending.map(g => {
            const student = activeStudents.find(u => u.id === g.studentId);
            const subject = subjects.find(s => s.id === g.subjectId);
            const final = computeFinalGrade(g);
            const sec = sections.find(s => s.id === student?.section);
            return (
              <div key={g.id} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:14, marginBottom:10, boxShadow:"var(--shadow-sm)", borderLeft:"4px solid var(--orange)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                  <div style={{ fontWeight:800, fontSize:13, color:"var(--gray-800)" }}>{student?.name}</div>
                  <span style={{ fontSize:10, color:"var(--gray-400)", fontWeight:600 }}>Sem {g.sem}</span>
                </div>
                <div style={{ fontSize:12, color:"var(--gray-500)", marginBottom:4 }}>{subject?.name}</div>
                <div style={{ fontSize:11, color:"var(--gray-400)", fontWeight:600, marginBottom:10 }}>
                  {student?.strand} · Grade {student?.gradeLevel} · {sec?.name||student?.section}
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  {[["Midterm",g.q1],["Finals",g.q2],["Final",final]].map(([q,val]) => (
                    <div key={q} style={{ textAlign:"center", background:q==="Final"?(isPassing(val)?"#d1fae5":"#fee2e2"):"var(--gray-100)", borderRadius:8, padding:"6px 10px", flex:1 }}>
                      <div style={{ fontSize:10, color:"var(--gray-400)", fontWeight:700 }}>{q}</div>
                      <div style={{ fontWeight:800, color:q==="Final"?(isPassing(val)?"#065f46":"#991b1b"):"var(--gray-800)" }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn-success-small" style={{ flex:1 }} onClick={() => approve(g.id)}>✓ Approve</button>
                  <button className="btn-danger-small" style={{ flex:1 }} onClick={() => reject(g.id)}>✕ Reject</button>
                </div>
              </div>
            );
          })
      )}

      {/* Approved grades list */}
      {viewTab === "approved" && (
        approved.length === 0
          ? <div className="empty-state"><Icon.Grade /><h3>No approved grades</h3><p>No grades match the selected filters</p></div>
          : approved.map(g => {
            const student = activeStudents.find(u => u.id === g.studentId);
            const subject = subjects.find(s => s.id === g.subjectId);
            const final = computeFinalGrade(g);
            const sec = sections.find(s => s.id === student?.section);
            const failed = !isPassing(final);
            return (
              <div key={g.id} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:"12px 14px", marginBottom:8, boxShadow:"var(--shadow-sm)", borderLeft:`4px solid ${failed?"var(--red)":"var(--green)"}`, display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:800, fontSize:13, color:failed?"var(--red)":"var(--gray-800)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{student?.name}</div>
                  <div style={{ fontSize:11, color:"var(--gray-500)", fontWeight:600 }}>{subject?.name}</div>
                  <div style={{ fontSize:10, color:"var(--gray-400)", fontWeight:600 }}>{sec?.name} · {student?.strand} · Sem {g.sem}</div>
                  {failed && <span style={{ fontSize:9, color:"var(--red)", fontWeight:800 }}>☀️ FAILED — Summer class required</span>}
                </div>
                <div style={{ textAlign:"center", flexShrink:0 }}>
                  <div style={{ fontSize:10, color:"var(--gray-400)", fontWeight:700, marginBottom:2 }}>FINAL</div>
                  <span className={`pill ${failed?"pill-red":"pill-green"}`} style={{ fontSize:15, fontWeight:900, padding:"4px 12px" }}>{final}</span>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}


function AdminManage({ users, setUsers, subjects, setSubjects, sections, setSections, schedule, setSchedule }) {
  const [activeTab, setActiveTab] = useState("teachers");
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({});
  const [selectedSection, setSelectedSection] = useState(sections[0]?.id || "");
  const teachers = users.filter(u => u.role === "teacher");

  // Schedule is the source of truth for teacher-per-section-per-subject assignments
  const getAssignment = (sectionId, subjectId) => {
    const entry = schedule.find(s => s.section === sectionId && s.subjectId === subjectId);
    return entry?.teacherId || "";
  };
  const setAssignment = (sectionId, subjectId, teacherId) => {
    setSchedule(prev => prev.map(s =>
      s.section === sectionId && s.subjectId === subjectId
        ? { ...s, teacherId: teacherId || null }
        : s
    ));
  };

  const handleSaveTeacher = () => {
    if (editingItem.id) setUsers(prev => prev.map(u => u.id === editingItem.id ? { ...u, ...form } : u));
    else setUsers(prev => [...prev, { ...form, id: "t" + Date.now(), role: "teacher" }]);
    setEditingItem(null);
  };
  const handleSaveSubject = () => {
    if (editingItem.id) setSubjects(prev => prev.map(s => s.id === editingItem.id ? { ...s, ...form } : s));
    else setSubjects(prev => [...prev, { ...form, id: "s" + Date.now(), units: +form.units, gradeLevel: +form.gradeLevel }]);
    setEditingItem(null);
  };
  const handleSaveSection = () => {
    if (editingItem.id) setSections(prev => prev.map(s => s.id === editingItem.id ? { ...s, ...form } : s));
    else setSections(prev => [...prev, { ...form, id: "sec" + Date.now(), gradeLevel: +form.gradeLevel }]);
    setEditingItem(null);
  };

  const curSection = sections.find(s => s.id === selectedSection);
  const sectionSubjects = subjects.filter(s =>
    (s.strand === curSection?.strand || s.strand === "ALL") && s.gradeLevel === curSection?.gradeLevel
  );

  // Count schedules per teacher in this section (for validation hint)
  const teacherCountInSection = (teacherId) =>
    schedule.filter(s => s.section === selectedSection && s.teacherId === teacherId).length;

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">Manage</div></div>
      <div className="filter-bar">
        {["teachers","assign","subjects","sections"].map(t => (
          <button key={t} className={`filter-chip${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)} style={{ textTransform: "capitalize" }}>
            {t === "assign" ? "Assign Teachers" : t}
          </button>
        ))}
      </div>

      {/* ── TEACHERS TAB ── */}
      {activeTab === "teachers" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button className="btn-small" onClick={() => { setEditingItem({ id: null }); setForm({ name: "", username: "", password: "" }); }}>+ Add Teacher</button>
          </div>
          {teachers.map(t => {
            const assigned = schedule.filter(s => s.teacherId === t.id);
            const uniqueSubjects = [...new Set(assigned.map(s => s.subjectId))];
            return (
              <div key={t.id} className="list-card">
                <div className="list-card-icon" style={{ background: "#f0fdf4", color: "#15803d", fontWeight: 900, fontSize: 15 }}>{getInitials(t.name)}</div>
                <div className="list-card-info">
                  <h4>{t.name}</h4>
                  <p>{uniqueSubjects.length} subject(s) · {assigned.length} class(es)</p>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--teal)" }} onClick={() => { setEditingItem(t); setForm({ name: t.name, username: t.username }); }}><Icon.Edit /></button>
              </div>
            );
          })}
        </>
      )}

      {/* ── ASSIGN TEACHERS TAB ── */}
      {activeTab === "assign" && (
        <>
          <div className="alert alert-info" style={{ marginBottom: 12 }}>
            Select a section, then assign one teacher per subject. A teacher can only handle one subject per section.
          </div>
          <div className="form-group">
            <div className="form-label">Select Section</div>
            <select className="form-select" value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
              {sections.map(sec => <option key={sec.id} value={sec.id}>{sec.name} — Grade {sec.gradeLevel} {sec.strand}</option>)}
            </select>
          </div>
          {curSection && (
            <div style={{ background: "var(--white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden", marginTop: 8 }}>
              <div style={{ background: "linear-gradient(135deg, var(--navy), var(--teal-dark))", color: "var(--white)", padding: "10px 14px", fontWeight: 800, fontSize: 13 }}>
                {curSection.name} — {sectionSubjects.length} subjects
              </div>
              {sectionSubjects.map(sub => {
                const currentTeacherId = getAssignment(selectedSection, sub.id);
                const schedEntry = schedule.find(s => s.section === selectedSection && s.subjectId === sub.id);
                // Teachers already assigned to another subject in this section
                const busyTeachers = schedule
                  .filter(s => s.section === selectedSection && s.subjectId !== sub.id && s.teacherId)
                  .map(s => s.teacherId);
                return (
                  <div key={sub.id} style={{ padding: "10px 14px", borderBottom: "1px solid var(--gray-100)", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "var(--gray-800)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub.name}</div>
                      <div style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 600 }}>
                        {schedEntry ? `${schedEntry.day} ${schedEntry.startTime}` : "No schedule slot"}
                      </div>
                    </div>
                    <select
                      className="form-select"
                      style={{ width: 150, fontSize: 11, padding: "6px 8px", flexShrink: 0 }}
                      value={currentTeacherId}
                      onChange={e => setAssignment(selectedSection, sub.id, e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {teachers.map(t => {
                        const isBusy = busyTeachers.includes(t.id);
                        return (
                          <option key={t.id} value={t.id} disabled={isBusy && t.id !== currentTeacherId}>
                            {t.name}{isBusy && t.id !== currentTeacherId ? " (busy)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── SUBJECTS TAB ── */}
      {activeTab === "subjects" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button className="btn-small" onClick={() => { setEditingItem({ id: null }); setForm({ name: "", gradeLevel: 11, strand: "STEM", units: 3 }); }}>+ Add Subject</button>
          </div>
          {subjects.map(s => (
            <div key={s.id} className="list-card">
              <div className="list-card-icon" style={{ background: "var(--teal-pale)", color: "var(--teal)" }}><Icon.Book /></div>
              <div className="list-card-info"><h4>{s.name}</h4><p>Grade {s.gradeLevel} · {s.strand} · {s.track}</p></div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--teal)" }} onClick={() => { setEditingItem(s); setForm({ ...s }); }}><Icon.Edit /></button>
            </div>
          ))}
        </>
      )}

      {/* ── SECTIONS TAB ── */}
      {activeTab === "sections" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button className="btn-small" onClick={() => { setEditingItem({ id: null }); setForm({ name: "", gradeLevel: 11, strand: "STEM" }); }}>+ Add Section</button>
          </div>
          {sections.map(s => (
            <div key={s.id} className="list-card">
              <div className="list-card-icon" style={{ background: "#fef3c7", color: "#92400e", fontWeight: 900, fontSize: 14 }}>{s.name[0]}</div>
              <div className="list-card-info"><h4>{s.name}</h4><p>Grade {s.gradeLevel} · {s.strand}</p></div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--teal)" }} onClick={() => { setEditingItem(s); setForm({ ...s }); }}><Icon.Edit /></button>
            </div>
          ))}
        </>
      )}

      {/* ── MODALS ── */}
      {editingItem && activeTab === "teachers" && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">{editingItem.id ? "Edit Teacher" : "Add Teacher"}</div>
            {[["Full Name", "name", "text"], ["Username", "username", "text"], ["Password", "password", "password"]].map(([label, key, type]) => (
              <div key={key} className="form-group"><div className="form-label">{label}</div><input type={type} className="form-input" value={form[key] || ""} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} /></div>
            ))}
            <button className="btn-block" onClick={handleSaveTeacher}>Save</button>
            <button className="btn-block-outline" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      {editingItem && activeTab === "subjects" && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">{editingItem.id ? "Edit Subject" : "Add Subject"}</div>
            <div className="form-group"><div className="form-label">Subject Name</div><input className="form-input" value={form.name || ""} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="form-row">
              <div className="form-group"><div className="form-label">Grade Level</div>
                <select className="form-select" value={form.gradeLevel} onChange={e => setForm(p => ({ ...p, gradeLevel: +e.target.value }))}>
                  <option value={11}>Grade 11</option><option value={12}>Grade 12</option>
                </select>
              </div>
              <div className="form-group"><div className="form-label">Units</div><input type="number" className="form-input" value={form.units} onChange={e => setForm(p => ({ ...p, units: e.target.value }))} /></div>
            </div>
            <div className="form-group"><div className="form-label">Strand</div>
              <select className="form-select" value={form.strand} onChange={e => setForm(p => ({ ...p, strand: e.target.value }))}>
                {["STEM","Business and Entrepreneurship","Arts Social Science and Humanities","ICT Programming","Hospitality and Food Services","Automotive and Small Engine","Welding","Electrical and Electronics","Garments Artisanry","Aesthetic and Caregiving","ALL"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <button className="btn-block" onClick={handleSaveSubject}>Save</button>
            <button className="btn-block-outline" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      {editingItem && activeTab === "sections" && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">{editingItem.id ? "Edit Section" : "Add Section"}</div>
            <div className="form-group"><div className="form-label">Section Name</div><input className="form-input" value={form.name || ""} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="form-row">
              <div className="form-group"><div className="form-label">Grade Level</div>
                <select className="form-select" value={form.gradeLevel} onChange={e => setForm(p => ({ ...p, gradeLevel: +e.target.value }))}>
                  <option value={11}>Grade 11</option><option value={12}>Grade 12</option>
                </select>
              </div>
              <div className="form-group"><div className="form-label">Strand</div>
                <select className="form-select" value={form.strand} onChange={e => setForm(p => ({ ...p, strand: e.target.value }))}>
                  {["STEM","Business and Entrepreneurship","Arts Social Science and Humanities","ICT Programming","Hospitality and Food Services","Automotive and Small Engine","Welding","Electrical and Electronics","Garments Artisanry","Aesthetic and Caregiving"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button className="btn-block" onClick={handleSaveSection}>Save</button>
            <button className="btn-block-outline" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
function AdminEnrollments({ enrollments, setEnrollments, users, setUsers }) {
  const approve = (e) => {
    setEnrollments(prev => prev.map(en => en.id === e.id ? { ...en, status: "approved" } : en));
    // Mark student as enrolled
    setUsers(prev => prev.map(u => u.id === e.studentId ? { ...u, enrolled: true, gradeLevel: e.gradeLevel } : u));
  };
  const reject = (id) => setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: "rejected" } : e));
  const pending = enrollments.filter(e => e.status === "pending");
  const done = enrollments.filter(e => e.status !== "pending");
  const [previewImg, setPreviewImg] = useState(null);
  const [selectedEnroll, setSelectedEnroll] = useState(null);

  const REQ_LABELS = { reportCard:"Report Card", goodMoral:"Good Moral", form137:"Form 137", birthCert:"Birth Cert", id:"Valid ID" };

  return (
    <div className="page-content">
      <div className="section-header"><div className="section-title">Enrollment Requests</div></div>
      {pending.length === 0 && <div className="alert alert-success">✅ No pending enrollment requests!</div>}

      {pending.map(e => {
        const student = users.find(u => u.id === e.studentId);
        const allSubmitted = e.requirements && Object.values(e.requirements).every(v => v?.submitted);
        return (
          <div key={e.id} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:14, marginBottom:10, boxShadow:"var(--shadow-sm)", borderLeft:"4px solid var(--orange)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2 }}>
              <div style={{ fontWeight:800, color:"var(--gray-800)", fontSize:14 }}>{student?.name}</div>
              {e.submitType==="onsite"
                ? <span style={{ background:"#dbeafe", color:"#1e40af", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:800 }}>🏫 On-Site</span>
                : <span style={{ background:"#f0fdf4", color:"#15803d", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:800 }}>📤 Online</span>}
            </div>
            <div style={{ fontSize:12, color:"var(--gray-400)", marginBottom:10 }}>SY: {e.schoolYear} · Grade {e.gradeLevel} · {e.strand} · Filed: {e.submittedAt}</div>

            {e.submitType === "onsite" ? (
              <>
                <div style={{ background:"#eff6ff", border:"1.5px solid #bfdbfe", borderRadius:"var(--radius-sm)", padding:"10px 12px", marginBottom:10 }}>
                  <div style={{ fontWeight:800, fontSize:12, color:"#1e40af", marginBottom:6 }}>🏫 On-Site Submission</div>
                  <div style={{ fontSize:12, color:"#1d4ed8", fontWeight:600, marginBottom:8 }}>Student will bring documents in person. Verify each requirement before approving.</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {Object.entries(REQ_LABELS).map(([k,label]) => (
                      <span key={k} style={{ background:"#dbeafe", color:"#1e40af", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700 }}>📄 {label}</span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontWeight:700, fontSize:11, color:"var(--gray-500)", marginBottom:6 }}>Documents Submitted:</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                  {Object.entries(REQ_LABELS).map(([k, label]) => {
                    const req = e.requirements?.[k];
                    const hasImg = req?.preview;
                    return (
                      <div key={k} onClick={() => hasImg && setPreviewImg(req.preview)}
                        style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:hasImg?"pointer":"default" }}>
                        <div style={{ width:52, height:52, borderRadius:8, overflow:"hidden", background:req?.submitted?"var(--teal-pale)":"var(--gray-100)", border:`2px solid ${req?.submitted?"var(--teal)":"var(--gray-200)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {hasImg
                            ? <img src={req.preview} alt={label} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                            : <span style={{fontSize:16}}>{req?.submitted?"✓":"✗"}</span>}
                        </div>
                        <span style={{ fontSize:9, fontWeight:700, color:req?.submitted?"var(--teal)":"var(--gray-400)", textAlign:"center", maxWidth:52 }}>{label}</span>
                      </div>
                    );
                  })}
                </div>
                {!allSubmitted && <div style={{ background:"#fef3c7", borderRadius:"var(--radius-sm)", padding:"8px 10px", marginBottom:10, fontSize:11, color:"#92400e", fontWeight:600 }}>⚠️ Some documents may not have photos uploaded yet.</div>}
              </>
            )}

            <div style={{ display:"flex", gap:8 }}>
              <button className="btn-success-small" style={{ flex:1 }} onClick={() => approve(e)}>✓ Approve & Enroll</button>
              <button className="btn-danger-small" style={{ flex:1 }} onClick={() => reject(e.id)}>✕ Reject</button>
            </div>
          </div>
        );
      })}

      {/* Image Preview */}
      {previewImg && (
        <div className="modal-overlay" onClick={() => setPreviewImg(null)} style={{ alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"var(--white)", borderRadius:"var(--radius)", padding:12, maxWidth:380, width:"90%", position:"relative" }}>
            <button onClick={() => setPreviewImg(null)} style={{ position:"absolute", top:8, right:8, background:"var(--gray-200)", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon.X /></button>
            <img src={previewImg} alt="document" style={{ width:"100%", borderRadius:8, marginTop:8 }} />
          </div>
        </div>
      )}

      {done.length > 0 && (
        <>
          <div className="section-header"><div className="section-title">Processed Enrollments</div></div>
          {done.map(e => {
            const student = users.find(u => u.id === e.studentId);
            return (
              <div key={e.id} className="list-card">
                <div className="list-card-info"><h4>{student?.name}</h4><p>SY: {e.schoolYear} · Grade {e.gradeLevel}</p></div>
                <span className={`pill ${e.status==="approved"?"pill-green":"pill-red"}`} style={{textTransform:"capitalize"}}>{e.status}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) return (
    <>
      <style>{globalStyles}</style>
      <LoginScreen onLogin={handleLogin} />
    </>
  );

  if (currentUser.role === "student") return <StudentApp user={currentUser} onLogout={handleLogout} />;
  if (currentUser.role === "teacher") return <TeacherApp user={currentUser} onLogout={handleLogout} />;
  if (currentUser.role === "admin") return <AdminApp user={currentUser} onLogout={handleLogout} />;
  return null;
}