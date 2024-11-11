import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/TextArea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/InputCard";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
                image : imageUrl,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="container mx-auto py-8">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create a New Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter your post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <Input
                                id="imageUrl"
                                type="url"
                                placeholder="Enter image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <TextEditor onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handlePublish} className="w-full">
                            Publish Post
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <Textarea
            id="content"
            placeholder="Write your article..."
            rows={8}
            onChange={onChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
    );
}