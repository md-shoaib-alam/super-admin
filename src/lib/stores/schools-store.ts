import { create } from 'zustand';
import { School } from '@/types';
import { mockSchools } from '@/lib/mock-data/schools';

interface SchoolsState {
  schools: School[];
  addSchool: (school: Omit<School, 'id'>) => void;
  updateSchool: (id: string, data: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  getSchool: (id: string) => School | undefined;
}

export const useSchoolsStore = create<SchoolsState>((set, get) => ({
  schools: mockSchools,
  
  addSchool: (schoolData) => {
    const newSchool: School = {
      ...schoolData,
      id: `school-${Date.now()}`,
    };
    set((state) => ({ schools: [...state.schools, newSchool] }));
  },
  
  updateSchool: (id, data) => {
    set((state) => ({
      schools: state.schools.map((school) =>
        school.id === id ? { ...school, ...data } : school
      ),
    }));
  },
  
  deleteSchool: (id) => {
    set((state) => ({
      schools: state.schools.filter((school) => school.id !== id),
    }));
  },
  
  getSchool: (id) => {
    return get().schools.find((school) => school.id === id);
  },
}));
