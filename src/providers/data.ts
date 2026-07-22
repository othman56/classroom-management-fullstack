import {
  DataProvider,
  GetListResponse,
  GetListParams,
  BaseRecord,
} from "@refinedev/core";
import type { Subject } from "../types";

const mockSubjects: Subject[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    description:
      "A foundational course covering programming concepts and problem-solving.",
    department: "CS",
    createdAt: "2024-01-15T09:00:00.000Z",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    code: "CS201",
    description:
      "Explores core data structures, algorithms, and algorithmic analysis.",
    department: "Computer Science",
    createdAt: "2024-01-16T09:00:00.000Z",
  },
  {
    id: 3,
    name: "Linear Algebra",
    code: "MATH201",
    description: "Covers vectors, matrices, and systems of linear equations.",
    department: "Maths",
    createdAt: "2024-01-17T09:00:00.000Z",
  },
];

export const dataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") return { data: [] as TData[], total: 0 };

    return {
      data: mockSubjects as unknown as TData[],
      total: mockSubjects.length,
    };
  },

  getOne: async () => {
    throw new Error("Method not implemented.");
  },
  create: async () => {
    throw new Error("Method not implemented.");
  },
  update: async () => {
    throw new Error("Method not implemented.");
  },
  deleteOne: async () => {
    throw new Error("Method not implemented.");
  },
  getApiUrl: () => "",
} as DataProvider;
