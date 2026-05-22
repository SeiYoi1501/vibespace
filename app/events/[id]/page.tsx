'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Typography, Tag, Spin } from 'antd';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { EventType } from '@/data/events';

const { Title, Paragraph } = Typography;

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        // LƯU Ý: Đổi 'LINK_MOCKAPI_CỦA_BẠN' bằng link MockAPI thật
const response = await fetch(`https://i.pinimg.com/originals/09/a0/2a/09a02af55df3469f8bf5a415ebe1cf1c.jpg.id}`);        if (!response.ok) throw new Error('Sự kiện không tồn tại');
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchEventDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang nạp thông tin sự kiện..." />
      </div>
    );
  }

  if (!event) return <div style={{ padding: '40px', textAlign: 'center' }}>Sự kiện không tồn tại trên hệ thống.</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card cover={<img alt={event.title} src={event.imageUrl} style={{ borderRadius: '8px 8px 0 0', maxHeight: '450px', objectFit: 'cover' }} />}>
        <Title level={2} style={{ color: '#001529' }}>{event.title}</Title>
        <div style={{ marginBottom: '20px' }}>
          <Tag icon={<CalendarOutlined />} color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
            {new Date(event.date).toLocaleString('vi-VN')}
          </Tag>
          <Tag icon={<EnvironmentOutlined />} color="cyan" style={{ fontSize: '14px', padding: '4px 8px', marginTop: '8px' }}>
            {event.location}
          </Tag>
        </div>
        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>{event.description}</Paragraph>
      </Card>
    </div>
  );
}