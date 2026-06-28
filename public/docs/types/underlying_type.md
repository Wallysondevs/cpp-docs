# std::underlying_type

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct underlying_type;
```

  
Se `T` for um tipo de enumeração (enum) completo, fornece um typedef membro `type` que nomeia o tipo subjacente de `T`. 

Caso contrário, o comportamento é indefinido.  | (ate C++20)  
---|---
Caso contrário, se `T` não for um tipo de enumeração, não há membro `type`. Caso contrário (`T` é um tipo de enumeração incompleto), o programa é malformado.  | (desde C++20)  
  
Se o programa adicionar especializações para `std::underlying_type`, o comportamento é indefinido. 

### Tipos Membro

Nome  |  Definição   
---|---
`type` |  o tipo subjacente de `T`  
  
### Tipos Auxiliares

```cpp
template< class T >
using underlying_type_t = typename underlying_type<T>::type;  // (desde C++14)
```

  
### Notas

Cada [tipo de enumeração](<#/doc/language/enum>) possui um _tipo subjacente_, que pode ser 

  1. Especificado explicitamente (tanto para enumerações com escopo quanto sem escopo); 
  2. Omitido, caso em que é `int` para enumerações com escopo ou um tipo integral definido pela implementação capaz de representar todos os valores da enumeração (para enumerações sem escopo). 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    enum e1 {};
    enum class e2 {};
    enum class e3 : unsigned {};
    enum class e4 : int {};
    
    int main()
    {
        constexpr bool e1_t = std::is_same_v<std::underlying_type_t<e1>, int>;
        constexpr bool e2_t = std::is_same_v<std::underlying_type_t<e2>, int>;
        constexpr bool e3_t = std::is_same_v<std::underlying_type_t<e3>, int>;
        constexpr bool e4_t = std::is_same_v<std::underlying_type_t<e4>, int>;
    
        std::cout
            << "underlying type for 'e1' is " << (e1_t ? "int" : "non-int") << '\n'
            << "underlying type for 'e2' is " << (e2_t ? "int" : "non-int") << '\n'
            << "underlying type for 'e3' is " << (e3_t ? "int" : "non-int") << '\n'
            << "underlying type for 'e4' is " << (e4_t ? "int" : "non-int") << '\n';
    }
```

Saída possível: 
```
    underlying type for 'e1' is non-int
    underlying type for 'e2' is int
    underlying type for 'e3' is non-int
    underlying type for 'e4' is int
```

### Relatórios de Defeito 

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2396](<https://cplusplus.github.io/LWG/issue2396>) | C++11  | tipos de enumeração incompletos eram permitidos  | tipo de enumeração completo exigido   
  
### Veja também

[ is_enum](<#/doc/types/is_enum>)(C++11) |  verifica se um tipo é um tipo de enumeração   
(modelo de classe)  
[ is_scoped_enum](<#/doc/types/is_scoped_enum>)(C++23) |  verifica se um tipo é um tipo de enumeração com escopo   
(modelo de classe)  
[ to_underlying](<#/doc/utility/to_underlying>)(C++23) |  converte uma enumeração para seu tipo subjacente   
(modelo de função)