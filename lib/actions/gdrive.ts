"use server";

import { getServerSession } from "next-auth";

const GOOGLE_API_KEY = process.env.GOOGLE_DRIVE_API!;

export const uploadPdfToGoogleDrive = async (name: string, file: Blob) => {
  const session = await getServerSession();
  console.log(session);

  try {
    const metadata = {
      name,
      mimeType: "application/pdf",
    };

    const form = new FormData();

    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      }),
    );

    form.append("file", file);

    const uploadResponse = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GOOGLE_API_KEY}`,
        },
        body: form,
      },
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();

      console.error("Google Drive Upload Error:", error);

      throw new Error(error?.error?.message || "Failed to upload PDF");
    }

    const uploadData = await uploadResponse.json();

    const fileId = uploadData.id;

    // Make file public
    const permissionResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_DRIVE_API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      },
    );

    if (!permissionResponse.ok) {
      throw new Error("Failed to make file public");
    }

    // Public URL
    const publicUrl = `https://drive.google.com/file/d/${fileId}/view`;

    return {
      fileId,
      publicUrl,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GOOGLE_FOLDER_MIME = "application/vnd.google-apps.folder";

export type DriveNode = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  isFolder: boolean;
  children?: DriveNode[];
};

async function fetchFolderContents(folderId: string): Promise<DriveNode[]> {
  const query = encodeURIComponent(`'${folderId}' in parents`);

  const fields = encodeURIComponent("files(id,name,mimeType,size)");

  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${query}` +
    `&fields=${fields}` +
    `&pageSize=1000` +
    `&key=${GOOGLE_API_KEY}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    const error = await res.json();

    console.error("Google Drive Fetch Error:", error);

    throw new Error("Failed to fetch Google Drive folder");
  }

  const data = await res.json();

  const files = data.files || [];

  const result: DriveNode[] = [];

  for (const file of files) {
    const isFolder = file.mimeType === GOOGLE_FOLDER_MIME;

    const node: DriveNode = {
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
      isFolder,
    };

    if (isFolder) {
      node.children = await fetchFolderContents(file.id);
    }

    result.push(node);
  }

  return result;
}

export async function getFullGoogleDriveTree(
  rootFolderId: string,
): Promise<DriveNode> {
  const children = await fetchFolderContents(rootFolderId);

  return {
    id: rootFolderId,
    name: "root",
    mimeType: GOOGLE_FOLDER_MIME,
    isFolder: true,
    children,
  };
}

// console.log(await getFullGoogleDriveTree("1_kd4csqtkFDS_AlWltSJeidTZ15OP47B"));
