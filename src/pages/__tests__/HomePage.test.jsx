import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockMovies = [
    { id: 1, title: 'Movie One', vote_average: 8.2, popularity: 200, poster_path: '/path1.jpg' },
    { id: 2, title: 'Movie Two', vote_average: 7.5, popularity: 180, poster_path: '/path2.jpg' }
];

beforeEach(() => {
    axios.get.mockResolvedValue({
        data: {
            results: mockMovies
        }
    });
});

test('renders movie list', async () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );

    expect(await screen.findByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
});
