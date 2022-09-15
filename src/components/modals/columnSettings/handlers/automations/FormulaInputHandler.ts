import { ColumnSettingsHandlerResponse } from "cdm/ModalsModel";
import { AbstractHandlerClass } from "patterns/AbstractHandler";
import { Setting } from "obsidian";
export class FormulaInputHandler extends AbstractHandlerClass<ColumnSettingsHandlerResponse>  {
    settingTitle: string = 'Enable link alias';
    handle(columnHandlerResponse: ColumnSettingsHandlerResponse): ColumnSettingsHandlerResponse {
        const { column, containerEl, columnSettingsManager } = columnHandlerResponse;
        const { view } = columnSettingsManager.modal;
        const { config } = column

        const formula_promise = async (value: string) => {
            // Persist value
            await view.diskConfig.updateColumnConfig(column.key, {
                formula_query: value
            });
            columnSettingsManager.modal.enableReset = true;
        }

        new Setting(containerEl)
            .setName('Formula input')
            .setDesc('Enter your formula here using your js function names')
            .addTextArea((textArea) => {
                textArea.setValue(config.formula_query);
                textArea.setPlaceholder('Write here your formula');
                textArea.onChange(formula_promise);
            });
        const mainDesc = containerEl.createEl('p');

        mainDesc.appendText('Check our ');
        mainDesc.appendChild(
            createEl('a', {
                text: "documentation",
                href: "https://rafaelgb.github.io/obsidian-db-folder/features/Formulas/",
            })
        );

        mainDesc.appendText(' for more information about how to use formulas');
        return this.goNext(columnHandlerResponse);
    }
}