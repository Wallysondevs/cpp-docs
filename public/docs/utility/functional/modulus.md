# std::modulus

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct modulus;
template< class T = void >
struct modulus;
```

  
Objeto de função para calcular os restos de divisões. Implementa operator% para o tipo `T`. 

### Especializações

A standard library fornece uma especialização de `std::modulus` quando `T` não é especificado, o que permite que os tipos de parâmetro e o tipo de retorno sejam deduzidos.  |  [ modulus&lt;void&gt;](<#/doc/utility/functional/modulus_void>)(C++14) |  objeto de função que implementa x % y deduzindo tipos de parâmetro e de retorno   
(especialização de template de classe)  
(desde C++14)  
  
### Tipos de membros

Tipo  |  Definição   
---|---
`result_type` (obsoleto desde C++17)(removido desde C++20) |  `T`  
`first_argument_type` (obsoleto desde C++17)(removido desde C++20) |  `T`  
`second_argument_type` (obsoleto desde C++17)(removido desde C++20) |  `T`  
Esses tipos de membros são obtidos através da herança pública de [std::binary_function](<#/doc/utility/functional/binary_function>)<T, T, T>.  | (até C++11)  
  
### Funções membro

operator() |  retorna o resto da divisão do primeiro argumento pelo segundo argumento   
(função membro pública)  
  
##  std::modulus::operator()

T operator()( const T& lhs, const T& rhs ) const; |  | (constexpr desde C++14)  

  
Retorna o resto da divisão de lhs por rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores para dividir um pelo outro   
  
###  Valor de retorno

O resultado de lhs % rhs. 

### Exceções

Pode lançar exceções definidas pela implementação. 

###  Possível implementação
```cpp
    constexpr T operator()(const T& lhs, const T& rhs) const 
    {
        return lhs % rhs;
    }
```  
  
---  
  
### Veja também

[ fmodfmodffmodl](<#/doc/numeric/math/fmod>)(C++11)(C++11) |  resto da operação de divisão de ponto flutuante   
(função)  
[ remainderremainderfremainderl](<#/doc/numeric/math/remainder>)(C++11)(C++11)(C++11) |  resto assinado da operação de divisão   
(função)