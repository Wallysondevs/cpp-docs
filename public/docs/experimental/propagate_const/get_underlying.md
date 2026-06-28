# std::experimental::get_underlying

template< class T >  
constexpr T& get_underlying( propagate_const&lt;T&gt;& pt ) noexcept; |  |  (library fundamentals TS v2)  
template< class T >  
constexpr const T& get_underlying( const propagate_const&lt;T&gt;& pt ) noexcept; |  |  (library fundamentals TS v2)  

  
Recupera uma referência para o objeto tipo ponteiro armazenado em um `propagate_const`. 

### Parâmetros

pt  |  \-  |  um objeto `propagate_const`   
  
### Valor de retorno

Uma referência para o objeto tipo ponteiro armazenado em `pt`. 