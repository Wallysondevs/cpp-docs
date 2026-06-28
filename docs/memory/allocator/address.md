# std::allocator&lt;T&gt;::address

```cpp
  // (1)
pointer address( reference x ) const; |  |  (ate C++11)
pointer address( reference x ) const noexcept;  // (desde C++11)
(obsoleto em C++17)
(removido em C++20)
  // (2)
const_pointer address( const_reference x ) const; |  |  (ate C++11)
const_pointer address( const_reference x ) const noexcept;  // (desde C++11)
(obsoleto em C++17)
(removido em C++20)
```

  
Retorna o endereço real de x mesmo na presença de um operator& sobrecarregado. 

### Parâmetros

x  |  \-  |  o objeto do qual adquirir o endereço   
  
### Valor de retorno

O endereço real de x. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 634](<https://cplusplus.github.io/LWG/issue634>)  
([N2436](<https://wg21.link/N2436>))  | C++98  | o valor de retorno é &x  
(que é afetado por um operator& sobrecarregado)  | retorna o endereço real de x