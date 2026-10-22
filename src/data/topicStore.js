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

export const createEmptyRows = (count = 5) =>
    Array.from({ length: count }, (_, idx) => ({
        sNo: `${idx + 1}`,
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

export const createEmptySheet3Rows = (count = 5) =>
    Array.from({ length: count }, (_, idx) => ({
        sNo: `${idx + 1}`,
        requiredTest: '',
        standardName: '',
        actual: '',
        status: '',
        remarks: '',
    }));

export const createBlankTopicSheets = () => ({
    'Sheet 1': {
        formData: createEmptyFormData(),
        rows: createEmptyRows(5),
    },
    'Sheet 2': {
        formData: createEmptyFormData(),
        rows: createEmptyRows(5),
    },
    'Sheet 3': {
        formData: createEmptySheet3FormData(),
        rows: createEmptySheet3Rows(5),
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

export function normalizeSheetRows(rows, isSheet3 = false) {
    if (!Array.isArray(rows)) {
        return isSheet3 ? createEmptySheet3Rows(5) : createEmptyRows(5);
    }

    // If rows were initialized with legacy 18 blank rows, clamp to default 5
    if (rows.length === 18) {
        const isAllBlank = rows.every((r) => {
            const { sNo, ...rest } = r;
            return Object.values(rest).every((v) => !v || String(v).trim() === '');
        });
        if (isAllBlank) {
            return isSheet3 ? createEmptySheet3Rows(5) : createEmptyRows(5);
        }
    }

    // Always re-index sNo sequentially to match current array positions
    return rows.map((r, idx) => ({
        ...r,
        sNo: `${idx + 1}`,
    }));
}

const STORAGE_KEY = 'pdca_requisition_topics_v2';
const LEGACY_STORAGE_KEY = 'pdca_requisition_topics_v1';

export function loadStoredTopics() {
    try {
        let raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            raw = localStorage.getItem(LEGACY_STORAGE_KEY);
        }
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
                        ['Sheet 1', 'Sheet 2', 'Sheet 3'].forEach((sKey) => {
                            const isSheet3 = sKey === 'Sheet 3';
                            if (!sheets[sKey]) {
                                sheets[sKey] = defaultSheets[sKey];
                                sheetsUpdated = true;
                            } else {
                                const normalizedRows = normalizeSheetRows(sheets[sKey].rows, isSheet3);
                                if (
                                    !Array.isArray(sheets[sKey].rows) ||
                                    sheets[sKey].rows.length !== normalizedRows.length ||
                                    sheets[sKey].rows.length === 18
                                ) {
                                    sheetsUpdated = true;
                                }
                                const currentFormData = sheets[sKey].formData || {};
                                let newFormData = currentFormData;
                                if (
                                    currentFormData.verifiedBy === 'Pankaj Kamra' ||
                                    currentFormData.approvedBy === 'Yadvendar Yadav'
                                ) {
                                    newFormData = {
                                        ...currentFormData,
                                        verifiedBy: currentFormData.verifiedBy === 'Pankaj Kamra' ? '' : currentFormData.verifiedBy,
                                        approvedBy: currentFormData.approvedBy === 'Yadvendar Yadav' ? '' : currentFormData.approvedBy,
                                    };
                                    sheetsUpdated = true;
                                }
                                sheets[sKey] = {
                                    ...sheets[sKey],
                                    rows: normalizedRows,
                                    formData: newFormData,
                                };
                            }
                        });
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

