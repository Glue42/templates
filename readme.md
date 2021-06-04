# Glue42 Templates

# Modifying Launchpad Application
If you want to build a modified version of a launchpad application copy the templates/launchpad folder and do your modifications there. 
The way to modify the launchpad is by passing custom components

For example, let insert a custom logo that will be displayed in the upper right corner of LaunchPad:

```jsx
const myLogoComponent = () => {...}

<LaunchPad 
    components={{
        logo: myLogoComponent
    }}
/>
```

See the launchpad component readme file for full list of replaceable components.

# Modifying Global Search Application
If you want to build a modified version of the global search application copy the templates/global-search folder and do your modifications there. The way to modify the launchpad library is by passing custom components.

The ```<GlobalSearch />``` component uses the  [render prop react pattern](https://reactjs.org/docs/render-props.html) to let you insert a custom component in the place where the search results are returned. You can do this in the following way:

```jsx
const MyCustomGlobalSearchItem = props => {...}

<GlobalSearch 
    components={{
        renderGlobalSearchItem: MyCustomGlobalSearchItem
    }}
/>
```
