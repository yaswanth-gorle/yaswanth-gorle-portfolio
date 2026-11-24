import { NextResponse } from "next/server";
import * as data from "@/lib/data";

/** The same content as JSON, handy for reuse or integrations. */
export function GET() {
  return NextResponse.json({
    profile: data.PROFILE,
    socials: data.SOCIALS,
    experience: data.EXPERIENCE,
    projects: data.PROJECTS,
    skills: data.SKILLS,
    education: data.EDUCATION,
    certifications: data.CERTIFICATIONS,
  });
}
