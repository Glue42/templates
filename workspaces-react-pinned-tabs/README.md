# Glue42 Workspaces in React with Pinned Tabs

This is a template for creating a React Workspaces application for [**Glue42 Enterprise**](https://glue42.com/enterprise/) or [**Glue42 Core**](https://glue42.com/core/).

The Workspaces App is a web application (also called Frame) which comes with **Glue42 Enterprise**. This application is the shell that can hold multiple [Workspaces](https://docs.glue42.com/glue42-concepts/windows/workspaces/overview/index.html#workspaces_concepts-workspace) as tabs in a single or multiple windows (Frames). The Frame application is a vital element in the Workspaces functionality as it handles opening and closing Workspaces, arranging windows in a Workspace, adding or removing Workspaces and windows.

## Custom Components

- `CustomWorkspaces.tsx` - component which adds custom buttons and pinned Workspace logic to the `<Workspaces/>` component.
- `CustomWorkspaceContents.tsx` - component which replaces the Workspace contents to showcase how to render the Workspace conditionally.

## Prerequisites

For a **Glue42 Enterprise** project, you need to have [**Glue42 Enterprise**](https://glue42.com/enterprise/) 3.11 or newer.

For a **Glue42 Core** project, you need to have [**Glue42 Core**](https://glue42.com/core/) V2.

## Usage

To run the template in **Glue42 Enterprise**:

- Run `npm install` to install all dependencies.
- Run `npm run start` to start the app.
- Copy the Workspaces App configuration file from `"./app-config/workspaces.json"` in the configuration folder of **Glue42 Enterprise** (`%LocalAppData%/GlueDesktop/config/apps`).
- Start **Glue42 Enterprise**.
- Start the Workspaces UI application.

To run the template in **Glue42 Core**:

- Run `npm install` to install all dependencies.
- Run `npm run start` to start the app.
- Update the Workspaces App location to `http://localhost:3000` in the [Web Platform configuration](https://core-docs.glue42.com/capabilities/windows/workspaces/enabling-workspaces/index.html#main_application) of your Main app.
- Start your Main app.
- Open a Workspace - for more details, see the [**Glue42 Core** Workspaces documentation](https://core-docs.glue42.com/capabilities/windows/workspaces/workspaces-api/index.html#workspace-creating_workspaces).

## Main Functionalities

The template initializes the `<Workspaces/>` component and adds two buttons with icons the styles for which are located in `./src/App.css`. After that, it opens two Workspaces with predifined configs located in `./src/workspaceDefinitions.ts` and assigns them to their corresponding buttons. The component subsrcibes for Workspace selection changes in order to change the color of the icons. Before starting the application, make sure you have passed valid application names to the `getDocsWorkspace()` and `getClientWorkspace()` methods in `./CustomWorkspaces.tsx`.

The component also adds a `ToggleWorkspaceContents` button which demonstrates how you can mount and unmount the Workspace contents component and show your own component in its place through conditional rendering.

## Customizing the Template

### Using Layouts

To use Workspaces Layouts, invoke the `restoreWorkspace()` method and make sure to pass the `"noTabHeader": true` flag to hide the Workspace tab header element.

### Adding Buttons

To add buttons dynamically, load more buttons as components in the desired zone, invoke either `createWorkspace()` or `restoreWorkspace()` and make sure to pass the `"noTabHeader": true` flag.

### Changing the Icons 

The icons are located in `./src/App.css` and can be changed from there.

### Identifying Workspaces

Depending on your use case, you can identify the Workspaces either by their `layoutName` property or by adding a flag in their context.
