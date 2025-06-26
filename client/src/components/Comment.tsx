import Image from "./commons/Image";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src="/userImg.jpeg"
          className="size-10 rounded-full object-cover"
          width={40}
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>

      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          temporibus reprehenderit eius ut ullam modi quaerat doloribus nisi
          voluptate dolores esse nesciunt, quibusdam expedita ex libero voluptas
          id praesentium quos?
        </p>
      </div>
    </div>
  );
};

export default Comment;
