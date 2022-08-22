export interface MediaSettings {
    enable_media_view: boolean;
    width: number;
    height: number;
}

export type FilterCondition = {
    field: string;
    operator: string;
    value?: any;
}
/**
 * Options that affects the behavior of the plugin and defines default values with some fields
 */
export interface GlobalSettings {
    enable_debug_mode: boolean;
    logger_level_info: string;
    media_settings: MediaSettings;
    enable_dnd: boolean;
    enable_show_state: boolean;
}

export interface LocalSettings {
    group_folder_column: string;
    cell_size: string;
    sticky_first_column: boolean;
    remove_field_when_delete_column: boolean;
    show_metadata_created: boolean;
    show_metadata_modified: boolean;
    show_metadata_tasks: boolean;
    source_data: string;
    source_form_result: string;
    frontmatter_quote_wrap: boolean;
    row_templates_folder: string;
    current_row_template: string;
}

export interface FilterSettings {
    enabled: boolean;
    conditions: FilterCondition[];
}

export interface DatabaseSettings {
    global_settings: GlobalSettings;
    local_settings: LocalSettings;
}