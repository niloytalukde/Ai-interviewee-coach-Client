import UploadCv from "./_component/UploadCv";

;

const ShortlistedCv = () => {
    return (
         <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold justify-center flex mt-5">Shortlisted  CV</h1>
            
            {/* Cv Upload From  */}
            <UploadCv/>
        </div>
    );
};

export default ShortlistedCv;