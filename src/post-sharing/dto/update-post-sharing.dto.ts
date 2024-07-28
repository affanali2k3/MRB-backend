import { PartialType } from '@nestjs/mapped-types';
import { CreatePostSharingDto } from './create-post-sharing.dto';

export class UpdatePostSharingDto extends PartialType(CreatePostSharingDto) {}
