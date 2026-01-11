/* eslint-disable @typescript-eslint/no-explicit-any */

export const generateRoute = (sidebarItems: any[]) => {
  return sidebarItems.flatMap((section) =>
    section.items
      .filter((item: any) => item.Component) // safety check
      .map((item: any) => ({
        path: item.url,
        Component: item.Component,
      }))
  );
};
