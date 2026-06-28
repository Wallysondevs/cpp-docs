# voidify

```cpp
template< class T >
void* voidify( T& obj ) noexcept;  // (apenas para exposição*)
(constexpr desde C++17)
```

  
Retorna o endereço de obj (implicitamente convertido para void*). 

### Parâmetros

obj  |  \-  |  o objeto cujo endereço será obtido   
  
### Valor de retorno

&obj | (até C++11)  
---|---
[std::addressof](<#/doc/memory/addressof>)(obj) | (desde C++11)  
  
### Notas

Esta função, apenas para exposição, é introduzida por [P0896R4](<https://wg21.link/P0896R4>). Ela é usada para descrever os efeitos de [algoritmos de memória não inicializada](<#/doc/memory>) que constroem objetos em áreas de memória não inicializadas. O ponteiro resultante é usado como os placement-params de uma [expressão placement new](<#/doc/language/new>). 

Inicialmente, o valor de retorno era const_cast<void*>(static_cast&lt;const volatile void*&gt;([std::addressof](<#/doc/memory/addressof>)(obj))), o que quebrava a const-correctness. Os casts explícitos foram removidos pela resolução do [LWG issue 3870](<https://cplusplus.github.io/LWG/issue3870>), e a única conversão restante é a conversão implícita para void*. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++98  | os casts explícitos quebravam a const-correctness  | removeu esses casts   
  
### Veja também

[ uninitialized_copy](<#/doc/memory/uninitialized_copy>) |  copia um range de objetos para uma área de memória não inicializada   
(modelo de função)  
[ ranges::uninitialized_copy](<#/doc/memory/ranges/uninitialized_copy>)(C++20) |  copia um range de objetos para uma área de memória não inicializada  
(objeto de função de algoritmo)  
[ uninitialized_fill](<#/doc/memory/uninitialized_fill>) |  copia um objeto para uma área de memória não inicializada, definida por um range   
(modelo de função)  
[ ranges::uninitialized_fill](<#/doc/memory/ranges/uninitialized_fill>)(C++20) |  copia um objeto para uma área de memória não inicializada, definida por um range  
(objeto de função de algoritmo)  
[ uninitialized_move](<#/doc/memory/uninitialized_move>)(C++17) |  move um range de objetos para uma área de memória não inicializada   
(modelo de função)  
[ ranges::uninitialized_move](<#/doc/memory/ranges/uninitialized_move>)(C++20) |  move um range de objetos para uma área de memória não inicializada  
(objeto de função de algoritmo)  
[ uninitialized_default_construct](<#/doc/memory/uninitialized_default_construct>)(C++17) |  constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range   
(modelo de função)  
[ ranges::uninitialized_default_construct](<#/doc/memory/ranges/uninitialized_default_construct>)(C++20) |  constrói objetos por [inicialização padrão](<#/doc/language/default_initialization>) em uma área de memória não inicializada, definida por um range  
(objeto de função de algoritmo)  
[ uninitialized_value_construct](<#/doc/memory/uninitialized_value_construct>)(C++17) |  constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range   
(modelo de função)  
[ ranges::uninitialized_value_construct](<#/doc/memory/ranges/uninitialized_value_construct>)(C++20) |  constrói objetos por [inicialização por valor](<#/doc/language/value_initialization>) em uma área de memória não inicializada, definida por um range  
(objeto de função de algoritmo)  
[ construct_at](<#/doc/memory/construct_at>)(C++20) |  cria um objeto em um endereço fornecido   
(modelo de função)  
[ ranges::construct_at](<#/doc/memory/ranges/construct_at>)(C++20) |  cria um objeto em um endereço fornecido  
(objeto de função de algoritmo)