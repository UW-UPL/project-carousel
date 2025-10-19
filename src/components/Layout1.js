import ReactMarkdown from 'react-markdown';

function Layout1({ project }) {
  return (
    <div className="p-8 bg-primary min-h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{project.title}</h1>
      <div className="prose prose-lg mx-auto mb-8">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
      {project.imageUrls && project.imageUrls.length > 0 && (
        <div className="flex justify-center gap-4 mb-8">
          {project.imageUrls.map((imageUrl, index) => (
            <img 
              key={index} 
              src={imageUrl} 
              alt={`${project.title} - Image ${index + 1}`}
              className="max-w-sm rounded-lg shadow-lg"
            />
          ))}
        </div>
      )}
      <div className="text-center text-gray-600">
        <p className="mb-1">By: {project.metadata.author}</p>
        <p>Date: {project.metadata.date}</p>
      </div>
    </div>
  );
}

export default Layout1;