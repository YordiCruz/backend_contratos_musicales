import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';
export declare class MediaService {
    private readonly mediaRepo;
    constructor(mediaRepo: Repository<Media>);
    findAll(): Promise<Media[]>;
    findOne(id_media: string): Promise<Media>;
    update(id_media: string, dto: UpdateMediaDto): Promise<Media>;
    remove(id_media: string): Promise<{
        message: string;
    }>;
}
