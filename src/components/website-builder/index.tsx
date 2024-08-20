"use client";
import gjspresetwebpage from "grapesjs-preset-webpage";
import gjsblockbasic from "grapesjs-blocks-basic";
import customCodePlugin from "grapesjs-custom-code";
import "grapesjs/dist/css/grapes.min.css";
import sty from "grapesjs-style-bg";
import "grapesjs-component-code-editor/dist/grapesjs-component-code-editor.min.css";
import pluginTooltip from "grapesjs-tooltip";
//@ts-ignore
import templae from "grapesjs-templates";
import { myCustomPlugin } from "./custom";
//@ts-ignore
import scd from "grapesjs-component-code-editor";
import grapesjsFloat from "grapesjs-float";
import typed from "grapesjs-typed";
//@ts-ignore
import * as tabs from "grapesjs-tabs";
import { useLayoutEffect, useState } from "react";
import grapesjs from "grapesjs";
import parserPostCSS from "grapesjs-parser-postcss";
import { minifyCSS, minifyHTML, minifyJS } from "@/lib/minify";
import api, { API_URL } from "@/lib/api";
import { useStore, useToken } from "@/store/auth.store";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/new-website.store";
import { revalidateTagServer } from "@/services/revalideTag";
import { getNames } from "@/lib/name-template";
import { generateHEX } from "@/lib/hex";
interface IProps {
  projectId: string;
  templateId?: string | null;
}

function transformData(data: any) {
  const VALUES = [
    { name: "##siteName", value: data.siteName },
    { name: "##name", value: data.name },
    { name: "##crp", value: data.crp },
    { name: "##about", value: data.about },
    { name: "##logo", value: data.logo },
    {
      name: "##service",
      value:
        data.serviceType === "online_e_presencial"
          ? "online e presencial"
          : data.serviceType,
    },
    { name: "##address", value: data.address },
    { name: "##postalCode", value: data.postalCode },
    { name: "##neighborhood", value: data.neighborhood },
    { name: "##city", value: data.city },
    { name: "##state", value: data.state },
    { name: "##houseNumber", value: data.houseNumber },
  ];

  // Adicionar especialidades
  data.specialties.forEach((specialty: any, index: number) => {
    VALUES.push({
      name: `##especialideTitle#${index + 1}`,
      value: specialty.title,
    });
    VALUES.push({
      name: `##especialideDescription#${index + 1}`,
      value: specialty.description,
    });
    VALUES.push({
      name: `##especialideImage#${index + 1}`,
      value: specialty.image || "",
    });
  });

  return VALUES;
}

const WebsiteBuilder = (props: IProps) => {
 
  const { token } = useToken();
  const HEX = props?.templateId ?? generateHEX();
  const { replace } = useRouter();
  const { mutate } = useMutation({
    mutationFn: async (body: any) =>
      await api.put(
        `/website/update-website/${props.projectId}`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      revalidateTagServer("website");
      replace("/home");
    },
  });

  const { mutate: mutatCreateTemplate } = useMutation({
    mutationFn: async (body: any) =>
      await api.post(
        `/website-template/add`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      revalidateTagServer("website");
      replace("/home");
    },
  });

  const { mutate: mutatUpdateTemplate } = useMutation({
    mutationFn: async (body: any) =>
      await api.put(
        `/website-template/${props?.templateId}`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      revalidateTagServer("website");
      replace("/home");
    },
  });
  const { formData, setFormData } = useFormStore();
  console.log(formData);
  const { mutate: mutateDraft } = useMutation({
    mutationFn: async (body: any) =>
      await api.patch(`/website/draft-website/${props.projectId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {},
  });

  const load = async (editor: any) => {
    if (props.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER") {
      const { data } = await api.get(
        `/website/draft-website/${props.projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!!formData?.siteName && formData?.siteName?.length > 1) {
        editor.loadProjectData(
          JSON.parse(getNames(JSON.stringify(data), transformData(formData)))
        );
        setFormData({ ...formData, siteName: "" });
        const a = editor.getProjectData();
        mutateDraft(a);
      } else {
        editor.loadProjectData(data);
      }
    } else {
      if (!!props?.templateId) {
        const { data } = await api.get(
          `/website-template/${props.templateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        editor.loadProjectData(data);
      }
    }
  };

  useLayoutEffect(() => {
    if(typeof window == "undefined" || typeof window == undefined || typeof document == "undefined" || typeof document == undefined) return;
    const editor = grapesjs.init({
      container: "#gjs",
      jsInHtml: true,
      fromElement: true,
      storageManager: {
        type: "local", // Storage type. Available: local | remote
        autosave: true, // Store data automatically
        recovery: true,
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1,
        options: {
          local: {
            key:
              props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER"
                ? `gjsProject-${props.projectId}`
                : `template-website-${HEX}`,
          },
        },
      },

      assetManager: {
        showUrlInput: false,
        custom: false,
      },
      styleManager: {
        sectors: [
          {
            name: "General",
            open: false,
            buildProps: [
              "float",
              "display",
              "position",
              "top",
              "right",
              "left",
              "bottom",
            ],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: [
              "width",
              "height",
              "max-width",
              "min-height",
              "margin",
              "padding",
            ],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family",
              "font-size",
              "font-weight",
              "letter-spacing",
              "color",
              "line-height",
              "text-shadow",
            ],
            properties: [
              { name: "Font", property: "font-family" },
              { name: "Weight", property: "font-weight" },
              { name: "Font color", property: "color" },
              {
                property: "text-shadow",
                properties: [
                  { name: "X position", property: "text-shadow-h" },
                  { name: "Y position", property: "text-shadow-v" },
                  { name: "Blur", property: "text-shadow-blur" },
                  { name: "Color", property: "text-shadow-color" },
                ],
              },
            ],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: [
              "opacity",
              "background-color",
              "border-radius",
              "border",
              "box-shadow",
              "background",
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["z-index"],
            properties: [
              {
                type: "integer",
                name: "Z-Index",
                property: "z-index",
                defaults: "0",
                min: 0,
              },
            ],
          },
        ],
      },
      plugins: [
        parserPostCSS,
        grapesjsFloat,
        scd,
        (s: any) =>
          myCustomPlugin(s, {
            id: props?.projectId,
          }),
        pluginTooltip,
        // scri0 => scri(scri0, { }),

        gjspresetwebpage,
        (bsc: any) =>
          gjsblockbasic(bsc, {
            flexGrid: true,
          }),
        (st: any) => sty(st, {}),
        (cusom: any) => customCodePlugin(cusom, {}),
        (tabss: any) => tabs.default(tabss, {}),
        (ty: any) => typed(ty, {}),
        (tem: any) =>
          templae(tem, {
            contactForms: [],
            contactFormsTraits: [],
            shortCodes: false,
            countDow: false,
            openingTimesTraits: [],
            calendarTraits: [],
          }),
      ],

      i18n: {
        locale: "pt",
      },
    });
    editor.Panels.addButton("options", {
      id: "show-json",
      className: "btn-show-json",
      label:
        props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER"
          ? "PUBLICAR"
          : "SALVAR",
      command() {
        editor.store({
          local: {
            key:
              props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER"
                ? `gjsProject-${props.projectId}`
                : `template-website-${HEX}`,
          },
        });
        if (props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER") {
          const dataToExport = {
            html: Buffer.from(minifyHTML(editor.getHtml()), "utf-8").toString(
              "base64"
            ),
            css: Buffer.from(
              minifyCSS(editor.getCss() ?? ""),
              "utf-8"
            ).toString("base64"),
            js: Buffer.from(minifyJS(editor.getJs() ?? ""), "utf-8").toString(
              "base64"
            ),
            projectData: JSON.stringify(editor.getProjectData() ?? {}),
          };

          mutate(dataToExport);
        }

        if (props?.projectId == "TEMPLATE-HERE-TO-CREATE-AFTER") {
          const dataToExport = {
            html: Buffer.from(minifyHTML(editor.getHtml()), "utf-8").toString(
              "base64"
            ),
            css: Buffer.from(
              minifyCSS(editor.getCss() ?? `   `),
              "utf-8"
            ).toString("base64"),
            js: Buffer.from(
              minifyJS(editor.getJs() ?? `   `),
              "utf-8"
            ).toString("base64"),
            projectData: JSON.stringify(editor.getProjectData() ?? {}),
            title: HEX,
            thumbId: "d4c2b177-5e9f-4c3f-9a50-0c523852f87b",
          };
          if (!props?.templateId) {
            mutatCreateTemplate(dataToExport);
          }
          if (props?.templateId) {
            mutatUpdateTemplate(dataToExport);
          }
        }
      },
    });

    editor.Panels.getPanels().forEach((panel) =>
      console.log(panel.get("id"), panel.get("buttons"))
    );

    editor.Panels.removeButton("options", "gjs-open-import-webpage");
    editor.Panels.removeButton("options", "export-template");
    editor.Panels.removeButton("options", "open-templates");

    const pn = editor.Panels;
    const panelViews = pn.addPanel({
      id: "views",
    });

    panelViews.buttons.add([
      {
        attributes: {
          title: "Open Code",
        },
        className: "fa fa-file-code-o",
        command: "open-code",
        togglable: false,
        id: "open-code",
      },
    ]);
    if (props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER") {
      panelViews.buttons.add([
        {
          attributes: {
            title: "SEO",
          },
          className: "fa fa-sliders",
          command: "open-seo",
          id: "custom-panel",
        },
      ]);
    }
    editor.on("storage:store", () => {
      if (props?.projectId !== "TEMPLATE-HERE-TO-CREATE-AFTER") {
        const a = editor.getProjectData();
        mutateDraft(a);
      }
    });

    load(editor);
    return () => {
      editor.destroy();
    };
  }, [typeof window, typeof document]);

  return (
    <>
      <div id="gjs" />
    </>
  );
};

export default WebsiteBuilder;