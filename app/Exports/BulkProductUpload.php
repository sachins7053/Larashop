<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithStyles;
use App\Models\Product;

class BulkProductUpload implements FromCollection, WithHeadings, WithEvents, WithTitle, ShouldAutoSize, WithStyles
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $fillable = Product::getFillableAttributes();
        
        // Define the columns to exclude
        $excludedColumns = [
            'id',
            'slug',
            'store_id',
            'approved_by',
            'specification_table_id',
            'images',
            'image',
            'video_media',
            'order',
            'allow_checkout_when_out_of_stock',
            'with_storehouse_management',
            'is_featured',
            'brand_id',
            'sale_type',
            'tax_id',
            'views',
            'stock_status',
            'created_by_id',
            'created_by_type',
            'product_type',
            'barcode',
            'generate_license_code',
            'notify_attachment_updated',
            'created_at',
            'updated_at',
        ];

        // Filter out the excluded columns
        $fillableFinal = array_diff($fillable, $excludedColumns);
        
        // Add the created_at and updated_at columns
        // $fillable = array_merge($fillable, ['created_at', 'updated_at']);

        // Generate empty rows for bulk upload (after header)
        $rows = [];
        for ($i = 1; $i < 10; $i++) {
            $rows[] = array_fill(1, count($fillableFinal), '');
        }

        // Combine the header with the empty rows
        return collect([$fillableFinal])->merge($rows);
    }

    public function headings(): array
    {
        return Product::getFillableAttributes();
    }

    public function title(): string
    {
        // Sheet title
        return 'Sheet 1';
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('B2')->applyFromArray(
            [
                'fill' => [
                        'type' => Fill::FILL_SOLID,
                        'startcolor' => ['rgb' => '000000'], // Black background
                    ],

                    'font' => [
                        'color' => ['rgb' => 'FFFFFF'], // White text
                        'bold' => true,
                    ],
                ]

                );
    }


    public function registerEvents(): array
    {
        return [
            // Register event listeners to style the sheet
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet;

                // Set background color for the header row
                $sheet->getStyle('A1:' . $sheet->getHighestColumn() . '1')->applyFromArray([
                    'fill' => [
                        'type' => Fill::FILL_SOLID,
                        'startcolor' => ['rgb' => '000000'], // Black background
                    ],
                    'font' => [
                        'color' => ['rgb' => 'FFFFFF'], // White text
                        'bold' => true,
                    ],
                ]);

                // Protect the header row (row 1) and lock it
                $sheet->getProtection()->setSheet(true); // Protect the whole sheet
                $sheet->getProtection()->setSort(false); // Disable sorting
                $sheet->getProtection()->setInsertRows(false); // Disable row insertion

                // Lock the header row (row 1) and leave the rest of the sheet editable
                $sheet->getStyle('A1:' . $sheet->getHighestColumn() . '1')->getProtection()->setLocked(true);
                $sheet->getStyle('A2')->getProtection()->setLocked(false); // Allow editing of data rows

                // Freeze the header row (A1)
                $sheet->freezePane('A2');
            }
        ];
    }
}
