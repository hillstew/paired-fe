import { fetchData } from './index';

describe('fetchData', () => {
  const mockData = [
    {
      pairer: {
        name: 'Aaron',
        id: 'r34o9djsd'
      }
    }
  ];
  const mockBody = '5th9fkdd';

  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      json: jest.fn(() => Promise.resolve({ data: mockData }))
    }));
  });

  it('should call fetch when fetchData is called', async () => {
    await fetchData(mockBody);
    expect(window.fetch).toHaveBeenCalled();
  });
  
  it('should return data if everything is okay', async () => {
    const result = await fetchData(mockBody);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if there is an errors property on the response', async () => {
    const mockError = 'No pairing exists with that id'
    window.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: jest.fn(() => Promise.resolve({ errors: [ { message: mockError } ] }))
      })
    );
    const expected = new Error(mockError);
    await expect(fetchData(mockBody)).rejects.toEqual(expected);
  });
});