import staticSources from '../../../stats.generated.json';

const render = (options) => {
    const resources = staticSources[options.name];

    const links = `<link rel="stylesheet" href="${resources.css}" />`;

    const scripts = [
        `<script src="${staticSources.vendor.js}"></script>`,
        `<script src="${resources.js}"></script>`,
    ];

    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${options.title}</title>
            <meta content="width=device-width, initial-scale=1.0" name="viewport">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta http-equiv="cache-control" content="no-cache, no-store" />
            <link rel="icon" href="/favicon.png" />
            ${links}
          </head>
          <body>
              <div id="react-container">${options.content}</div>
            ${scripts.join('')}
          </body>
        </html>
        `;
};

export default render;
