"use client"

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Item } from './item';
import { FileIcon } from 'lucide-react';

export interface DocumentListProps extends React.HTMLAttributes<HTMLDivElement> {
    parentDocumentId?: Id<'documents'>;
    level?: number;
    data?: Doc<'documents'>[];
}

export const DocumentList: React.FC<DocumentListProps> = (props: DocumentListProps) => {
    const { parentDocumentId, level = 0 } = props;
    const params = useParams();
    const router = useRouter();
    const [expands, setExpands] = useState<Record<string, boolean>>({});

    const onExpand = (docId: string) => {
        setExpands(prev => ({ ...prev, [docId]: !prev[docId] }));
    };

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });

    const onRedirect = (documentId: string) => {
        // router.push(`/documents/${documentId}`);
    };

    if (documents === undefined) {
        return <>
            <Item.Skeleton level={level} />
            { level === 0 && (
                <>
                    <Item.Skeleton level={level} />
                    <Item.Skeleton level={level} />
                </>
            ) }
        </>
    }

    return (
        <>
            {/* no children found when expanded */}
            <p className={cn(
                'hidden text-sm font-medium text-muted-foreground/80',
                expands && "last:block",
                level === 0 && "hidden"
            )} style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : undefined
            }}>No pages inside.</p>
            {documents.map(d => {
                return (
                    <div key={d._id}>
                        <Item
                        id={d._id}
                        onClick={() => onRedirect(d._id)}
                        label={d.title}
                        icon={FileIcon}
                        documentIcon={d.icon}
                        active={params.documentId === d._id}
                        level={level}
                        onExpand={() => onExpand(d._id)}
                        expanded={expands[d._id]}
                        >
                        </Item>
                        {expands[d._id] && <DocumentList parentDocumentId={d._id} level={level + 1}></DocumentList>}
                    </div>
                );
            })}
        </>
    );
};
