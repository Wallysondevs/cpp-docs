# std::is_pod

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_pod;
(obsoleto desde C++20)
```

`std::is_pod` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um [tipo POD](<#/doc/named_req/PODType>) ("plain old data type"), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; é um tipo incompleto e não (possivelmente cv-qualified) void, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_pod` ou `std::is_pod_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_pod_v = is_pod<T>::value;  // (desde C++17)
(obsoleto desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo POD, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_pod_v<A> == true);
    
    class B: public A { int m; };
    static_assert(std::is_pod_v<B> == false);
    
    struct C { virtual void foo(); };
    static_assert(std::is_pod_v<C> == false);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | `T` poderia ser um array de tipo de classe incompleto com limite desconhecido | o comportamento é indefinido neste caso

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(template de classe)
[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto desde C++26) | verifica se um tipo é trivial
(template de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)

### Links externos

[Por que `std::is_pod` foi obsoleto em C++20?](<https://stackoverflow.com/questions/48225673>) — StackOverflow
---