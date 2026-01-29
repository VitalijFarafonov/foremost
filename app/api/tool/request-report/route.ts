import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, companyData, strategicPriorities, twoPaths } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Log the report request (in production, this would send to an email service or queue)
        console.log('Report requested:', {
            email,
            companyName: companyData?.companyName,
            industry: companyData?.industry,
            prioritiesCount: strategicPriorities?.length || 0,
            reimaginationCount: twoPaths?.reimagination?.length || 0,
            efficiencyCount: twoPaths?.efficiency?.length || 0,
            timestamp: new Date().toISOString(),
        });

        // TODO: In production, integrate with email service (e.g., SendGrid, Mailchimp, etc.)
        // to generate and send the PDF report

        // For now, we'll just acknowledge the request
        // You can later add:
        // 1. Store the request in a database
        // 2. Generate a PDF using a library like jsPDF or puppeteer
        // 3. Send the email via an email service

        return NextResponse.json({
            success: true,
            message: 'Report request received. You will receive your report shortly.',
        });
    } catch (error) {
        console.error('Error processing report request:', error);
        return NextResponse.json(
            { error: 'Failed to process report request' },
            { status: 500 }
        );
    }
}
