import uplWhite from './uplWhite.svg'; 
import ReactMarkdown from 'react-markdown';
import MetaBalls from './MetaBalls';
import GlassSurface from './GlassSurface';
import { getImageLayout } from '../utils/imageLayouts';

function Layout2({ project }) {
  
  return (
    <section className="bg-primary w-full h-full relative">
      <div className="absolute inset-0 w-full h-full">
        {/* Black spots */}
        <MetaBalls
          color="#000000"
          cursorBallColor="#000000"
          cursorBallSize={1}
          ballCount={15}
          animationSize={15}
          enableMouseInteraction={false}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1.9}
          speed={0.15}
        />
      </div>
      {/* White spots */}
      <div className="absolute inset-0 w-full h-full">
        <MetaBalls
          color="#ffffff"
          cursorBallColor="#ffffff"
          cursorBallSize={1}
          ballCount={15}
          animationSize={18}
          enableMouseInteraction={false}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1.4}
          speed={0.25}
        />
      </div>
      
      {/* Glass effect top bar */}
      <div className="absolute top-12 left-12 right-12 flex">
        <div className="w-full">
          <GlassSurface
            className='px-12'
            style={{ width: '100%', height: 'auto' }}
            borderRadius={100}
            backgroundOpacity={0.2}
            saturation={1.1}
            brightness={50}
            opacity={1.6}
            blur={24}
            displace={0.5}
            redOffset={0}
            greenOffset={20}
            blueOffset={30}
          >
            <div className='flex w-full justify-between items-center text-white'>
              <div className='flex flex-row items-baseline gap-5'>
                <h1 className='text-7xl font-bold'>
                  {project.title}
                </h1>
                <h3 className='text-2xl font-bold'>
                  by&nbsp;{project.metadata.author} | {project.metadata.date}
                </h3>
              </div>
              
              <img 
                src={uplWhite}
                className="w-24 h-24"
                alt="UPL Logo"
              />
            </div>
             
          </GlassSurface>
        </div>
      </div>

      {/* Content section */}
      <div className='absolute top-48 left-12 right-12 bottom-12 flex gap-8'>
        {/* Left side - markdown content */}
        <div className='flex-1 flex items-center justify-center'>
          <div 
            className='bg-white rounded-3xl p-8 bg-white'
            style={{
              backgroundImage: `radial-gradient(circle, #b70101 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '20px 20px'
            }}
          >
            <div className='prose prose-lg bg-white bg-opacity-80 rounded-2xl p-6'>
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
        </div>
        
        {/* Right side - images */}
        <div className='flex-1 flex items-center justify-center'>
          {getImageLayout(project.imageUrls)}
        </div>
      </div>
    </section>
  ); 
  
}

export default Layout2;