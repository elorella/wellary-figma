import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export type Category =
  | "weight"
  | "wake-up-time"
  | "activity"
  | "shower"
  | "breakfast"
  | "snacks"
  | "dinner"
  | "liquid"
  | "supplements"
  | "poopy"
  | "working-hours"
  | "stomach-feeling"
  | "anything-else"
  | "wind-down"
  | "sleep";

export interface LogItem {
  id: string;
  category: Category;
  content: string;
  date: string;
  timestamp: number;
  duration?: number;
}

export interface ResponseMessage {
  message: string;
  data?: LogItem;
}

// Utility function to build HTTP responses
const buildResponse = (statusCode: number, responseMessage?: ResponseMessage): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(responseMessage),
  };
};

// POST handler
const postHandler = async (event: APIGatewayEvent,): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return buildResponse(400, { message: 'Invalid request, no body provided' });
    }

    const data: LogItem = JSON.parse(event.body);

    // Example logic for processing the POST request
    const response : ResponseMessage= {
      message: 'POST request processed successfully',
      data,
    };

    return buildResponse(200, response);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return buildResponse(500, { message: 'Internal Server Error' });
  }
};

// Main Lambda handler
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event));

  switch (event.httpMethod) {
    case 'POST':
      return await postHandler(event);
    default:
      return buildResponse(405, { message: 'Method Not Allowed' });
  }
};