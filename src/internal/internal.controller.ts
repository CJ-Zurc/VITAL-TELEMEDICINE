import { Controller, ForbiddenException, Get, Headers, Param } from '@nestjs/common';

@Controller('internal')
export class InternalController {
  @Get('users/:userId/roles')
  getUserRoles(
    @Param('userId') _userId: string,
    @Headers('x-internal-api-key') internalApiKey?: string,
  ) {
    const expectedKey = process.env.INTERNAL_API_KEY?.trim();

    if (!expectedKey || internalApiKey !== expectedKey) {
      throw new ForbiddenException('Invalid internal API key.');
    }

    return {
      success: true,
      data: {
        roles: [],
      },
    };
  }
}
