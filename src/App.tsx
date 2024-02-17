import * as React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom';
import Login from "./screens/Login";
import ProtectedRoute from "./screens/components/ProtectedRoute";
import Home from "./screens/Home";
import PageNotFound from "./screens/components/PageNotFound";

export const App = () => (
  <Routes>
    <Route index element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="*" element={<PageNotFound />} />
</Routes>
)
