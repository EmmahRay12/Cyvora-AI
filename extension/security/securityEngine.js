// ===========================================
// Cyvora AI Security Engine
// Version 1.0
// ===========================================

const SecurityEngine = {

    score: 100,

    findings: [],

    addRisk(points, reason) {

        this.score -= points;

        this.findings.push(reason);

        if (this.score < 0) {

            this.score = 0;

        }

    },

    getStatus() {

        if (this.score <= 50)
            return "DANGEROUS";

        if (this.score <= 80)
            return "SUSPICIOUS";

        return "SAFE";

    },

    reset() {

        this.score = 100;

        this.findings = [];

    }

};

export default SecurityEngine;