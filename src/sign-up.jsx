import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  CssBaseline,
  Card,
  Box,
  Collapse,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

// Валидация
const validationSchema = yup.object({
  name: yup.string().required("Името е задължително"),
  email: yup.string().email("Невалиден имейл").required("Имейл е задължителен"),
  password: yup.string().min(6, "Минимум 6 символа").required("Паролата е задължителна"),
  phone: yup.string().when("step", {
    is: 2,
    then: yup.string().required("Телефонът е задължителен"),
  }),
});

export default function SignUp() {
  const [step, setStep] = React.useState(1);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", },
    validationSchema,
    onSubmit: (values) => {
      console.log("Финални данни:", values);
    },
  });

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #2196f3 0%, #e3f2fd 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Card
          elevation={6}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
            borderRadius: 5,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 4, color: "#1565c0", fontWeight: 700 }}>
            Регистрация
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {/* Стъпка 1 */}
            {step === 1 && (
              <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormLabel>Име</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormLabel>Имейл</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <FormLabel>Парола</FormLabel>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="●●●●●●"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ background: "#1976d2", mb: 2 }}
                 type="submit"
                >
                  Следваща стъпка
                </Button>
              </>
            )}

            {/* Стъпка 2 (нова форма) */}
            <Collapse in={step === 2}>
              <>
                
              </>
            </Collapse>
          </form>
        </Card>
      </Box>
    </>
  );
}
