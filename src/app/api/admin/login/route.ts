import { NextRequest, NextResponse } from "next/server";

// In a real application, you should store these in environment variables
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Create response with success
    const response = NextResponse.json({
      success: true,
      user: {
        username,
        role: "admin"
      }
    });

    // Set admin cookie
    response.cookies.set('adminToken', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
} 