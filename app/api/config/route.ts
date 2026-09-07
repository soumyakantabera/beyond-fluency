import { mailConfig, storageReady } from '@/lib/server-db';
export async function GET(){return Response.json({emailReady:(await mailConfig()).ready,storageReady:await storageReady()},{headers:{'Cache-Control':'no-store'}});}
