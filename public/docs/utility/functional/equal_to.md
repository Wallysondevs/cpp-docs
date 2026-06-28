# std::equal_to

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct equal_to;
template< class T = void >
struct equal_to;
```

  
Objeto de função para realizar comparações. A menos que especializado, invoca operator== no tipo `T`. 

### Especializações

A standard library fornece uma especialização de `std::equal_to` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos.  |  [ equal_to&lt;void&gt;](<#/doc/utility/functional/equal_to_void>)(C++14) |  objeto de função que implementa x == y deduzindo tipos de parâmetro e retorno   
(especialização de modelo de classe)  
(desde C++14)  
  
### Tipos de membros

Tipo  |  Definição   
---|---
`result_type` (obsoleto em C++17)(removido em C++20) |  bool  
`first_argument_type` (obsoleto em C++17)(removido em C++20) |  `T`  
`second_argument_type` (obsoleto em C++17)(removido em C++20) |  `T`  
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, bool>.  | (ate C++11)  
  
### Funções de membro

operator() |  verifica se os argumentos são _iguais_   
(função de membro pública)  
  
##  std::equal_to::operator()

bool operator()( const T& lhs, const T& rhs ) const; |  | (constexpr desde C++14)  

  
Verifica se lhs é _igual_ a rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a comparar   
  
###  Valor de retorno

true se lhs == rhs, false caso contrário. 

### Exceções

Pode lançar exceções definidas pela implementação. 

###  Possível implementação
```cpp
    constexpr bool operator()(const T& lhs, const T& rhs) const 
    {
        return lhs == rhs;
    }
```  
  
---  
  
### Veja também

[ equal](<#/doc/algorithm/equal>) |  determina se dois conjuntos de elementos são os mesmos   
(modelo de função)  
[ not_equal_to](<#/doc/utility/functional/not_equal_to>) |  objeto de função que implementa x != y   
(modelo de classe)  
[ less](<#/doc/utility/functional/less>) |  objeto de função que implementa x < y   
(modelo de classe)  
[ ranges::equal_to](<#/doc/utility/functional/ranges/equal_to>)(C++20) |  objeto de função restrito que implementa x == y   
(classe)