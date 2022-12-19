import { useMemo } from "react";
import { IProjectProps } from './../interfaces/IProjectProps';

export const useProjects = (projects:IProjectProps[], query:string) => {

  const searchedProjects = useMemo(() => {
      if (projects) {
        return projects.filter(project => project.title.toLowerCase().includes(query.toLowerCase()))
      }
  }, [query, projects])

  if (query) {
    return searchedProjects
  }
  if (!query) {
    return projects
  }
  
}