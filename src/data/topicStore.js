export const createEmptyFormData = () => ({
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

export const createEmptyRows = (count = 18) =>
    Array.from({ length: count }, () => ({
        sNo: '',
        characteristics: '',
        specified: '',
        actual: '',
        status: '',
        remarks: '',
    }));

export const createEmptySheet3FormData = () => ({
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

export const createEmptySheet3Rows = (count = 18) =>
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
    // Event Test Requisitions
    {
        id: '57c2c5da-515b-4009-80a2-8af5a841134e',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'Event Test Requisition',
        eventTrigger: 'New Development',
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
        id: '7b8e142c-4901-4ec1-9871-3329188a1001',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'Event Test Requisition',
        eventTrigger: 'New Applicator',
        topic: 'New Applicator Validation - YP3',
        description: 'Terminal crimp pull-off force validation test',
        date: '15 Oct 2026',
        time: '10:15 AM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '4f67a21b-8012-4aa3-bf72-1188392a5502',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'Event Test Requisition',
        eventTrigger: 'CARV',
        topic: 'CARV Line Changeover Test',
        description: 'Connector cross-section & insertion test for harness changeover',
        date: '15 Oct 2026',
        time: '11:40 AM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-amber-100 text-amber-700 border-amber-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '992a14e1-2091-4cf1-8812-7801a2399120',
        unit: 'Gujrat',
        category: 'Plant',
        requisitionType: 'Event Test Requisition',
        eventTrigger: 'Running Part',
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
    {
        id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        unit: 'Gujrat',
        category: 'Plant',
        requisitionType: 'Event Test Requisition',
        eventTrigger: 'New Development',
        topic: 'Pre-Production Sample - YP5',
        description: 'Pre-production harness sample electrical continuity testing',
        date: '15 Oct 2026',
        time: '09:30 AM',
        createdByName: 'BHAVESH PATEL (GJ02...)',
        createdById: 'GJ020088',
        avatarText: 'BP',
        avatarBg: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        sheets: createBlankTopicSheets(),
    },

    // General Test Requisitions
    {
        id: '3c51467e-d96b-47cf-9558-f94db9d80f42',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'General Test Requisition',
        topic: 'Testing',
        description: 'Routine QA Lab Requisition Testing',
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
        requisitionType: 'General Test Requisition',
        topic: 'Testing 2',
        description: 'Standard Daily Harness Batch Requisition',
        date: '14 Oct 2026',
        time: '02:23 PM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-purple-100 text-purple-700 border-purple-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',
        unit: 'Bawal',
        category: 'Plant',
        requisitionType: 'General Test Requisition',
        topic: 'Periodic Tensile Strength Check',
        description: 'Weekly terminal pull-force routine check for Main Line',
        date: '15 Oct 2026',
        time: '01:10 PM',
        createdByName: 'JOY DASTIDAR (ST08...)',
        createdById: 'ST080014',
        avatarText: 'JD',
        avatarBg: 'bg-teal-100 text-teal-700 border-teal-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
        unit: 'Gujrat',
        category: 'Plant',
        requisitionType: 'General Test Requisition',
        topic: 'SMG General QA Laboratory Verification',
        description: 'Daily in-process routine sample testing for Shift A',
        date: '14 Oct 2026',
        time: '03:45 PM',
        createdByName: 'BHAVESH PATEL (GJ02...)',
        createdById: 'GJ020088',
        avatarText: 'BP',
        avatarBg: 'bg-orange-100 text-orange-700 border-orange-200',
        sheets: createBlankTopicSheets(),
    },
    {
        id: '6f5e4d3c-2b1a-0f9e-8d7c-6b5a4f3e2d1c',
        unit: 'Gujrat',
        category: 'Plant',
        requisitionType: 'General Test Requisition',
        topic: 'Routine Insulation Breakdown Check',
        description: 'Weekly dielectric insulation resistance routine testing',
        date: '15 Oct 2026',
        time: '12:05 PM',
        createdByName: 'BHAVESH PATEL (GJ02...)',
        createdById: 'GJ020088',
        avatarText: 'BP',
        avatarBg: 'bg-violet-100 text-violet-700 border-violet-200',
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
                let updated = false;
                const normalized = parsed.map((t) => {
                    let item = t;
                    const defaultSheets = createBlankTopicSheets();
                    if (!item.sheets) {
                        item = { ...item, sheets: defaultSheets };
                        updated = true;
                    } else {
                        let sheetsUpdated = false;
                        const sheets = { ...item.sheets };
                        if (!sheets['Sheet 1']) {
                            sheets['Sheet 1'] = defaultSheets['Sheet 1'];
                            sheetsUpdated = true;
                        }
                        if (!sheets['Sheet 2']) {
                            sheets['Sheet 2'] = defaultSheets['Sheet 2'];
                            sheetsUpdated = true;
                        }
                        if (!sheets['Sheet 3']) {
                            sheets['Sheet 3'] = defaultSheets['Sheet 3'];
                            sheetsUpdated = true;
                        }
                        if (sheetsUpdated) {
                            item = { ...item, sheets };
                            updated = true;
                        }
                    }
                    if (!item.requisitionType) {
                        updated = true;
                        if (
                            item.topic === 'Testing' ||
                            item.topic === 'Testing 2' ||
                            item.topic?.toLowerCase().includes('general') ||
                            item.topic?.toLowerCase().includes('routine')
                        ) {
                            return { ...item, requisitionType: 'General Test Requisition' };
                        }
                        return { ...item, requisitionType: 'Event Test Requisition' };
                    }
                    return item;
                });

                // Ensure both tabs have sample items even if old storage only had a few
                const hasEvent = normalized.some((t) => t.requisitionType === 'Event Test Requisition');
                const hasGeneral = normalized.some((t) => t.requisitionType === 'General Test Requisition');

                if (!hasEvent || !hasGeneral) {
                    const missing = DEFAULT_TOPICS.filter(
                        (dt) =>
                            (!hasEvent && dt.requisitionType === 'Event Test Requisition') ||
                            (!hasGeneral && dt.requisitionType === 'General Test Requisition')
                    );
                    normalized.push(...missing);
                    updated = true;
                }

                if (updated) {
                    saveStoredTopics(normalized);
                }
                return normalized;
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
