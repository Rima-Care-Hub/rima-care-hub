import { SetMetadata} from '@nestjs/common';

export const jwtConstants = {
    secret: 'DO NOT USER THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.' // You will create your own secret
}

// variable for declaring routes as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)