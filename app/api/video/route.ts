import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route   GET /api/videos
 * @desc    Fetch all videos
 * @access  Public
 */
export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      console.info("[VIDEOS_GET] No videos found.");
      return NextResponse.json([], { status: 200 });
    }

    console.info(`[VIDEOS_GET] Found ${videos.length} videos.`);
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("[VIDEOS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

/**
 * @route   POST /api/videos
 * @desc    Create a new video
 * @access  Private
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.warn("[VIDEOS_POST] Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      console.warn("[VIDEOS_POST] Missing required fields.");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const videoData: IVideo = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);

    console.info("[VIDEOS_POST] New video created:", newVideo._id);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("[VIDEOS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
