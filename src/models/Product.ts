export class Product {
  constructor(
    public productId: number,
    public productTitle: string,
    public productPrice: number,
    public quantity: number,
    public description: string,
    public imageUrl: string,
    public category: string    
  ) {}

  public printProduct(): string {
    return `Product ID: ${this.productId}, Title: ${this.productTitle}, Price: ${this.productPrice}`;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getProductTitle(): string {
    return this.productTitle;
  }

  public getProductPrice(): number {
    return this.productPrice;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public getCategory(): string {    
    return this.category;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setImageUrl(imageUrl: string): void {
    this.imageUrl = imageUrl;
  }

  public setCategory(category: string): void {   
    this.category = category;
  }
}
