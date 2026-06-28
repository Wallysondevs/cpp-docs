# std::optional&lt;T&gt;::transform

```cpp
template< class F >
constexpr auto transform( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&&;  // (4) (desde C++23)
```

  
Se *this contiver um valor, invoca `f` com o valor contido como argumento, e retorna um `std::optional` que contém o resultado dessa invocação; caso contrário, retorna um `std::optional` vazio. 

O tipo do valor contido no resultado (denotado por `U` abaixo) deve ser um tipo de objeto não-array, e não deve ser [std::in_place_t](<#/doc/utility/in_place>) ou [std::nullopt_t](<#/doc/utility/optional/nullopt_t>)). Caso contrário, o programa é malformado. 

1) Seja `U` [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, T&>>. Se *this contiver um valor, retorna um [std::optional](<#/doc/utility/optional>)&lt;U&gt; cujo valor contido é [diretamente inicializado](<#/doc/language/direct_initialization>) a partir de [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), **this) (ao contrário de [`and_then()`](<#/doc/utility/optional/and_then>), que deve retornar um [std::optional](<#/doc/utility/optional>) diretamente). Caso contrário, retorna um [std::optional](<#/doc/utility/optional>)&lt;U&gt; vazio.  
O programa é malformado se a definição de variável U x([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), **this)); for malformada.

2) O mesmo que (1), exceto que `U` é [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, const T&>>.

3) Seja `U` [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, T>>. Se *this contiver um valor, retorna um [std::optional](<#/doc/utility/optional>)&lt;U&gt; cujo valor contido é diretamente inicializado a partir de [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(**this)). Caso contrário, retorna um [std::optional](<#/doc/utility/optional>)&lt;U&gt; vazio.  
O programa é malformado se a definição de variável U x([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(**this))); for malformada.

4) O mesmo que (3), exceto que `U` é [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, const T>>.

### Parâmetros

f  |  \-  |  uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) cuja assinatura de chamada retorna um tipo não-referência   
  
### Valor de retorno

Um [std::optional](<#/doc/utility/optional>) contendo o resultado de `f` ou um [std::optional](<#/doc/utility/optional>) vazio, conforme descrito acima. 

### Observações

Como `transform` constrói diretamente um objeto `U` no local correto, em vez de passá-lo para um construtor, [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;U&gt; pode ser falso. 

Como o callable `f` não pode retornar um tipo de referência, ele não pode ser um [ponteiro para membro de dados](<#/doc/language/pointer>). 

Algumas linguagens chamam esta operação de [_map_](<https://en.wikipedia.org/wiki/Map_\(higher-order_function\)> "enwiki:Map \(higher-order function\)"). 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_optional`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [Operações monádicas](<#/doc/utility/optional>) em [std::optional](<#/doc/utility/optional>)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
     
    struct A { /* ... */ };
    struct B { /* ... */ };
    struct C { /* ... */ };
    struct D { /* ... */ };
     
    auto A_to_B(A) -> B { /* ... */ std::cout << "A => B \n"; return {}; }
    auto B_to_C(B) -> C { /* ... */ std::cout << "B => C \n"; return {}; }
    auto C_to_D(C) -> D { /* ... */ std::cout << "C => D \n"; return {}; }
     
    void try_transform_A_to_D(std::optional<A> o_A)
    {
        std::cout << (o_A ? "o_A has a value\n" : "o_A is empty\n");
     
        std::optional<D> o_D = o_A.transform(A_to_B)
                                  .transform(B_to_C)
                                  .transform(C_to_D);
     
        std::cout << (o_D ? "o_D has a value\n\n" : "o_D is empty\n\n");
    };
     
    int main()
    {
        try_transform_A_to_D( A{} );
        try_transform_A_to_D( {} );
    }
```

Saída: 
```
    o_A has a value
    A => B
    B => C
    C => D
    o_D has a value
     
    o_A is empty
    o_D is empty
```

### Veja também

[ value_or](<#/doc/utility/optional/value_or>) |  retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)  
[ and_then](<#/doc/utility/optional/and_then>)(C++23) |  retorna o resultado da função fornecida sobre o valor contido se ele existir, ou um `optional` vazio caso contrário   
(função membro pública)  
[ or_else](<#/doc/utility/optional/or_else>)(C++23) |  retorna o próprio `optional` se ele contiver um valor, ou o resultado da função fornecida caso contrário   
(função membro pública)