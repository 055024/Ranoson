"use client";

import React from 'react';
import Image from 'next/image';
import { ExternalLink, BookOpen, Video } from 'lucide-react';

interface Resource {
    id: number;
    title: string;
    description: string;
    resource_type: string;
    content: string;
    image_url?: string;
}

interface ResourceCardProps {
    resource: Resource;
    onClick: (resource: Resource) => void;
}

export default function ResourceCard({ resource, onClick }: ResourceCardProps) {
    const Icon = resource.resource_type === 'video' ? Video : resource.resource_type === 'link' ? ExternalLink : BookOpen;

    return (
        <div
            onClick={() => onClick(resource)}
            className="glass-card rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all group border border-slate-100"
        >
            <div className="h-40 bg-slate-100 relative">
                {resource.image_url ? (
                    <Image
                        src={resource.image_url}
                        alt={resource.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Icon size={48} />
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-slate-700 uppercase font-bold flex items-center gap-1 shadow-sm">
                    <Icon size={12} />
                    {resource.resource_type}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{resource.description}</p>
            </div>
        </div>
    );
}
