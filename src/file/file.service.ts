import { Module } from "@nestjs/common";
import { FileService } from "./file.module";

@Module({
providers: [FileService],
exports: [FileService]
})
export class  FileModule {}