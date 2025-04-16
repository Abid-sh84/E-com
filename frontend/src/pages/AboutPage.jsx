import PageTemplate from "../components/PageTemplate";

const AboutPage = () => {
  return (
    <PageTemplate 
      title="About Us" 
      subtitle="The story behind Starry Comics - your cosmic superhero merchandise destination"
    >
      <div className="space-y-6 text-indigo-200">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6">Our Story</h2>
        
        <p>
          Founded in 2020, Starry Comics emerged from a shared passion for superhero culture and comic book artistry. What began as a small online shop run by a group of comic enthusiasts has evolved into a premier destination for superhero merchandise across all universes.
        </p>
        
        <p>
          Our mission is to bring the magic and wonder of comic book universes into everyday life through high-quality, officially licensed products that celebrate the characters and stories we all love.
        </p>
        
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Authentic Products</h3>
            <p className="text-sm text-indigo-300">We partner directly with official licensees to ensure every product is authentic and high-quality.</p>
          </div>
          
          <div className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Global Community</h3>
            <p className="text-sm text-indigo-300">We ship to over 50 countries, connecting superhero fans across the globe.</p>
          </div>
          
          <div className="bg-indigo-900/50 p-6 rounded-xl border border-indigo-700/50 transform hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fan First Approach</h3>
            <p className="text-sm text-indigo-300">Created by fans, for fans. We prioritize what collectors and enthusiasts truly want.</p>
          </div>
        </div>
        
        <p>
          Today, our team consists of 15 dedicated comic enthusiasts, designers, and customer support specialists. Together, we curate a comprehensive collection spanning Marvel, DC, Anime, and independent comic universes.
        </p>
        
        <p>
          Whether you're looking for a premium collector's item or everyday superhero apparel, Starry Comics is committed to helping you find the perfect way to celebrate your favorite characters and stories.
        </p>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6 text-center">Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-indigo-900/50 p-6 rounded-lg border border-indigo-700/50 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
              <img src="/images/avatars/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white">Sarah Parker</h3>
            <p className="text-yellow-300 mb-2">Founder & CEO</p>
            <p className="text-sm text-indigo-300">Comic collector for 15+ years with a passion for bringing superhero stories to life.</p>
          </div>
          
          <div className="bg-indigo-900/50 p-6 rounded-lg border border-indigo-700/50 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
              <img src="/images/avatars/creative.jpg" alt="Creative Director" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white">Mark Johnson</h3>
            <p className="text-yellow-300 mb-2">Creative Director</p>
            <p className="text-sm text-indigo-300">Former graphic novelist with a keen eye for merchandise that truly represents beloved characters.</p>
          </div>
          
          <div className="bg-indigo-900/50 p-6 rounded-lg border border-indigo-700/50 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
              <img src="/images/avatars/cto.jpg" alt="CTO" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white">Aisha Patel</h3>
            <p className="text-yellow-300 mb-2">CTO</p>
            <p className="text-sm text-indigo-300">Tech expert ensuring our cosmic shopping experience is as seamless as space travel.</p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AboutPage;
