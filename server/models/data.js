const Account = require("./account.model");
const Student = require("./student.model");
const Teacher = require("./teacher.model");
const Admin = require("./admin.model");
const Subject = require("./subject.model");
const LearningOutcome = require("./learningOutcome.model");
const Course = require("./course.model");
const Score = require("./score.model");
const LearningOutcomeScore = require("./learningOutcomeScore.model");
const Enrollment = require("./enrollment.model");
const Modification = require("./modification.model");
const Major = require("./major.model");
const SubjectLearningOutcome = require("./subjectLearningOutcome.model");
const AwardStudent = require("./awardStudent.model");
const Award = require("./award.model");
const KnowledgeDomain = require("./knowledgeDomain.model");
const KnowledgeField = require("./knowledgeField.model");
const Certificate = require("./certificate.model");
const VerificationLogs = require("./verificationLogs.model");
const LearningOutcomeLevel = require("./learningOutcomeLevel.model");
const AwardType = require("./awardType.model");


// Create data
const accounts = [
    // 1 admin account
    {
        email: "admin@example.com",
        password: "password123",
        accountableType: "admin",
    },

    // 10 student accounts
    {
        email: "student1@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student2@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student3@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student4@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student5@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student6@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student7@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student8@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student9@example.com",
        password: "password123",
        accountableType: "student",
    },
    {
        email: "student10@example.com",
        password: "password123",
        accountableType: "student",
    },

    // 3 teacher accounts
    {
        email: "teacher1@example.com",
        password: "password123",
        accountableType: "teacher",
    },
    {
        email: "teacher2@example.com",
        password: "password123",
        accountableType: "teacher",
    },
    {
        email: "teacher3@example.com",
        password: "password123",
        accountableType: "teacher",
    },
];

const admins = [
    { accountID: 1, status: "active" }, // Single admin entry
];

const students = [
    {
        accountID: 2,
        fullName: "John Doe",
        major: "Computer Science",
        credit: 0,
        status: "active",
        majorID: 2,
    },
    {
        accountID: 3,
        fullName: "Jane Smith",
        major: "Mathematics",
        credit: 0,
        status: "active",
        majorID: 12,
    },
    {
        accountID: 4,
        fullName: "Mark Johnson",
        major: "Physics",
        credit: 0,
        status: "active",
        majorID: 3,
    },
    {
        accountID: 5,
        fullName: "Lucy Brown",
        major: "Engineering",
        credit: 0,
        status: "active",
        majorID: 12,
    },
    {
        accountID: 6,
        fullName: "Michael Davis",
        major: "Economics",
        credit: 0,
        status: "active",
        majorID: 5,
    },
    {
        accountID: 7,
        fullName: "Emma Wilson",
        major: "Psychology",
        credit: 0,
        status: "active",
        majorID: 8,
    },
    {
        accountID: 8,
        fullName: "Oliver Moore",
        major: "Biology",
        credit: 0,
        status: "active",
        majorID: 8,
    },
    {
        accountID: 9,
        fullName: "Sophia Taylor",
        major: "Chemistry",
        credit: 0,
        status: "active",
        majorID: 5,
    },
    {
        accountID: 10,
        fullName: "Liam Anderson",
        major: "History",
        credit: 0,
        status: "active",
        majorID: 3,
    },
    {
        accountID: 11,
        fullName: "Isabella Thomas",
        major: "Literature",
        credit: 0,
        status: "active",
        majorID: 12,
    },
];

const teachers = [
    {
        accountID: 12,
        fullName: "Dr. Alan Green",
        major: "Mathematics",
        status: "active",
        majorID: 12,
    },
    {
        accountID: 13,
        fullName: "Prof. Sarah White",
        major: "Computer Science",
        status: "active",
        majorID: 6,
    },
    {
        accountID: 14,
        fullName: "Dr. Henry Black",
        major: "Physics",
        status: "active",
        majorID: 6,
    },
];

const majors = [
    {
        majorName: "Công nghệ Thông tin",
        majorCode: "IT",
        description: "Bachelor of Information Technology",
    },
    {
        majorName: "Hệ thống Thông tin",
        majorCode: "IS",
        description: "Bachelor of Information Systems",
    },
    {
        majorName: "Hệ thống Thông tin",
        majorCode: "IS",
        description: "Advanced Program in Information Systems",
    },
    {
        majorName:
            "Khoa học Máy tính (Chương trình liên kết với ĐH Birmingham City)",
        majorCode: "CS",
        description:
            "Bachelor of Computer Science (Joint Program with Birmingham City University)",
    },
    {
        majorName:
            "Mạng máy tính và An toàn thông tin (Chương trình liên kết với ĐH Birmingham City)",
        majorCode: "CNS",
        description:
            "Bachelor of Computer Networks and Information Security (Joint Program with Birmingham City University)",
    },
    {
        majorName: "Khoa học Máy tính",
        majorCode: "CS",
        description: "Bachelor of Computer Science",
    },
    {
        majorName: "Trí tuệ Nhân tạo",
        majorCode: "AI",
        description: "Bachelor of Artificial Intelligence",
    },
    {
        majorName: "Kỹ thuật Phần mềm",
        majorCode: "SE",
        description: "Bachelor of Software Engineering",
    },
    {
        majorName: "Kỹ thuật Máy tính",
        majorCode: "CE",
        description: "Bachelor of Computer Engineering",
    },
    {
        majorName: "Thiết kế Vi mạch",
        majorCode: "VLSI",
        description: "Bachelor of Microelectronics Design",
    },
    {
        majorName: "Mạng máy tính và Truyền thông dữ liệu",
        majorCode: "CNC",
        description: "Bachelor of Computer Networks and Data Communications",
    },
    {
        majorName: "An toàn Thông tin",
        majorCode: "ISec",
        description: "Bachelor of Information Security",
    },
    {
        majorName: "Thương mại điện tử",
        majorCode: "Ecom",
        description: "Bachelor of E-commerce",
    },
    {
        majorName: "Chương trình đào tạo song ngành ngành Thương mại điện tử",
        majorCode: "Ecom",
        description: "Dual Degree Program in E-commerce",
    },
    {
        majorName: "Cử nhân khoa học ngành Khoa học Dữ liệu",
        majorCode: "DS",
        description: "Bachelor of Science in Data Science",
    },
];

const knowledgeDomain = [
    {
        id: 1,
        name: "Khối kiến thức giáo dục đại cương",
        description:
            "Bao gồm các môn học nền tảng như Lý luận chính trị, Toán - Tin học, Ngoại ngữ.",
        minCredit: 43,
    },
    {
        id: 2,
        name: "Khối kiến thức giáo dục chuyên nghiệp",
        description:
            "Gồm các môn học cơ sở ngành, chuyên ngành và môn học khác và tự chọn tự do.",
        minCredit: 71,
    },
    {
        id: 3,
        name: "Tốt nghiệp",
        description:
            "Bao gồm thực tập doanh nghiệp, đồ án và khoá luận tốt nghiệp.",
        minCredit: 16,
    },
];

const knowledgeField = [
    {
        id: 1,
        name: "Khóa luận hoặc chuyên đề tốt nghiệp",
        description: "Bao gồm khoá luận hoặc chuyên đề tốt nghiệp.",
        status: true,
        minCredit: 10,
        knowledgeDomainID: 3,
    },
    {
        id: 2,
        name: "Thực tập doanh nghiệp, đồ án",
        description: "Bao gồm thực tập tại doanh nghiệp và đồ án tốt nghiệp.",
        status: true,
        minCredit: 6,
        knowledgeDomainID: 3,
    },
    {
        id: 3,
        name: "Môn học khác và tự chọn tự do",
        description: "Các môn học khác và các môn tự chọn tự do.",
        status: true,
        minCredit: 8,
        knowledgeDomainID: 2,
    },
    {
        id: 4,
        name: "Chuyên ngành",
        description: "Gồm các môn học thuộc chuyên ngành.",
        status: true,
        minCredit: 14,
        knowledgeDomainID: 2,
    },
    {
        id: 5,
        name: "Cơ sở ngành",
        description: "Các môn học nền tảng cho ngành học.",
        status: true,
        minCredit: 49,
        knowledgeDomainID: 2,
    },
    {
        id: 6,
        name: "Ngoại ngữ",
        description: "Các môn học về ngoại ngữ.",
        status: true,
        minCredit: 12,
        knowledgeDomainID: 1,
    },
    {
        id: 7,
        name: "Toán - Tin học - Khoa học tự nhiên",
        description: "Gồm các môn học về toán, tin học và khoa học tự nhiên.",
        status: true,
        minCredit: 18,
        knowledgeDomainID: 1,
    },
    {
        id: 8,
        name: "Lý luận chính trị và pháp luật",
        description: "Các môn học về lý luận chính trị và pháp luật.",
        status: true,
        minCredit: 13,
        knowledgeDomainID: 1,
    },
];

const subjects = [
    {
        subjectCode: "IT008",
        subjectName: "Lập trình trực quan",
        credit: 4,
        description:
            "Môn học hướng dẫn lập trình trên Windows, bao gồm tạo ứng dụng, xử lý thông điệp, giao diện điều khiển, quản lý bộ nhớ, thư viện động và lập trình đa nhiệm.",
        majorID: 6,
        image: 'images/subject/10012023_IT008-Lập_trình_trực_quan_2022.pdf',
        knowledgeFieldID: 5,
    },
    {
        subjectCode: "IT002",
        subjectName: "Nhập môn lập trình",
        credit: 4,
        description:
            "Môn học dạy lập trình hướng đối tượng, thừa kế, đa hình, interface và giao tiếp giữa các đối tượng",
        majorID: 6,
        image: 'images/subject/11092023_IT002-Lap_trinh_huong_doi_tuong_2022.pdf',
        knowledgeFieldID: 5,
    },
    {
        subjectCode: "SE100",
        subjectName: "Phương pháp phát triển phần mềm hướng đối tượng",
        credit: 4,
        description:
            "Môn học dạy phát triển phần mềm hướng đối tượng, tập trung vào phân tích, thiết kế hệ thống và nâng cao kỹ năng làm việc nhóm.",
        majorID: 6,
        image: 'images/subject/11092023_SE100_Phương_pháp_phát_triển_phần_mềm_hướng_đối_tượng.pdf',
        knowledgeFieldID: 5,
    },
];

const courses = [
    {
        courseCode: "IT008.P01",
        semester: 1,
        year: "2024-2025",
        subjectID: 1,
        teacherID: null,
    },
    {
        courseCode: "IT008.P02",
        semester: 2,
        year: "2024-2025",
        subjectID: 1,
        teacherID: null,
    },
    {
        courseCode: "IT002.P01",
        semester: 1,
        year: "2024-2025",
        subjectID: 2,
        teacherID: null,
    },
    {
        courseCode: "IT002.P02",
        semester: 2,
        year: "2024-2025",
        subjectID: 2,
        teacherID: null,
    },
    {
        courseCode: "SE100.P01",
        semester: 1,
        year: "2024-2025",
        subjectID: 3,
        teacherID: null,
    },
    {
        courseCode: "SE100.P02",
        semester: 2,
        year: "2024-2025",
        subjectID: 3,
        teacherID: null,
    },
];

const learningOutcomes = [
    {
        learningOutcomeCode: "LO1",
        learningOutcomeName:
            "Master the fundamental knowledge of natural sciences, social sciences, and understand how to apply that knowledge to the field of Software Engineering and practice.",
        description: "ABET 3.1",
        active: true,
    },
    {
        learningOutcomeCode: "LO2",
        learningOutcomeName:
            "Master the foundational knowledge and some specialized knowledge of Software Engineering to apply it to practice.",
        description: "ABET 3.2, GAC2.b",
        active: true,
    },
    {
        learningOutcomeCode: "LO3",
        learningOutcomeName:
            "Survey literature, reason, analyze, and propose creative solutions to problems related to Software Engineering; awareness of the need for lifelong learning.",
        description: "ABET 3.6, ABET 3.7, GAC2.a",
        active: true,
    },
    {
        learningOutcomeCode: "LO4",
        learningOutcomeName:
            "Design, implement, and evaluate systems and solutions in Software Engineering.",
        description: "ABET 3.2, ABET 3.6, GAC2.a",
        active: true,
    },
    {
        learningOutcomeCode: "LO5",
        learningOutcomeName:
            "Communicate, collaborate, and connect effectively with individuals and groups in specific professional contexts.",
        description: "ABET 3.5, GAC2.c",
        active: true,
    },
    {
        learningOutcomeCode: "LO6",
        learningOutcomeName:
            "Communicate professionally, understand documents, and present technical solutions in a foreign language.",
        description: "",
        active: true,
    },
    {
        learningOutcomeCode: "LO7",
        learningOutcomeName: "Understand leadership and management.",
        description: "GAC2.d",
        active: true,
    },
    {
        learningOutcomeCode: "LO8",
        learningOutcomeName:
            "Understand professional responsibility, respect for law, and ethical values.",
        description: "ABET 3.4",
        active: true,
    },
];

const learningOutcomeScores = [
    { studentID: 1, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 1, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 1, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 1, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 1, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 1, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 1, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 1, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 2, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 2, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 2, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 2, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 2, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 2, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 2, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 2, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 3, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 3, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 3, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 3, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 3, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 3, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 3, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 3, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 4, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 4, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 4, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 4, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 4, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 4, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 4, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 4, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 5, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 5, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 5, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 5, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 5, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 5, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 5, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 5, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 6, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 6, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 6, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 6, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 6, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 6, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 6, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 6, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 7, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 7, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 7, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 7, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 7, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 7, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 7, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 7, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 8, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 8, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 8, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 8, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 8, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 8, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 8, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 8, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 9, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 9, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 9, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 9, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 9, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 9, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 9, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 9, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },

    { studentID: 10, learningOutcomeID: 1, score: 0, highestLevel: "NT1" },
    { studentID: 10, learningOutcomeID: 2, score: 0, highestLevel: "NT1" },
    { studentID: 10, learningOutcomeID: 3, score: 0, highestLevel: "KN1" },
    { studentID: 10, learningOutcomeID: 4, score: 0, highestLevel: "KN1" },
    { studentID: 10, learningOutcomeID: 5, score: 0, highestLevel: "KN1" },
    { studentID: 10, learningOutcomeID: 6, score: 0, highestLevel: "KN1" },
    { studentID: 10, learningOutcomeID: 7, score: 0, highestLevel: "KN1" },
    { studentID: 10, learningOutcomeID: 8, score: 0, highestLevel: "TD1" },
];

const modifications = [
    {
        key: "progress",
        value: "0.2",
    },
    {
        key: "midterm",
        value: "0.3",
    },
    {
        key: "final",
        value: "0.5",
    },
    {
        key: "core",
        value: "1",
    },
    {
        key: "major",
        value: "2",
    },
];

const subjectLearningOutcomes = [
    { subjectID: 1, learningOutcomeID: 2, level: "NT4" }, // IT008
    { subjectID: 1, learningOutcomeID: 3, level: "KN4" },
    { subjectID: 1, learningOutcomeID: 5, level: "KN4" },
    { subjectID: 1, learningOutcomeID: 6, level: "KN4" },

    { subjectID: 2, learningOutcomeID: 2, level: "NT3" }, // IT002
    { subjectID: 2, learningOutcomeID: 3, level: "KN4" },
    { subjectID: 2, learningOutcomeID: 6, level: "KN4" },

    { subjectID: 3, learningOutcomeID: 2, level: "NT3" }, // SE100
    { subjectID: 3, learningOutcomeID: 3, level: "KN4" },
    { subjectID: 3, learningOutcomeID: 4, level: "KN4" },
    { subjectID: 3, learningOutcomeID: 5, level: "KN4" },
];

const awards = [
    {
        awardNumber: "AWD-001",
        awardTypeID: 1,
        description: "Awarded for achieving the highest GPA in the semester.",
        receivedAt: new Date("2024-06-15"),
        image: "https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "valid",
        invalidReason: null,
        studentID: 1
    },
    {
        awardNumber: "AWD-002",
        awardTypeID: 2,
        description: "Recognized for volunteering over 100 hours.",
        receivedAt: new Date("2023-12-01"),
        image: "https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "pending",
        invalidReason: null,
        studentID: 1
    },
    {
        awardNumber: "AWD-003",
        awardTypeID: 3,
        description: "Awarded for leading the student council effectively.",
        receivedAt: new Date("2024-03-10"),
        image: "https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "invalid",
        invalidReason: "Insufficient documentation submitted.",
        studentID: 1
    },
    {
        awardNumber: "AWD-004",
        awardTypeID: 4,
        description: "Developed a unique solution for school waste management.",
        receivedAt: new Date("2024-05-05"),
        image: "https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "valid",
        invalidReason: null,
        studentID: 1
    },
    {
        awardNumber: "AWD-005",
        awardTypeID: 5,
        description: "Attended 100% of the classes during the academic year.",
        receivedAt: new Date("2023-11-20"),
        image: "https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "valid",
        invalidReason: null,
        studentID: 1
    }
];


const awardTypes = [
    {
        title: "Student of the Month",
        description: "Awarded for outstanding academic performance and behavior.",
        type: "Academic",
        level: "School",
        date_awarded: new Date("2025-05-01")
    },
    {
        title: "Community Leadership Award",
        description: "Recognizes students who demonstrate exceptional leadership in the community.",
        type: "Leadership",
        level: "City",
        date_awarded: new Date("2025-03-15")
    },
    {
        title: "Innovation in Science",
        description: "Awarded for groundbreaking research in environmental science.",
        type: "Science",
        level: "Country",
        date_awarded: new Date("2024-12-10")
    },
    {
        title: "Perfect Attendance",
        description: "Given to students who have perfect attendance throughout the semester.",
        type: "Attendance",
        level: "School",
        date_awarded: new Date("2025-01-30")
    },
    {
        title: "Best Art Portfolio",
        description: "Awarded to the student with the most creative and expressive art submissions.",
        type: "Arts",
        level: "School",
        date_awarded: new Date("2025-04-21")
    },
    {
        title: "Top Math Performer",
        description: "Recognizes excellence in mathematics competitions.",
        type: "Academic",
        level: "City",
        date_awarded: new Date("2025-02-14")
    },
    {
        title: "Sportsmanship Award",
        description: "For showing great respect and fairness in all athletic activities.",
        type: "Sports",
        level: "School",
        date_awarded: new Date("2025-05-20")
    },
    {
        title: "Environmental Hero",
        description: "Awarded to students with impactful sustainability projects.",
        type: "Environment",
        level: "City",
        date_awarded: new Date("2025-03-22")
    },
    {
        title: "National Science Fair Winner",
        description: "1st place in the national science fair competition.",
        type: "Science",
        level: "Country",
        date_awarded: new Date("2025-06-01")
    },
    {
        title: "Cultural Ambassador",
        description: "For promoting cultural awareness and diversity in school.",
        type: "Community",
        level: "School",
        date_awarded: new Date("2025-02-05")
    }
];



const learningOutcomeLevels = [
    // NT levels for LO1 and LO2
    { learningOutcomeID: 1, level: "NT1" },
    { learningOutcomeID: 1, level: "NT2" },
    { learningOutcomeID: 1, level: "NT3" },
    { learningOutcomeID: 1, level: "NT4" },
    { learningOutcomeID: 2, level: "NT1" },
    { learningOutcomeID: 2, level: "NT2" },
    { learningOutcomeID: 2, level: "NT3" },
    { learningOutcomeID: 2, level: "NT4" },

    // KN levels for LO3 to LO7
    { learningOutcomeID: 3, level: "KN1" },
    { learningOutcomeID: 3, level: "KN2" },
    { learningOutcomeID: 3, level: "KN3" },
    { learningOutcomeID: 3, level: "KN4" },
    { learningOutcomeID: 4, level: "KN1" },
    { learningOutcomeID: 4, level: "KN2" },
    { learningOutcomeID: 4, level: "KN3" },
    { learningOutcomeID: 4, level: "KN4" },
    { learningOutcomeID: 5, level: "KN1" },
    { learningOutcomeID: 5, level: "KN2" },
    { learningOutcomeID: 5, level: "KN3" },
    { learningOutcomeID: 5, level: "KN4" },
    { learningOutcomeID: 6, level: "KN1" },
    { learningOutcomeID: 6, level: "KN2" },
    { learningOutcomeID: 6, level: "KN3" },
    { learningOutcomeID: 6, level: "KN4" },
    { learningOutcomeID: 7, level: "KN1" },
    { learningOutcomeID: 7, level: "KN2" },
    { learningOutcomeID: 7, level: "KN3" },
    { learningOutcomeID: 7, level: "KN4" },

    // TD levels for LO8
    { learningOutcomeID: 8, level: "TD1" },
    { learningOutcomeID: 8, level: "TD2" },
    { learningOutcomeID: 8, level: "TD3" },
    { learningOutcomeID: 8, level: "TD4" }
];

const createData = async () => {
    await Account.bulkCreate(accounts);
    await Student.bulkCreate(students);
    await Teacher.bulkCreate(teachers);
    await Admin.bulkCreate(admins);

    // Create Majors
    await Major.bulkCreate(majors);

    // Create KnowledgeDomain
    await KnowledgeDomain.bulkCreate(knowledgeDomain);

    // Create KnowledgeField
    await KnowledgeField.bulkCreate(knowledgeField);

    // Create Subjects
    await Subject.bulkCreate(subjects);

    // Create Courses
    await Course.bulkCreate(courses);

    // Create Learning Outcomes
    await LearningOutcome.bulkCreate(learningOutcomes);

    // Create Learning Outcome Scores
    await LearningOutcomeScore.bulkCreate(learningOutcomeScores);

    // Create Modifications
    await Modification.bulkCreate(modifications);

    // Create Learning Outcome - Subject relationships
    await SubjectLearningOutcome.bulkCreate(subjectLearningOutcomes);

    // Create Awards
    await AwardType.bulkCreate(awardTypes)
    await Award.bulkCreate(awards);


    await LearningOutcomeLevel.bulkCreate(learningOutcomeLevels)
};

const checkAndCreateData = async () => {
    const accountCount = await Account.count();
    if (accountCount === 0) {
        await createData();
        console.log("Data created!");
    } else {
        console.log("Database already contains data, skipping creation");
    }
};

module.exports = {
    checkAndCreateData
};