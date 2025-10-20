// Single image: centered and large
const singleImageLayout = (imageUrls) => (
  <div className='flex items-center justify-center h-full w-full'>
    <div 
      className='aspect-[4/3] w-4/5 bg-cover bg-center rounded-lg'
      style={{backgroundImage: `url(${imageUrls[0]})`}}
    />
  </div>
);

// Two images: top-left and bottom-right
const twoImageLayout = (imageUrls) => (
  <div className='h-full w-full'>
    <div className='w-full mx-auto h-full'>
      <div 
        className='grid grid-cols-1 gap-4 h-full'
        style={{gridTemplateRows: 'repeat(2, 1fr)'}}
      >
        <div className='flex justify-start'>
          <div 
            className='w-[500px] h-full bg-cover bg-center rounded-lg'
            style={{backgroundImage: `url(${imageUrls[0]})`}}
          />
        </div>
        <div className='flex justify-end'>
          <div 
            className='w-[500px] h-full bg-cover bg-center rounded-lg'
            style={{backgroundImage: `url(${imageUrls[1]})`}}
          />
        </div>
      </div>
    </div>
  </div>
);

// Three images: column with alternating left/right alignment
const threeImageLayout = (imageUrls) => (
  <div className='h-full w-full'>
    <div className='w-[600px] mx-auto h-full'>
      <div 
        className='grid grid-cols-1 gap-4 h-full'
        style={{gridTemplateRows: 'repeat(3, 1fr)'}}
      >
        <div className='flex justify-start'>
          <div 
            className='w-[350px] h-full bg-cover bg-center rounded-lg'
            style={{backgroundImage: `url(${imageUrls[0]})`}}
          />
        </div>
        <div className='flex justify-end'>
          <div 
            className='w-[350px] h-full bg-cover bg-center rounded-lg'
            style={{backgroundImage: `url(${imageUrls[1]})`}}
          />
        </div>
        <div className='flex justify-start'>
          <div 
            className='w-[350px] h-full bg-cover bg-center rounded-lg'
            style={{backgroundImage: `url(${imageUrls[2]})`}}
          />
        </div>
      </div>
    </div>
  </div>
);

// N images: just align them in a 2 x N/2 grid
const nImageLayout = (imageUrls) => {
  const rows = Math.ceil(imageUrls.length / 2);
  return (
    <div className='h-full w-full p-4'>
      <div 
        className='grid grid-cols-2 gap-4 h-full'
        style={{gridTemplateRows: `repeat(${rows}, 1fr)`}}
      >
        {imageUrls.map((url, index) => (
          <div 
            key={index}
            className='w-full h-full overflow-hidden rounded-lg'
          >
            <img 
              src={url}
              alt={`Image ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 

export const getImageLayout = (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return null;
  
  switch (imageUrls.length) {
    case 1:
      return singleImageLayout(imageUrls);
    case 2:
      return twoImageLayout(imageUrls);
    case 3:
      return threeImageLayout(imageUrls);
    default:
      return nImageLayout(imageUrls);
  }
};