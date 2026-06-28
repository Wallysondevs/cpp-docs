# std::experimental::reflect::get_source_line

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< Object T >
struct get_source_line;
```

  
Fornece a constante membro `value` igual ao [número de linha presumido](<#/doc/preprocessor/line>) da declaração da entidade ou nome de typedef refletido por `T`. 

### Modelo de variável auxiliar 

template< class T >  
constexpr auto get_source_line_v = get_source_line&lt;T&gt;::value; |  |  (reflection TS)  

  
## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  o número de linha presumido da declaração da entidade ou nome de typedef refletido por `T`   
(constante membro estática pública)  
  
### Funções membro

operator std::uint_least32_t |  converte o objeto para [std::uint_least32_t](<#/doc/types/integer>), retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
### Tipos membro

Type  |  Definição   
---|---
`value_type` |  [std::uint_least32_t](<#/doc/types/integer>)  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<[std::uint_least32_t](<#/doc/types/integer>), value>  
  
### Exemplo

O código a seguir mostra a linha do código-fonte de um objeto ou uma classe.

Execute este código
```cpp
    #include<experimental/reflect>
    #include<iostream>
    
    using refl = std::experimental::reflect;
    
    float f;
    struct P{};
    
    int main()
    {
        std::cout << refl::get_source_line_v<reflexpr(f)> << '\n';
        std::cout << refl::get_source_line_v<reflexpr(P)> << '\n';
    }
```

Saída: 
```
    6
    7
```

### Veja também

[ line](<#/doc/utility/source_location/line>) |  retorna o número de linha representado por este objeto   
(função membro pública de `std::source_location`)  
[ source_line](<#/doc/utility/stacktrace_entry/source_line>) |  obtém o número de linha que relaciona lexicalmente a avaliação representada pelo `stacktrace_entry`   
(função membro pública de `std::stacktrace_entry`)