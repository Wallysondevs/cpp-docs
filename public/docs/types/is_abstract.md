# std::is_abstract

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_abstract;
```

`std::is_abstract` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é uma [classe abstrata](<#/doc/language/abstract_class>) (isto é, uma classe não-union que declara ou herda pelo menos uma função virtual pura), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se `T` é um tipo de classe não-union incompleto, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_abstract` ou `std::is_abstract_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_abstract_v = is_abstract<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de [classe abstrata](<#/doc/language/abstract_class>), false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_abstract_v<A> == false);
    
    struct B { virtual void foo(); };
    static_assert(std::is_abstract_v<B> == false);
    
    struct C { virtual void foo() = 0; };
    static_assert(std::is_abstract_v<C> == true);
    
    struct D : C {};
    static_assert(std::is_abstract_v<D> == true);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | o comportamento era indefinido se `T` fosse um tipo union incompleto | a característica base é [std::false_type](<#/doc/types/integral_constant>) neste caso

### Veja também

[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(template de classe)
[ is_polymorphic](<#/doc/types/is_polymorphic>)(C++11) | verifica se um tipo é um tipo de classe polimórfica
(template de classe)