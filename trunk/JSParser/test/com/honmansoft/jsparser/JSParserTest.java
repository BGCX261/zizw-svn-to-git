 p a c k a g e   c o m . h o n m a n s o f t . j s p a r s e r ;  
  
 i m p o r t   o r g . a n t l r . r u n t i m e . A N T L R S t r i n g S t r e a m ;  
 i m p o r t   o r g . a n t l r . r u n t i m e . C o m m o n T o k e n S t r e a m ;  
 i m p o r t   o r g . a n t l r . r u n t i m e . R e c o g n i t i o n E x c e p t i o n ;  
 i m p o r t   o r g . j u n i t . T e s t ;  
  
 p u b l i c   c l a s s   J S P a r s e r T e s t   {  
  
 	 p r i v a t e   A N T L R S t r i n g S t r e a m   c s ;  
  
 	 p r i v a t e   J S L e x e r   l e x e r ;  
  
 	 p r i v a t e   C o m m o n T o k e n S t r e a m   t s ;  
  
 	 p r i v a t e   J S P a r s e r   p a r s e r ;  
  
 	 @ T e s t  
 	 p u b l i c   v o i d   t e s t S i n g l e C o m m e n t ( )   {  
 	 	 p a r s e ( " / / " ) ;  
 	 	 p a r s e ( " / / a b c " ) ;  
 	 	 p a r s e ( " / / \ n " ) ;  
 	 	 p a r s e ( " / / a b c \ n " ) ;  
 	 	 p a r s e ( " / / \ n \ n \ n " ) ;  
 	 	 p a r s e ( " / / a b c \ n \ n \ n " ) ;  
 	 }  
  
 	 @ T e s t  
 	 p u b l i c   v o i d   t e s t M u l t i C o m m e n t ( )   {  
 	 	 p a r s e ( " / * * / " ) ;  
 	 	 p a r s e ( " / * * * * * * * * * * * * * * * * * / " ) ;  
 	 	 p a r s e ( " / * / * / " ) ;  
 	 }  
  
 	 v o i d   p a r s e ( S t r i n g   j s )   {  
 	 	 c s   =   n e w   A N T L R S t r i n g S t r e a m ( j s ) ;  
 	 	 l e x e r   =   n e w   J S L e x e r ( c s ) ;  
 	 	 t s   =   n e w   C o m m o n T o k e n S t r e a m ( l e x e r ) ;  
 	 	 p a r s e r   =   n e w   J S P a r s e r ( t s ) ;  
 	 	 t r y   {  
 	 	 	 p a r s e r . p r o g r a m ( ) ;  
 	 	 }   c a t c h   ( R e c o g n i t i o n E x c e p t i o n   e )   {  
 	 	 	 t h r o w   n e w   R u n t i m e E x c e p t i o n ( e ) ;  
 	 	 }  
 	 }  
 }  
