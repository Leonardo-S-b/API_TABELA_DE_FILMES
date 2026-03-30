import {Router} from 'express';

const router = Router();

router.get('/', (req, res) =>{
const filmes = [
    {
        id: 1,
        title: 'the saw',
        director: 'James Wan',
        releaseYear: 2004,
        genre: 'Horror',
        rating: 7.6,
        synopsis: 'A group of strangers wake up in a locked room, only to discover they are part of a sadistic game orchestrated by the Jigsaw Killer, who forces them to make life-or-death decisions to survive.'

    },
    {
        id: 2,
        title: 'the conjuring',
        director: 'James Wan',
        releaseYear: 2013,
        genre: 'Horror',
        rating: 7.5,
        synopsis: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse, uncovering a chilling history of supernatural occurrences.'
    },
    {
        id: 3,
        title: 'the exorcist',
        director: 'William Friedkin',
        releaseYear: 1973,
        genre: 'Horror',
        rating: 8.0,
        synopsis: 'A mother seeks the help of two priests to save her daughter, who is possessed by a demonic entity, leading to a terrifying battle between good and evil.'
    },
    {
        id: 4,
        title: 'the ring',
        director: 'Gore Verbinski',
        releaseYear: 2002,
        genre: 'Horror',
        rating: 7.1,
        synopsis: 'A journalist investigates a mysterious videotape that is said to cause the death of anyone who watches it within seven days, uncovering a dark and haunting secret.'
    },
    {
        id: 5,
        title: 'dumb and dumber',
        director: 'Peter Howitt',
        releaseYear: 1994,
        genre: 'Comedy',
        rating: 6.9,
        synopsis: 'Two dim-witted friends set out on a cross-country road trip to find a lost inheritance, encountering various mishaps and comedic situations along the way.'
    },
    {
        id: 6, 
        title: 'the hangover',
        director: 'Todd Phillips',
        releaseYear: 2009,
        genre: 'Comedy',
        rating: 7.7,
        synopsis: 'After a wild bachelor party in Las Vegas, three friends wake up with no memory of the previous night and must retrace their steps to find their missing friend before his wedding.'
    },
    {
        id: 7,
        title: 'superbad',
        director: 'Greg Mottola',
        releaseYear: 2007,
        genre: 'Comedy',
        rating: 7.6,
        synopsis: 'Two high school friends navigate the challenges of adolescence and try to make the most of their last days before graduation, leading to a series of hilarious and awkward situations.'
    },
    {
        id: 8,
        title: 'the 40-year-old virgin',
        director: 'Judd Apatow',
        releaseYear: 2005,
        genre: 'Comedy',
        rating: 7.1,
        synopsis: 'A middle-aged man who has never had sex tries to find love and lose his virginity, with the help of his friends, leading to a mix of awkward and heartwarming moments.'
    },
    {
        id: 9,
        title: 'broke back mountain',
        director: 'Ang Lee',
        releaseYear: 2005,
        genre: 'Romance',
        rating: 7.7,
        synopsis: 'Two cowboys form a deep emotional and romantic bond while working together on a remote mountain, facing societal challenges and personal struggles over the years.'
    },
    {
        id: 10,
        title: 'her',
        director: 'Spike Jonze',
        releaseYear: 2013,
        genre: 'Romance',
        rating: 8.0,
        synopsis: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need, exploring themes of love, technology, and human connection.'
    }
]
res.status(200).json(filmes);
});

export const filmesRouter = router;

