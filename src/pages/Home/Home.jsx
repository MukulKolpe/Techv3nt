import { Link } from "react-router-dom";
import { tm } from "../../assets";
import Main2 from "../../components/Main2";
import { styles, layout } from "../../style";

const Home = () => (
  <div className="flex flex-col items-center justify-center">
    <section id="product" className={`${layout.sectionReverse} p-8`}>
      <div className={layout.sectionImgReverse}>
        <img
          src={tm}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5] ml-5"
        />
        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>
      <div className={`${layout.sectionInfo} ml-10`}>
        <h2 className={styles.heading2}>
          Discover technical
          <br className="sm:block hidden" /> events around you!
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Techv3nt is a platform to find Technical Events, Meetups, Hackathons &
          Conferences around you.
        </p>
        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <Link
            to={"/events"}
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Get Started
            </span>
            <span class="relative invisible">Get Started</span>
          </Link>
        </div>
      </div>
    </section>
    <div className="m-6 w-[85%]">
      <Main2 />
    </div>
  </div>
);

export default Home;
