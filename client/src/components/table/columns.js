import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../ui/dropdown-menu";
import ImageContainer from "../../lib/ImageContainer";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
export const usersColumns = ({ onDelete, }) => [
    {
        id: "select",
        header: ({ table }) => (_jsx(Checkbox, { checked: table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate"), onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value) })),
        cell: ({ row }) => (_jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (value) => row.toggleSelected(!!value) })),
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
        header: ({ column }) => (_jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), children: ["Email ", _jsx(ArrowUpDown, {})] })),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const value = row.getValue("role");
            return _jsx("div", { className: "uppercase font-semibold", children: value });
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: ({ row }) => {
            const value = row.getValue("createdAt");
            return _jsx("div", { children: new Date(value).toLocaleString() });
        },
    },
    {
        accessorKey: "action",
        header: () => _jsx("div", { className: "text-right", children: "Action" }),
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
            return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, {})] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: _jsx(Link, { to: `/admin/update-user/${user?._id}`, children: "Edit User" }) }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { className: "text-[crimson]", onClick: () => onDelete(user._id), children: "Delete User" })] })] }));
        },
    },
];
export const postsColumns = ({ onDelete, }) => [
    {
        id: "select",
        header: ({ table }) => (_jsx(Checkbox, { checked: table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate"), onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value) })),
        cell: ({ row }) => (_jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (value) => row.toggleSelected(!!value) })),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "user",
        header: "Poster",
        cell: ({ row }) => {
            const user = row.getValue("user");
            return (_jsxs("div", { children: [user.firstName, " ", user.lastName, " ", _jsx("br", {}), _jsx("span", { className: "text-sm text-muted-foreground", children: user.email })] }));
        },
    },
    {
        accessorKey: "image",
        header: "Post Image",
        cell: ({ row }) => {
            const imageUrl = row.getValue("image");
            // Return your custom ImageContainer if an image exists
            return imageUrl ? (_jsx(ImageContainer, { src: imageUrl, width: 100, height: 100, className: "rounded-md object-cover", alt: "Post Image" })) : (_jsx("span", { className: "text-gray-400", children: "No image" }));
        },
    },
    {
        accessorKey: "title",
        header: "Post Title",
        cell: ({ row }) => {
            const title = row.getValue("title");
            return (_jsx("span", { className: "text-sm text-muted-foreground", children: title?.length > 20 ? title.substring(0, 20) + " " + "..." : title }));
        },
    },
    {
        accessorKey: "description",
        header: "Post Description",
        cell: ({ row }) => {
            const description = row.getValue("description");
            // Sanitize HTML
            const cleanHtml = DOMPurify.sanitize(description);
            return (_jsx("div", { className: "text-sm max-w-75 bg-white overflow-hidden truncate", dangerouslySetInnerHTML: { __html: cleanHtml } }));
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (_jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), children: ["Date Created ", _jsx(ArrowUpDown, {})] })),
        cell: ({ row }) => {
            const value = row.getValue("createdAt");
            return _jsx("div", { children: new Date(value).toLocaleString() });
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Date Modified",
        cell: ({ row }) => {
            const value = row.getValue("updatedAt");
            return _jsx("div", { children: new Date(value).toLocaleString() });
        },
    },
    {
        accessorKey: "action",
        header: () => _jsx("div", { className: "text-right", children: "Action" }),
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
            return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, {})] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: _jsx(Link, { to: `/admin/posts/${post._id}`, children: "View Post" }) }), _jsx(DropdownMenuItem, { children: _jsx(Link, { to: `/admin/update-post/${post._id}`, children: "Edit Post" }) }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => onDelete(post._id), className: "text-[crimson]", children: "Delete Post" })] })] }));
        },
    },
];
