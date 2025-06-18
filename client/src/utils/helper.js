export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToCSV(data) {
    const header = "id,highestLevel,studentID,learningOutcomeID,learningOutcomeCode";

    const rows = data.map(item => {
        return [
            item.id,
            item.highestLevel,
            item.studentID,
            item.learningOutcomeID,
            item.LearningOutcome.learningOutcomeCode
        ].join(",");
    });

    return [header, ...rows].join("\n");
}