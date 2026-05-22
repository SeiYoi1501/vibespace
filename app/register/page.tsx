'use client';

import React from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    // 1. Lấy danh sách user hiện tại từ máy tính (nếu có)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 2. Kiểm tra xem email này đã có ai dùng chưa
    const isEmailExist = existingUsers.some((user: any) => user.email === values.email);
    if (isEmailExist) {
      message.error('Email này đã được đăng ký. Vui lòng dùng email khác!');
      return;
    }

    // 3. Lưu người dùng mới vào máy tính
    const newUser = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    message.success('Đăng ký tài khoản thành công! Đang chuyển hướng...');
    
    // Đợi 1 giây rồi chuyển sang trang đăng nhập
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  return (
    <div style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#001529', margin: 0 }}>Tạo Tài Khoản</Title>
          <Text type="secondary">Gia nhập cộng đồng người yêu nghệ thuật VibeSpace</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" size="large" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}>
            <Input prefix={<MailOutlined />} placeholder="email@example.com" size="large" />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, min: 6, message: 'Mật khẩu phải từ 6 ký tự!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#001529', height: '45px', fontSize: '16px' }}>
              Đăng Ký Ngay
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text>Đã có tài khoản? <Link href="/login" style={{ color: '#1677ff' }}>Đăng nhập tại đây</Link></Text>
        </div>
      </Card>
    </div>
  );
}