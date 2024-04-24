'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { CourseListElement } from "../model/types";
import { Button } from "@/shared/ui/button";
import { useTransition } from "react";

export function CourseItem({course, onDelete}: {course: CourseListElement; onDelete: () => Promise<void>}) {

    const [isLoadingDelete, startDeleteTransition] = useTransition()

    const handleDelete = () => {
        startDeleteTransition(async () => {
            await onDelete()
        })
    }

    return (
        <Card>
        <CardHeader>
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button disabled={isLoadingDelete} onClick={handleDelete}>Удалить</Button>
        </CardFooter>
      </Card> 
    )
}