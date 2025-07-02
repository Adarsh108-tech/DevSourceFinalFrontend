function Footer() {
    return ( 
        <div className="flex  md:flex-row py-10 px-10 md:px-20 w-full justify-between pb-36 items-center md:text-center">
            <div className="md:text-4xl text-2xl mb-6 md:mb-0">
                <p className=" text-sky-500 text-center text-sm">USIC&T ACM STUDENT CHAPTER</p>
                <p>DevSource Club </p>
                <div className="flex gap-5 mt-5 justify-center md:justify-start">
                    <img src="/insta.svg" className="md:h-12 md:w-12 h-6 w-6 hover:bg-white hover:scale-125 rounded-lg duration-300" alt="Instagram" />
                    <img src="/whatsapp.svg" className="md:h-12 md:w-12 h-6 w-6 hover:bg-white hover:scale-125 rounded-lg duration-300" alt="WhatsApp" />
                    <img src="/linkdin.svg" className="md:h-12 md:w-12 h-6 w-6 hover:bg-white hover:scale-125 rounded-lg duration-300" alt="LinkedIn" />
                </div>
            </div>
            <div className="flex flex-col  md:flex-row gap-2  md:gap-10 items-center">
                <img src="/DevSourceLogo.png" className="md:h-20  w-20" alt="DevSource Logo" />
                <div className="md:text-2xl text-sm" >
                    <p>Bhuwan Thapa <span className="pl-2 font-bold text-orange-500 ">Lead</span></p>
                    <p>Adarsh Tiwari <span className="pl-2 font-bold text-yellow-500">Vice Lead</span> </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
