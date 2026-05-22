import React from 'react';
import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeSpace - Không Gian Sự Kiện & Giải Trí',
  description: 'Khám phá các sự kiện âm nhạc, triển lãm và lễ hội độc đáo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        /* --- CẤU HÌNH HÌNH NỀN PINTEREST --- */
        backgroundImage: `url('https://i.pinimg.com/originals/09/a0/2a/09a02af55df3469f8bf5a415ebe1cf1c.jpg')`, 
        backgroundSize: 'cover',        // Ảnh tự động co giãn phủ kín màn hình
        backgroundPosition: 'center',   // Căn giữa ảnh
        backgroundRepeat: 'no-repeat',  // Không lặp lại ảnh
        backgroundAttachment: 'fixed',  // Ảnh đứng yên khi cuộn trang
        backgroundColor: '#000',        // Màu dự phòng
        /* ----------------------------------- */
      }}>
        <AntdRegistry>
          {/* Thanh Menu điều hướng */}
          <header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0, 21, 41, 0.8)', 
            padding: '0 40px', 
            height: '64px',
            position: 'fixed', 
            width: '100%',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginRight: '40px', letterSpacing: '1px' }}>
              <span style={{ color: '#1677ff', marginRight: '8px' }}>★</span>
              VibeSpace
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Khám Phá</Link>
              <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Đăng Nhập</Link>
              <Link href="/register" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Đăng Ký</Link>
              <Link href="/profile" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Hồ Sơ</Link>
            </nav>
          </header>

          {/* Phần nội dung chính */}
          <main style={{ flex: 1, paddingTop: '80px', paddingBottom: '40px' }}>
            {children}
          </main>

          {/* Chân trang */}
          <footer style={{ 
            textAlign: 'center', 
            backgroundColor: 'rgba(0, 12, 23, 0.8)', 
            color: '#fff', 
            padding: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            VibeSpace ©2026 - Nền tảng kết nối Sự kiện Văn Hóa & Giải Trí
          </footer>
        </AntdRegistry>
      </body>
    </html>
  );
}