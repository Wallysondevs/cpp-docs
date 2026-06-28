# operator==,!=,&lt;,&lt;=,&gt;,&gt;=(std::experimental::observer_ptr)

template< class W1, class W2 >  
bool operator==( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (1)  |  (library fundamentals TS v2)  
template< class W1, class W2 >  
bool operator!=( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (2)  |  (library fundamentals TS v2)  
template< class W >  
bool operator==( const observer_ptr&lt;W&gt;& p, [std::nullptr_t](<#/doc/types/nullptr_t>) ) noexcept; |  (3)  |  (library fundamentals TS v2)  
template< class W >  
bool operator==( [std::nullptr_t](<#/doc/types/nullptr_t>), const observer_ptr&lt;W&gt;& p ) noexcept; |  (4)  |  (library fundamentals TS v2)  
template< class W >  
bool operator!=( const observer_ptr&lt;W&gt;& p, [std::nullptr_t](<#/doc/types/nullptr_t>) ) noexcept; |  (5)  |  (library fundamentals TS v2)  
template< class W >  
bool operator!=( [std::nullptr_t](<#/doc/types/nullptr_t>), const observer_ptr&lt;W&gt;& p ) noexcept; |  (6)  |  (library fundamentals TS v2)  
template< class W1, class W2 >  
bool operator<( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (7)  |  (library fundamentals TS v2)  
template< class W1, class W2 >  
bool operator>( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (8)  |  (library fundamentals TS v2)  
template< class W1, class W2 >  
bool operator<=( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (9)  |  (library fundamentals TS v2)  
template< class W1, class W2 >  
bool operator>=( const observer_ptr&lt;W1&gt;& p1, const observer_ptr&lt;W2&gt;& p2 ); |  (10)  |  (library fundamentals TS v2)  

  
Compara os valores de ponteiro de dois `observer_ptr`s, ou um `observer_ptr` e nullptr.

1,2) Comparação de igualdade para dois `observer_ptr`s.

3-6) Comparação de igualdade para um `observer_ptr` e nullptr.

7-10) Comparação ordenada para dois `observer_ptr`s.

### Parâmetros

p, p1, p2  |  \-  |  `observer_ptr`s para comparar   
  
### Valor de retorno

1) p1.get() == p2.get()

2) !(p1 == p2)

3,4) !p

5,6) (bool)p

7) [std::less](<#/doc/utility/functional/less>)&lt;W3&gt;()(p1.get(), p2.get()), onde `W3` é o tipo de ponteiro composto de `W1*` e `W2*`.

8) p2 < p1

9) !(p2 < p1)

10) !(p1 < p2)