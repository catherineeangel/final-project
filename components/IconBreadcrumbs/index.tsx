import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ForumIcon from "@mui/icons-material/Forum";
import { useRouter } from "next/router";

const IconBreadcrumbs = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { title, category, catId } = query;

  const breadcrumbMap: { [key: string]: number } = {
    "/": 1,
    "/category/[id]": 2,
    "/thread/[id]": 3,
  };

  const BREADCRUMB_NAME = [
    {
      path: "/",
      name: "Home",
      icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      href: "/",
    },
    {
      path: "/category/[id]",
      name: `${category}`,
      icon: <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      href: `/category/${catId}?category=${category}`,
    },
    {
      path: "/thread/[id]",
      name: `${title}`,
      icon: <ForumIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
  ];

  return (
    <div role="presentation" className="px-10 md:px-20 pt-10">
      <Breadcrumbs aria-label="breadcrumb">
        {BREADCRUMB_NAME.slice(0, breadcrumbMap[pathname]).map(
          ({ path, name, icon, href }, id) => {
            return path == pathname ? (
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.primary"
              >
                {icon}
                {name}
              </Typography>
            ) : (
              <Link
                key={pathname}
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href={href}
              >
                {icon}
                {name}
              </Link>
            );
          }
        )}
      </Breadcrumbs>
    </div>
  );
};

export default IconBreadcrumbs;
