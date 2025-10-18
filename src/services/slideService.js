import { config } from '../config';

export const slideService = {
  async fetchProjectList() {
    const response = await fetch(`${config.slidesBasePath}/index.txt`);
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
  },

async fetchProjectConfig(projectName) {
  const url = `${config.slidesBasePath}/${projectName}/config.json`;
  console.log('Fetching config from:', url);
  const response = await fetch(url);
  const text = await response.text();
  console.log('Config response:', text);
  return JSON.parse(text);
},

  async fetchProjectDescription(projectName, descriptionFile) {
    const response = await fetch(`${config.slidesBasePath}/${projectName}/${descriptionFile}`);
    return await response.text();
  },

async fetchAllProjects() {
  try {
    const projectNames = await this.fetchProjectList();
    console.log('Project names from index.txt:', projectNames);
    
    const projects = await Promise.all(
      projectNames.map(async (projectName) => {
        console.log('Loading project:', projectName);
        const config = await this.fetchProjectConfig(projectName);
        const description = await this.fetchProjectDescription(projectName, config.descriptionFile);
        
        return {
          name: projectName,
          ...config,
          description,
          imageUrls: config.images.map(img => `/slides/${projectName}/${img}`)
        };
      })
    );
    
    console.log('Final projects array:', projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
};