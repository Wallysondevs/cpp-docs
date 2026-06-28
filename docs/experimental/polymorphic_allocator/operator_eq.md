# operator==,!=(std::experimental::pmr::polymorphic_allocator)

template< class T1, class T2 >  
bool operator==( const polymorphic_allocator&lt;T1&gt;& lhs, const polymorphic_allocator&lt;T2&gt;& rhs ) noexcept;
template< class T1, class T2 >  
bool operator!=( const polymorphic_allocator&lt;T1&gt;& lhs, const polymorphic_allocator&lt;T2&gt;& rhs ) noexcept;

  
Compara dois alocadores polimórficos. Dois alocadores polimórficos são considerados iguais se seus recursos de memória subjacentes forem considerados iguais. 

1) Retorna *lhs.resource() == *rhs.resource().

2) Retorna !(lhs == rhs).

### Parâmetros

lhs, rhs  |  \-  |  alocadores polimórficos para comparar   
  
### Valor de retorno

1) *lhs.resource() == *rhs.resource()

2) !(lhs == rhs)