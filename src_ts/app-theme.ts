import { html } from "lit-element";

const appTheme = html`
    <style>
         :host {
            --primary-color: #0099ff;
            --primary-text-color: rgba(0, 0, 0, 0.87);
            --secondary-text-color: rgba(0, 0, 0, 0.54);
         }
    </style>
`;

export default appTheme;