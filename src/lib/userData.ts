import IUser from '../module/user/entities/IUser';

const randomPassword = () => Math.random().toString(36).slice(-8);

const userData: IUser[] = [
    {
        name: 'JohnDoe123',
        email: 'john.doe@example.com',
        password: randomPassword(),
        dateOfBirth: '1985-05-10T10:30:00.000Z',
        address: '123 Main Street',
        phoneNumber: '555-1234',
        isAdmin: false,
        interests: ['coding', 'reading'],
    },
    {
        name: 'AliceSmith',
        email: 'alice.smith@example.com',
        password: randomPassword(),
        dateOfBirth: '1990-08-22T08:15:00.000Z',
        address: '456 Oak Avenue',
        phoneNumber: '555-5678',
        isAdmin: true,
        interests: ['traveling', 'photography'],
    },
    {
        name: 'EmmaJohnson',
        email: 'emma.johnson@example.com',
        password: randomPassword(),
        dateOfBirth: '1988-12-05T15:45:00.000Z',
        address: '789 Pine Street',
        phoneNumber: '555-8765',
        isAdmin: false,
        interests: ['painting', 'gardening'],
    },
    {
        name: 'RobertMiller',
        email: 'robert.miller@example.com',
        password: randomPassword(),
        dateOfBirth: '1982-07-18T12:00:00.000Z',
        address: '101 Cedar Lane',
        phoneNumber: '555-4321',
        isAdmin: false,
        interests: ['cooking', 'music'],
    },
    {
        name: 'SophieBrown',
        email: 'sophie.brown@example.com',
        password: randomPassword(),
        dateOfBirth: '1993-03-28T09:20:00.000Z',
        address: '222 Elm Street',
        phoneNumber: '555-9876',
        isAdmin: false,
        interests: ['hiking', 'writing'],
    },
    {
        name: 'DavidJones',
        email: 'david.jones@example.com',
        password: randomPassword(),
        dateOfBirth: '1987-09-15T14:10:00.000Z',
        address: '333 Maple Avenue',
        phoneNumber: '555-3456',
        isAdmin: true,
        interests: ['sports', 'movies'],
    },
];

export default userData;
