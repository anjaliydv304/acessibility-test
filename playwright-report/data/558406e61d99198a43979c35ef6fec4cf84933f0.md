# Page snapshot

```yaml
- heading "Couldn't find story matching 'button--primary'." [level=1]
- paragraph: "The component failed to render properly, likely due to a configuration issue in Storybook. Here are some common causes and how you can address them:"
- list:
  - listitem:
    - strong: Missing Context/Providers
    - text: ": You can use decorators to supply specific contexts or providers, which are sometimes necessary for components to render correctly. For detailed instructions on using decorators, please visit the"
    - link "Decorators documentation":
      - /url: https://storybook.js.org/docs/writing-stories/decorators
    - text: .
  - listitem:
    - strong: Misconfigured Webpack or Vite
    - text: ": Verify that Storybook picks up all necessary settings for loaders, plugins, and other relevant parameters. You can find step-by-step guides for configuring"
    - link "Webpack":
      - /url: https://storybook.js.org/docs/builders/webpack
    - text: or
    - link "Vite":
      - /url: https://storybook.js.org/docs/builders/vite
    - text: with Storybook.
  - listitem:
    - strong: Missing Environment Variables
    - text: ": Your Storybook may require specific environment variables to function as intended. You can set up custom environment variables as outlined in the"
    - link "Environment Variables documentation":
      - /url: https://storybook.js.org/docs/configure/environment-variables
    - text: .
- code: "- Are you sure a story with that id exists? - Please check your stories field of your main.js config. - Also check the browser console and terminal for error messages."
```