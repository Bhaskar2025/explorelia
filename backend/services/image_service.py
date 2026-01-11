import requests
from typing import List, Dict
from config import PEXELS_API_KEY

class ImageService:
    """
    Service to fetch images from Pexels API
    
    Free API: https://www.pexels.com/api/
    No API key required for basic usage (sign up for key for higher limits)
    """
    
    PEXELS_API_URL = "https://api.pexels.com/v1/search"
    
    @staticmethod
    def search_images(query: str, per_page: int = 5) -> List[Dict]:
        """
        Search Pexels for images
        
        Args:
            query: Search term (e.g., "Jaipur", "Hawa Mahal")
            per_page: Number of results
        
        Returns:
            List of image URLs and metadata
        """
        try:
            headers = {
                'Authorization': PEXELS_API_KEY
            }
            
            params = {
                'query': query,
                'per_page': per_page,
                'page': 1,
                'orientation': 'landscape',
                'size': 'large'
            }
            
            response = requests.get(
                ImageService.PEXELS_API_URL,
                headers=headers,
                params=params,
                timeout=10
            )
            
            if response.status_code != 200:
                return []
            
            data = response.json()
            images = []
            
            for photo in data.get('photos', []):
                images.append({
                    'url': photo['src']['large'],
                    'photographer': photo['photographer'],
                    'photographer_url': photo['photographer_url'],
                    'width': photo['width'],
                    'height': photo['height'],
                    'alt': photo['alt'] or query
                })
            
            return images
        
        except Exception as e:
            print(f"Error fetching images from Pexels: {str(e)}")
            return []
    
    @staticmethod
    def get_best_image(query: str) -> str:
        """
        Get the best image URL for a location
        
        Args:
            query: Location name
        
        Returns:
            Best image URL or fallback
        """
        images = ImageService.search_images(query, per_page=15)
        print(query)
        for image in images:
            print(image['url'])
        
        if images:
            return images[1]['url']
        
        # Fallback placeholder
        return f"https://via.placeholder.com/1920x1080?text={query.replace(' ', '+')}"
