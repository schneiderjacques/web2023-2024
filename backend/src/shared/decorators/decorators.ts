import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// We user this decorator to mark a route as public
// A public route is a route that can be accessed without a token
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
