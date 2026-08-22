import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductGallery } from './ProductGallery';

const mockImages = ['/img1.png', '/img2.png', '/img3.png'];
const productName = 'Test Product';

describe('ProductGallery', () => {
  it('renders No Image fallback if images array is empty', () => {
    render(<ProductGallery images={[]} productName={productName} />);
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('renders the first image as the main image by default', () => {
    render(<ProductGallery images={mockImages} productName={productName} />);

    // The main image should be rendered.
    // In our component, Next.js Image renders an alt attribute equal to the product name.
    // Thumbnails render alt="${productName} - image ${i + 1}"
    const mainImage = screen.getByAltText(productName);
    expect(mainImage).toHaveAttribute('src');
    expect(mainImage.getAttribute('src')).toContain('img1');
  });

  it('changes the main image when a thumbnail is clicked', () => {
    render(<ProductGallery images={mockImages} productName={productName} />);

    // Find the second thumbnail (index 1)
    const secondThumbnail = screen.getByAltText(`${productName} - image 2`);

    // Click it
    fireEvent.click(secondThumbnail);

    // The main image should now be updated to img2
    const mainImage = screen.getByAltText(productName);
    expect(mainImage.getAttribute('src')).toContain('img2');
  });

  it('synchronizes highlighted thumbnail when images prop changes and activeImage is no longer present', () => {
    const { rerender } = render(
      <ProductGallery images={mockImages} productName={productName} />,
    );

    // Click third thumbnail so activeImage becomes '/img3.png'
    const thirdThumbnail = screen.getByAltText(`${productName} - image 3`);
    fireEvent.click(thirdThumbnail);

    // Re-render with new images that don't include '/img3.png'
    const newImages = ['/new1.png', '/new2.png'];
    rerender(<ProductGallery images={newImages} productName={productName} />);

    // The main image should fall back to '/new1.png'
    const mainImage = screen.getByAltText(productName);
    expect(mainImage.getAttribute('src')).toContain('new1');

    // The first thumbnail button should have 'border-primary' class
    const firstThumbnailImage = screen.getByAltText(`${productName} - image 1`);
    const firstThumbnailButton = firstThumbnailImage.closest('button');
    expect(firstThumbnailButton).toHaveClass('border-primary');
  });
});
