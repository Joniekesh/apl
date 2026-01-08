import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { IPost, IUser } from "../../types";
import ImageContainer from "../../lib/ImageContainer";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

interface UsersColumnsProps {
  onDelete: (id: string) => void;
}

interface PostsColumnsProps {
  onDelete: (id: string) => void;
}

export const usersColumns = ({
  onDelete,
}: UsersColumnsProps): ColumnDef<IUser>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const value = row.getValue("role") as string;
      return <div className="uppercase font-semibold">{value}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <div>{new Date(value).toLocaleString()}</div>;
    },
  },

  {
    accessorKey: "action",
    header: () => <div className="text-right">Action</div>,
    // cell: ({ row }) => (
    //   <div className="text-right font-medium">
    //     ${row.getValue<number>("amount")}
    //   </div>
    // ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/admin/update-user/${user?._id}`}>Edit User</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-[crimson]"
              onClick={() => onDelete(user._id)}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const postsColumns = ({
  onDelete,
}: PostsColumnsProps): ColumnDef<IPost>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "Poster",
    cell: ({ row }) => {
      const user = row.getValue("user") as IUser;
      return (
        <div>
          {user.firstName} {user.lastName} <br />
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Post Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;

      // Return your custom ImageContainer if an image exists
      return imageUrl ? (
        <ImageContainer
          src={imageUrl}
          width={100}
          height={100}
          className="rounded-md object-cover"
          alt="Post Image"
        />
      ) : (
        <span className="text-gray-400">No image</span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Post Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {title?.length > 20 ? title.substring(0, 20) + " " + "..." : title}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Post Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;

      // Sanitize HTML
      const cleanHtml = DOMPurify.sanitize(description);

      return (
        <div
          className="text-sm max-w-30 bg-white overflow-hidden line-clamp-1"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Created <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <div>{new Date(value).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Date Modified",
    cell: ({ row }) => {
      const value = row.getValue("updatedAt") as string;
      return <div>{new Date(value).toLocaleString()}</div>;
    },
  },

  {
    accessorKey: "action",
    header: () => <div className="text-right">Action</div>,
    // cell: ({ row }) => (
    //   <div className="text-right font-medium">
    //     ${row.getValue<number>("amount")}
    //   </div>
    // ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/admin/posts/${post._id}`}>View Post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/admin/update-post/${post._id}`}>Edit Post</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(post._id)}
              className="text-[crimson]"
            >
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
