import { MediaService } from './media.service';
import { UpdateMediaDto } from './dto/update-media.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    findAll(): Promise<import("./entities/media.entity").Media[]>;
    findOne(id: string): Promise<import("./entities/media.entity").Media>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<import("./entities/media.entity").Media>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
