import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssessment extends Document {
    hn: string;
    answers: Record<number, number>;
    result: string;
    scores: {
        group1: number;
        group2: number;
        group3: number;
    };
    createdAt: Date;
}

const AssessmentSchema: Schema = new Schema({
    hn: { type: String, required: true, unique: true },
    answers: { type: Map, of: Number, required: true },
    result: { type: String, required: true },
    scores: {
        group1: { type: Number, required: true },
        group2: { type: Number, required: true },
        group3: { type: Number, required: true },
    },
}, { timestamps: true });

// Prevent overwrite model error
const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);

export default Assessment;
