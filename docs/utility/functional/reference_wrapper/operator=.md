# std::reference_wrapper&lt;T&gt;::operator=

```cpp
reference_wrapper& operator=( const reference_wrapper& other ) noexcept;  // (desde C++11)
(constexpr desde C++20)
```

  
Operador de atribuição de cópia. Descarta a referência atual e armazena uma referência para other.get(). 

### Parâmetros

other  |  \-  |  wrapper de referência a ser copiado   
  
### Valor de retorno

*this