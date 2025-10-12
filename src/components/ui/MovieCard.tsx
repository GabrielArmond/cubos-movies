import { CardLoading } from './CardLoading';

interface Props {
  title: string;
  backdropPath: string | null;
  genres?: string[];
  progress?: number;
}

export const MovieCard = ({ title, backdropPath, genres, progress }: Props) => {
  const genreList = genres ?? [];

  return (
    <>
      <div className="group rounded-lg shadow-md overflow-hidden w-full max-w-[183px] h-[281px] lg:w-60 lg:h-[355px] lg:max-w-[260px] lg:max-h-[360px] relative cursor-pointer hover:scale-105 transition-transform duration-200">
        <img
          src={backdropPath ? backdropPath : 'SEM FOTO'}
          alt={title}
          className="w-full h-full object-cover"
        />
        {progress && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <CardLoading progress={progress} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 lg:p-4">
          <h3 className="montserrat uppercase text-left text-sm lg:text-base font-bold lg:font-semibold line-clamp-2 text-[#EEEEEE]">
            {title}
          </h3>
          {genreList.length > 0 && (
            <p className="montserrat text-left text-xs lg:text-sm text-[#B4B4B4] mt-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
              {genreList.join(', ')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
