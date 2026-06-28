# std::type_index::operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;

```cpp
bool operator==( const type_index& rhs ) const noexcept;  // (1) (desde C++11)
bool operator!=( const type_index& rhs ) const noexcept;  // (2) (desde C++11)
(até C++20)
bool operator<( const type_index& rhs ) const noexcept;  // (3) (desde C++11)
bool operator<=( const type_index& rhs ) const noexcept;  // (4) (desde C++11)
bool operator>( const type_index& rhs ) const noexcept;  // (5) (desde C++11)
bool operator>=( const type_index& rhs ) const noexcept;  // (6) (desde C++11)
std::strong_ordering operator<=>( const type_index& rhs ) const noexcept;  // (7) (desde C++20)
```

  
Compara os objetos [std::type_info](<#/doc/types/type_info>) subjacentes.

1,2) Verifica se os objetos [std::type_info](<#/doc/types/type_info>) subjacentes referem-se ao mesmo tipo.

3-7) Compara os objetos [std::type_info](<#/doc/types/type_info>) subjacentes conforme definido por uma ordenação definida pela implementação. A comparação é feita por [`type_info::before`](<#/doc/types/type_info/before>).

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

rhs  |  \-  |  outro objeto `type_index` para comparar   
  
### Valor de retorno

1) true se os objetos [std::type_info](<#/doc/types/type_info>) subjacentes referem-se ao mesmo tipo, false caso contrário.

2) true se os objetos [std::type_info](<#/doc/types/type_info>) subjacentes não se referem ao mesmo tipo, false caso contrário.

3-6) true se os tipos referidos pelos objetos [std::type_info](<#/doc/types/type_info>) subjacentes estiverem ordenados pela ordem correspondente, false caso contrário.

7) std::strong_ordering::equal se os objetos [std::type_info](<#/doc/types/type_info>) subjacentes referem-se ao mesmo tipo, caso contrário std::strong_ordering::less se o objeto [std::type_info](<#/doc/types/type_info>) subjacente de *this precede o de rhs na ordenação definida pela implementação, caso contrário std::strong_ordering::greater.