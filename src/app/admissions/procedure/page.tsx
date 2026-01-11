import { Metadata } from "next";
import ProcedureContent from "./ProcedureContent";

export const metadata: Metadata = {
  title: "Admission Procedure | Vishwanath Academy",
  description:
    "Admission criteria, pupil evaluation process, and academic session details for Vishwanath Academy.",
};

export default function AdmissionProcedurePage() {
  return <ProcedureContent />;
}
