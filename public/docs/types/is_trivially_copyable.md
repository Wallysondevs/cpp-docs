# std::is_trivially_copyable

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_trivially_copyable;
```

`std::is_trivially_copyable` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo [trivially copyable](<#/doc/named_req/TriviallyCopyable>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; é um tipo incompleto e não (possivelmente cv-qualified) void, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_trivially_copyable` ou `std::is_trivially_copyable_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_trivially_copyable_v = is_trivially_copyable<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo trivially copyable, false caso contrário
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

### Notas

Objetos de tipos trivially-copyable que não são subobjetos potencialmente sobrepostos são os únicos objetos C++ que podem ser copiados com segurança com [std::memcpy](<#/doc/string/byte/memcpy>) ou serializados para/de arquivos binários com [`std::ofstream::write()`](<#/doc/io/basic_ostream/write>) / [`std::ifstream::read()`](<#/doc/io/basic_istream/read>).

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(std::is_trivially_copyable_v<A> == true);
    
    struct B { B(B const&) {} };
    static_assert(std::is_trivially_copyable_v<B> == false);
    
    struct C { virtual void foo(); };
    static_assert(std::is_trivially_copyable_v<C> == false);
    
    struct D
    {
        int m;
    
        D(D const&) = default; // -> trivially copyable
        D(int x) : m(x + 1) {}
    };
    static_assert(std::is_trivially_copyable_v<D> == true);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | `T` poderia ser um array de tipo de classe incompleto com limite desconhecido | o comportamento é indefinido neste caso

### Veja também

[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto em C++26) | verifica se um tipo é trivial
(template de classe)