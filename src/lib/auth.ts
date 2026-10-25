
const USER_KEY = "leivora_users";
const SESSION_KEY = "leivora_session";

export type UserAccount = {
  email: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

const TEST_ACCOUNT: UserAccount = {
  email: "test@leivora.com",
  password: "Leivora123",
};

export function getUsers(): UserAccount[] {
  try {
    const storedUsers = localStorage.getItem(USER_KEY);
    const parsed: unknown = storedUsers ? JSON.parse(storedUsers) : [];

    const users: UserAccount[] = Array.isArray(parsed)
      ? parsed.filter(
          (user): user is UserAccount =>
            user !== null &&
            typeof user === "object" &&
            typeof user.email === "string" &&
            typeof user.password === "string",
        )
      : [];

    // Keep the built-in test account available.
    const testAccountExists = users.some(
      (user) => user.email.trim().toLowerCase() === TEST_ACCOUNT.email,
    );

    if (!testAccountExists) {
      users.push(TEST_ACCOUNT);
    }

    localStorage.setItem(USER_KEY, JSON.stringify(users));

    return users;
  } catch (error) {
    console.error("Could not load saved users:", error);
    return [];
  }
}

export function RegisterUser(
  email: string,
  password: string,
): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      success: false,
      message: "Please enter your email and password.",
    };
  }

  try {
    const users = getUsers();

    const existingUser = users.some(
      (user) => user.email.trim().toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email is already registered. Please log in instead.",
      };
    }

    users.push({
      email: normalizedEmail,
      password,
    });

    localStorage.setItem(USER_KEY, JSON.stringify(users));

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Could not save your account. Check your browser storage.",
    };
  }
}

export function LoginUser(
  email: string,
  password: string,
): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      success: false,
      message: "Please enter your email and password.",
    };
  }

  try {
    const users = getUsers();

    const user = users.find(
      (account) =>
        account.email.trim().toLowerCase() === normalizedEmail &&
        account.password === password,
    );

    if (!user) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    localStorage.setItem(SESSION_KEY, user.email.trim().toLowerCase());

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    console.error("Login storage error:", error);

    return {
      success: false,
      message: "Unable to log in. Check your browser storage settings.",
    };
  }
}

export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export function getCurrentEmail(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function LogoutUser(): void {
  localStorage.removeItem(SESSION_KEY);
}
