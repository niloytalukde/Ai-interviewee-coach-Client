import UploadCv from "./_component/UploadCv";


const ShortlistedCandidates = () => {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold justify-center flex mt-5">Shortlisted  Candidates</h1>
            
            {/* Cv Upload From  */}
            <UploadCv/>
        </div>
    );
};

export default ShortlistedCandidates;