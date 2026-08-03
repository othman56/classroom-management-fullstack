import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const ROLE_OPTIONS = [
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: USER_ROLES.TEACHER,
    label: "Teacher",
    icon: School,
  },
];

export const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Administration",
  "Engineering",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "Education",
  "Fine Arts",
  "Music",
  "Physical Education",
  "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const getEnv = (key: string, fallback = ""): string => {
  const value = import.meta.env[key as keyof ImportMetaEnv];

  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }

  return fallback;
};

export const CLOUDINARY_UPLOAD_URL = getEnv(
  "VITE_CLOUDINARY_UPLOAD_URL",
  "https://api.cloudinary.com/v1_1/placeholder/image/upload",
);
export const CLOUDINARY_CLOUD_NAME = getEnv(
  "VITE_CLOUDINARY_CLOUD_NAME",
  "placeholder",
);
export const BACKEND_BASE_URL = getEnv(
  "VITE_BACKEND_BASE_URL",
  "http://localhost:8000/api/",
);

export const BASE_URL = getEnv("VITE_API_URL", BACKEND_BASE_URL);
export const ACCESS_TOKEN_KEY = getEnv("VITE_ACCESS_TOKEN_KEY", "access_token");
export const REFRESH_TOKEN_KEY = getEnv(
  "VITE_REFRESH_TOKEN_KEY",
  "refresh_token",
);

export const REFRESH_TOKEN_URL = `${BASE_URL.replace(/\/+$/, "")}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = getEnv(
  "VITE_CLOUDINARY_UPLOAD_PRESET",
  "classroom-management",
);
