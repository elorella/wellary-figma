import { handler, LogItem } from './handler';
import { APIGatewayEvent, Context } from 'aws-lambda';

describe('Lambda Handler', () => {
  const mockContext: Context = {} as Context;

  it('should return 200 for a valid POST request', async () => {
    const logItem: LogItem = {
        id: '1',
        category: 'weight' as const,
        content: '70kg',
        date: '2024-06-01',
        timestamp: 1712131200,
    };
    
    const mockEvent: APIGatewayEvent = {
      httpMethod: 'POST',
      body: JSON.stringify(logItem),
    } as APIGatewayEvent;

    const result = await handler(mockEvent, mockContext);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();

    const body = JSON.parse(result.body);
    expect(body.message).toBe('POST request processed successfully');
    expect(body.data).toEqual(logItem);
  });

  it('should return 400 for a POST request with no body', async () => {
    const mockEvent: APIGatewayEvent = {
      httpMethod: 'POST',
      body: null,
    } as APIGatewayEvent;

    const result = await handler(mockEvent, mockContext);

    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body.message).toBe('Invalid request, no body provided');
  });

  it('should return 405 for unsupported HTTP methods', async () => {
    const mockEvent: APIGatewayEvent = {
      httpMethod: 'GET',
      body: null,
    } as APIGatewayEvent;

    const result = await handler(mockEvent, mockContext);

    expect(result.statusCode).toBe(405);
    const body = JSON.parse(result.body);
    expect(body.message).toBe('Method Not Allowed');
  });

  it('should return 500 for internal server errors', async () => {
    const mockEvent: APIGatewayEvent = {
      httpMethod: 'POST',
      body: 'invalid-json',
    } as APIGatewayEvent;

    const result = await handler(mockEvent, mockContext);

    expect(result.statusCode).toBe(500);
    const body = JSON.parse(result.body);
    expect(body.message).toBe('Internal Server Error');
  });
});