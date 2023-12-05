const VideoPlayer = () => {
  return (
    <section className="flex max-lg:flex-col gap-5 mx-3 mt-20 max-md:mt-10">
      <div>
        <video
          src="/assets/images/add-1.mp4"
          controls
          autoPlay
          loop
          muted
          style={{ height: "auto", width: "100%" }}
        ></video>
      </div>
      <div>
        <video
          src="/assets/images/add-2.mp4"
          muted
          loop
          autoPlay
          controls
          style={{ height: "auto", width: "100%" }}
        ></video>
      </div>
    </section>
  );
};

export default VideoPlayer;
