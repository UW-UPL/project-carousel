import ReactMarkdown from 'react-markdown';
import { getImageLayout } from '../utils/imageLayouts';

function Layout1({ project }) {
  return (
    <section className="bg-white w-full h-full flex flex-col">
      {/* topbar */}
      <div className="h-[130px] bg-primary w-full text-white">
        <div className='flex flex-row w-full h-full px-12 py-2 justify-between items-center'>

          <div className='flex flex-row items-baseline gap-5'>
            <h1 className='text-7xl font-bold'>
              {project.title}
            </h1>
            <h3 className='text-2xl'>
              by&nbsp;{project.metadata.author} | {project.metadata.date}
            </h3>
          </div>

          <img src="/uplWhite.svg" className='h-full p-4'/>
        </div>
      </div>

      <div className='w-full h-full grid grid-cols-2 gap-8 p-8'>
        {/* left side markdown */}
        <div className='flex items-center justify-center'>
          <div className='prose prose-lg'>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className='text-7xl font-bold text-primary mb-2' 
                  {...props} />,
                h2: ({node, ...props}) => <h2 className='text-6xl font-bold text-black mb-2' 
                  {...props} />,
                h3: ({node, ...props}) => <h3 className='text-5xl font-bold text-black mb-2' 
                {...props} /> ,
                h4: ({node, ...props}) => <h4 className='text-4xl font-bold text-black mb-2' 
                {...props} />,
                p: ({node, ...props}) => <p className='text-2xl text-black mb-2' 
                {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className='text-xl bg-zinc-800 text-black px-2 py-1 rounded text-sm font-mono mb-2' {...props} />
                    : <code className='text-xl block bg-zinc-800 text-primary-light p-4 mb-2 rounded font-mono text-sm overflow-x-auto' {...props} />,
                ul: ({node, ...props}) => <ul className='text-2xl list-disc list-inside mb-2 space-y-2' {...props} />,
                ol: ({node, ...props}) => <ol className='text-2xl list-decimal list-inside mb-2 space-y-2' {...props} />,
                li: ({node, ...props}) => <li className='text-2xl text-black' {...props} />,
                hr: ({node, ...props}) => <hr className='border-primary border-2 my-4' {...props} />,
                blockquote: ({node, ...props}) => <blockquote className='text-xl border-l-4 border-primary bg-neutral-100 pl-4 pt-2 pb-1 text-neutral-800 mb-2 rounded' {...props} />,
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>
        </div>
        
        
        {/* right side images */}
        <div className='flex h-full items-center justify-center'>
          {getImageLayout(project.imageUrls)}
        </div>
      </div>
    </section>
  );
}

export default Layout1;