export interface Recipe {
  uuid: string;
  name: string;
  description: string;
  instructions: string;
  restrictions: string[];
  ingredients: string[] | null;
  user_uuid: string;
}
