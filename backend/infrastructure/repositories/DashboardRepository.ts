import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

import { getExpiryTime } from '../../application/getExpiryTime';

import { MissingEnvironmentVariablesDynamoError } from '../../errors/errors';
import { hashFromString } from '../../application/hashFromString';

/**
 * @description Factory function to create a DynamoDB repository.
 */
export function createNewDynamoDbRepository() {
  return new DynamoRepository();
}

/**
 * @description Concrete implementation of DynamoDB repository.
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html
 */
class DynamoRepository {
  readonly dynamoDb: DynamoDBClient;
  readonly tableName: string;
  readonly region: string;

  constructor() {
    const REGION = process.env.REGION;
    const TABLE_NAME = process.env.TABLE_NAME;
    if (!REGION || !TABLE_NAME) throw new MissingEnvironmentVariablesDynamoError();

    this.tableName = TABLE_NAME;
    this.region = REGION;
    this.dynamoDb = new DynamoDBClient({ region: this.region });
  }

  /**
   * @description Get data from DynamoDB with a Query.
   */
  public async get(key: string): Promise<any> {
    const command = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: hashFromString(key) }
      }
    };

    const result = await this.dynamoDb.send(new QueryCommand(command));

    // Only return fresh data if it exists
    if (result?.Items && result?.Items?.length > 0) {
      return result.Items.map((item: Record<string, any>) => {
        const expiresAt = item.expiresAt.S;
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < expiresAt) return JSON.parse(item.data.S);
      })[0];
    }
  }

  /**
   * @description Cache/store data with PutItem.
   */
  public async store(key: string, data: Record<string, any>): Promise<void> {
    const command = {
      TableName: this.tableName,
      Item: {
        pk: { S: hashFromString(key) },
        data: { S: JSON.stringify(data) },
        expiresAt: { S: getExpiryTime() }
      }
    };

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') await this.dynamoDb.send(new PutItemCommand(command));
  }
}
