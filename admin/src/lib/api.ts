// ─── API Configuration ───
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Token Management ───
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string): void {
  localStorage.setItem("admin_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// ─── Request Helpers ───
function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      (errorBody as Record<string, string>).message ||
      (errorBody as Record<string, string>).error ||
      `Request failed with status ${response.status}`;

    if (response.status === 401) {
      removeToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    throw new Error(message);
  }
  return response.json();
}

export async function apiGet<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleResponse<T>(response);
}

export async function apiPost<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: authHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse<T>(response);
}

export async function apiPut<T = unknown>(
  endpoint: string,
  data?: unknown
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: authHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse<T>(response);
}

export async function apiDelete<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse<T>(response);
}

// ─── Auth API ───
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const data = await apiPost<LoginResponse>("/api/auth/login", {
    username,
    password,
  });
  setToken(data.token);
  return data;
}

export function logout(): void {
  removeToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// ─── Portfolio API ───
export interface PortfolioData {
  [key: string]: unknown;
}

export async function getPortfolio(): Promise<PortfolioData> {
  return apiGet<PortfolioData>("/api/portfolio");
}

export async function updatePortfolio(data: PortfolioData): Promise<PortfolioData> {
  return apiPut<PortfolioData>("/api/portfolio", data);
}

// ─── Projects API ───
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  [key: string]: unknown;
}

export async function getProjects(): Promise<Project[]> {
  return apiGet<Project[]>("/api/projects");
}

export async function createProject(
  data: Omit<Project, "_id">
): Promise<Project> {
  return apiPost<Project>("/api/projects", data);
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  return apiPut<Project>(`/api/projects/${id}`, data);
}

export async function deleteProject(id: string): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/api/projects/${id}`);
}

// ─── Messages API ───
export interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
  [key: string]: unknown;
}

export async function getMessages(): Promise<Message[]> {
  return apiGet<Message[]>("/api/contact/messages");
}

export async function toggleMessageRead(
  id: string
): Promise<Message> {
  return apiPut<Message>(`/api/contact/messages/${id}/read`);
}

export async function deleteMessage(
  id: string
): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/api/contact/messages/${id}`);
}

// ─── Upload API ───
export interface UploadResponse {
  url: string;
  filename: string;
  [key: string]: unknown;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers,
    body: formData,
  });

  return handleResponse<UploadResponse>(response);
}
