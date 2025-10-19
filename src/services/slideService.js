import { config as CONFIG } from '../config';

export const slideService = {
  async fetchProjectList() {
    const response = await fetch(`${CONFIG.slidesBasePath}/index.txt`);
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
  },

async fetchProjectConfig(projectName) {
  const url = `${CONFIG.slidesBasePath}/${projectName}/config.json`;
  console.log('Fetching config from:', url);
  const response = await fetch(url);
  const text = await response.text();
  console.log('Config response:', text);
  return JSON.parse(text);
},

async fetchProjectDescription(projectName, descriptionFile) {
  const response = await fetch(`${CONFIG.slidesBasePath}/${projectName}/${descriptionFile}`);
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
          imageUrls: config.images.map(img => `${CONFIG.slidesBasePath}/${projectName}/${img}`)
        };
      })
    );
    
    console.log('Final projects array:', projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error
  }
}
};