import { KeywordMapRepository } from "../repositories/keywordmap.repository";
import { KeywordRepository } from "../repositories/keyword.repository";
import { ProjectRepository } from "../repositories/project.repository";
import { Keyword } from "../models/keyword";
import { KeywordMap } from "../models/keywordmap";
export declare class KeywordsController {
    private keymapRepo;
    private keyRepo;
    private projectRepo;
    constructor(keymapRepo: KeywordMapRepository, keyRepo: KeywordRepository, projectRepo: ProjectRepository);
    getIDbyKeyword(keyword: string): Promise<Keyword>;
    getKeywordByID(id: number): Promise<Keyword>;
    createNewKeyword(key: Keyword): Promise<Keyword>;
    createKeywordMap(keymap: KeywordMap): Promise<KeywordMap>;
    getProjectIDsByKeywordID(keyword_id: number): Promise<Array<Number>>;
    removeKeywordsByProjectID(project_id: number): Promise<number>;
    removeProjectsByKeywordID(keyword_id: number): Promise<number>;
    removeKeywordMapEntry(keymap: KeywordMap): Promise<boolean>;
    getAllKeywords(): Promise<Array<Keyword>>;
}
