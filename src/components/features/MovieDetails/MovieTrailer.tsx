interface MovieTrailerProps {
  trailerUrl?: string;
  title: string;
}

export const MovieTrailer = ({ trailerUrl, title }: MovieTrailerProps) => {
  if (!trailerUrl) {
    return (
      <div className="bg-[var(--background)] p-6 rounded-lg w-full">
        <h3 className="text-2xl montserrat text-left font-bold text-white mb-4">
          Trailer
        </h3>
        <div className="aspect-video bg-[var(--muted)] rounded-lg flex items-center justify-center">
          <p className="text-[var(--muted-foreground)]">
            Trailer não disponível
          </p>
        </div>
      </div>
    );
  }

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(trailerUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : trailerUrl;

  return (
    <div className="bg-[var(--background)] p-6 rounded-lg w-full">
      <h3 className="text-2xl montserrat text-left font-bold text-white mb-4">
        Trailer
      </h3>
      <div className="aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          title={`Trailer - ${title}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
