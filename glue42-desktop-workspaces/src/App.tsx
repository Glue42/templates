import React, { useContext, useEffect } from 'react';
import Workspaces, {getFrameId} from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "./index.css";
import { GlueContext } from '@glue42/react-hooks';
import { Glue42 } from '@glue42/desktop';
import { Glue42Workspaces } from '@glue42/workspaces-api';
import { UnsubscribeFunction } from 'callback-registry';
// import { Glue42Workspaces } from '@glue42/workspaces-api';
// import { Glue42Web } from "@glue42/web";
// import { Glue42 } from "@glue42/desktop";

const App = () => {
    (window as any).glue = useContext(GlueContext);
    
    useEffect(() => {
        const shortcuts: { [id: string]: UnsubscribeFunction } = {};
        
        const registerKeyToFocusWS = async (frame: Glue42Workspaces.Frame, workspace: Glue42Workspaces.Workspace, index: number) => {
            if (index >= 9) {
                // we don't need to register
                return;
            }
           
            const key = `ctrl+${index}`;
            const un = await frame?.registerShortcut(key, () => {
                workspace.focus();
            })
            shortcuts[workspace.id] = un;
        };

        const registerKeyToOpenLastWS = (frame: Glue42Workspaces.Frame) => {
            frame.registerShortcut("ctrl+9", async () => {
                const ws = await frame.workspaces();
                ws[ws.length - 1]?.focus();
            });
        };

        const registerKeyToSwitchNextWS = (frame: Glue42Workspaces.Frame) => {
            frame.registerShortcut("ctrl+tab", async () => {
                const ws = await frame.workspaces();
                const selected = ws.find((ws) => ws.isSelected);
                const positionIndex = selected?.positionIndex;
                if (typeof positionIndex === "number") {
                    const nextWsIndex = positionIndex + 1;
                    let forSelecting:  Glue42Workspaces.Workspace | undefined = ws[0];
                    if (nextWsIndex < ws.length) {
                        forSelecting = ws.find((w) => w.positionIndex === nextWsIndex);
                    }
                    forSelecting?.focus();
                }
            });
        };

        const registerKeyToCloseFocusedWS = (frame: Glue42Workspaces.Frame) => {
            frame.registerShortcut("ctrl+f4", async () => {
                const ws = await frame.workspaces();
                const selected = ws.find((ws) => ws.isSelected);
                selected?.close();
            });
        };

        const registerKeys = async (frame: Glue42Workspaces.Frame) => {
             const workspaces = await frame?.workspaces();
                workspaces.forEach((workspace, index) => {
                    registerKeyToFocusWS(frame, workspace, index + 1);
                });
        }

        const glueTyped = (window as any).glue as Glue42.Glue;
        glueTyped?.workspaces?.waitForFrame(getFrameId())
            .then(async (frame) => {
                registerKeyToOpenLastWS(frame);
                registerKeyToSwitchNextWS(frame);
                registerKeyToCloseFocusedWS(frame);
                registerKeys(frame);

                frame?.onWorkspaceOpened(async (workspace) => {
                    const workspaces = await frame?.workspaces();
                    registerKeyToFocusWS(frame, workspace, workspaces.length);
                });
                frame?.onWorkspaceClosed(() => {
                    Object.values(shortcuts).forEach((un) => {
                        if (typeof un === "function") {
                            un();
                        }
                    });
                    registerKeys(frame);
                });
            })
        return () => {
            Object.values(shortcuts).forEach((un)=> un());
        }
    }, []);
  
    return (
        <Workspaces/>
    );
}

// const App = () => {
//     const waitForMyFrame = (glue: Glue42Web.API | Glue42.Glue) => {
//         return new Promise<Glue42Workspaces.Frame>(async (res, rej) => {
//             const unsub = await glue.workspaces?.onFrameOpened((f) => {
//                 if (f.id === getFrameId()) {
//                     res(f);
//                     if (unsub) {
//                         unsub();
//                     }
//                 }
//             });
//             const frames = await glue.workspaces?.getAllFrames();
//             const myFrame = frames?.find(f => f.id === getFrameId());

//             if (myFrame) {
//                 res(myFrame);
//                 if (unsub) {
//                     unsub();
//                 }
//             }
//         });
//     };

//     useGlue(async (glue) => {
//         const myFrame = await waitForMyFrame(glue as any);
//         const wsp = (await myFrame.workspaces())[0];
//         const newWsp = await glue.workspaces?.restoreWorkspace("example2", {title: "example2", reuseWorkspaceId: wsp.id} as any);
//         await newWsp?.setTitle("Default");
//     });

//     return (
//         <Workspaces />
//     );
// }

export default App;