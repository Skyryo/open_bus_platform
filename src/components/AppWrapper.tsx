import { useState } from "react"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper(props: AppWrapperProps) {
  const { children } = props
  const [language, setLanguage] = useState<"ja" | "en">("ja")
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ px: 2, bgcolor: "#1E88E5", height: "8vh" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" component="h1" color="white">
          Bus Platform
        </Typography>
        <FormControl sx={{ mx: 1, minWidth: 120 }}>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "ja" | "en")}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ py: 0 }}
          >
            <MenuItem value={"ja"}>Japanese</MenuItem>
            <MenuItem value={"en"}>English</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{ height: "92vh" }}>{children}</Box>
    </Box>
  )
}
