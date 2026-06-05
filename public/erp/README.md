# ERP logos

The ERP panel in the Operations Canvas shows a logo wall. Each tile renders
`/erp/<id>.svg` if the file exists, otherwise it falls back to a wordmark.

To show the real brand logos, drop the official SVG (or PNG — change the
extension in `ErpLogo`) for each, using these filenames:

- `sap.svg`
- `ramco.svg`
- `batchmaster.svg`
- `netsuite.svg`
- `infor.svg`
- `sage.svg`
- `deacom.svg`

Prefer monochrome / light SVGs so they sit well on the dark panel. Use only
logos you have the right to display (e.g. integration partners). No code change
is needed once the files are here.
