import { Link } from "react-router";
import Image from "../components/commons/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/commons/Search";
import Comments from "../components/Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullan modi
            emu aut.
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="">Written by</span>
            <Link to={"/test"} className="text-blue-500">
              John Doe
            </Link>
            <span>on</span>
            <Link to={"/test"} className="text-blue-500">
              Web Design
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            assumenda nobis quos obcaecati eaque iste, vel dolorem unde
            doloremque impedit odit sunt reprehenderit iure eum quas optio
            aliquid corrupti blanditiis!
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src="/postImg.jpeg" width={600} className="rounded-2xl" />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse iure
            perferendis ipsum laboriosam ut, eveniet cumque nam fugiat officia
            exercitationem, quam ipsa dolore minima, tempore molestiae! Dolor
            numquam incidunt dolores.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <Image
                src="/userImg.jpeg"
                className="size-12 rounded-full object-cover"
                width={48}
                height={48}
              />
              <Link to={"/test"} className="text-blue-800">
                John Doe
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <Link to={"/test"}>
                <Image src="/facebook.svg" width={25} height={25} />
              </Link>
              <Link to={"/test"}>
                <Image src="/instagram.svg" width={25} height={25} />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to={"/tes"} className="underline">
              All
            </Link>
            <Link to={"/tes"} className="underline">
              Web Design
            </Link>
            <Link to={"/tes"} className="underline">
              Development
            </Link>
            <Link to={"/tes"} className="underline">
              Databses
            </Link>
            <Link to={"/tes"} className="underline">
              Search Engines
            </Link>
            <Link to={"/tes"} className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments/>
    </div>
  );
};

export default Post;
