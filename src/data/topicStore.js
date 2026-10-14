// In-memory & localStorage store for PDCA / Requisition topics and their checksheets

const createEmptyFormData = () => ({
    date: '',
    time: '',
    projectName: '',
    submissionFrequency: '',
    partName: '',
    partNo: '',
    productType: '',
    lotNo: '',
    nosOfSample: '',
    requestedName: '',
    receivedBy: '',
    purpose: '',
    deptt: '',
    requestBy: '',
    approvedBy: '',
});

const createEmptyRows = (count = 18) =>
    Array.from({ length: count }, () => ({
        sNo: '',
        characteristics: '',
        specified: '',
        actual: '',
        status: '',
        remarks: '',
    }));

const createEmptySheet3FormData = () => ({
    date: '',
    time: '',
    newDevelopment: false,
    carv: false,
    runningPart: false,
    newApplicator: false,
    projectName: '',
    submissionFrequency: '',
    partName: '',
    partNo: '',
    productType: '',
    noOfCavity: '',
    lotNo: '',
    nosOfSample: '',
    lotDate: '',
    manufacturingLocation: '',
    materialName: '',
    materialGradeClass: '',
    fmeUniquePart: '',
    fasUniquePart: '',
    customerDirectedPart: '',
    supplierInspectionReport: '',
    mtcReceived: '',
    partApplicabilityMatrixReceived: '',
    testingStandardReceived: '',
    testingMethod: '',
    jigFixtureRequirement: '',
    ppapDocApplicable: '',
    ppapDocReceived: '',
    requestedName: '',
    receivedBy: '',
    purposeForTesting: '',
    deptt: '',
    requestBy: '',
    checkedBy: '',
    verifiedBy: '',
    approvedBy: '',
});

const createEmptySheet3Rows = (count = 18) =>
    Array.from({ length: count }, () => ({
        sNo: '',
        requiredTest: '',
        standardName: '',
        actual: '',
        status: '',
        remarks: '',
    }));

export const createBlankTopicSheets = () => ({
    'Sheet 1': {
        formData: createEmptyFormData(),
        rows: createEmptyRows(18),
    },
    'Sheet 2': {
        formData: createEmptyFormData(),
        rows: createEmptyRows(18),
    },
    'Sheet 3': {
        formData: createEmptySheet3FormData(),
        rows: createEmptySheet3Rows(18),
    },
});

const DEFAULT_TOPICS = [
    {
        id: '57c2c5da-515b-4009-80a2-8af5a841134e',
        unit: 'Bawal',
        category: 'Plant',
        topic: 'DFVASFA',
        description: 'ASDV',
        date: '14 Oct 2026',
        time: '04:33 PM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-rose-100 text-rose-700 border-rose-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '3c51467e-d96b-47cf-9558-f94db9d80f42',
        unit: 'Bawal',
        category: 'Plant',
        topic: 'Testing',
        description: 'Testing PDCA',
        date: '14 Oct 2026',
        time: '02:25 PM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-blue-100 text-blue-700 border-blue-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: 'bce363ac-6309-432c-9827-79e6018848bd',
        unit: 'Bawal',
        category: 'Plant',
        topic: 'Testing 2',
        description: 'Testing 2',
        date: '14 Oct 2026',
        time: '02:23 PM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-purple-100 text-purple-700 border-purple-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '992a14e1-2091-4cf1-8812-7801a2399120',
        unit: 'Gujrat',
        category: 'Plant',
        topic: 'SMG Quality Batch',
        description: 'High Voltage Harness Inspection',
        date: '14 Oct 2026',
        time: '11:15 AM',
        createdByName: 'BHAVESH PATEL (GJ02...)',
        createdById: 'GJ020088',
        avatarText: 'BP',
        avatarBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        sheets: createBlankTopicSheets(),
    },
];

const STORAGE_KEY = 'pdca_requisition_topics_v1';

export function loadStoredTopics() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch {
        // Ignore fallback to defaults
    }
    return DEFAULT_TOPICS;
}

export function saveStoredTopics(topics) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch {
        // Ignore quota errors
    }
}
