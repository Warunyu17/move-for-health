export interface Option {
    label: string;
    points: {
        group1?: number;
        group2?: number;
        group3?: number;
    };
}

export interface Question {
    id: number;
    title: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        title: "ความดันโลหิต (Blood Pressure)",
        options: [
            { label: "90-140 / 60-90 mmHg", points: { group1: 1, group2: 1 } },
            { label: "สูงหรือต่ำกว่า 90-140 / 60-90 mmHg", points: { group3: 1 } }
        ]
    },
    {
        id: 2,
        title: "ชีพจร (Pulse)",
        options: [
            { label: "น้อยกว่า 100 ครั้ง/นาที", points: { group1: 1, group2: 1 } },
            { label: "มากกว่า 100 ครั้ง/นาที", points: { group3: 1 } }
        ]
    },
    {
        id: 3,
        title: "อัตราการหายใจ (Respiratory Rate)",
        options: [
            { label: "น้อยกว่า 30 ครั้ง/นาที", points: { group1: 1, group2: 1 } },
            { label: "มากกว่า 30 ครั้ง/นาที", points: { group3: 1 } }
        ]
    },
    {
        id: 4,
        title: "ระดับออกซิเจนในเลือด (SPO2)",
        options: [
            { label: "มากกว่า 95%", points: { group1: 1, group2: 1 } },
            { label: "น้อยกว่า 95%", points: { group3: 1 } }
        ]
    },
    {
        id: 5,
        title: "อุณหภูมิร่างกาย (Temperature)",
        options: [
            { label: "น้อยกว่า 38 องศาเซลเซียส", points: { group1: 1, group2: 1 } },
            { label: "มากกว่า 38 องศาเซลเซียส", points: { group3: 1 } }
        ]
    },
    {
        id: 6,
        title: "ระดับความเจ็บปวด (Pain Score)",
        options: [
            { label: "1-3 คะแนน", points: { group1: 1, group2: 1 } },
            { label: "4-10 คะแนน", points: { group3: 1 } }
        ]
    },
    {
        id: 7,
        title: "อาการวิงเวียนศีรษะขณะเปลี่ยนท่า",
        options: [
            { label: "ไม่มีอาการ", points: { group1: 1 } },
            { label: "มีอาการเล็กน้อย", points: { group2: 1 } },
            { label: "มีอาการชัดเจน", points: { group3: 1 } }
        ]
    },
    {
        id: 8,
        title: "การทรงตัว",
        options: [
            { label: "มั่นคง", points: { group1: 1 } },
            { label: "ไม่มั่นคง", points: { group2: 1 } },
            { label: "ทรงตัวไม่ได้ในท่านั่ง", points: { group3: 1 } }
        ]
    },
    {
        id: 9,
        title: "ความสามารถในการนั่ง (อย่างน้อย 1 นาที)",
        options: [
            { label: "ไม่มีอาการหน้ามืด/คลื่นไส้", points: { group1: 1 } },
            { label: "มีอาการหน้ามืด/คลื่นไส้บ้าง", points: { group2: 1 } },
            { label: "มีอาการหน้ามืด/คลื่นไส้บ่อย", points: { group3: 1 } }
        ]
    },
    {
        id: 10,
        title: "อาการอ่อนเพลีย",
        options: [
            { label: "ไม่มีอาการ", points: { group1: 1 } },
            { label: "มีอาการ", points: { group3: 1 } }
        ]
    }
];
