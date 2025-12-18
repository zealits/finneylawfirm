# Professional Images Directory

Place professional headshot images in the following subdirectories:

## Folder Structure

```
public/images/
├── attorneys/
│   ├── christopher-p-finney.jpg
│   ├── bradley-m-gibson.jpg
│   ├── julie-m-gugino.jpg
│   ├── rebecca-l-simpson.jpg
│   ├── ashley-l-duckworth.jpg
│   └── j-andrew-gray.jpg
├── of-counsel/
│   ├── curt-c-hartman.jpg
│   ├── bruce-g-hopkins.jpg
│   ├── kevin-j-hopper.jpg
│   └── paul-s-sian.jpg
├── paralegals/
│   └── (add paralegal images here)
├── admin-staff/
│   └── (add admin staff images here)
└── law-clerks-and-interns/
    └── (add law clerk and intern images here)
```

## Image Naming Convention

Images should be named using the professional's slug (as defined in `lib/professionals.ts`):

- Format: `{first-name}-{middle-initial}-{last-name}.jpg` (or `.png`)
- Example: `christopher-p-finney.jpg`, `ashley-l-duckworth.jpg`

## Image Requirements

- Recommended size: 600x600px or larger (square aspect ratio)
- Format: JPG or PNG
- File size: Optimize images for web (under 500KB recommended)

## Notes

- If an image is not found, the system will display initials as a placeholder
- Images are referenced in the `imagePath` field of each professional object in `lib/professionals.ts`
