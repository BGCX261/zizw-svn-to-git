 p a c k a g e   c o m . h o n m a n s o f t . t o o l s ;  
  
 i m p o r t   j a v a . i o . F i l e I n p u t S t r e a m ;  
 i m p o r t   j a v a . i o . F i l e O u t p u t S t r e a m ;  
 i m p o r t   j a v a . i o . I n p u t S t r e a m ;  
 i m p o r t   j a v a . i o . O u t p u t S t r e a m ;  
  
 i m p o r t   o r g . a n t l r . r u n t i m e . A N T L R I n p u t S t r e a m ;  
 i m p o r t   o r g . a n t l r . r u n t i m e . A N T L R S t r i n g S t r e a m ;  
 i m p o r t   o r g . a n t l r . r u n t i m e . C o m m o n T o k e n S t r e a m ;  
  
 p u b l i c   c l a s s   E C M A _ 2 6 2 _ 3 r d _ A n n e x A _ F o r m a t t e r   {  
  
 	 p r i v a t e   s t a t i c   A N T L R S t r i n g S t r e a m   c s ;  
  
 	 p r i v a t e   s t a t i c   E C M A _ 2 6 2 _ 3 r d _ A n n e x A _ L e x e r   l e x e r ;  
  
 	 p r i v a t e   s t a t i c   C o m m o n T o k e n S t r e a m   t s ;  
  
 	 p r i v a t e   s t a t i c   E C M A _ 2 6 2 _ 3 r d _ A n n e x A _ P a r s e r   p a r s e r ;  
  
 	 p u b l i c   s t a t i c   v o i d   m a i n ( S t r i n g [ ]   a r g s )   t h r o w s   E x c e p t i o n   {  
 	 	 I n p u t S t r e a m   i s   =   n e w   F i l e I n p u t S t r e a m ( " d o w n l o a d s / E C M A - 2 6 2 - A n n e x A . t x t " ) ;  
 / / 	 	 O u t p u t S t r e a m   o s   =   n e w   F i l e O u t p u t S t r e a m ( a r g s [ 1 ] ) ;  
 	 	 c s   =   n e w   A N T L R I n p u t S t r e a m ( i s ) ;  
 	 	 / / c s   =   n e w   A N T L R S t r i n g S t r e a m ( " -   1 5 1   - " ) ;  
 	 	 l e x e r   =   n e w   E C M A _ 2 6 2 _ 3 r d _ A n n e x A _ L e x e r ( c s ) ;  
 	 	 t s   =   n e w   C o m m o n T o k e n S t r e a m ( l e x e r ) ;  
 	 	 p a r s e r   =   n e w   E C M A _ 2 6 2 _ 3 r d _ A n n e x A _ P a r s e r ( t s ) ;  
 	 	 p a r s e r . s y n t a x ( ) ;  
 	 }  
 }  
