import Image from "next/image";

export async function generateStaticParams() {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json();
    return res.results.map((movie) => ({
        movie: toString(movie.id),
    }))
}

const MovieDetail = async ({ params }) => {
    const { movie } = params;
    const imagePath = 'https://image.tmdb.org/t/p/original/';
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`);
    const res = await data.json();

    return (
        <div>
            <div>
                <h2 className="text-2xl">{res.title}</h2>
                <h2 className="text-lg">{res.release_date}</h2>
                <h2>Runtime: {res.runtime} minutes</h2>
                <h2 className="bg-green-600 inline-block rounded-full my-2 px-4 py-2 text-sm">{res.status}</h2>
                <Image
                    src={imagePath + res.backdrop_path} alt={`Image of ${res.title}`}
                    className="my-12 w-full"
                    width={1000} height={1000} priority />
                <p>{res.overview}</p>
            </div>
        </div>
    )
}

export default MovieDetail