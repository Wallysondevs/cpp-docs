# operator==,!=,&lt;,&lt;=,&gt;,&gt;=(std::experimental::propagate_const)

template< class T >  
constexpr bool operator==( const propagate_const&lt;T&gt;& pt, nullptr_t ); |  (1)  |  (library fundamentals TS v2)  
template< class T >  
constexpr bool operator==( nullptr_t, const propagate_const&lt;T&gt;& pt ); |  (2)  |  (library fundamentals TS v2)  
template< class T >  
constexpr bool operator!=( const propagate_const&lt;T&gt;& pt, nullptr_t ); |  (3)  |  (library fundamentals TS v2)  
template< class T >  
constexpr bool operator!=( nullptr_t, const propagate_const&lt;T&gt;& pt ); |  (4)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator==( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (5)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator!=( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (6)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (7)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (8)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<=( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (9)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>=( const propagate_const&lt;T&gt;& pt, const propagate_const&lt;U&gt;& pu ); |  (10)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator==( const propagate_const&lt;T&gt;& pt, const U& u ); |  (11)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator!=( const propagate_const&lt;T&gt;& pt, const U& u ); |  (12)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator==( const T& t, const propagate_const&lt;U&gt;& pu ); |  (13)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator!=( const T& t, const propagate_const&lt;U&gt;& pu ); |  (14)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<( const propagate_const&lt;T&gt;& pt, const U& u ); |  (15)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>( const propagate_const&lt;T&gt;& pt, const U& u ); |  (16)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<=( const propagate_const&lt;T&gt;& pt, const U& u ); |  (17)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>=( const propagate_const&lt;T&gt;& pt, const U& u ); |  (18)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<( const T& t, const propagate_const&lt;U&gt;& pu ); |  (19)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>( const T& t, const propagate_const&lt;U&gt;& pu ); |  (20)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator<=( const T& t, const propagate_const&lt;U&gt;& pu ); |  (21)  |  (library fundamentals TS v2)  
template< class T, class U >  
constexpr bool operator>=( const T& t, const propagate_const&lt;U&gt;& pu ); |  (22)  |  (library fundamentals TS v2)  

  
Compara os ponteiros encapsulados de dois `propagate_const`s, ou entre um `propagate_const` e `nullptr`, ou entre um `propagate_const` e outro objeto.

1-4) Comparação de igualdade para um `propagate_const` e `nullptr`.

5,6) Comparação de igualdade para dois `propagate_const`s.

7-10) Comparação ordenada para dois `propagate_const`s.

11-14) Comparação de igualdade para um `propagate_const` e outro objeto.

15-22) Comparação ordenada para um `propagate_const` e outro objeto.

### Parâmetros

pt, pu  |  \-  |  `propagate_const`s para comparar   
---|---|---
t, u  |  \-  |  outros objetos para comparar   
  
### Valor de retorno

Seja `t_` o objeto subjacente tipo ponteiro encapsulado por um `propagate_const`. 

1) pt.t_ == nullptr

2) nullptr == pt.t_

3) pt.t_ != nullptr

4) nullptr != pt.t_

5) pt.t_ == pu.t_

6) pt.t_ != pu.t_

7) pt.t_ < pu.t_

8) pt.t_ > pu.t_

9) pt.t_ <= pu.t_

10) pt.t_ >= pu.t_

11) pt.t_ == u

12) pt.t_ != u

13) t == pu.t_

14) t != pu.t_

15) pt.t_ < u

16) pt.t_ > u

17) pt.t_ <= u

18) pt.t_ >= u

19) t < pu.t_

20) t > pu.t_

21) t <= pu.t_

22) t >= pu.t_